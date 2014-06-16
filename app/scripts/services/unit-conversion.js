'use strict';

angular.module('grosvenorApp')
	.service('UnitConversion', function(){
		return function(){
			function ouncesToML(ounces) {
				return ounces / 0.0338140225589;
			}

			function mlToOunces(ml) {
				return ml * 0.0338140225589;
			}

			function mlToLiter(ml) {
				return ml * 1000;
			}

			function literToML(liter) {
				return liter / 1000;
			}
		};
	});