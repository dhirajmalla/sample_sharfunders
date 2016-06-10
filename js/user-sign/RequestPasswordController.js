var requestPasswordController = angular.module('RequestPasswordController', []);

requestPasswordController.controller('RequestPasswordController',function($window, $scope,$auth, $http, spinnerService, SF_URL, COMPANY, focusElement){

		$scope.requestPassword = function() {

		$scope.loading = true;
		spinnerService.show( 'loadingSpinner' );
		$http({
			method: 'POST',
			url: SF_URL.URL + SF_URL.PASSWORD_RESET,
			params: {
				user_email: $scope.user_email,
				company_id: COMPANY.ID,
				company_url: window.location.origin
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
				$window.location.href='#request_password_verify';
			}
		}).error(function (data) {
			//console.log(data);

		}).finally( function () {

			spinnerService.hide( 'loadingSpinner' );
			$scope.loading = false;

		});
	}
});