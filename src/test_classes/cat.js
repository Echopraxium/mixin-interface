//==============================================================
// flying_fish.js
// Purpose: 'FlyingFish' class
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot   = require('app-root-path');
const $$        = require(appRoot + '/src/mixin_interface.js').$$;
const Animal    = require(appRoot + '/src/test_classes/animal.js').Animal;
const IAnimal   = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const IMammal   = require(appRoot + '/src/test_classes/i_mammal.js').IMammal;

//==================== Cat implementation class ====================
// https://www.npmjs.com/package/es6-mixins
//class Cat extends ImplementationBase {
class Cat extends Animal {
  constructor(args) {
    super();
    $$.implementsInterfaces(Cat, [IMammal], this);
  } // Cat constructor

  suckle() {
    console.log('--> Cat.suckle');
  } // IMammal.suckle

  run() {
    console.log('--> Cat.run');
  } // IAnimal.run

  live() {
    console.log('--> Cat.live');
  } // ILifeForm.live
} // Cat class
exports.Cat = Cat;
