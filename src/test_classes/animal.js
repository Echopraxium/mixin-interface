//==============================================================
// animal.js
// Purpose: 'Animal' implementation class
//          implements of 'IAnimal' interface
// Project: 'mixin-interface' package
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const MxI        = require('../mixin_interface.js').MxI;
const IAnimal    = require('./i_animal.js').IAnimal;
const ILifeForm  = require('./i_life_form.js').ILifeForm;

//==================== 'Animal' implementation class ====================
class Animal extends MxI.$Implementation(MxI.$Object).$with(IAnimal) {
  constructor() {
    super();
  } // 'Animal' constructor

  run() {
    MxI.$System.log("--> Animal.run");
  } // IAnimal.run()

  live() {
    MxI.$System.log("--> Animal.live");
  } // ILifeForm.live()
} // 'Animal' class
MxI.$setClass(Animal).$asImplementationOf(IAnimal, ILifeForm);
exports.Animal = Animal;