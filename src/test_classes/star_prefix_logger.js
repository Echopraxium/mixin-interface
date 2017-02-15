//==============================================================
// star_prefix_logger.js
// Purpose: '$StarPrefixLogger' implementation class
//          implements 'MxI.$ILogger' interface
// Project: 'mixin-interface' npm package
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const MxI = require('../mixin_interface.js').MxI;

//============ '$StarPrefixLogger' implementation class ============
class $StarPrefixLogger extends MxI.$Implementation(MxI.$Object).$with(MxI.$ILogger) {
  static getSingleton() {
	    if ($StarPrefixLogger._$singleton === undefined) {
		    //console.log(" >>> First time (and Only normally) in getSingleton");
		    $StarPrefixLogger._$singleton = new $StarPrefixLogger();
	    }
	    return $StarPrefixLogger._$singleton;
  } // $StarPrefixLogger.getSingleton
  
  log(arg_msg, ...arg_values) {
	    var   msg    = "";
		const prefix = "* ";
	    if (arg_msg === undefined || arg_msg === null) 
		  msg = "";		  
	    else
		  msg = arg_msg;
	
	    if (arg_values !== undefined && arg_values !== null) {
	      if (arg_values.length > 0) {
			console.log(prefix + msg, ...arg_values);
		    return;
	      }
        }
	    console.log(prefix + msg);
  } // $StarPrefixLogger.log
} // '$StarPrefixLogger' class
$StarPrefixLogger._$singleton;
MxI.$setClass($StarPrefixLogger).$asImplementationOf(MxI.$ILogger);
exports.$StarPrefixLogger = $StarPrefixLogger;