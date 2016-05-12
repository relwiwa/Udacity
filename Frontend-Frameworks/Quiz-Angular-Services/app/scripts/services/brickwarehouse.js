'use strict';

/**
 * @ngdoc service
 * @name serviceQuizApp.brickWarehouse
 * @description
 * # brickWarehouse
 * Service in the serviceQuizApp.
 */
angular.module('serviceQuizApp')
  .service('brickWarehouse', function () {
		
		this.getBricks = function(color) {
			return this.bricks[color];
		};
	
		this.updateBrick = function(size) {
			if (this.bricks['red'][size].quantity > 0) {
				this.bricks['red'][size].quantity--;
			}
		}
	
		this.bricks = {
			'red': {
				'1x1': {
					quantity: 13,
					price: 0.01
				},
				'2x2': {
					quantity: 48,
					price: 0.03
				},
				'2x6': {
					quantity: 9,
					price: 0.05
				}
			},
			'blue': {
				'2x2': {
					quantity: 7,
					price: 0.02
				},
				'2x4': {
					quantity: 2,
					price: 0.04
				}
			},
			'green': {
				'2x4': {
					quantity: 13,
					price: 0.04
				},
				'2x8': {
					quantity: 41,
					price: 0.08
				}
			}
		};
	
  });
