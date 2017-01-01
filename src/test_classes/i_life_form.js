//==============================================================
// i_lifeform.js
// Purpose: 'ILifeForm' interface class (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot = require('app-root-path');
const MxI     = require(appRoot + '/src/mixin_interface.js').MxI;

//==================== ILifeForm interface class ====================
class ILifeForm {
  // Fallback implementation of 'live' service
  live() {
    MxI.$raiseNotImplementedError(ILifeForm, this);
  } // ILifeForm.live
} // ILifeForm class
exports.ILifeForm = ILifeForm;
