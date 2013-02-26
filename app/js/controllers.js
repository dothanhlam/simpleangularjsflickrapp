'use strict';

/* Controllers */


function PhotoListController($scope, $location, Photo) {
    $scope.term = "green";
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;

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
                    $scope.currentPage = 0;
                    $scope.groupToPages();
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
    // pagination
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        for (var i = 0; i < $scope.photos.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.photos[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.photos[i]);
            }
        }
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.searchPhotos();
}

PhotoListController.$inject = ['$scope','$location', 'Photo'];

function AboutController() {
}
AboutController.$inject = [];
