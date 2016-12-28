//==============================================================
// i_mammal.js
// Purpose: IAnimal 'interface' (uses mixins)
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

//==================== IMammal interface class ====================
class IMammal extends $interface(IAnimal) {
  // Fallback implementation of 'suckle' service
  suckle() {
    mixin_interface.raiseErrorIfServiceNotImplemented(IMammal, this);
  } // IMammal.run
} // IMammal class
$$.inherits(IMammal, IAnimal);
exports.IMammal = IMammal;
