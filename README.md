# mixin-interface

An es6 (ECMAScript 2015) lightweight implementation of interface classes with `mixins`. Type checking and inheritance is also supported.

Changelog since release 4.3.1:

* Enhancements of `MxI.$Object`:  
   
 * _Delayed initialization_: `init()` and `isInitialized()` services  
 
 > `init()` signature is now `init(...args_init)` (not more `arg_initialized` argument)
 
* New Feature: _Custom Logger_ which allows more flexibiity than `console.log()` (see update of `test.js` source code)
 * Logger must implement `MxI.$ILogger` Interface  
 * Default Logger provided `MxI.$DefaultLogger` (NB: it is a _Singleton_ implementation class)
 * `MxI.$System.setLogger()` allows to change the Logger and `MxI.$System.resetLogger()` to restore the default logger.
 
 >A custom logger is provided (`./src/test_classes/star_prefix_logger.js`), it just adds '* ' prefix on each output (see last step in output of `test.js`)
 
* MxI workspace provides `$mandatory_arg` function to set a mandatory argument on a service 

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
---------- Unit Test for 'mixin-interface' package ----------
1.Instance of 'Animal' created: animal_0
animal_0 is a 'MxI.$Object'    ?   true
animal_0 is a 'ILifeForm' ?        true
animal_0 is a 'Animal' ?           true
animal_0 is a 'IAnimal' ?          true
animal_0 is a 'IMammal' ?          false
animal_0 is a 'IBird' ?            false
animal_0 is a 'IFish' ?            false
--> Animal.run
--> Animal.live
----------
2. Instance of 'Cat' created: cat_0
cat_0 is a 'MxI.$Object' ? true
cat_0 is a 'Animal' ?      true
cat_0 is a 'Cat' ?         true
cat_0 is a 'ILifeForm' ?   true
cat_0 is a 'IAnimal' ?     true
cat_0 is a 'IMammal' ?     true
cat_0 is a 'IBird' ?       false
cat_0 is a 'IFish' ?       false
--> Animal.run
--> Cat.suckle
--> Animal.live
----------
3. Instance of 'FlyingFish' created: flying_fish_0
flying_fish_0 is a 'MxI.$Object' ? true
flying_fish_0 is a 'Animal' ?      true
flying_fish_0 is a 'FlyingFish' ?  true
flying_fish_0 is a 'ILifeForm' ?   true
flying_fish_0 is a 'IAnimal' ?     true
flying_fish_0 is a 'IBird' ?       true
flying_fish_0 is a 'IFish' ?       true
flying_fish_0 is a 'IMammal' ?     false
--> FlyingFish.fly
--> FlyingFish.swim
--> Animal.run
--> Animal.live
----------
4. Check for each type if it is an Interface class or an Implementation class
'MxI.$Object'         is an interface ? false
'MxI.$IBaseInterface' is an interface ? true
'ILifeForm'           is an interface ? true
'IAnimal'             is an interface ? true
'IBird'               is an interface ? true
'IFish'               is an interface ? true
'Animal'              is an interface ? false
'Cat'                 is an interface ? false
'FlyingFish'          is an interface ? false
----------
5. Check generated names for instances
Instance of 'MxI.$Object' created:        mxi_object_0
Another instance of 'Animal' created:     animal_1
Another instance of 'FlyingFish' created: flying_fish_1
Another instance of 'Animal' created:     animal_2
----------
6. Initialize instance
animal_2 isInitialized():      false
animal_2 isInitialized():      true
----------
* 7. Change Logger
* Another instance of 'Animal' created:     animal_3
* Another instance of 'FlyingFish' created: flying_fish_2
---------- End of Unit Test ----------
```

>Please notice in the previous output that an _implementation class_ may _inherit_ functions (i.e implementation of services from _interface classes_) from its parent class (e.g. `FlyingFish` inherits `IAnimal.run()` and `IAnimal.live()` from `Animal`) but it is also possible to _override_ these default implementations them as well.

## How to Define an Interface class
Here is an example of an _interface class_ (see `./src/test_classes/i_life_form.js`). Here we define a single service: `live()`

* Inherit from `MxI.$IBaseInterface` (or any other _super_interface_ if applicable) by using `MxI.$Interface()` just after the es6 `extends` keyword to define both that it is an _interface class_ and that its _super_interface_ is `MxI.$IBaseInterface`. 
* Use `MxI.$raiseNotImplementedError()` in order to guarantee that the service is provided by the _implementation_. This should be put in the _Fallback implementation_ of each service defined by the interface. 

 >This will raise an Error if an _implementation_ which defines that it implements this _interface_ doesn't provide implemention of the service(s) (see paragraph on `MxI.$raiseNotImplementedError` API service at the end of this document).  
* Add the `MxI.$setAsInterface().$asChildOf()` _idiom_ after the class definition to define that this is an _interface_class_ and what is its superclass.

>Note: To remind that a class is an _interface class_, it is strongly advised to use the '_I prefix_' naming convention as  a reminder. This is a reminiscence of [_Hungarian notation_](https://en.wikipedia.org/wiki/Hungarian_notation) , a fairly old _identifier naming convention_ (e.g. see [Microsoft COM](https://fr.wikipedia.org/wiki/Component_Object_Model))

```javascript
const MxI = require('../mixin_interface.js').MxI;
//==================== 'ILifeForm' interface class ====================
class ILifeForm extends MxI.$Interface(MxI.$IBaseInterface) {  
  // Fallback implementation of 'live' service
  live() {
    MxI.$raiseNotImplementedError(ILifeForm, this);
  } // ILifeForm.live
} // 'ILifeForm' class
MxI.$setAsInterface(ILifeForm).$asChildOf(MxI.$IBaseInterface);
exports.ILifeForm = ILifeForm;
```
>Note: Each _interface class_ must have a superclass (`MxI.$IBaseInterface` if no other _interface class_ applies). In the previous case `MxI.$setAsInterface()` may be used without appending `.$asChildOf(super_interface)` idiom because `MxI.$IBaseInterface` will be the default superclass. However it is both cleaner, safer, more consistent and strongly advised to always use the full _idiom_ (`MxI.$setAsInterface().$asChildOf()`)

## How to subclass an Interface class
Here is an example of a subclass of an _interface class_ (see `./src/test_classes/i_animal.js`). Here we want to define `IAnimal` as a subclass of the `ILifeForm` _interface class_.

* Use this syntax: `class IAnimal extends $Interface()` to define that `IAnimal` is a subclass of `ILifeForm`.
* Add the `MxI.$setAsInterface().$asChildOf()` _idiom_ just after the class definition.

 >This is required so that `MxI.$isInstanceOf()` works properly to identify an object both as an being an instance of an _implementation class_ (and its superclasses) as well being an instance of an _interface class_ (and its superclasses).

* We then define a new service: `run()`. It will be a regular method of an es6 class. 
* Use `MxI.$raiseNotImplementedError()` in order to guarantee that the service is provided by the _implementation class_. This should be put in the _Fallback implementation_ of each service defined by the interface. 

 >This will raise an error if the _implementation class_ does'nt provide (directly or via inheritance) one of the service(s) defined by the _interface class(es)_ (see paragraph on `MxI.$raiseNotImplementedError` API service at the end of this document). 

```javascript
const MxI       = require('../mixin_interface.js').MxI;
const ILifeForm = require('./i_life_form.js').ILifeForm;
//==================== 'IAnimal' interface class ====================
class IAnimal extends MxI.$Interface(ILifeForm)  {
  // Fallback implementation of 'run' service
  run() {
    MxI.$raiseNotImplementedError(IAnimal, this);
  } // IAnimal.run
} // 'IAnimal' class
MxI.$setAsInterface(IAnimal).$asChildOf(ILifeForm);
exports.IAnimal = IAnimal;
```

## How to code an Implementation class
Here is an example of an _implementation class_ (see `./src/test_classes/animal.js`). An _implementation_ may implement one or more _interface classes_. To implement the services (i.e. defined by the _interface class(es)_ that are declared as implemented by this class) we must:

* Inherit from `MxI.$Object` (or any of its subclasses) by using the `MxI.$Implementation().$with()` _idiom_ just after the es6 `extends` keyword to define both a subclass and the _interface class(es)_ that it implements (`IAnimal` here). 
 
 >Inheriting from `MxI.$Object` also provides the _automatic instance naming_ feature (this feature is provided by the `name` attribute on each instance of `MxI.$Object` or any of its subclasses. Each instance name is generated from its class name and its instance count (e.g. `Animal_0`)
 > Instances are named with _SerpentCase_ pattern
 > e.g. the first instance of `FlyingFish` will be named `flying_fish_0`
 
* Put `MxI.$setClass(Animal).$asImplementationOf(ILifeForm, IAnimal)` _idiom_ just after the class definition. 

 >This is syntactically redundant but nevertheless required in order that `MxI.$isInstanceOf()` works correctly (see paragraph on `MxI.$isInstanceOf` API service at the end of this document). 

* Provide implementation of all services (e.g. `live()`, `run()`, ...) defined in each interface as well as their parent interfaces. 

 >If a service is not provided it may be inherited from the parent _implementation class_.

```javascript
const MxI        = require('../mixin_interface.js').MxI;
const IAnimal    = require('./i_animal.js').IAnimal;
const ILifeForm  = require('./i_life_form.js').ILifeForm;
//==================== 'Animal' implementation class ====================
class Animal extends MxI.$Implementation(MxI.$Object).$with(IAnimal) {
  constructor() {
    super();
  } // 'Animal' constructor

