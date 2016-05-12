'use strict';

/**
 * @ngdoc function
 * @name routingQuizApp.controller:BlueBricksCtrl
 * @description
 * # BlueBricksCtrl
 * Controller of the routingQuizApp
 */
angular.module('routingQuizApp')
  .controller('BlueBricksCtrl', ['purchaseManager', function (manager) {
    this.name = 'Blue Bricks';

    this.bricks = {
      '2x2': {
        quantity: 7,
        price: 0.02
      },
      '2x4': {
        quantity: 2,
        price: 0.04
      }
    };

    this.addToCart = function(size, price) {
			if (this.bricks[size].quantity > 0 ) {
				manager.purchase('blue', size, price);
			}
    };
		
		this.updateQuantity = function(size) {
			if (this.bricks[size].quantity > 0) {
				this.bricks[size].quantity--;
			}
		}
  }]);
