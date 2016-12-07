//==============================================================
// i_bird.js
// Purpose: 'IBird' interface (uses mixins)
// Project: Weekplan Generator
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;

//==================== IBird interface class ====================
class IBird extends IAnimal {
  // required so that isInstanceOf(IAnimal, instance) returns true
  static extendsInterface(instance) {
    MixinInterface.extendsInterface(IAnimal, instance);
  } // IBird.extendsInterface()

  fly() {
    if (! this.hasOwnProperty('swim')) {
      var error_msg = "IFish.swim not found on " + this.name;
      throw new Error(error_msg);
    }
  } // IBird.fly

  run() {
    if (! this.hasOwnProperty('run')) {
      var error_msg = "IAnimal.run not found on " + this.name;
      throw new Error(error_msg);
    }
  } // IAnimal.run
} // IBird class
exports.IBird = IBird;
