//==============================================================
// mixin_interface.js
// Purpose: Utility class for the implementation of interface classes in es6
// Project: mixin-interface module
//==============================================================
//'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const mixin     = require('mixin');
const caller_id = require('caller-id');

//---------- raiseErrorIfServiceNotImplemented ----------
var raiseErrorIfServiceNotImplemented = function(arg_interface, instance) {
  if (arg_interface === undefined ||  instance === undefined) {
    return;
  }

  var caller_data = caller_id.getData();
  var error_msg = "** MixinInterface Error ** " +
                  arg_interface.name + "." + caller_data.functionName + " not found on " + instance.name;
  throw new Error(error_msg);
}; // raiseErrorIfServiceNotImplemented
exports.raiseErrorIfServiceNotImplemented = raiseErrorIfServiceNotImplemented;

//================ $Object Base Implementation class ================
class $Object {
  constructor(...args) {
    //console.log('$Object constructor');
    this._$name = this.generateInstanceName();
  }

  generateInstanceName() {
    var class_name = this.constructor.name;
    //console.log("class_name: " + class_name);
    var count = 0;

    if ($Object._InstanceCount === undefined)
      $Object._InstanceCount = {};

    if ($Object._InstanceCount[class_name] === undefined)
      $Object._InstanceCount[class_name] = 0;
    else
      count = $Object._InstanceCount[class_name];

    $Object._InstanceCount[class_name] = count;

    var name = class_name + '_' + count;
    $Object._InstanceCount[class_name]++;
    return name;
  } // generateInstanceName

  get name() {
    if (this._$name === undefined)
      this._$name = this.generateInstanceName();
    return this._$name;
  } // 'name' getter
} // $Object
exports.$Object = $Object;
//================ $Object Base Implementation class


//---------- $implementation ----------
function $implementation(super_implementation_class, ...arg_implemented_interfaces) {
    class C {}
    class A {}
    class CA extends mixin(C, A) {}

    var super_type = super_implementation_class;
    if (super_implementation_class === undefined)
      super_type = $Object;

    var implemented_interfaces = Array.from(arg_implemented_interfaces);
    if (implemented_interfaces.length === 0)
      return super_type;

    var mixed = super_type;

    if (super_type._$implemented_interfaces === undefined)
        super_type._$implemented_interfaces = {};

    for (var i=0; i<implemented_interfaces.length; i++) {
      var implemented_interface = implemented_interfaces[i];
      //console.log("-- " + itf.name + " implemented on " + super_type.name);
      mixed = mixin(mixed, implemented_interface);
      super_type._$implemented_interfaces[implemented_interface] = true;
    } // for (var i=0; i<implemented_interfaces.length; i++)

    return mixed;
} // $implementation
exports.$implementation = $implementation;


//---------- $interface ----------
function $interface(arg_super_interface) {
    var mixed = mixin($Object, arg_super_interface);
    return mixed;
} // $interface
exports.$interface = $interface;

//---------- getClass ----------
function getClass(instance) {
    var type = Object.getPrototypeOf(instance);
    return type.constructor;
} // getClass

//---------- getSuperTypes ----------
function getSuperTypes(instance) {
    var super_types = [];
    var super_type = Object.getPrototypeOf(instance);
    var i = 0;
    while (super_type !== null       &&
           super_type !== undefined  &&
           super_type.constructor.name !== "$Object") {
      super_types.push(super_type);
      super_type = Object.getPrototypeOf(super_type);
      if (super_type !== null)
        console.log("getSuperTypes[" + i + "] = " + super_type.constructor.name);
      i++;
    }
    return super_types;
} // getSuperTypes

//==================== MixinInterface class ====================
class MixinInterface {
  //---------- $implements ----------
  static implements(type, ...arg_interfaces) {
    if (type === undefined)
      return;
    var interfaces = Array.from(arg_interfaces);
    type._$implemented_interfaces = interfaces;
  } // implements

  //---------- inherits ----------
  static inherits(interface_class, super_interface) {
    if (interface_class === undefined || super_interface === undefined)
      return;
    interface_class._$super_interface = super_interface;
  } // inherits

  //---------- isInstanceOf ----------
  static isInstanceOf(type, instance) {
    //console.log("---- isInstanceOf " + type.name + " " + instance instanceof type);
    if (instance instanceof type)
	  // Check if instance 'isinstanceof' an implementation class
      return true;
    else {
	  // Check if instance 'isinstanceof' an interface class
      var instance_type = getClass(instance);
      //console.log("---->> instance_type: " + instance_type.name);
	  var implemented_interface;
      if (instance_type._$implemented_interfaces !== undefined) {
		// Check if interface class is in _$implemented_interfaces	
		for (var i=0; i<instance_type._$implemented_interfaces.length; i++) {
		  implemented_interface = instance_type._$implemented_interfaces[i];
		  if (implemented_interface === type)
			 return true;
		  else {
			var super_interface = implemented_interface._$super_interface;
			while (super_interface != undefined) {
				//console.log(">>---- super_interface of " + type.name + " = " + super_interface.name);
		        if (super_interface === type)
			      return true;
				super_interface = super_interface._$super_interface;
		    } // while (super_interface != undefined)
		  } // if (implemented_interface === type)
		} // for (var i=0; i<instance_type._$implemented_interfaces.length; i++)
      } // if (instance_type._$implemented_interfaces !== undefined)
    } // if (instance instanceof type)

    return false;
  } // isInstanceOf()
} // MixinInterface class
exports.MixinInterface = MixinInterface;

//const $$ = MixinInterface;
exports.$$ = MixinInterface; //$$;
