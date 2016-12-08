//==============================================================
// i_lifeform.js
// Purpose: ILifeForm 'interface' (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;

//==================== ILifeForm interface class ====================
class ILifeForm {
  // Fallback implementation of 'live' service
  live() {
	MixinInterface.checksIfServicesAreImplemented(ILifeForm, ['live'], this);
  } // ILifeForm.live
} // ILifeForm class
exports.ILifeForm = ILifeForm;
