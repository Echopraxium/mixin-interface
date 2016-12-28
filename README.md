## mixin-interface

An es6 (ECMAScript 2015) lightweight implementation of interface classes with `mixins`. Type checking and inheritance is also supported.

Changelog since release 1:
* New implementation of mixins, now based on `mixin` npm package
* When a service of an interface class (eg: `IAnimal.run()`) is not provided by an implementation class then it is correctly inherited from its parent(s) implementation class(es)
* `$$.isInstanceOf` now works correctly both with implementation classes and interface classes, as well as their superclasses.

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
---------- Unit Test for mixin-interface module ----------
Instance of 'Animal' created: Animal_0
Animal_0 is a '$Object':    true
Animal_0 is a 'ILifeForm':  true
Animal_0 is a 'Animal':     true
Animal_0 is a 'IAnimal':    true
Animal_0 is a 'IMammal':    false
Animal_0 is a 'IBird':      false
Animal_0 is a 'IFish':      false
--> Animal.run
--> Animal.live
----------
Another instance of 'Animal' created: Animal_1
----------
Instance of 'Cat' created: Cat_0
Cat_0 is a 'Animal':     true
Cat_0 is a 'Cat':        true
Cat_0 is a 'ILifeForm':  true
Cat_0 is a 'IAnimal':    true
Cat_0 is a 'IMammal':    true
Cat_0 is a 'IBird':      false
Cat_0 is a 'IFish':      false
--> Animal.run
--> Cat.suckle
--> Animal.live
----------
Instance of 'FlyingFish' created: FlyingFish_0
FlyingFish_0 is a 'Animal':     true
FlyingFish_0 is a 'FlyingFish': true
FlyingFish_0 is a 'ILifeForm':  true
FlyingFish_0 is a 'IAnimal':    true
FlyingFish_0 is a 'IBird':      true
FlyingFish_0 is a 'IFish':      true
FlyingFish_0 is a 'IMammal':    false
--> FlyingFish.fly
--> FlyingFish.swim
--> Animal.run
--> Animal.live
---------- End of UnitTest ----------
```

- - - -
## How to Define an Interface
Here is an example of an interface (see `./src/test_classes/i_life_form.js`).
* Here we define a single service: `live()`
* To guarantee that the service is provided by the _implementation_, we put `mixin_interface.raiseErrorIfServiceNotImplemented` in the fallback implementation of each service defined by the interface.
* Please note that I use the '_I prefix_' naming convention as a reminder that it is an interface. This is a reminiscence of [_Hungarian notation_](https://en.wikipedia.org/wiki/Hungarian_notation) , a fairly old _identifier naming convention_.
```javascript
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;

//==================== ILifeForm interface class ====================
class ILifeForm {
  // Fallback implementation of 'live' service
  live() {
    mixin_interface.raiseErrorIfServiceNotImplemented(ILifeForm, this);
  } // ILifeForm.live
} // ILifeForm class
exports.ILifeForm = ILifeForm;
```
- - - -
## How to subclass an Interface
Here is an example of an extended interface (see `./src/test_classes/i_animal.js`).
* Here we want to define `IAnimal` as a subclass of the `ILifeForm` _interface_.
* Use this syntax: `class IAnimal extends $interface(ILifeForm)` to define that `IAnimal` is a subclass of `ILifeForm`.
* You must also add `$$.inherits(IAnimal, ILifeForm)` just after the class definition. This is required so that `$$.isInstanceOf` works properly to identify an object both as an being an instance of an _implementation_ (and its superclasses) as well being an instance of an _interface_ (and its superclasses).
* We then define a new service: `run()`. It will be a regular method of an es6 class.
* To guarantee that the new service is provided by the _implementation_, we must provide a _fallback implementation_ of the service.
* In the _fallback implementation_ of the service, put `mixin_interface.raiseErrorIfServiceNotImplemented`. This will raise an error if the _implementation_ does'nt provide an implementation for this service, go to the _Error Handling when a service is not implemented_ paragraph. 
```javascript
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;
const $interface       = mixin_interface.$interface;
const ILifeForm        = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== IAnimal interface class ====================
class IAnimal extends $interface(ILifeForm)  {
  // Fallback implementation of 'run' service
  run() {
    console.log("--> IAnimal.run");
    mixin_interface.raiseErrorIfServiceNotImplemented(IAnimal, this);
  } // IAnimal.run
} // IAnimal class
$$.inherits(IAnimal, ILifeForm);
exports.IAnimal = IAnimal;
```

- - - -
## How to code an Implementation
Here is an example of an _implementation_ (see `./src/test_classes/animal.js`). An _implementation_ may implement one or more _interfaces_. In order to implement an interface we must:
* Inherit from `$Object` by using `extends $implementation()` to define a subclass. This also provides the _automatic instance naming_ feature (this feature is provided by the `name` attribute on each instance from `$Object` or any of its subclasses
* Put `$$.implements(Animal, ILifeForm, IAnimal)` just after the class definition. This is required so that `$$.isInstanceOf` works properly to identify an object both as an being an instance of an _implementation_ (and its superclasses) as well being an instance of an interface class (and its superclasses).
* Provide implementation of all services (e.g. `live()`, `run()`, ...) defined in each interface as well as their parent interfaces. If a service is not provided it may be inherited from the parent _implementation_.
```javascript
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;
const $implementation  = mixin_interface.$implementation;
const $Object          = mixin_interface.$Object;
const IAnimal          = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const ILifeForm        = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;

