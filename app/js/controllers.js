'use strict';

/* Controllers */


function PhotoListController($scope, $location, Photo) {
    $scope.term = "green";

    $scope.mapPhoto = function(photo) {
        return {
            title: photo.title,
            thumb_src: "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_s.jpg",
            src: "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"
        };
    }

    $scope.searchPhotos = function() {
        Photo.get(
            {
                method:'flickr.photos.search',
                api_key:'23027b56d06aa1a9e8bc1342858eb775',
                text: $scope.term,
                per_page: 50,
                privacy_filter :'1',
                format:'json',
                nojsoncallback:'1'
            },
            function success(data){
                if (data.photos && (data.photos.photo.length)) {
                    $scope.photos = data.photos.photo;
                }
                else {
                    // should redirect to empty pages
                    $location.path('/nophoto');
                }
            },
            function error() {
               alert('Ops! Flickr seem does not works now !')
            }
        );
    }

    $scope.searchPhotos();
}

PhotoListController.$inject = ['$scope','$location', 'Photo'];

function AboutController() {
}
AboutController.$inject = [];
