//==============================================================
// mixin_interface.js
// Purpose: implementation of interface classes in es6
// Project: mixin-interface module
//==============================================================
//'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const mixin     = require('mixin');
const caller_id = require('caller-id');

//================ $Object: Base Implementation class ================
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
//================ $Object: Base Implementation class


//================================ $MxI$ Namespace ================================
var MxI = 
  (function(){
	return {
		//--------------------- $Object ---------------------
		'$Object': $Object,

		//-------------------- implements --------------------
		'$implements': function(arg_type, ...arg_interfaces) {
            if (arg_type === undefined)
              return;
            var interfaces = Array.from(arg_interfaces);
            arg_type._$implemented_interfaces = interfaces;
        }, // $implements
		
		//---------- inherits ----------
        '$inherits': function(arg_interface, arg_parent_interface) {
            if (arg_interface === undefined || arg_parent_interface === undefined)
              return;
            arg_interface._$parent_interface = arg_parent_interface;
        }, // $inherits
		
		//------------------ $SuperInterface ------------------
		'$SuperInterface': function(arg_super_interface) {
            var mixed = mixin($Object, arg_super_interface);
            return mixed;
        }, // $SuperInterface
		
	    //---------------- $SuperImplementation ----------------
		'$SuperImplementation': function(arg_parent_implementation) {
		    return new $MixinInterface(arg_parent_implementation);
        }, // $SuperImplementation
		
		//------------------- $isInstanceOf -------------------
        '$isInstanceOf': function(type, instance) {
            //console.log("---- isInstanceOf " + type.name + " ? instance: " + instance);
			var instance_type = getClass(instance);
			
            if ( instance instanceof type) 
	            // Check if instance 'isinstanceof' an implementation class
                return true;
            else {
	            // Check if instance 'isinstanceof' an interface class
                //console.log("---->> instance_type: " + instance_type.name);
	            var implemented_interface;
                if (instance_type._$implemented_interfaces !== undefined) {
		            // Check if interface class is in _$implemented_interfaces
		            for (var i=0; i<instance_type._$implemented_interfaces.length; i++) {
		                implemented_interface = instance_type._$implemented_interfaces[i];
		                if (implemented_interface === type)
			              return true;
		                else {
			                var parent_interface = implemented_interface._$parent_interface;
			                while (parent_interface !== undefined) {
				                //console.log(">>---- parent_interface of " + type.name + " = " + parent_interface.name);
		                        if (parent_interface === type)
			                        return true;
				                parent_interface = parent_interface._$parent_interface;
		                    } // while (parent_interface != undefined)
		                } // if (implemented_interface === type)
		            } // for (var i=0; i<instance_type._$implemented_interfaces.length; i++)
                } // if (instance_type._$implemented_interfaces !== undefined)
            } // if (instance instanceof type)

            return false;
        }, // $isInstanceOf()
  
        //---------- $raiseNotImplementedError ---------
        '$raiseNotImplementedError': function(arg_interface, instance) {
			if (arg_interface === undefined ||  instance === undefined) {
              return;
            }

            var caller_data = caller_id.getData();
            var error_msg   = "** mixin-interface Error ** " + arg_interface.name + "." +
                              caller_data.functionName + " not found on " + instance.name;
							  
            throw new Error(error_msg);
        } // $raiseNotImplementedError
    };
}()); // MxI
exports.MxI= MxI;


//---------- getClass ----------
function getClass(instance) {
	if (instance === null || instance === undefined)
	    return undefined;
	
    var type = Object.getPrototypeOf(instance);
    return type.constructor;
} // getClass


//==================== MixinInterface class ====================
class $MixinInterface {
	constructor(parent_implementation) {
	    this._$parent_implementation = parent_implementation;
    } // $MixinInterface constructor
	
	$with(...arg_implemented_interfaces) {
		//class C {}
        //class A {}
        //class CA extends mixin(C, A) {}

        var implemented_interfaces = Array.from(arg_implemented_interfaces);
        if (implemented_interfaces.length === 0)
            return this._$parent_implementation;

        var mixed = this._$parent_implementation;

        if (this._$parent_implementation._$implemented_interfaces === undefined)
            this._$parent_implementation._$implemented_interfaces = {};

        for (var i=0; i<implemented_interfaces.length; i++) {
            var implemented_interface = implemented_interfaces[i];
            //console.log("-- " + itf.name + " implemented on " + super_type.name);
            mixed = mixin(mixed, implemented_interface);
            this._$parent_implementation._$implemented_interfaces[implemented_interface] = true;
        } // for (var i=0; i<implemented_interfaces.length; i++)

        return mixed;
	} // $MixinInterface.$with
} // $MixinInterface class
