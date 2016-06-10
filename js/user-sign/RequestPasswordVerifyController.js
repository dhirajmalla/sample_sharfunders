var requestPasswordVerifyController = angular.module('RequestPasswordVerifyController', []);

requestPasswordVerifyController.controller('RequestPasswordVerifyController',function($window, $scope, $http,$auth, spinnerService, SF_URL, COMPANY){
	$scope.verifyAndCreatePassword = function() {

		$scope.loading = true;
		spinnerService.show( 'loadingSpinner' );

		$http({
			method: 'POST',
			url: SF_URL.URL + SF_URL.NEW_PASSWORD,
			params: {
				company_id: COMPANY.ID,
				company_url: window.location.origin,
				user_password:$scope.new_password,
				verify_code: $scope.varify_password_request_code,
				token:$auth.getToken()
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(data){
			if(data.success == false){

				toastr.warning(data.message);

			}
			if(data.success == true){
				$window.location.href='#login';
			}

		}).error(function (data) {

			toastr.error(data.message);

		}).finally( function () {

			spinnerService.hide( 'loadingSpinner' );
			$scope.loading = false;

		});
	}
});