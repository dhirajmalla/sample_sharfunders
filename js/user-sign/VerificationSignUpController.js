var VerificationUserSignUpController = angular.module('VerificationUserSignUpController', []);

VerificationUserSignUpController.controller('VerificationUserSignUpController',function($window, $scope, $http, $auth, spinnerService, SF_URL,COMPANY, focusElement){

	$scope.verifyUser = function() {

		$scope.loading = true;
		spinnerService.show( 'loadingSpinner' );

		$http({
			method: 'POST',
			url: SF_URL.URL + SF_URL.VERIFY,
			params: {
				company_id: COMPANY.ID,
				company_url: window.location.origin,
				verify_code: $scope.verification_signup
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(data){
			if(data.success == false){
				toastr.warning(data.message);
			}
			if(data.success == true){
				$auth.setToken(data.token);
				$window.location.href='#create_password';
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