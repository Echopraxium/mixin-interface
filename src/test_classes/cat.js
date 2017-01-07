//==============================================================
// cat.js
// Purpose: 'Cat' implementation class
// Project: 'mixin-interface' module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot = require('app-root-path');
const MxI     = require(appRoot + '/src/mixin_interface.js').MxI;
const Animal  = require(appRoot + '/src/test_classes/animal.js').Animal;
const IMammal = require(appRoot + '/src/test_classes/i_mammal.js').IMammal;

//==================== 'Cat' implementation class ====================
class Cat extends MxI.$Implementation(Animal).$with(IMammal) {
  constructor() {
    super();
  } // 'Cat' constructor

  suckle() {
    console.log('--> Cat.suckle');
  } // IMammal.suckle

  __run() {
    console.log('--> Cat.run');
  } // IAnimal.run

  __live() {
    console.log('--> Cat.live');
  } // ILifeForm.live
} // 'Cat' class
MxI.$setClass(Cat).$asImplementationOf(IMammal);
exports.Cat = Cat;
