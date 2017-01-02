## mixin-interface

An es6 (ECMAScript 2015) lightweight implementation of interface classes with `mixins`. Type checking and inheritance is also supported.

Changelog since release 2.0.2:
* Better Syntactic Sugar (Consistent, lightweight, avoid conficts with reserved words):
  * A single _namespace_ `Mxi` for all API services (e.g. `MxI.$implements(Animal, ILifeForm, IAnimal)`). It has been chosen, both as being a short and meaningful acronym (MxI stands for _Mixin crossed with Interface_) and also to prevent conflict with javascript (reserved keywords and native classes) and with dependencies as well.
  * All services are now prefixed by `$` 
  * Avoid conficts with reserved keywords (e.g. `$with` instead of `with`) or native classes (e.g. `$Object` instead of `Object`)
* Error Fixes and better consistency in code comments

#### Installation and Usage:
```bash
npm install mixin-interface -S
```

## Quickstart
#### Step 1: Install Prerequisite Tools
Install [_NodeJS_](https://nodejs.org/en/) and [_Git_](https://git-scm.com/)

#### Step 2: Clone the mixin-interface repository locally
Open a command shell then enter the following commands:
```bash
git clone git://github.com/Echopraxium/mixin-interface
cd mixin-interface
npm update
```

#### Step 3: Run the Unit Test
Now enter the following command:
```bash
node test.js
```

You should get the following output:
```bash
---------- Unit Test for mixin-interface module --------
Instance of 'Animal' created: Animal_0
Animal_0 is a 'MxI.$Object':  true
Animal_0 is a 'ILifeForm':    true
Animal_0 is a 'Animal':       true
Animal_0 is a 'IAnimal':      true
Animal_0 is a 'IMammal':      false
Animal_0 is a 'IBird':        false
Animal_0 is a 'IFish':        false
--> Animal.run
--> Animal.live
----------
Another instance of 'Animal' created: Animal_1
----------
Instance of 'Cat' created: Cat_0
Cat_0 is a 'MxI.$Object': true
Cat_0 is a 'Animal':      true
Cat_0 is a 'Cat':         true
Cat_0 is a 'ILifeForm':   true
Cat_0 is a 'IAnimal':     true
Cat_0 is a 'IMammal':     true
Cat_0 is a 'IBird':       false
Cat_0 is a 'IFish':       false
--> Animal.run
--> Cat.suckle
--> Animal.live
----------
Instance of 'FlyingFish' created: FlyingFish_0
FlyingFish_0 is a 'MxI.$Object': true
FlyingFish_0 is a 'Animal':      true
FlyingFish_0 is a 'FlyingFish':  true
FlyingFish_0 is a 'ILifeForm':   true
FlyingFish_0 is a 'IAnimal':     true
FlyingFish_0 is a 'IBird':       true
FlyingFish_0 is a 'IFish':       true
FlyingFish_0 is a 'IMammal':     false
--> FlyingFish.fly
--> FlyingFish.swim
--> Animal.run
--> Animal.live
---------- End of UnitTest ----------
```

Please notice that an _implementation class_ may either _inherit_ (i.e implementation of services from _interface classes_  - ) from its parent class (e.g. `FlyingFish` class inherits `IAnimal.run()` and `IAnimal.live()` from `Animal`) but it is also possible to _override_ them as well.

- - - -
## How to Define an Interface class
Here is an example of an interface (see `./src/test_classes/i_life_form.js`). Here we define a single service: `live()`
* To guarantee that the service is provided by the _implementation_, we put `MxI.$raiseNotImplementedError` in the fallback implementation of each service defined by the interface. This will raise an Error if an _implementation_ which defines that it implements this _interface_ doesn't provide implemention of the services).
Please note that I use the '_I prefix_' naming convention as a reminder that it is an interface. This is a reminiscence of [_Hungarian notation_](https://en.wikipedia.org/wiki/Hungarian_notation) , a fairly old _identifier naming convention_.
```javascript
const appRoot = require('app-root-path');
const MxI     = require(appRoot + '/src/mixin_interface.js').MxI;

//==================== ILifeForm interface class ====================
class ILifeForm {
  // Fallback implementation of 'live' service
  live() {
    MxI.$raiseNotImplementedError(ILifeForm, this);
  } // ILifeForm.live
} // ILifeForm class
```
- - - -
## How to subclass an Interface class
Here is an example of a subclass of an _interface class_ (see `./src/test_classes/i_animal.js`). Here we want to define `IAnimal` as a subclass of the `ILifeForm` _interface class_.

1. Use this syntax: `class IAnimal extends $interface(ILifeForm)` to define that `IAnimal` is a subclass of `ILifeForm`.
2. You must also add `MxI.$inherits(IAnimal, ILifeForm)` just after the class definition. This is required so that `MxI.$isInstanceOf()` works properly to identify an object both as an being an instance of an _implementation class_ (and its superclasses) as well being an instance of an _interface class_ (and its superclasses).
3. We then define a new service: `run()`. It will be a regular method of an es6 class.
4. To guarantee that the new service is provided by the _implementation class_, we must provide a _Fallback implementation_ of the service.
5. In the _fallback implementation_ of the service, put `MxI.$raiseNotImplementedError()`. This will raise an error if the _implementation_ does'nt provide an implementation for this service (see paragraph on `MxI.$raiseNotImplementedError` API service at the end of this document). 
```javascript
const appRoot   = require('app-root-path');
const MxI       = require(appRoot + '/src/mixin_interface.js').MxI;
const ILifeForm = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== IAnimal interface class ====================
class IAnimal extends MxI.$SuperInterface(ILifeForm)  {
  // Fallback implementation of 'run' service
  run() {
    console.log("--> IAnimal.run");
    MxI.$raiseNotImplementedError(IAnimal, this);
  } // IAnimal.run
} // IAnimal class
MxI.$inherits(IAnimal, ILifeForm);
```

- - - -
## How to code an Implementation class
Here is an example of an _implementation class_ (see `./src/test_classes/animal.js`). An _implementation_ may implement one or more _interface classes_. In order to implement services of an _interface class_ we must:

1. Inherit from `MxI.$Object` (pr any of its subclasses) by using the `MxI.$SuperImplementation().$with()` _idiom_ just after `extends` to define a subclass and the _interfaces_ that it implements (`IAnimal` here). 
 
 >Note: Inheriting from `MxI.$Object` also provides the _automatic instance naming_ feature (this feature is provided by the `name` attribute on each instance from `MxI.$Object` or any of its subclasses.
 
2. Put `MxI.$implements(Animal, ILifeForm, IAnimal)` just after the class definition. This is required so that `MxI.$isInstanceOf()` works properly to identify an object both as an being an instance of an _implementation_ (and its superclasses) as well being an instance of an interface class (and its superclasses).
3. Provide implementation of all services (e.g. `live()`, `run()`, ...) defined in each interface as well as their parent interfaces. If a service is not provided it may be inherited from the parent _implementation_.

```javascript
const appRoot   = require('app-root-path');
const MxI       = require(appRoot + '/src/mixin_interface.js').MxI;
const IAnimal   = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== Animal implementation class ====================
class Animal extends MxI.$SuperImplementation(MxI.$Object).$with(IAnimal) {
  constructor() {
    super();
  } // Animal constructor

  run() {
    console.log("--> Animal.run");
  } // IAnimal.run()

  live() {
    console.log("--> Animal.live");
  } // ILifeForm.live()
} // Animal class
MxI.$implements(Animal, ILifeForm, IAnimal);
```

- - - -
## How to subclass an Implementation class
Here is an example of how to subclass an _implementation class_ (see `./src/test_classes/cat.js`). Here we want to both to subclass `Animal` and implement the `IMammal` _interface class_, this is how to do it:

1. Inherit from `Animal` by using the `MxI.$SuperImplementation().$with()` _idiom_ just after`extends` to define a subclass and the _interfaces_ that it implements.
2. Put `MxI.$implements(Cat, IMammal)` just after the class definition.
3. Provide implementation of the service defined by `IMammal` (`suckle()`). If a service from the parent _interfaces_ is not provided then it may be inherited from the parent _implementation_.
```javascript
const appRoot = require('app-root-path');
const MxI     = require(appRoot + '/src/mixin_interface.js').MxI;
const Animal  = require(appRoot + '/src/test_classes/animal.js').Animal;
const IMammal = require(appRoot + '/src/test_classes/i_mammal.js').IMammal;

//==================== Cat implementation class ====================
class Cat extends MxI.$SuperImplementation(Animal).$with(IMammal) {
  constructor() {
    super();
  } // Cat constructor

  suckle() {
    console.log('--> Cat.suckle');
  } // IMammal.suckle

  __run() {
    console.log('--> Cat.run');
  } // IAnimal.run

  __live() {
    console.log('--> Cat.live');
  } // ILifeForm.live
} // Cat class
MxI.$implements(Cat, IMammal);
```
- - - -
## Developer's Reference for API services of mixin-interface package

>Please note that in the following:   
* _object_ stands for _instance of an _implementation class_.  
* **MxI** is a _namespace_ for all the API services of _mixin-interface_ package.


* **MxI.$SuperImplementation().$with()** and **MxI.$implements()**: these services are required to define a subclass of an _implemention class_ and the _interface classes_ that it implements
* **MxI.$SuperInterface()** and **MxI.$inherits()**: these services are required to define a subclass of an _interface class_
* **MxI.$isInstanceOf()**: a replacement for `instanceof` operator
* **MxI.$raiseNotImplementedError()**: provides error handling if a service of an _interface class_ is not implemented


#### `MxI.$SuperImplementation().$with()` and `MxI.$implements()` 
```javascript
MxI.$SuperImplementation(parent_implementation_class).$with(...interfaces)
MxI.$implements(parent_implementation_class, ...interfaces)
```
These services must be used at the beginning and after the _implementation_ definition (see `./src/test_classes/animal.js` for a full sample).

```javascript
class Animal extends MxI.$SuperImplementation(MxI.$Object).$with(IAnimal) {
  ...
} // Animal class
MxI.$implements(Animal, ILifeForm, IAnimal);
```

#### `$MxI.$SuperInterface()` and `MxI.$inherits()`
```javascript
MxI.$SuperInterface(parent_interface_class)
MxI.$inherits(parent_interface_class, ...interfaces)
```
These services must be used at the beginning and after the _interface class_ definition (see `./src/test_classes/i_animal.js` for a full sample).

```javascript
class IAnimal extends MxI.$SuperInterface(ILifeForm)  {
  ...
} // IAnimal class
MxI.$inherits(IAnimal, ILifeForm);
```

#### MxI.$isInstanceOf()
```javascript
MxI.$isInstanceOf(type, object)
```
This service provides type-checking for an object (see `./test.js` for a unit test of this feature). The `type` argument is either an _implementation class_ or an _interface class_. This API service (a replacement for `instanceof` operator) allows to identify an object as being both an instance of an _interface class_ (and its superclasses), as well as an instance of an _implementation class_ (and its superclasses).

```javascript
var a_cat = new Cat();
...
console.log(a_cat.name + " is a 'IMammal': " + MxI.$isInstanceOf(IMammal, a_cat));
```

#### MxI.$raiseNotImplementedError()
```javascript
MxI.$raiseNotImplementedError(_interface_, object)
```

This service provides _Error Handling_ when a service of an _interface class_ is not provided by an _implementation class_. It should be used in the _Fallback implementation_ for each service defined by the _interface class_.
Here is an example of how to use this API service (see `./src/test_classes/i_life_form.js`):
```javascript
class ILifeForm {
  // Fallback implementation of 'live' service
  live() {
    MxI.$raiseNotImplementedError(ILifeForm, this);
  } // ILifeForm.live
} // ILifeForm class
```

Let's see what happens if the `Animal` _implementation_ doesn't provide an implementation for the `run()` service of `IAnimal` _interface class_. 
If you want to test this use case, just rename `run()` to `__run()` in `./src/test_classes/animal.js`), then restart the Unit Test with `node test.js` in the command shell. You should get the following output.
```bash
            throw new Error(error_msg);
            ^

Error: ** mixin-interface Error ** IAnimal.run not found on Animal_0
    at Object.$raiseNotImplementedError (D:\001_Lab\000_KL_Lab\_git_pub\mixin-in
terface-next\src\mixin_interface.js:126:19)
    at Animal.run (D:\001_Lab\000_KL_Lab\_git_pub\mixin-interface-next\src\test_
classes\i_animal.js:18:9)
```

