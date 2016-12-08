//==============================================================
// i_animal.js
// Purpose: IAnimal 'interface' (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== IAnimal interface class ====================
class IAnimal extends ILifeForm {
  // required so that isInstanceOf(ILifeForm, instance) returns true
  static extendsInterface(instance) {
    MixinInterface.extendsInterface(ILifeForm, instance);
  } // IAnimal.extendsInterface()

  // Fallback implementation of 'run' service
  run() {
	MixinInterface.checksIfServicesAreImplemented(IAnimal, ['run'], this);
  } // IAnimal.run
} // IAnimal class
exports.IAnimal = IAnimal;
