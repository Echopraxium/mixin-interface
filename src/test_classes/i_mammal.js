//==============================================================
// i_mammal.js
// Purpose: IAnimal 'interface' (uses mixins)
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot         = require('app-root-path');
const $$              = require(appRoot + '/src/mixin_interface.js').$$;
const IAnimal         = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;

//==================== IMammal interface class ====================
class IMammal extends IAnimal {
  // required so that isInstanceOf(IAnimal, instance) returns true
  static extendsInterface(instance) {
    $$.extendsInterface(IAnimal, instance);
  } // IMammal.extendsInterface()

  // Fallback implementation of 'suckle' service
  suckle() {
    $$.checksIfServicesAreImplemented(IMammal, ['suckle'], this);
  } // IMammal.run
} // IMammal class
exports.IMammal = IMammal;
