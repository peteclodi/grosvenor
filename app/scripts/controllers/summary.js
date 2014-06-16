'use strict';

angular.module('grosvenorApp')
    .controller('SummaryCtrl', function ($scope, DrinksOrdered) {
        $scope.drinksOrdered = DrinksOrdered;

        $scope.totalDrinksOrdered = function() {
            var totalDrinksOrdered = 0;
            angular.forEach($scope.drinksOrdered, function(drinkOrdered){
                totalDrinksOrdered += drinkOrdered.quantity;
            });
            return totalDrinksOrdered;
        };
    });