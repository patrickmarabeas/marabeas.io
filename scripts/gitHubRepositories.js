module.factory('GitFactory', ['$http', function( $http ){

	return {

		repositories: [
//		{
//			'name': '',
//			'source': 'github / gist',
//			'image': 'images/',
//			'description': '',
//			'tags': ['',''],
//			'category': '',
//
// 			REPOSITORY DATA API RETURN
//			'data': '',
//
//			COMMITS DATA API RETURN
//			'commits': '',
//
//			ISSUES DATA API RETURN
//			'issues': '',
//		},
		{
			'name': 'ng-FitText.js',
			'source': 'github',
			'image': 'images/ng-fittext.jpg',
			'description': 'ng-FitText.js makes font-sizes flexible. Use this AngularJS directive in your fluid or responsive layout to achieve scalable headlines that fill the width of a parent element.',
			'tags': ['typography','UI','angular','javascript'],
			'category': 'production'
		},{
			'name': 'ng-Lettering.js',
			'source': 'github',
			'image': '',
			'description': 'ng-Lettering.js injects spans with semantic class names around letters, words or lines - creating a speedy foundation for radical web typography.',
			'tags': ['typography','UI','span','angular','javascript'],
			'category': 'production'
		},{
			'name': 'ng-Adoption.js',
			'source': 'github',
			'image': '',
			'description': '',
			'tags': '',
			'category': 'development'
		},{
			'name': 'jQuery-FontSpy.js',
			'source': 'github',
			'image': 'images/jquery-fontspyjs.jpg',
			'description': '',
			'tags': '',
			'category': 'production'
		},{
			'name': 'angular-swipe-drawer',
			'source': 'github',
			'image': '',
			'description': '',
			'tags': '',
			'category': 'experiment'
		},{
			'name': 'ng-ScrollSpy.js',
			'source': 'github',
			'image': '',
			'description': '',
			'tags': '',
			'category': 'development'
		},{
			'name': 'marabeas.io',
			'source': 'github',
			'image': 'images/marabeasio.jpg',
			'description': "The site that you're looking at right now! The site serves as a place to link to things I'm involved in, as well as a demonstration itself of what I can achieve with AngularJS and other web technologies.",
			'tags': ['web','site','angular','js','javascript','design','UI','UX','user','experience','interface','html','less','css'],
			'category': 'website'
		},{
			'name': 'useLESS-Mixins',
			'source': 'github',
			'image': 'images/useless.jpg',
			'description': '',
			'tags': '',
			'category': 'production'
		},{
			'name': 'angular-draggable-parallax-drawer',
			'source': 'github',
			'image': '',
			'description': 'An experiment to replicate the parallax drawer found in some native Android applications. This drawer can be dragged around and when released either opens or closes. Parallax effect on the main window.',
			'tags': '',
			'category': 'experiment'
		},{
			'name': 'ng-YouTubeAPI.js',
			'source': 'github',
			'image': '',
			'description': '',
			'tags': '',
			'category': 'production'
		},{
			'name': 'jQuery-YouTube-API-Player',
			'source': 'github',
			'image': '',
			'description': '',
			'tags': '',
			'category': 'production'
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


