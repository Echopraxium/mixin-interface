//==============================================================
// i_fish.js
// Purpose: 'IFish' interface class (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot = require('app-root-path');
const MxI     = require(appRoot + '/src/mixin_interface.js').MxI;
const IAnimal = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;

//==================== IFish interface class ====================
class IFish extends MxI.$SuperInterface(IAnimal) {
  // Fallback implementation of 'swim' service
  swim() {
    MxI.$raiseNotImplementedError(IFish, this);
  } // IFish.swim()
} // IFish class
MxI.$inherits(IFish, IAnimal);
exports.IFish = IFish;
