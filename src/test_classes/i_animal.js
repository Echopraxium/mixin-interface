//==============================================================
// i_animal.js
// Purpose: 'IAnimal' interface class (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot   = require('app-root-path');
const MxI       = require(appRoot + '/src/mixin_interface.js').MxI;
const ILifeForm = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== IAnimal interface class ====================
class IAnimal extends MxI.$SuperInterface(ILifeForm)  {
  // Fallback implementation of 'run' service
  run() {
    console.log("--> IAnimal.run");
    MxI.$raiseNotImplementedError(IAnimal, this);
  } // IAnimal.run
} // IAnimal class
MxI.$inherits(IAnimal, ILifeForm);
exports.IAnimal = IAnimal;
