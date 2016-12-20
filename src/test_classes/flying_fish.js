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
const appRoot         = require('app-root-path');
const $$              = require(appRoot + '/src/mixin_interface.js').$$;
const Animal          = require(appRoot + '/src/test_classes/animal.js').Animal;
const IBird           = require(appRoot + '/src/test_classes/i_bird.js').IBird;
const IFish           = require(appRoot + '/src/test_classes/i_fish.js').IFish;

//==================== FlyingFish implementation class ====================
class FlyingFish extends Animal {
  constructor() {
    super();
    $$.implementsInterfaces(FlyingFish, [IBird, IFish], this);
  } // FlyingFish constructor

  fly() {
    console.log('--> FlyingFish.fly');
  } // IBird.fly

  swim() {
    console.log('--> FlyingFish.swim');
  } // IFish.swim

  run() {
    console.log('--> FlyingFish.run');
  } // IAnimal.run

  live() {
    console.log('--> FlyingFish.live');
  } // ILifeForm.live
} // FlyingFish class
exports.FlyingFish = FlyingFish;
