//==============================================================
// mixin_interface.js
// Purpose: Utility class for the implementation of interface classes in es6
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const mixins       = require('es6-mixins');
var _InstanceCount = {};

//==================== MixinInterface class ====================
class MixinInterface {
  static getStaticMethods(type) {
    var static_methods = Object.getOwnPropertyNames(type)
                           .filter(prop => typeof type[prop] === "function");
    return static_methods;
  } // MixinInterface.getStaticMethods

  // https://www.npmjs.com/package/es6-mixins
  static implements(implemented_types, instance) {
    mixins(implemented_types, instance, {"warn": false, "mergeDuplicates": true});
    for (var i=0; i<implemented_types.length; i++) {
      var k = implemented_types[i];
      instance._implemented_types[k] = true;
      //console.log("implements k: " + k.name);
      var static_methods = MixinInterface.getStaticMethods(k);
      if (static_methods !== undefined && Array.isArray(static_methods)) {
        if (static_methods.length > 0) {
          var static_method_name = static_methods[0];
          k[static_method_name](instance);
        }
      }
    }
  } // MixinInterface.implements()

  static isInstanceOf(type, instance) {
    if (instance instanceof type)
      return true;
    else if (instance._implemented_types[type] !== undefined)
      return true;
    else if (instance._supertype == type)
      return true;

    return false;
  } // MixinInterface.isInstanceOf()

  static extendsInterface(type, instance) {
    mixins(type, instance, {"warn": false, "mergeDuplicates": true});
    instance._implemented_types[type] = true;
    //console.log("Thing.extendsInterface type: " + type.name);
    if (type.extendsInterface !== undefined)
      type.extendsInterface(instance);
  } // MixinInterface.extendsInterface()

  static getInstanceName(instance) {
    var class_name = instance.constructor.name;
    //console.log("class_name: " + class_name);
    var count = 0;
    if (_InstanceCount[class_name] === undefined)
      _InstanceCount[class_name] = 0;
    else
      count = _InstanceCount[class_name];

    _InstanceCount[class_name] = count;

    var name = class_name + '_' + count;
    _InstanceCount[class_name]++;
    return name;
  } // MixinInterface.getInstanceName
} // MixinInterface class
exports.MixinInterface = MixinInterface;
