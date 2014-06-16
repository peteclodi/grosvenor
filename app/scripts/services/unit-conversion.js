'use strict';

angular.module('grosvenorApp')
	.service('UnitConversion', function(){
		return function(){

			function convert(value, from, to) {
				switch(from) {
					case 'OZ':
						switch(to){
							case 'L':
								return mlToLiter(ouncesToML(value));
							case 'ML':
								return ouncesToML(value);
						}
						break;
					case 'L':
						value = literToML(value);
					case 'ML':
						switch(to){
							case 'OZ':
								return mlToOunces(value);
							case 'L':
								return mlToLiter(value);
						}
						break;
				}
				return NaN;
			}

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