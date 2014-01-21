var module = angular.module( 'pulsedev', ['ngTouch', 'ngFitText', 'ngLettering', 'ngAdoption', 'ngScrollSpy'] );

module.controller( 'tester', [ '$scope', function( $scope ) {

	$scope.drawerOpen = function() {
		console.log('swiped');
		return $scope.drawer = true;
	};

	$scope.drawerClose = function() {
		console.log('swiped');
		return $scope.drawer = false;
	};

	$scope.drawerToggle = function() {
		console.log('toggled');
		return $scope.drawer = $scope.drawer !== true;
	};



//	// should be moved to a directive
//	angular.element( document ).ready( function() {
//		$scope.innerWindowHeightInitial = window.innerHeight;
//		$scope.addressBar = true;
//	});
//
//
//	angular.element( window ).bind( 'scroll', function() {
//
//		$scope.innerWindowHeight = window.innerHeight;
//
////		alert($scope.innerWindowHeightInitial +" "+ $scope.innerWindowHeight);
//
//		if( $scope.innerWindowHeight > $scope.innerWindowHeightInitial ) {
//			// retracted
//			scope.$apply( function () {
//				$scope.addressBar = false;
//			});
//		}
//		else {
//			//visible
//			scope.$apply( function () {
//				$scope.addressBar = true;
//			});
//		}
//
//	});
//
//
//
//	$scope.$watch('drawer', function( drawer ){
//		if( drawer ){
//
//			if( $scope.addressBar ) {
//				angular.element( document.getElementById( 'body' ) ).css( 'height', ( window.innerHeight - 50 ) + "px" );
//			}
//			else {
////				alert(window.innerHeight);
//				angular.element( document.getElementById( 'body' ) ).css( 'height', ( window.innerHeight - 100 ) + "px" );
//			}
//
//		}
//		else{
//			angular.element( document.getElementById( 'body' ) ).css( 'height', 'auto');
//		}
//	});
//
//	// ! should be moved to a directive




}]);


module.directive( 'scrollto', [ '$location', '$anchorScroll', function( $location, $anchorScroll ) {
	return {
		link: function( scope, element, attrs ) {

			angular.element( element ).bind( 'click', function() {

				$anchorScroll();

			});

		}
	}
}]);


module.directive( 'navfix', [ 'AdoptionAgency', function( AdoptionAgency ) {
	return {
		require: 'adopt',
		link: function( scope, element, attrs ) {

			angular.element( document ).ready( function() {

				var elementHeight, oldElm, newElm;

				angular.element( document ).ready( function() {

					elementHeight = document.getElementById(attrs.id).offsetTop;
					oldElm = document.getElementById(attrs.id);
					newElm = document.getElementById(attrs.id + '_clone');
				});

				angular.element( window ).bind( 'scroll', function() {

					var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
					if( scrollTop > elementHeight ) {
						scope.$apply( function () {
							scope.adopt = true;
						});
					}
					else {
						scope.$apply( function () {
							scope.adopt = false;
						});
					}
				});

				angular.element( window ).bind( 'resize', function() {

					if( scope.adopt ) {
						var newElm = document.getElementById(attrs.id + '_clone');
						newElm.style.width = oldElm.offsetWidth + 'px';
						newElm.style.left = oldElm.offsetLeft + 'px';
					}
				});
			});
		}
	}
}]);