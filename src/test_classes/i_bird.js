//==============================================================
// i_bird.js
// Purpose: 'IBird' interface (uses mixins)
// Project: Weekplan Generator
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;
const $interface       = mixin_interface.$interface;
const IAnimal          = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;

//==================== IBird interface class ====================
class IBird extends $interface(IAnimal) {
  // Fallback implementation of 'fly' service
  fly() {
    mixin_interface.raiseErrorIfServiceNotImplemented(IBird, this);
  } // IBird.fly
} // IBird class
$$.inherits(IBird, IAnimal);
exports.IBird = IBird;
