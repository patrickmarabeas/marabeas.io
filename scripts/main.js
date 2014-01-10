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


module.directive( 'scrollto', [ '$location', '$anchorScroll', function( $location, $anchorScroll ) {
	return {
		link: function( scope, element, attrs ) {

			angular.element( element ).bind( 'click', function() {

				$anchorScroll();

			});

		}
	}
}]);


module.directive( 'content', [ function() {
	return {
		link: function( scope, element, attrs ) {


		}
	}
}]);


module.directive( 'drawer', [ function() {
	return {
		link: function( scope, element, attrs ) {

			scope.$watch( 'drawer', function() {

				if( scope.drawer == true ) {

					angular.element( window ).bind('touchmove', function( e ){
						e.preventDefault();
					});

					angular.element( element ).bind("touchmove", function( e ) {
						e.stopPropagation();
					});

				}
				else {
					angular.element( window ).unbind('touchmove');
				}

			});

		}
	}
}]);