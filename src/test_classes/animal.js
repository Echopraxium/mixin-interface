//==============================================================
// animal.js
// Purpose: 'Animal' implementation class
//          child of 'ILifeForm' interface
// Project: 'mixin-interface' module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot   = require('app-root-path');
const MxI       = require(appRoot + '/src/mixin_interface.js').MxI;
const IAnimal   = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== 'Animal' implementation class ====================
class Animal extends MxI.$Implementation(MxI.$Object).$with(IAnimal) {
  constructor() {
    super();
  } // 'Animal' constructor

  run() {
    console.log("--> Animal.run");
  } // IAnimal.run()

  live() {
    console.log("--> Animal.live");
  } // ILifeForm.live()
} // 'Animal' class
MxI.$setClass(Animal).$asImplementationOf(ILifeForm, IAnimal);
exports.Animal = Animal;
