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

    $scope.bindScroll = function() {
        var lastScrollTop = 0;
        document.getElementById('content').addEventListener('scroll', function(e) {
            var currentScrollTop = document.getElementById('content').scrollTop;
            if(currentScrollTop < lastScrollTop) {
                // Upwards scroll!
                document.body.scrollTop -= 10;
            } else {
                // Downwards scroll!
                document.body.scrollTop += 10;
            }
            lastScrollTop = currentScrollTop;
        });
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
