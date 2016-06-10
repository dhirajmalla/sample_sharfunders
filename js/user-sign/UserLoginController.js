var UserLoginController = angular.module('UserLoginController', []);

UserLoginController.controller('UserLoginController', function($scope,$http,$auth,$window,spinnerService,SF_URL,COMPANY){
	if($auth.isAuthenticated()){
		$window.location.href='../my-account';
	}

	$scope.checkUser = function() {
		spinnerService.show( 'loadingSpinner' );
		var user = {
			user_email: $scope.email,
			user_password: $scope.password,
			company_id: COMPANY.ID,
			company_url:window.location.origin
		};

		$auth.login(user)
		.then(function(response) {
			if (response.data.success==true){
			// Redirect user here after a successful log in.
				$window.location.href='../my-account';
			}else{
				$scope.error_msg="login fail, please enter again.."
			}
		})
		.catch(function(response) {
			// Handle errors here, such as displaying a notification
			// for invalid email and/or password.
			$scope.error_msg="login fail, please enter again!!!"
		}).finally( function () {
			spinnerService.hide( 'loadingSpinner' );
		});
	}
});