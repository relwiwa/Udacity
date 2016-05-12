'use strict';

/**
 * @ngdoc function
 * @name serviceQuizApp.controller:LotsOBricksCtrl
 * @description
 * # LotsOBricksCtrl
 * Controller of the serviceQuizApp
 */
angular.module('serviceQuizApp')
  .controller('LotsOBricksCtrl', ['brickWarehouse', function (brickWarehouse) {
    this.name = 'Lots O Bricks';
    
		this.redBricks = brickWarehouse.getBricks('red');
		this.blueBricks = brickWarehouse.getBricks('blue');
		this.greenBricks = brickWarehouse.getBricks('green');
		
  }]);
