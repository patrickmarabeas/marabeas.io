module.factory('GitHub', ['$http', function( $http ){

	return {

		repositories: [
			{
				name: 'ng-FitText.js',
				img: 'images/fittext.jpg'
			},
			{ name: 'ng-Lettering.js' }
		],

		getRepositories: function( repository ) {

			var GitHub = this;

			angular.forEach(GitHub.repositories, function( request ){

				var repoData = $http.jsonp('https://api.github.com/repos/patrickmarabeas/'+ request.name, {
					params: {
						"callback": "JSON_CALLBACK"
					}
				});

				repoData.then(function(result) {
					request.data = result.data.data;
				});

			});

			return GitHub.repositories;
		}

	}

}]);


module.controller("RepoController", [ '$scope', 'GitHub', function($scope, GitHub) {

	$scope.$watch( 'GitHub.repositories', function() {

		$scope.repos = GitHub.getRepositories();


	});

}]);
