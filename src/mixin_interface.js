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

function getProperties(o) {
    var results = []; 
    function properties(obj) {
        var props, i;
        if (obj == null) {
            return results;
        }   
        if (typeof obj !== 'object' && typeof obj !== 'function') {
            return properties(obj.constructor.prototype);
        }   
        props = Object.getOwnPropertyNames(obj);
        i = props.length;
        while (i--) {
            if (!~results.indexOf(props[i])) {
                results.push(props[i]);
            }   
        }   
        return properties(Object.getPrototypeOf(obj));
    }   
    return properties(o);
}

function _getStaticMethods(type) {
    var static_methods = Object.getOwnPropertyNames(type)
                           .filter(prop => typeof type[prop] === "function");
    return static_methods;
} // _getStaticMethods

//==================== MixinInterface class ====================
class MixinInterface {
  // https://www.npmjs.com/package/es6-mixins
  
  //---------- implementsInterfaces ----------
  static implementsInterfaces(implementation_class, implemented_types, instance) {
	if (instance._implemented_types === undefined) 
		instance._implemented_types = {};
	
    instance._implementation_class = implementation_class;
	
    mixins(implemented_types, instance, {"warn": false, "mergeDuplicates": true});
	
    for (var i=0; i<implemented_types.length; i++) {
      var k = implemented_types[i];
      instance._implemented_types[k] = true;
      //console.log("implements k: " + k.name);
      var static_methods = _getStaticMethods(k);
      if (static_methods !== undefined && Array.isArray(static_methods)) {
        if (static_methods.length > 0) {
          var static_method_name = static_methods[0];
          k[static_method_name](instance);
        }
      }
    }
  } // MixinInterface.implementsInterfaces()

  //---------- isInstanceOf ----------
  static isInstanceOf(type, instance) {
    if (instance instanceof type)
      return true;
    else if (instance._supertype == type)
      return true;
    else if (instance._implemented_types !== undefined)
	  if (instance._implemented_types[type] !== undefined)
        return true;

    return false;
  } // MixinInterface.isInstanceOf()

  //---------- extendsInterface ----------
  static extendsInterface(type, instance) {
    mixins(type, instance, {"warn": false, "mergeDuplicates": false});
    if (instance._implemented_types === undefined) 
		instance._implemented_types = {};
	
    instance._implemented_types[type] = true;
    //console.log("Thing.extendsInterface type: " + type.name);
    if (type.extendsInterface !== undefined)
      type.extendsInterface(instance);
  } // MixinInterface.extendsInterface()
  
  //---------- checksIfServicesAreImplemented ----------
  static checksIfServicesAreImplemented(type, services, instance) {
	if (type === undefined || instance === undefined || !Array.isArray(services) )
	  return;
  
    var obj_prototype        = Object.getPrototypeOf(instance);	
    var implementation_class = instance._implementation_class;
	
	for (var i=0; i<services.length; i++) {
	  //console.log("checking '" + services[i]  + "' on " + implementation_class.name);
	  var has_service = instance.hasOwnProperty(services[i]);
	
      if (! has_service) {
        var error_msg = "** MixinInterface Error ** " + 
		                type.name + "." + services[i] + " not found on " + instance.name;
        throw new Error(error_msg);
      }
	}
  } // MixinInterface.checksIfServicesAreImplemented()
  
  static generateInstanceName(instance) {
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
  } // MixinInterface.generateInstanceName
} // MixinInterface class
exports.MixinInterface = MixinInterface;
