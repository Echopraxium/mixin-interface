//==============================================================
// implementation_base.js
// Purpose: Thing base class
// Project: Weekplan Generator
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const mixins       = require('es6-mixins');

var _InstanceCount = 0;

//==================== ImplementationBase class ====================
class ImplementationBase {
  constructor(args) {
    this._implemented_types    = {};
    if (typeof args === 'string')
      this._name = args;
    else {
      this._name = this.constructor.name + '_' + _InstanceCount++;
    }
  } // Thing constructor

  get name() {
    return this._name;
  } // 'name' getter

  set name(value) {
    if (value !== undefined)
      this._name = value;
  } // 'name' setter
} // ImplementationBase class
exports.ImplementationBase = ImplementationBase;