  run() {
    console.log("--> Animal.run");
  } // IAnimal.run()

  live() {
    console.log("--> Animal.live");
  } // ILifeForm.live()
} // 'Animal' class
MxI.$setClass(Animal).$asImplementationOf(IAnimal, ILifeForm);
```

## How to subclass an Implementation class
Here is an example of how to subclass an _implementation class_ (see `./src/test_classes/cat.js`). Here we want to both to subclass `Animal` and implement the `IMammal` _interface class_, this is how to do it:

* Inherit from `Animal` by using the `MxI.Implementation().$with()` _idiom_ just after `extends` to define both a subclass and the _interfaces_ that it implements.
* Provide implementation of the service defined by `IMammal` (`suckle()`). If a service from the parent _interfaces_ is not provided then it may be inherited from the parent _implementation class_.

 >Notice this is the case in the following sample: for `run()` an `live()`, as they are _disabled_ by the `__` prefix then it is the implementation from the parent class which is inherited instead.

* Add the `MxI.$setClass(Cat).$asImplementationOf(IMammal)` _idiom_ just after the class definition. 

 >This is required so that `MxI.$isInstanceOf()` works properly to identify an object both as being an instance of an _implementatio class_ (and its superclass(es)) as well being an instance of an _interface class_ (and its superclass(es)).

```javascript
const MxI     = require('../mixin_interface.js').MxI;
const Animal  = require('./animal.js').Animal;
const IMammal = require('./i_mammal.js').IMammal;
//==================== 'Cat' implementation class ====================
class Cat extends MxI.$Implementation(Animal).$with(IMammal) {
  constructor() {
    super();
  } // 'Cat' constructor

