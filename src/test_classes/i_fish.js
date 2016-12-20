//==============================================================
// i_fish.js
// Purpose: 'IFish' interface (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot = require('app-root-path');
const $$      = require(appRoot + '/src/mixin_interface.js').$$;
const IAnimal = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;

//==================== IFish interface class ====================
class IFish extends IAnimal {
  // required so that isInstanceOf(IAnimal, instance) returns true
  static extendsInterface(instance) {
    $$.extendsInterface(IAnimal, instance);
  } // IBird.extendsInterface()

  // Fallback implementation of 'swim' service
  swim() {
	$$.checksIfServicesAreImplemented(IFish, ['swim'], this);
  } // IFish.swim()
} // IFish class
exports.IFish = IFish;
