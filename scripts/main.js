var module = angular.module( 'pulsedev', ['ngTouch', 'ngFitText', 'ngLettering', 'ngDiscreteUI', 'ngScrollSpy'] );

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

}]);

// DIRECTIVE TO STOP SCROLLING ON MOBILE - DOESN'T STOP SCROLLING OF PAGE WHEN THE DRAWER CONTENT HAS REACHED BOTTOM
//module.directive( 'content', [ function() {
//	return {
//		link: function( scope, element, attrs ) {
//
//			angular.element( element ).bind("touchmove", function( e ) {
//
//				if( scope.drawer == true ) {
//					e.preventDefault();
//				}
//
//			});
//
//		}
//	}
//}]);