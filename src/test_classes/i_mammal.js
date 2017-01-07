//==============================================================
// i_mammal.js
// Purpose: 'IMammal' interface class (uses mixins)
//          child of 'IAnimal' interface
// Project: 'mixin-interface' module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot = require('app-root-path');
const MxI     = require(appRoot + '/src/mixin_interface.js').MxI;
const IAnimal = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;

//==================== 'IMammal' interface class ====================
class IMammal extends MxI.$Interface(IAnimal) {
  // Fallback implementation of 'suckle' service
  suckle() {
    MxI.$raiseNotImplementedError(IMammal, this);
  } // IMammal.run
} // 'IMammal' class
MxI.$setAsInterface(IMammal).$asChildOf(IAnimal);
exports.IMammal = IMammal;
