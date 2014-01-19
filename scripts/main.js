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