//==============================================================
// mixin_interface.js
// Purpose:  implementation of interface classes in es6
//           https://www.npmjs.com/package/mixin-interface
// Project: 'mixin-interface' npm package
//==============================================================
//'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const MxI = require('mixin-interface-api/src/mixin_interface_api.js').MxI;

//================================================================================
//=================================  '$System'  ==================================
//================================================================================
class $System {
    static setLogger( arg_logger ) {
	    if (arg_logger === undefined) {
		    return;
	    }
		else if (! MxI.$isInstanceOf(MxI.$ILogger, arg_logger)) {
			$System.getLogger().log("*** Error *** in '$System.setLogger()': '%s' is an invalid Logger object", arg_logger.name);
		    return;
	    }
		
		$System.resetLogger();
	    $Log.addSink(arg_logger);  
    } // $System.setLogger
  
    static getLogger() {
      if ( $System._$logger === undefined ) {
		  $System._$logger = $DefaultLogger.getSingleton();
		  if ($Log.getSinkCount() == 0)
			$Log.addSink($System._$logger);
	  }
	  return $System._$logger;  
    } // $System.getLogger()
  
    static resetLogger() {
      $Log.clearSinks();
    } // $System.resetLogger()
  
    static log( arg_msg, ...arg_values ) {
		if ($Log.getSinkCount() == 0)
			$Log.addSink($System.getLogger());
	    $Log.write(arg_msg, ...arg_values);
    } // $System.log()
  
    static banner(arg_msg, arg_single_line_banner, arg_separator_char, arg_separator_length) {
	  if ($Log.getSinkCount() == 0)
		  $Log.addSink($System.getLogger());
      $Log.banner(arg_msg, arg_single_line_banner, arg_separator_char, arg_separator_length);		
  } // $System.banner()
} // '$System' class
$System._$logger;


//================================================================================
//========================= Extension of 'MxI' Namespace =========================
//================================================================================
MxI.$System        = $System;
exports.MxI = MxI;