  suckle() {
    console.log('--> Cat.suckle');
  } // IMammal.suckle

  __run() {
    console.log('--> Cat.run');
  } // IAnimal.run

  __live() {
    console.log('--> Cat.live');
  } // ILifeForm.live
} // 'Cat' class
MxI.$setClass(Cat).$asImplementationOf(IMammal);
```
>Notice that `IAnimal.run()` and `ILifeForm.live()` services are not provided, so they are inherited from the parent _implementation class_ (`Animal`).

- - - -
# mixin-interface API Developer's Reference

Please note that in the following: 
  
> **API service** stands for _function provided by the mixin-interface package_ (e.g. `Mxi.$isInstanceOf()`).  
> **MxI** is the _namespace_ for all the _mixin-interface_ API services.  
> **object** stands for _instance of an _implementation class_.   
> **service** stands for _function defined by an interface class_ (e.g. `IAnimal.run()`).  
> **type** stands for either an _implementation class_ (e.g. `Animal`) or an _interface class_ (e.g. `IAnimal`).  
> **interface** stands for _interface class_.  
> **super_interface** stands for _superclass of the interface class_.  
> **implementation** stands for _implementation class_.  
> **super_implementation** stands for _superclass of the implementation class_.  
> **...interfaces** stands for _list of implemented interfaces_. The list is provided as _interface class(es)_ separated by a comma (e.g. `ILifeForm` and `IAnimal, ILifeForm` are valid _...interfaces_ arguments).  

* **MxI.$isInstanceOf()**: replacement for javascript `instanceof` operator.
* **MxI.$isInterface()**: checks if a _type_ is an _interface class_ or not.

* **MxI.$Interface()**: defines an _interface class_ and its _super_interface_.
* **MxI.$setAsInterface().$asChildOf()**: defines that a class is an _interface class_ and its _super_implementation_.
 >This is syntactically redundant but nevertheless required in order that `MxI.$isInstanceOf()` works correctly.

* **MxI.$Implementation().$with()**: defines an _implementation class_ and its superclass (`Mxi.$Object` if no other class applies).
* **MxI.$setClass().$asImplementationOf()**: defines  the _interface class(es)_ implemented by an _implementation class_.

* **MxI.$raiseNotImplementedError()**: error handling when a service (defined by of an _interface class_) is not implemented

* **MxI.$Object().init()**: _Delayed Initialization_ feature
* **MxI.$Object().isInitialized()**: checks if an object has been initialized

* **MxI.$System.log()**: _Custom Logger_ feature, more effective and flexible than `console.log()`
* **MxI.$ILogger**: interface class for _Custom Logger_ feature 
* **MxI.$DefaultLogger**: Default implementation of `MxI.$ILogger` (NB: it's a _Singleton_)
* **MxI.$System.setLogger()**: Change the _Logger_ by providing a instance of a class which implements `MxI.$ILogger`
* **MxI.$System.resetLogger()**: Restore the _Default Logger_ (`MxI.$DefaultLogger`)

* **$mandatory_arg()**: Set a mandatory argument on a service 

***
```javascript
MxI.$isInstanceOf(type, object)
```
This service provides type-checking for an object (see `./test.js` for a unit test of this feature). The `type` argument is either an _implementation class_ or an _interface class_. This API service allows to identify an object as being both an instance of an _interface class_ (and its superclass(es)), as well as an instance of an _implementation class_ (and its superclass(es)
 > This service is a replacement for javascript `instanceof` operator

```javascript
var a_cat = new Cat();
console.log(a_cat.name + " is a 'IMammal': " + MxI.$isInstanceOf(IMammal, a_cat));
```

***
```javascript
MxI.$isInterface(type)
```
This service checks if  `type` is an _interface class_ (see `./test.js` for a unit test of this feature). The `type` argument is either an _implementation class_ or an _interface class_.

```javascript
console.log("'IAnimal' is an interface ? " + MxI.$isInterface(IAnimal));
```

***
```javascript
MxI.$Interface(super_interface)
MxI.$setAsInterface(interface).$asChildOf(super_interface) 
```
These services allow to define an _interface class_:

* Use `MxI.$Interface()` after the `extends` clause of the es6 javascript `class` definition 
* After the class definition, use the `MxI.$setAsInterface().$asChildOf()` _idiom_

Example (see `./src/test_classes/i_animal.js` for a full sample):
```javascript
class IAnimal extends MxI.$Interface(ILifeForm)  {
  ...
} // 'IAnimal' class
MxI.$setAsInterface(IAnimal).$asChildOf(ILifeForm);
```
This code means that `IAnimal` is an _interface class_ which is a subclass of `ILifeForm`

***
```javascript
MxI.$Implementation(super_implementation).$with(...interfaces)
MxI.$setClass(implementation).$asImplementationOf(...interfaces)
```
These services allow to define an _implementation class_ (see `./src/test_classes/animal.js` for a full sample):

* Use `MxI.$Implementation()` after the `extends` clause of the es6 javascript `class` definition
* After the class definition, use the `MxI.$setClass().$asImplementationOf()` _idiom_

Example (see `./src/test_classes/animal.js` for a full sample):
```javascript
class Animal extends MxI.$Implementation(MxI.$Object).$with(IAnimal) {
  ...
} // 'Animal' class
MxI.$setClass(Animal).$asImplementationOf(IAnimal, ILifeForm);
```
This code means:

* `Animal` is an _implementation class_ which is a subclass of `MxI.$Object` 
* `Animal` implements both `IAnimal` and `ILifeForm` _interface classes_

***
```javascript
MxI.$raiseNotImplementedError(_interface_, object)
```
This service provides _Error Handling_ when a service of an _interface class_ is not provided by an _implementation class_. It should be used in the _Fallback implementation_ for each service defined by the _interface class_.
Here is an example of how to use this API service (see `./src/test_classes/i_life_form.js`):
```javascript
class ILifeForm extends MxI.$Interface(MxI.$IBaseInterface) {  
  // Fallback implementation of 'live' service
  live() {
    MxI.$raiseNotImplementedError(ILifeForm, this);
  } // ILifeForm.live
} // 'ILifeForm' class
MxI.$setAsInterface(ILifeForm).$asChildOf(MxI.$IBaseInterface);
```

Let's see what happens if the `Animal` _implementation_ doesn't provide an implementation for the `run()` service §defined by `IAnimal` _interface class_). 
If you want to test this use case, just rename `run()` to `__run()` in `./src/test_classes/animal.js`), then restart the Unit Test with `node test.js` in the command shell. An exception should be raised an you would get the following output:
```bash
            throw new Error(error_msg);
            ^

