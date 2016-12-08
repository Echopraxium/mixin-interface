//==============================================================
// animal.js
// Purpose: Thing base class
// Project: Weekplan Generator
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== Animal implementation class ====================
class Animal {
  constructor() {
    this._name = MixinInterface.generateInstanceName(this);
    MixinInterface.implementsInterfaces(Animal, [IAnimal, ILifeForm], this);
  } // Thing constructor

  get name() {
    return this._name;
  } // 'name' getter

  run() {
    console.log("Animal.run");
  } // IAnimal.run()

  live() {
    console.log("Animal.live");
  } // ILifeForm.live()
} // ImplementationBase class
exports.Animal = Animal;
