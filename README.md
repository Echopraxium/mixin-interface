## mixin-interface

An es6 (ECMAScript 2015) lightweight implementation of interface classes with support of type checking and inheritance.

Please note that in the following:
* _interface_ stands for _interface class_
* _implementation_ stands for _implementation class_
* _object_ stands for _instance of an implementation class_

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
Install [NodeJS](https://nodejs.org/en/) and [Git](https://git-scm.com/)

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
- - - -
## How to Define an Interface
Here is an example of an interface (provided in `./src/test_classes/i_life_form.js`). 
* Here we define a single service (`live()`) 
* To guarantee that the service is provided by the implentation class, we put `MixinInterface.checksIfServicesAreImplemented` in the fallback implementation of the service (the one which is defined in the interface).
```javascript
class ILifeForm {
  // Fallback implementation of 'live' service
  live() {
	MixinInterface.checksIfServicesAreImplemented(ILifeForm, ['live'], this);
  } // ILifeForm.live
} // ILifeForm class
exports.ILifeForm = ILifeForm;
```
- - - -
## How to extend an Interface Class
Here is an example of an extended interface (provided in `./src/test_classes/i_animal.js`). 
* Here we want to subclass the previously defined interface (`ILifeForm`), to define that we must define an `extendsInterface` static method and call `MixinInterface.extendsInterface` with the parent interface as first parameter.
* We then define a new service (`run()`) 
* To guarantee that the new service is provided by the implentation class, we put `MixinInterface.checksIfServicesAreImplemented` in the fallback implementation of the service (the one which is defined in the interface).
```javascript
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== IAnimal interface class ====================
class IAnimal extends ILifeForm {
  // required so that isInstanceOf(ILifeForm, instance) returns true
  static extendsInterface(instance) {
    MixinInterface.extendsInterface(ILifeForm, instance);
  } // IAnimal.extendsInterface()

  // Fallback implementation of 'run' service
  run() {
	MixinInterface.checksIfServicesAreImplemented(IAnimal, ['run'], this);
  } // IAnimal.run
} // IAnimal class
exports.IAnimal = IAnimal;
```
- - - -
## How to code an Implementation class
An implementation class may implement one or more interfaces. In order to implement an interface we must:
* Put `MixinInterface.implementsInterfaces` in the constructor and provide an array of implemented interfaces (without including their parent classes)
* Provide implementation of All services defined in each interface as well as their parent interfaces
```javascript
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== Animal implementation class ====================
class Animal {
  constructor() {
    this._name = MixinInterface.generateInstanceName(this);
    MixinInterface.implementsInterfaces(Animal, [IAnimal, ILifeForm], this);
  } // Thing constructor

  get name() {
    return this._name;
  } // 'name' getter

  run() {
    console.log("Animal.run");
  } // IAnimal.run()

  live() {
    console.log("Animal.live");
  } // ILifeForm.live()
} // ImplementationBase class
exports.Animal = Animal;
```
- - - -
## API Documentation
The API services are provided as static methods of the MixinInterface class.
* **MixinInterface.implementsInterfaces**: defines an interface as a child of another interface
* **MixinInterface.extendsInterface**: defines that a class is an interface
* **MixinInterface.isInstanceOf**: a replacement of `instanceof` operator to support interface classes
* **MixinInterface.generateInstanceName**: a bonus service to generate a numbered instance name based on implementation class

#### MixinInterface.generateInstanceName()
```javascript
MixinInterface.generateInstanceName(object)
```
This service is a bonus feature which generates instance names (from their implementation), it is advised to use it in the implementation constructor (see sample below).

```javascript
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;

class ImplementationClassSample {
	constructor() {
	  //...
      this._name = MixinInterface.generateInstanceName(this);
	  //...
	}
}
```

#### MixinInterface.implementsInterfaces()
```javascript
MixinInterface.implementsInterfaces([interface_1, interface_2, ...], object)
```
This service must be used in the constructor of the implementation.

```javascript
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

class Animal {
	constructor() {
      this._name = MixinInterface.getInstanceName(this);
      MixinInterface.implementsTypes([IAnimal, ILifeForm], this);
	}
}
```

#### MixinInterface.isInstanceOf()
```javascript
MixinInterface.isInstanceOf(interface_class, object)
```
This service provides type-checking for an instance of an implementation:

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
This service provides support of type-checking for interface inheritance. This service is required when an interface extends (is a child of) another interface. It allows to check if an instance is `instanceof` either of its implementation or any of its implemented interfaces (including their parent interfaces).
This service must be used within the constructor of the child interface:

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