Error: ** mixin-interface Error 100 ** IAnimal.run not found on Animal_0
    at Object.$raiseNotImplementedError (D:\001_Lab\000_KL_Lab\_git_pub\mixin-in
terface\src\mixin_interface.js:160:19)
    at Animal.run (D:\001_Lab\000_KL_Lab\_git_pub\mixin-interface\src\test_class
es\i_animal.js:16:9)
...
```

***
```javascript
MxI.$Object().init(...args_init)
MxI.$Object().isInitialized()
```
These services provide the _Delayed Initialization_ feature. 
>Once `init()` service is called, if `args_init` is provided it is accessible to all instances of implementation class(es) via `this._$args_init`. 

>An object may be initialized only once: `this._$args_init` cannot be set or changed.

>A short explanation on _Delayed Initialization_: a typical example in GUI programming is when you need a widget (e.g. PushButton) but its container (e.g. CommandBar) is not yet created or known at instanciation time, so you may use later  `init()` service so that the PushButton can set its container (e.g. by calling setContainer() in the PushButton's implementation of init() service).


***
```javascript
MxI.$System.log()
MxI.$ILogger
MxI.$DefaultLogger
MxI.$System.setLogger()
MxI.$System.resetLogger()
```
This provides the _Custom Logger_ feature which is more effecive and flexible than `console.log()`, like enabling/disabling traces, redirectog to a File or a Stream, define trace levels and categories etc.. . To use this feature call `MxI.$System.log()` instead of `console.log()`. 

A custom logger must implement `MxI.$ILogger` interface, `MxI.$DefaultLogger` is provided as a default implementation this interface (NB: the implementation class should be a _Singleton_)
 
* You may change the _Logger_ by providing an instance of a class which implements `MxI.$ILogger`
```javascript
const $StarPrefixLogger = require('./src/test_classes/star_prefix_logger.js').$StarPrefixLogger;
MxI.$System.setLogger($StarPrefixLogger.getSingleton());
```

And to revert to the default logger (`MxI.$DefaultLogger`):
```javascript
MxI.$System.resetLogger();
```

Here is the source code of `$StarPrefixLogger` (see `./src/test_classes/star_prefix_logger.js`). Once it is set as the _Logger_ (with `MxI.$System.setLogger()`), it will add '* ' prefix on each output of `MxI.$System.log()` call (see `./test.js`).

```javascript
const MxI = require('../mixin_interface.js').MxI;
class $StarPrefixLogger extends MxI.$Implementation(MxI.$Object).$with(MxI.$ILogger) {
  static getSingleton() {
	  if ($StarPrefixLogger._$singleton === undefined) {
		  //console.log(" >>> First time (and Only normally) in getSingleton");
		  $StarPrefixLogger._$singleton = new $StarPrefixLogger();
	  }
	  return $StarPrefixLogger._$singleton;
  } // $StarPrefixLogger.getSingleton
  
  log(arg_msg) {
	  var msg = arg_msg;
	  if (msg === undefined || msg === null)
		msg = "";
	  var prefix = "* ";
	  console.log(prefix + msg);
  } // $StarPrefixLogger.log
} // '$StarPrefixLogger' class
$StarPrefixLogger._$singleton;
MxI.$setClass($StarPrefixLogger).$asImplementationOf(MxI.$ILogger);
```