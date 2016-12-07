//==============================================================
// i_lifeform.js
// Purpose: ILifeForm 'interface' (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/

//==================== ILifeForm interface class ====================
class ILifeForm {
  live() {
    if (! this.hasOwnProperty('live')) {
      var error_msg = "ILifeForm.live not found on " + this.name;
      throw new Error(error_msg);
    }
  } // ILifeForm.live
} // ILifeForm class
exports.ILifeForm = ILifeForm;
