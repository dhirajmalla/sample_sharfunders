var PasswordSignUpController = angular.module('PasswordSignUpController', []);

PasswordSignUpController.controller('PasswordSignUpController',function($window, $scope, $http, $auth, spinnerService, SF_URL, focusElement, COMPANY, $routeParams){
	$scope.user_verify_password = null;
	$scope.user_password = null;

	$scope.verifyConfirmPassword  = function(passwordFirst,passwordSecond){
		if(!angular.equals(passwordFirst, passwordSecond)) {
			toastr.warning('passwords are not matched');
			$scope.user_verify_password="";
		}
	};

	$scope.createPassword = function() {
		$scope.loading = true;

		spinnerService.show( 'loadingSpinner' );

		$http({
			method: 'POST',
			url: SF_URL.URL + SF_URL.SET_PASSWORD,
			params: {
				user_password: $scope.user_password,
				user_password_verification: $scope.user_verify_password,
				token: $auth.getToken(),
				company_id: COMPANY.ID,
				company_url: $window.location.origin
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(data){
			console.log(data);
			if(data.success == false){
				toastr.warning(data.message);
			}
			if(data.success == true){
				$window.location.href='../my-account';
			}

		}).error(function (data) {
			if(data.success == false){
				toastr.error(data.message);
			}
		}).finally( function () {

			spinnerService.hide( 'loadingSpinner' );
			$scope.loading = false;
		});

	}
});