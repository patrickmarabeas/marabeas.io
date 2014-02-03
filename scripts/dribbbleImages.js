module.factory( 'DribbbleFactory', [ '$http', function( $http ) {
	return {

		images: [],

		getDribbble: function() {

			var FeedFactory = this; //need to change this

			var dribbbleData = $http.jsonp('http://api.dribbble.com/players/patrickmarabeas/shots', {
				params: {
					"callback": "JSON_CALLBACK"
				}
			});

			dribbbleData.then(function(result) {

				angular.forEach(result.data.shots, function( value, key ) {

					FeedFactory.images.push({
						'source': 'dribbble',
						'last_modified': Date.parse( result.data.shots[key].created_at ),
						'name': result.data.shots[key].title,
						'url': result.data.shots[key].url,
						'image': result.data.shots[key].image_teaser_url
					});
				})
			});

		}

	}

}]);


module.controller('DribbbleController', [ '$scope', 'DribbbleFactory', function( $scope, DribbbleFactory ) {

	DribbbleFactory.getDribbble();
	$scope.dribbbles = DribbbleFactory.images;

}]);