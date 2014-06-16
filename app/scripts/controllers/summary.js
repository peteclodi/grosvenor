'use strict';

angular.module('grosvenorApp')
    .controller('SummaryCtrl', function ($scope, DrinksOrdered) {
        $scope.drinksOrdered = DrinksOrdered;
    });