## mixin-interface

An es6 implementation of interface classes with support of type checking and interface inheritance.

#### Installation and Usage:

```bash
npm install mixin-interface -S
```

Import mixin-interface into your project:

```javascript
const MixinInterface = require('mixin-interface');
```

## How to run the provided Unit Test
#### Step 1: Install Prerequisite Tools
* Install [NodeJS](https://nodejs.org/en/) and [Git] (https://git-scm.com/)

#### Step 2: Clone the mixin-interface repository locally
```bash
git clone git://github.com/Echopraxium/mixin-interface
cd mixin-interface
npm update
```

#### Step 3: Run the Unit Test
```bash
node test.js
```

## API Documentation
The API services are provided as static methods of the MixinInterface class.
* MixinInterface.implements: defines an interface as a child of another interface
* MixinInterface.extendsInterface: defines that a class is an interface
* MixinInterface.isInstanceOf: a replacement of _instanceof_ operator to support interface classes
* MixinInterface.getInstanceName: a bonus service to generate instance names based on implementation class

#### MixinInterface.getInstanceName()
```javascript
MixinInterface.getInstanceName(object)
```

This service is a bonus feature which generates instance names (from their implementation class name), it is advised to use it in the implementation class constructor.

```javascript
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;

class ImplementationClassSample {
	constructor() {
	  //...
      this._name = MixinInterface.getInstanceName(this);
	  //...
	}
}
```

#### MixinInterface.implements()
```javascript
MixinInterface.implements([interface_class1, interface_class2, ...], object)
```

This service must be used in the constructor of the implementation class:

```javascript
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

class Animal {
	constructor() {
      this._implemented_types = {};  // ** Required **
      this._name = MixinInterface.getInstanceName(this);
      MixinInterface.implements([IAnimal, ILifeForm], this);
	}
}
```

#### MixinInterface.isInstanceOf()
```javascript
MixinInterface.isInstanceOf(interface_class, object)
```

This service provides type-checking for an instance of an implementation class:

```javascript
const MixinInterface = require('mixin-interface');
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
var an_animal = new Animal();
console.log(an_animal.name + " is a 'IAnimal':    " + MixinInterface.isInstanceOf(IAnimal, an_animal))
```

#### MixinInterface.extendsInterface()
```javascript
MixinInterface.extendsInterface(interface_class, object)
```

This service provides support of type-checking for interface inheritance. It must be used in the constructor of an interface class which extends another interface class:

```javascript
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

class IAnimal extends ILifeForm {
  // required so that isInstanceOf(ILifeForm, instance) returns true
  static extendsInterface(instance) {
    MixinInterface.extendsInterface(ILifeForm, instance);
  } // IAnimal.extendsInterface()
```
