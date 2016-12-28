//==============================================================
// i_lifeform.js
// Purpose: ILifeForm 'interface' (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;

//==================== ILifeForm interface class ====================
class ILifeForm {
  // Fallback implementation of 'live' service
  live() {
    mixin_interface.raiseErrorIfServiceNotImplemented(ILifeForm, this);
  } // ILifeForm.live
} // ILifeForm class
exports.ILifeForm = ILifeForm;
