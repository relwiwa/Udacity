'use strict';

/**
 * @ngdoc function
 * @name routingQuizApp.controller:RedBricksCtrl
 * @description
 * # RedBricksCtrl
 * Controller of the routingQuizApp
 */
angular.module('routingQuizApp')
  .controller('RedBricksCtrl', ['purchaseManager', function (manager) {
    this.name = 'Red Bricks';

    this.bricks = {
      '1x1': {
        quantity: 29,
        price: 0.01
      },
      '2x2': {
        quantity: 48,
        price: 0.03
      },
      '2x6': {
        quantity: 27,
        price: 0.05
      }
    };

    this.addToCart = function(size, price) {
			if (this.bricks[size].quantity > 0 ) {
				manager.purchase('red', size, price);
			}
    };
		
		this.updateQuantity = function(size) {
			if (this.bricks[size].quantity > 0) {
				this.bricks[size].quantity--;
			}
		}
  }]);
