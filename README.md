## mixin-interface

An es6 (ECMAScript 2015) lightweight implementation of interface classes with support of type checking and inheritance.

Please note that in the following:
* _interface_ stands for _interface class_
* _implementation_ stands for _implementation class_

#### Installation and Usage:

```bash
npm install mixin-interface -S
```

## Quickstart
#### Step 1: Install Prerequisite Tools
Install [_NodeJS_](https://nodejs.org/en/) and [_Git_](https://git-scm.com/)

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
Here is an example of an interface (look at `./src/test_classes/i_life_form.js` for the full sample). 
* Here we define a single service: `live()` 
* To guarantee that the service is provided by the implementation class, we put `MixinInterface.checksIfServicesAreImplemented` in the fallback implementation of the service (the one which is defined in the interface).
* Please note that I use the 'I prefix' naming convention as a reminder that it is an interface. This is a reminiscence of [_Hungarian notation_](https://en.wikipedia.org/wiki/Hungarian_notation) , a fairly old _identifier naming convention_.
```javascript
class ILifeForm {
  // Fallback implementation of 'live' service
  live() {
	MixinInterface.checksIfServicesAreImplemented(ILifeForm, ['live'], this);
  } // ILifeForm.live
} // ILifeForm class
```
- - - -
## How to extend an Interface Class
Here is an example of an extended interface (look at `./src/test_classes/i_animal.js` for the full sample). 
* Here we want to subclass the previously defined interface (`ILifeForm`), to define that we must define an `extendsInterface` static method and call `MixinInterface.extendsInterface` with the parent interface as first parameter.
* We then define a new service: `run()` 
* To guarantee that the new service is provided by the implementation class, we put `MixinInterface.checksIfServicesAreImplemented` in the fallback implementation of the service (the one which is defined in the interface).
```javascript
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
```
- - - -
## How to code an Implementation class
Here is an example of an interface (look at `./src/test_classes/animal.js` for the full sample). An implementation class may implement one or more interfaces. In order to implement an interface we must:
* Put `MixinInterface.implementsInterfaces` in the constructor and provide an array of implemented interfaces (without including their parent classes)
* Provide implementation of All services (e.g. `live()`, `run()`, ...) defined in each interface as well as their parent interfaces
```javascript
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
} // Animal class
```
- - - -
## MixinInterface API Documentation
The API services are provided as static methods of the `MixinInterface` class.
* **MixinInterface.implementsInterfaces**: defines that a class implements one or more interface
* **MixinInterface.extendsInterface**: defines an interface as a child of another interface
* **MixinInterface.isInstanceOf**: a replacement of `instanceof` operator to support interface classes
* **MixinInterface.generateInstanceName**: a bonus service to generate a numbered instance name based on implementation class

Please note that in the following:
* _interface_ stands for _interface class_
* _implementation_ stands for _implementation class_
* _object_ stands for _instance of an implementation class_

#### MixinInterface.implementsInterfaces()
```javascript
MixinInterface.implementsInterfaces([interface_1, interface_2, ...], object)
```
This service must be used in the constructor of the implementation. Look at `./src/test_classes/animal.js` for a full implementation sample.

```javascript
class Animal {
	constructor() {
      this._name = MixinInterface.getInstanceName(this);
      MixinInterface.implementsInterfaces([IAnimal, ILifeForm], this);
	}
}
```
#### MixinInterface.extendsInterface()
```javascript
MixinInterface.extendsInterface(interface_class, object)
```
This service provides support of type-checking for interface inheritance. This service is required when an interface extends (is a child of) another interface. It allows to check if an instance is `instanceof` either of its implementation or any of its implemented interfaces (including their parent interfaces). Look at `./src/test_classes/i_animal.js` for a full implementation sample.

```javascript
class IAnimal extends ILifeForm {
  // required so that isInstanceOf(ILifeForm, instance) returns true
  static extendsInterface(instance) {
    MixinInterface.extendsInterface(ILifeForm, instance);
  } // IAnimal.extendsInterface()
```
#### MixinInterface.isInstanceOf()
```javascript
MixinInterface.isInstanceOf(interface_class, object)
```
This service provides type-checking for an instance of an implementation. Look at `./test.js` for a full implementation sample.

```javascript
var an_animal = new Animal();
console.log(an_animal.name + " is a 'IAnimal':    " + MixinInterface.isInstanceOf(IAnimal, an_animal))
```
#### MixinInterface.generateInstanceName()
```javascript
MixinInterface.generateInstanceName(object)
```
This service is a bonus feature which generates instance names (from their implementation), it is advised to use it in the implementation constructor (see sample below). Look at `./src/test_classes/animal.js` for a full implementation sample.

```javascript
class Animal {
	constructor() {
	  //...
      this._name = MixinInterface.generateInstanceName(this);
	  //...
	}
}
```