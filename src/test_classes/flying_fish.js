//==============================================================
// flying_fish.js
// Purpose: 'FlyingFish' implementation class
//          implements IBird (child of IAnimal)
//          and        IFish interfaces (child of IAnimal)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;
const $implementation  = mixin_interface.$implementation;
const Animal           = require(appRoot + '/src/test_classes/animal.js').Animal;
const IAnimal          = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const IBird            = require(appRoot + '/src/test_classes/i_bird.js').IBird;
const IFish            = require(appRoot + '/src/test_classes/i_fish.js').IFish;

//==================== FlyingFish implementation class ====================
class FlyingFish extends $implementation(Animal, IBird, IFish) {
  constructor() {
    super();
  } // FlyingFish constructor

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
} // FlyingFish class
$$.implements(FlyingFish, IBird, IFish);
exports.FlyingFish = FlyingFish;
