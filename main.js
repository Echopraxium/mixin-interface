//==============================================================
// main.js
// Purpose: Purposefully empty script for 'main' entry in package.json.
//          This is a Bug Fix: when 'main' was set to 'test.js' there
//          was an unwanted side-effect with a client code like this: 
//            const mixin_interface = require('mixin-interface');
//          With such code, there was an unwanted side effect: importing and run of 'test.js'
// Project: 'mixin-interface' npm package
//          https://www.npmjs.com/package/mixin-interface
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
exports.dummy_mixin_interface_main = function(){};