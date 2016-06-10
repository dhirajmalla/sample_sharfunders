var UserSignUpController = angular.module( 'UserSignUpController', [] );

UserSignUpController.controller( 'UserSignUpController', function ( $window, $scope, $http, $auth, spinnerService, SF_URL, COMPANY, focusElement ) {

	$scope.isAuthenticated = function () {
		$scope.isauth = $auth.isAuthenticated();
	};

	$http( {
		method: 'GET',
		url: SF_URL.URL + SF_URL.VALIDATION.SIGN_UP_LOCATION
	} ).success( function ( data ) {
		if ( data.success === true ) {
			$scope.user_country = data.country
		}
	} ).error( function ( data ) {
		//console.log(data);
	} );

	$scope.validateEmailAddress = function () {
		var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if ( email_regex.test( $scope.user_email ) ) {
			$http( {
				method: 'POST',
				url: SF_URL.URL + SF_URL.VALIDATION.EMAIL,
				params: {
					user_email: $scope.user_email
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			} ).success( function ( data ) {
				if ( data.success === false ) {
					toastr.warning( data.message );
					focusElement( 'user_email' );

				}
			} ).error( function ( data ) {
				//console.log( data );

			} );
		}
	};

	$scope.createUser = function () {
		spinnerService.show( 'loadingSpinner' );
		$http( {
			method: 'POST',
			url: SF_URL.URL + SF_URL.REGISTER,
			params: {
				user_country: $scope.user_country,
				user_name: $scope.user_name,
				user_last_name: $scope.user_last_name,
				user_email: $scope.user_email,
				company_id: COMPANY.ID,
				company_url: $window.location.origin
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		} ).success( function ( data ) {
			console.log( data );
			if ( data.success == true ) {
				$window.location.href = "#verify";
			} else {
				toastr.warning( data.message );
			}
		} ).error( function ( data ) {

			//console.log(data);

		} ).finally( function () {

			spinnerService.hide( 'loadingSpinner' );
		} );
	}
} );