//==============================================================
// animal.js
// Purpose: Thing base class
// Project: Weekplan Generator
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const mixins         = require('es6-mixins');
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== Animal implementation class ====================
class Animal {
  constructor() {
    this._implemented_types = {};
    this._name = MixinInterface.getInstanceName(this);
    MixinInterface.implements([IAnimal, ILifeForm], this);
  } // Thing constructor

  get name() {
    return this._name;
  } // 'name' getter

  set name(value) {
    if (value !== undefined)
      this._name = value;
  } // 'name' setter

  run(msg) {
    console.log("Animal.run");
  } // IAnimal.run()

  live() {
    console.log("Animal.live");
  } // ILifeForm.live()
} // ImplementationBase class
exports.Animal = Animal;
