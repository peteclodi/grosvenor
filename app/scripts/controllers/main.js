'use strict';

angular.module('grosvenorApp')
    .controller('MainCtrl', function ($scope, DrinksOrdered, UnitConversion) {
        $scope.stock = [
            {stockId: 0, name: 'Vodka', initialQty: 750, measure: 'ML', type: 'liquor'},
            {stockId: 1, name: 'Gin', initialQty: 1.5, measure: 'L', type: 'liquor'},
            {stockId: 2, name: 'Tequila', initialQty: 750, measure: 'ML', type: 'liquor'},
            {stockId: 3, name: 'Whisky', initialQty: 750, measure: 'ML', type: 'liquor'},
            {stockId: 4, name: 'Sweet Vermouth', initialQty: 750, measure: 'ML', type: 'mixer'},
            {stockId: 5, name: 'Dry Vermouth', initialQty: 750, measure: 'ML', type: 'mixer'},
            {stockId: 6, name: 'Bloody Mary Mix', initialQty: 2, measure: 'L', type: 'mixer'},
            {stockId: 7, name: 'Agave Nectar', initialQty: 24, measure: 'OZ', type: 'juice'},
            {stockId: 8, name: 'Orange Juice', initialQty: 48, measure: 'OZ', type: 'juice'},
            {stockId: 9, name: 'Limes', initialQty: 36, type: 'juice'},
            {stockId: 10, name: 'Cherries', initialQty: 9, type: 'garnish'},
            {stockId: 11, name: 'Celery Stalks', initialQty: 16, type: 'garnish'},
            {stockId: 12, name: 'Olives', initialQty: 24, type: 'garnish'}
        ];

        $scope.drinks = [
            {name: 'Bloody Mary', ingredients:[
                {stockId: 0, qty: 2, measure: 'OZ'},
                {stockId: 6, qty: 4, measure: 'OZ'},
                {stockId: 11, qty: 1}
            ]},
            {name: 'Martini', ingredients:[
                {stockId: 1, qty: 2, measure: 'OZ'},
                {stockId: 5, qty: 1, measure: 'OZ'},
                {stockId: 12, qty: 1}
            ]},
            {name: 'Margarita', ingredients:[
                {stockId: 2, qty: 2, measure: 'OZ'},
                {stockId: 8, qty: 1, measure: 'OZ'},
                {stockId: 7, qty: 1, measure: 'OZ'},
                {stockId: 9, qty: 1}
            ]},
            {name: 'Screwdriver', ingredients:[
                {stockId: 0, qty: 2, measure: 'OZ'},
                {stockId: 8, qty: 4, measure: 'OZ'}
            ]},
            {name: 'Manhattan', ingredients:[
                {stockId: 3, qty: 2, measure: 'OZ'},
                {stockId: 4, qty: 1, measure: 'OZ'},
                {stockId: 10, qty: 1}
            ]}
        ];

        $scope.drinksOrdered = DrinksOrdered;
        var unitConversion = new UnitConversion();

		function initializeDrinksOrder(){
			for(var index = 0; index < $scope.drinks.length; ++index){
				$scope.drinksOrdered[index] = ({name: $scope.drinks[index].name, quantity: 0});
			}
		}

		if($scope.drinksOrdered.length === 0){
			initializeDrinksOrder();
		}

		$scope.getAvailableQty = function(stockItem){
			return stockItem.initialQty - (stockItem.usedQty || 0);
		};

        $scope.getIngredientName = function(stockId){
            switch(stockId){
                case 9:
                    return 'Lime';
                case 10:
                    return 'Cherry';
                case 11:
                    return 'Celery Stalk';
                case 12:
                    return 'Olive';
            }
            return $scope.stock.filter(function(stockItem) { return stockItem.stockId === stockId; })[0].name;
        };

		$scope.ingredientsOutOfStock = function(drink) {
            var outOfStock = false;
            angular.forEach(drink.ingredients, function(ingredient){
				var stockItem = $scope.stock.filter(function(stockItem){ return stockItem.stockId === ingredient.stockId; })[0];
				var normalizedRequiredQty = ((ingredient.measure && stockItem.measure) ?
                    unitConversion.convert(ingredient.qty, ingredient.measure, stockItem.measure) : ingredient.qty);
				if($scope.getAvailableQty(stockItem) < normalizedRequiredQty){
                    outOfStock = true;
                    return;
				}
			});
			return outOfStock;
		};

        $scope.increaseDrinkCount = function(index, drink) {
            $scope.drinksOrdered[index].quantity++;
			angular.forEach(drink.ingredients, function(ingredient){
				var stockItem = $scope.stock.filter(function(stockItem){ return stockItem.stockId === ingredient.stockId; })[0];
				stockItem.usedQty =
					(stockItem.usedQty || 0) + ((ingredient.measure && stockItem.measure) ?
                        unitConversion.convert(ingredient.qty, ingredient.measure, stockItem.measure) : ingredient.qty);
			});
        };

        $scope.decreaseDrinkCount = function(index, drink) {
            $scope.drinksOrdered[index].quantity--;
			angular.forEach(drink.ingredients, function(ingredient){
				var stockItem = $scope.stock.filter(function(stockItem){ return stockItem.stockId === ingredient.stockId; })[0];
				stockItem.usedQty -= ((ingredient.measure && stockItem.measure) ?
                    unitConversion.convert(ingredient.qty, ingredient.measure, stockItem.measure) : ingredient.qty);
			});
        };
    });
