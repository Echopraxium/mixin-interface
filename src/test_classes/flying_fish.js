//==============================================================
// flying_fish.js
// Purpose: 'FlyingFish' implementation class which implements 4 interfaces:
//          - 'IBird' (child of 'IAnimal')
//          - 'IFish' (child of 'IAnimal')
//          as well as  (via its parent class 'Animal'):
//          - 'ILifeForm'
//          - 'IAnimal' (child of 'ILifeForm')
// Project: 'mixin-interface' module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot  = require('app-root-path');
const MxI      = require(appRoot + '/src/mixin_interface.js').MxI
const Animal   = require(appRoot + '/src/test_classes/animal.js').Animal;
const IAnimal  = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const IBird    = require(appRoot + '/src/test_classes/i_bird.js').IBird;
const IFish    = require(appRoot + '/src/test_classes/i_fish.js').IFish;

//==================== 'FlyingFish' implementation class ====================
class FlyingFish extends MxI.$Implementation(Animal).$with(IBird, IFish) {
  constructor() {
    super();
  } // 'FlyingFish' constructor

  fly() {
    console.log('--> FlyingFish.fly');
  } // IBird.fly

  swim() {
    console.log('--> FlyingFish.swim');
  } // IFish.swim

  __run() {
    console.log('--> FlyingFish.run');
  } // IAnimal.run

  __live() {
    console.log('--> FlyingFish.live');
  } // ILifeForm.live
} // 'FlyingFish' class
MxI.$setClass(FlyingFish).$asImplementationOf(IBird, IFish);
exports.FlyingFish = FlyingFish;
