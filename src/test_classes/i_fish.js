//==============================================================
// i_fish.js
// Purpose: 'IFish' interface (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;
const $interface       = mixin_interface.$interface;
const IAnimal          = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;

//==================== IFish interface class ====================
class IFish extends $interface(IAnimal) {
  // Fallback implementation of 'swim' service
  swim() {
    mixin_interface.raiseErrorIfServiceNotImplemented(IFish, this);
  } // IFish.swim()
} // IFish class
$$.inherits(IFish, IAnimal);
exports.IFish = IFish;