//==================== Animal implementation class ====================
class Animal extends $implementation($Object, IAnimal) {
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
$$.implements(Animal, ILifeForm, IAnimal);
exports.Animal = Animal;
```

- - - -
## How to subclass an Implementation
Here is an example of how to subclass an _implementation_ (see `./src/test_classes/cat.js`). Here we want to implement the `IMammal` _interface_, this is how to do it:
* Inherit from `$Object` by using `extends $implementation()` to define a subclass.
* Put `$$.implements(Cat, IMammal)` just after the class definition.
* Provide implementation of the service defined by `IMammal` (`suckle()`). If a service from the parent _interfaces_ is not provided then it may be inherited from the parent _implementation_.
```javascript
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot          = require('app-root-path');
const mixin_interface  = require(appRoot + '/src/mixin_interface.js');
const $$               = mixin_interface.$$;
const $implementation  = mixin_interface.$implementation;
const Animal           = require(appRoot + '/src/test_classes/animal.js').Animal;
const IMammal          = require(appRoot + '/src/test_classes/i_mammal.js').IMammal;

//==================== Cat implementation class ====================
//class Cat extends ImplementationBase {
class Cat extends $implementation(Animal, IMammal) {
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
$$.implements(Cat, IMammal);
exports.Cat = Cat;
```
- - - -
## MixinInterface API Documentation

Please note that in the following:
* _interface_ stands for _interface class_
* _implementation_ stands for _implementation class_
* _object_ stands for _instance of an implementation class_
* **$$** is a shortcut for the `MixinInterface` class which provides only 2 static methods.


* **$implementation()** and **$$.implements()**: these services are required to define a subclass of an _implemention_
* **$interface()** and **$$.inherits()**: these services are required to define a subclass of an _interface_
* **$$.isInstanceOf()**: a replacement for `instanceof` operator
* **mixin_interface.raiseErrorIfServiceNotImplemented()**: provides error handling if an _interface_'s service is not implemented


#### `$implementation()` and `$$.implements()` 
These services must be used at the beginning and after the _implementation_ definition (see `./src/test_classes/animal.js` for a full sample).

```javascript
class Animal extends $implementation($Object, IAnimal) {
} // Animal class
$$.implements(Animal, ILifeForm, IAnimal);
```

#### `$interface()` and `$$.inherits()`
These services must be used at the beginning and after the _interface_ definition (see `./src/test_classes/i_animal.js` for a full sample).

```javascript
class IAnimal extends $interface(ILifeForm)  {
} // IAnimal class
$$.inherits(IAnimal, ILifeForm);
```

#### $$.isInstanceOf()
```javascript
$$.isInstanceOf(type, object)
```
This service provides type-checking for an object (see`./test.js` for a unit test of this feature). This is a replacement of `instanceof` operator to identify an object as being both an instance of an _interface_ (and its superclasses), as well as an instance of an _implementation_ (and its superclasses)

```javascript
var an_animal_0 = new Animal();
console.log(an_animal_0.name + " is a '$Object':    " + $$.isInstanceOf($Object,   an_animal_0));
```

#### mixin_interface.raiseErrorIfServiceNotImplemented(_interface_, object)
This service provides _Error Handling_ when an _interface_ service is not provided by the _implementation_.
e.g: Let's see what happens if the `Animal` _implementation_ doesn't provide an implementation for the `IAnimal`'s `run()`. If you want to test this use case, just rename `run()` to `__run()` in `./src/test_classes/animal.js`), then restart the Unit Test with `node test.js` in the command shell. You should get the following output.
```bash
  throw new Error(error_msg);
  ^

Error: ** MixinInterface Error ** IAnimal.run not found on Animal_0
    at Object.raiseErrorIfServiceNotImplemented (D:\001_Lab\000_KL_Lab\_git_pub\
mixin-interface-next\src\mixin_interface.js:21:9)
    at Animal.run (D:\001_Lab\000_KL_Lab\_git_pub\mixin-interface-next\src\test_
classes\i_animal.js:20:21)
    at Object.<anonymous> (D:\001_Lab\000_KL_Lab\_git_pub\mixin-interface-next\t
est.js:36:13)
    ...
```

