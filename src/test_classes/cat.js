//==============================================================
// flying_fish.js
// Purpose: 'FlyingFish' class
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot        = require('app-root-path');
const Animal         = require(appRoot + '/src/test_classes/animal.js').Animal;
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const IMammal        = require(appRoot + '/src/test_classes/i_mammal.js').IMammal;

//==================== Cat implementation class ====================
// https://www.npmjs.com/package/es6-mixins
//class Cat extends ImplementationBase {
class Cat extends Animal {
  constructor(args) {
    super();
    MixinInterface.implements([IMammal], this);
  } // Cat constructor

  live() {
    console.log('Cat.live');
  } // ILifeForm.live

  run() {
    console.log('Cat.run');
  } // IAnimal.run

  suckle() {
    console.log('Cat.suckle');
  } // IMammal.suckle
} // Cat class
exports.Cat = Cat;
