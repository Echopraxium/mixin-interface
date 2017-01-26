//==============================================================
// mixin_interface.js
// Purpose:  implementation of interface classes in es6
//           https://www.npmjs.com/package/mixin-interface
// Project: 'mixin-interface' module
//==============================================================
//'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const mixin       = require('mixin');
const caller_id   = require('caller-id');
const change_case = require('change-case');

const SERVICE_NOT_IMPLEMENTED_ERROR_ID     = 100;
const SUPER_INTERFACE_NOT_DEFINED_ERROR_ID = 101;

//==================== '$IBaseInterface' interface class ====================
class $IBaseInterface {
} // '$IBaseInterface' class
$IBaseInterface._$is_interface = true;
exports.$IBaseInterface = $IBaseInterface;


//================ '$Object' Base Implementation class ================
class $Object {
  constructor(...args) {
    this._$name = this.generateInstanceName();
	this._$args = args;
  } // '$Object' constructor

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

	var preformatted_class_name = class_name.replace('.', '_').replace('$', 'mxi');
	var snake_case_class_name   = change_case.snakeCase(preformatted_class_name);
	var name = snake_case_class_name + '_' + count;
	
    $Object._InstanceCount[class_name]++;
    return name;
  } // generateInstanceName

  get name() {
    if (this._$name === undefined)
      this._$name = this.generateInstanceName();
    return this._$name;
  } // 'name' getter
} // $Object
$Object._$is_interface = false;
exports.$Object = $Object;
//================ '$Object' Base Implementation class


//================================ 'MxI' Namespace ================================
var MxI = 
    //(function(){
	//return {
	{
		//--------------------- $Object ---------------------
		'$Object': $Object,
		
		//----------------- $IBaseInterface -----------------
		'$IBaseInterface': $IBaseInterface,
		
		//-------------------- $setClass --------------------
		'$setClass': function(arg_type) {
			if (arg_type === undefined)
              return;
            return new $MixinImplementation(arg_type);
        }, // $setClass
		
		//------------------ $setAsInterface ------------------
		'$setAsInterface': function(arg_type) {
			if (arg_type === undefined)
              return;
		    arg_type._$is_interface     = true;
			arg_type._$super_interface = $IBaseInterface;
            return new $MixinSetInterface(arg_type);
        }, // $setAsInterface
		
	    //------------------ $Interface ------------------
		'$Interface': function(arg_super_type) {
            var mixed = mixin($Object, arg_super_type);
            return mixed;
        }, // $Interface
		
	    //---------------- $Implementation ----------------
		'$Implementation': function(arg_super_implementation) {
		    return new $MixinInterface(arg_super_implementation);
        }, // $Implementation
		
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
						//console.log(">> implemented_interface  " + implemented_interface.name);
		                if (implemented_interface === type)
			                return true;
		                else {
			                var parent_interface = implemented_interface._$super_interface;
							//console.log(">>---- parent_interface of " + type.name + " = " + parent_interface.name);
			                while (parent_interface !== undefined) {
				                //console.log(">>---- parent_interface of " + type.name + " = " + parent_interface.name);
		                        if (parent_interface === type)
			                        return true;
				                parent_interface = parent_interface._$super_interface;
								//console.log(">> parent_interface  " + parent_interface.name);
		                    } // while (parent_interface != undefined)
		                } // if (implemented_interface === type)
		            } // for (var i=0; i<instance_type._$implemented_interfaces.length; i++)
                } // if (instance_type._$implemented_interfaces !== undefined)
            } // if (instance instanceof type)

            return false;
        }, // $isInstanceOf()
		
		//---------- $isInterface ----------
        '$isInterface': function(arg_type) {
			if (   arg_type                === undefined
			    || arg_type._$is_interface === undefined) {
				return false;
			}

		    if (arg_type._$is_interface === true)
		        return true;
			else {
				return false;
			}
		    return false;
        }, // $isInterface
  
        //---------- $raiseNotImplementedError ---------
        '$raiseNotImplementedError': function(arg_interface, instance) {
			if (arg_interface === undefined ||  instance === undefined) {
              return;
            }
			
            var caller_data = caller_id.getData();
            var error_msg   = "** mixin-interface Error " + SERVICE_NOT_IMPLEMENTED_ERROR_ID + " ** " + 
			                  arg_interface.name + "." + caller_data.functionName +
							  " not found on " + instance.name;
							  
            throw new Error(error_msg);
        } // $raiseNotImplementedError
    };
	//};
//}()); // MxI
exports.MxI= MxI;


//---------- getClass ----------
function getClass(instance) {
	if (instance === null || instance === undefined)
	    return undefined;
	
    var type = Object.getPrototypeOf(instance);
    return type.constructor;
} // getClass


//==================== '$MixinInterface' class ====================
class $MixinInterface {
	constructor(arg_type) {
	    this._$super_implementation = arg_type;
    } // $MixinInterface constructor
	
	$with(...arg_interfaces) {
        var implemented_interfaces = Array.from(arg_interfaces);
        if (implemented_interfaces.length === 0)
            return this._$super_implementation;

        var mixed = this._$super_implementation;

        if (this._$super_implementation._$implemented_interfaces === undefined)
            this._$super_implementation._$implemented_interfaces = {};

        for (var i=0; i<implemented_interfaces.length; i++) {
            var implemented_interface = implemented_interfaces[i];
            //console.log("-- " + itf.name + " implemented on " + super_type.name);
            mixed = mixin(mixed, implemented_interface);
            this._$super_implementation._$implemented_interfaces[implemented_interface] = true;
        } // for (var i=0; i<implemented_interfaces.length; i++)

        return mixed;
	} // $MixinInterface.$with
} // '$MixinInterface' class


//==================== '$MixinSetInterface' class ====================
class $MixinSetInterface {
	constructor(arg_type) {
	    this._$arg_type = arg_type;
    } // $MixinSetInterface constructor
	
	$asChildOf(arg_super_type) {
		var arg_type = this._$arg_type;  
		if (arg_type === undefined || arg_super_type === undefined) {
			return;
		} 
		arg_type._$is_interface    = true;
        arg_type._$super_interface = arg_super_type;
	} // $MixinSetInterface.$asChildOf
} // '$MixinSetInterface' class


//==================== '$MixinImplementation' class ====================
class $MixinImplementation {
	constructor(arg_type) {
	    this._$arg_type = arg_type;
    } // $MixinInterface constructor
	
	$asImplementationOf(...arg_interfaces) {
		var arg_type = this._$arg_type;
        if (arg_type === undefined)
            return;
		
        var interfaces                    = Array.from(arg_interfaces);
        arg_type._$implemented_interfaces = interfaces;
	    arg_type._$is_interface           = false;
	} // $MixinImplementation.$asImplementationOf
} // '$MixinImplementation' class
