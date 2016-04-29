angular.module('listingDemo')
    .controller('listCtrl', function($scope, $timeout) {
        //console.log(json)
        $scope.data = json;
        $scope.option = listingOptions;
        $scope.selectedId = selectedIDs;
        $scope.onClickFunc = function(obj1) {
            console.log(obj1);
        };

        // $timeout(function () {
        // 	  $scope.selectedId.push('a2');
        // },3000);

        $scope.changeData = function() {
            $scope.selectedId = ['a2', 'a3', 'a4'];
        };
    });