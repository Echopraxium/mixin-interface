//==============================================================
// animal.js
// Purpose: Thing base class
// Project: Weekplan Generator
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;
const $implementation  = mixin_interface.$implementation;
const $Object          = mixin_interface.$Object;
const IAnimal          = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm        = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== Animal implementation class ====================
class Animal extends $implementation($Object, IAnimal) {
  constructor() {
    super();
  } // Animal constructor

  run() {
    console.log("--> Animal.run");
  } // IAnimal.run()

  live() {
    console.log("--> Animal.live");
  } // ILifeForm.live()
} // Animal class
$$.implements(Animal, ILifeForm, IAnimal);
exports.Animal = Animal;
