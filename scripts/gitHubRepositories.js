module.factory('GitFactory', ['$http', function( $http ){

	return {

		repositories: [{
			'name': 'ng-FitText.js',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'ng-Lettering.js',
			'source': 'github',
			'image': 'images/ng-letteringjs.jpg',
			'tags': '',
			'category': ''
		},{
			'name': 'ng-Adoption.js',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'jQuery-FontSpy.js',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'angular-swipe-drawer',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'ng-ScrollSpy.js',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'marabeas.io',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'useLESS-Mixins',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'angular-draggable-parallax-drawer',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'ng-YouTubeAPI.js',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'jQuery-YouTube-API-Player',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		},{
			'name': 'angular-touch.js',
			'source': 'github',
			'image': '',
			'tags': '',
			'category': ''
		}],

		getRepositories: function( repository ) {

			var GitFactory = this;

			var url;
			var phpAPIUrl = 'http://localhost/GitHub/marabeas.io/cache/api.php';

			angular.forEach( GitFactory.repositories, function( request ){
				var repoData = $http.get( phpAPIUrl, {
					params: {
						"url": 'https://api.github.com/repos/patrickmarabeas/'+ request.name
					}
				}).then( function( result ) {
// JUST SAVE THE DATA NEEDED SO SEARCH ACTUALLY FUNCTIONS AS EXPECTED (ON DATA YOU CAN ACTUALLY SEE NOT THE ENTIRE API RETURN)
					request.data = result.data;
					request.last_modified = Date.parse( result.data.updated_at );

					// promise of commit data
					var commitsData = $http.get( phpAPIUrl, {
						params: {
							"url": 'https://api.github.com/repos/patrickmarabeas/'+ request.name + '/commits'
						}
					}).then( function( result ) {
// JUST SAVE THE DATA NEEDED SO SEARCH ACTUALLY FUNCTIONS AS EXPECTED (ON DATA YOU CAN ACTUALLY SEE NOT THE ENTIRE API RETURN)
						request.commits = result.data;
					});

					// promise of issue data
					var issueData = $http.get( phpAPIUrl, {
						params: {
							"url": 'https://api.github.com/repos/patrickmarabeas/'+ request.name + '/issues'
						}
					}).then( function( result ) {
// JUST SAVE THE DATA NEEDED SO SEARCH ACTUALLY FUNCTIONS AS EXPECTED (ON DATA YOU CAN ACTUALLY SEE NOT THE ENTIRE API RETURN)
						request.issues = result.data;

					});
				});
			});

			return GitFactory.repositories;
		}

	}

}]);


module.controller('GitController', [ '$scope', 'GitFactory', function( $scope, GitFactory ) {

	GitFactory.getRepositories();

	$scope.sort = 'last_modified';
	$scope.reverse = true;

	$scope.gits = GitFactory.repositories;

	$scope.commits = GitFactory.repositories.commits;

	$scope.tab = 'commits';

	$scope.setColor = function( state ) {

		var color;
		if(state == 'open') {
			color = '#6CC644';
		}
		if(state == 'closed') {
			color = '#BD2C00';
		}
		if(state == 'commit') {
			color = '';
		}
		return color;
	};

}]);
