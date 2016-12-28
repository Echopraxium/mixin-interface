//==============================================================
// i_animal.js
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
const ILifeForm        = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== IAnimal interface class ====================
class IAnimal extends $interface(ILifeForm)  {
  // Fallback implementation of 'run' service
  run() {
    console.log("--> IAnimal.run");
    mixin_interface.raiseErrorIfServiceNotImplemented(IAnimal, this);
  } // IAnimal.run
} // IAnimal class
$$.inherits(IAnimal, ILifeForm);
exports.IAnimal = IAnimal;
