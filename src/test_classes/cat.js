//==============================================================
// flying_fish.js
// Purpose: 'FlyingFish' class
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
const IMammal          = require(appRoot + '/src/test_classes/i_mammal.js').IMammal;

//==================== Cat implementation class ====================
class Cat extends $implementation(Animal, IMammal) {
  constructor() {
    super();
  } // Cat constructor

  suckle() {
    console.log('--> Cat.suckle');
  } // IMammal.suckle

  __run() {
    console.log('--> Cat.run');
  } // IAnimal.run

  __live() {
    console.log('--> Cat.live');
  } // ILifeForm.live
} // Cat class
$$.implements(Cat, IMammal);
exports.Cat = Cat;
