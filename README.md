"# mixin-interface" 
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

#### MixinInterface services

## MixinInterface.getInstanceName
```javascript
MixinInterface.getInstanceName(object);
```

This service is a bonus feature to generate instance names from their implementation class, it is advised to use it in the implementation class constructor.

```javascript
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;

class Animal {
	constructor() {
      ...
      this._name = MixinInterface.getInstanceName(this);
      ...
	}
}
```

## MixinInterface.implements
```javascript
MixinInterface.implements([interface_class1, interface_class2, ...], this);
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
      MixinInterface.implements([IAnimal, ILifeForm], this);;
	}
}
```

## MixinInterface.isInstanceOf
```javascript
MixinInterface.isInstanceOf(interface_class, object);
```

This service provides type-checking for an instance of an implementation class:

```javascript
const MixinInterface = require('mixin-interface');
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
var an_animal = new Animal();
console.log(an_animal.name + " is a 'IAnimal':    " + MixinInterface.isInstanceOf(IAnimal, an_animal))
```

## MixinInterface.extendsInterface
```javascript
MixinInterface.extendsInterface(interface_class, object);
```

This service provides support of type-checking for interface inheritance. It must be used in the constructor of the interface class:

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