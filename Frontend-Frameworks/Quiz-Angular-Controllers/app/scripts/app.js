'use strict';

/**
 * @ngdoc overview
 * @name controllerQuizApp
 * @description
 * # controllerQuizApp
 *
 * Main module of the application.
 */
angular
  .module('controllerQuizApp', [])
	.controller('BrickCtrl', function() {
		this.color = 'Green';
		this.size = '2 x 6';
		this.price = 0.03;
		this.quantity = 697;
	});
