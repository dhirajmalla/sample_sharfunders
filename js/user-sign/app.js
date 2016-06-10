console.log( "--> Welcome to Sharefunders- Login/Sign Up" );
var userSignApp = angular.module( 'UserSignApp', [
	'ngRoute',
	'satellizer',
	'angularSpinners',
	'UserLoginController',
	'UserSignUpController',
	'VerificationUserSignUpController',
	'PasswordSignUpController',
	'RequestPasswordController',
	'RequestPasswordVerifyController'
] );

userSignApp.config( function ( $routeProvider, $authProvider ) {
	var current_url = '';
	var full = {
		'location': location.hostname,
		'port': (
			location.port ? ':' + location.port : '')
	};
	if ( full.location == 'localhost' && full.port == ':63342' ) {
		current_url = 'http://localhost:5666/';
	} else {
		current_url = 'http://ec2-52-58-27-76.eu-central-1.compute.amazonaws.com/';
	}

	$authProvider.loginUrl = current_url + "/login";

	$routeProvider.when( '/login', {
		templateUrl: 'login.html',
		controller: 'UserLoginController'
	} ).when( '/signup', {
		templateUrl: 'signup.html',
		controller: 'UserSignUpController'
	} ).when( '/verify', {
		templateUrl: 'verification_signup.html',
		controller: 'VerificationUserSignUpController'
	} ).when( '/create_password', {
		templateUrl: 'signup_password.html',
		controller: 'PasswordSignUpController'
	} ).when( '/request_password', {
		templateUrl: 'request_password.html',
		controller: 'RequestPasswordController'
	} ).when( '/request_password_verify', {
		templateUrl: 'request_password_verify.html',
		controller: 'RequestPasswordVerifyController'
	} ).otherwise( {
		redirectTo: '/login'
	} );
} );

/**
 * Simple factory to auto focus elements base on id
 */
userSignApp.factory( 'focusElement', function ( $timeout, $window ) {
	return function ( id ) {
		$timeout( function () {
			var element = $window.document.getElementById( id );
			if ( element ) {
				element.focus();
			}
		} );
	};
} );


/**
 * This makes sure that we do pass the right value
 * to the application by defining the right id from the creation
 * of the DOM.
 */
userSignApp.factory( 'COMPANY', function () {
	var current_company_id = document.getElementById( 'mainCompanyIdentification' ).value;
	if ( typeof current_company_id !== 'undefined' && current_company_id !== "" ) {
		return {
			ID: current_company_id
		}
	}
	return {
		ID: 0
	}
} );

/**
 * Factory where all API possible
 * URLS are declared
 */
userSignApp.factory( 'SF_URL', function () {
	var current_url = '';
	var full = {
		'location': location.hostname,
		'port': (
			location.port ? ':' + location.port : '')
	};
	if ( full.location == 'localhost' && full.port == ':63342' ) {
		current_url = 'http://localhost:5666/';
	} else {
		current_url = 'http://ec2-52-58-27-76.eu-central-1.compute.amazonaws.com/';
	}
	return {
		URL: current_url,
		AUTH: 'authenticate',
		PAGE: 'page',
		FOLLOWERS: 'followers', //this required the pattern: page/{page_id}/followers
		PROFILE: 'profile', // this required the patten: page/{page_id}/profile
		VALIDATION: {
			SOCIAL: 'validate/social',
			COMPANY: 'validate/company',
			LOCATION: 'validate/getUserCurrentLocation',
			SIGN_UP_LOCATION: 'validate/user_location',
			EMAIL: 'validate/validate_user_email',
			VALIDATE_COMPANY: 'validate/current_company'
		},
		REGISTER: 'register',
		VERIFY: 'verify',
		SET_PASSWORD: 'set_password',
		LOGIN: 'login',
		PASSWORD_RESET: 'password_reset',
		NEW_PASSWORD: 'new_password',
		UPDATE_PASSWORD: 'update/user-password'
	};

} );
(function ( $ ) {
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-top-center",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
})( jQuery );