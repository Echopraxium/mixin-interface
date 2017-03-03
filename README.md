# mixin-interface

An extension of 'mixin-interface-api' with utility features (e.g: _Custom Logger_) and more complete unit test(s).

### Changelog since release 4.5.5:
* Refactoring Step 1/2: _Null Object_ feature (`MxI.$Null` and `MxI.$isNull()`) moved to `mixin-interface-api` as well as the _Singleton_ features (used by _Custom Loggers_)  
* Minor update: removal of duplicate paragraphs by linking to `mixin-interface-api` when appropriate (e.g. _How to Define an Interface class_, etc...)


## Installation and Usage
```bash
npm install mixin-interface -S
```

## How to run the Unit Test
#### Step 1: Install Prerequisite Tools
Install [_NodeJS_](https://nodejs.org/en/) and [_Git_](https://git-scm.com/)

#### Step 2: Clone the 'mixin-interface' repository locally
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
============================================================
========== Unit Test for 'mixin-interface' package =========
============================================================
1.Instance of 'Animal' created: animal_0
'animal_0' is a 'MxI.$Object' ?      true
'animal_0' is a 'ILifeForm' ?        true
'animal_0' is a 'Animal' ?           true
'animal_0' is a 'IAnimal' ?          true
'animal_0' is a 'IMammal' ?          false
'animal_0' is a 'IBird' ?            false
'animal_0' is a 'IFish' ?            false
--> Animal.run
--> Animal.live
----------
2. Instance of 'Cat' created: cat_0
'cat_0' is a 'MxI.$Object' ? true
'cat_0' is a 'Animal' ?      true
'cat_0' is a 'Cat' ?         true
'cat_0' is a 'ILifeForm' ?   true
'cat_0' is a 'IAnimal' ?     true
'cat_0' is a 'IMammal' ?     true
'cat_0' is a 'IBird' ?       false
'cat_0' is a 'IFish' ?       false
--> Animal.run
--> Cat.suckle
--> Animal.live
----------
3. Instance of 'FlyingFish' created: flying_fish_0
'flying_fish_0' is a 'MxI.$Object' ? true
'flying_fish_0' is a 'Animal' ?      true
'flying_fish_0' is a 'FlyingFish' ?  true
'flying_fish_0' is a 'ILifeForm' ?   true
'flying_fish_0' is a 'IAnimal' ?     true
'flying_fish_0' is a 'IBird' ?       true
'flying_fish_0' is a 'IFish' ?       true
'flying_fish_0' is a 'IMammal' ?     false
--> FlyingFish.fly
--> FlyingFish.swim
--> Animal.run
--> Animal.live
----------
4. Check for each type if it is an Interface class or an Implementation cla
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
Instance of 'MxI.$Object' created:        'mxi_object_0'
Another instance of 'Animal' created:     'animal_1'
Another instance of 'FlyingFish' created: 'flying_fish_1'
Another instance of 'Animal' created:     'animal_2'
----------
6. Initialize instance
animal_2 isInitialized():       false
animal_2 isInitialized():       true
----------
* 7. Change Logger
* Another instance of 'Animal' created:     'animal_3'
* Another instance of 'FlyingFish' created: 'flying_fish_2'
===================== End of Unit Test =====================

```

>Please notice in the previous output that an _implementation class_ may _inherit_ functions (i.e implementation of services from _interface classes_) from its parent class (e.g. `FlyingFish` inherits `IAnimal.run()` and `IAnimal.live()` from `Animal`) but it is also possible to _override_ these default implementations them as well.


- - - -
# mixin-interface API Developer's Reference

Please note the following keywords and their meaning: 
  
> **API service**: _function provided by 'mixin-interface'_ (e.g. `Mxi.$isInstanceOf()`)  
> **MxI**: _namespace_ for all the _mixin-interface_ API services  
> **object**: for _instance of an _implementation class_   
> **service**: for _function defined by an interface class_ (e.g. `IAnimal.run()`)   
> **type**: for either an _implementation class_ (e.g. `Animal`) or an _interface class_ (e.g. `IAnimal`)    
> **interface**: for _interface class_  
> **super_interface**: for _superclass of the interface class_  
> **implementation**: for _implementation class_  
> **super_implementation**: for _superclass of the implementation class_   
> **...interfaces**: _list of implemented interfaces_. The list is provided as _interface class(es)_ separated by a comma (e.g. `ILifeForm` and `IAnimal, ILifeForm` are valid _...interfaces_ arguments)  

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

 >"Downgraded mode of operation" bugfix: now formatted strings are supported (e.g. `MxI.$System.log("'%s': ", obj.name);`)  

* **MxI.$System.banner()**: a variant of `MxI.$System.log()` which allows "decorated logs" with _banners_  
* **MxI.$ILogger**: interface class for _Custom Logger_ feature   
* **MxI.$DefaultLogger**: Default implementation of `MxI.$ILogger` (NB: it's a _Singleton_)  
* **MxI.$System.setLogger()**: Changes the _Logger_ by providing a instance of a class which implements `MxI.$ILogger`  
* **MxI.$System.getLogger()**: get the current _Logger_ (an instance of a class which implements `MxI.$ILogger`)
* **MxI.$System.resetLogger()**: Restores the _Default Logger_ (`MxI.$DefaultLogger`)   

***
## Check if an object is an instance of a Type
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
## Check if a type is an Interface class
```javascript
MxI.$isInterface(type)
```
This service checks if  `type` is an _interface class_ (see [`./test.js`](https://github.com/Echopraxium/mixin-interface/blob/master/test.js) for a unit test of this feature). The `type` argument is either an _implementation class_ or an _interface class_.

```javascript
console.log("'IAnimal' is an interface ? " + MxI.$isInterface(IAnimal));
```

***
## Definition of an Interface class
```javascript
MxI.$Interface(super_interface)
MxI.$setAsInterface(interface).$asChildOf(super_interface) 
```
Please refer to [How to define an Interface class](https://github.com/Echopraxium/mixin-interface-api/blob/master/README.md#how-to-define-an-interface-class) in [`mixin-interface-api`](https://www.npmjs.com/package/mixin-interface-api)

Please refer to [How to subclass an Interface class](https://github.com/Echopraxium/mixin-interface-api/blob/master/README.md#how-to-subclass-an-interface-class) in [`mixin-interface-api`](https://www.npmjs.com/package/mixin-interface-api)


***
## Implementation of Interface class(es)
```javascript
MxI.$Implementation(super_implementation).$with(...interfaces)
MxI.$setClass(implementation).$asImplementationOf(...interfaces)
```
Please refer to [How to code an Implementation class](https://github.com/Echopraxium/mixin-interface-api/blob/master/README.md#how-to-code-an-implementation-class) in [`mixin-interface-api`](https://www.npmjs.com/package/mixin-interface-api)

Please refer to [How to subclass an Implementation class](https://github.com/Echopraxium/mixin-interface-api/blob/master/README.md#how-to-subclass-an-implementation-class) in [`mixin-interface-api`](https://www.npmjs.com/package/mixin-interface-api)


***
## Error Handling: 'service not implemented'
```javascript
MxI.$raiseNotImplementedError(_interface_, object)
```
This service provides _Error Handling_ when a service of an _interface class_ is not provided by an _implementation class_. It should be used in the _Fallback implementation_ for each service defined by the _interface class_.
Here is an example of how to use this API service (see [`i_life_form.js` in `mixin-interface-api`](https://github.com/Echopraxium/mixin-interface-api/blob/master/src/test_classes/i_life_form.js):
```javascript
class ILifeForm extends MxI.$Interface(MxI.$IBaseInterface) {  
  // Fallback implementation of 'live' service
  live() {
    MxI.$raiseNotImplementedError(ILifeForm, this);
  } // ILifeForm.live
} // 'ILifeForm' class
MxI.$setAsInterface(ILifeForm).$asChildOf(MxI.$IBaseInterface);
```

Let's see what happens if the `FlyingFish` _implementation_ doesn't provide an implementation for the `swim()` service (defined by `IFish` _interface class_). 
If you want to test this use case, just rename `swim()` to `__swim()` in [`./src/test_classes/flying_fish.js`](https://github.com/Echopraxium/mixin-interface/blob/master/src/test_classes/flying_fish.js) ), then restart the Unit Test with `node test.js` in the command shell. An exception should be raised an you would get the following output:
```bash
         throw new Error(error_msg);
        ^

Error: ** mixin-interface-api Error 100 ** IFish.swim not found on flying_fish_0


    at Object.$raiseNotImplementedError (D:\001_Lab\000_KL_Lab\_git_pub\mixin-in
terface\node_modules\mixin-interface-api\src\mixin_interface_api.js:29:15)
    at FlyingFish.swim (D:\001_Lab\000_KL_Lab\_git_pub\mixin-interface\src\test_
classes\i_fish.js:16:9)
...
```

***
## Delayed Object Initialization
```javascript
MxI.$Object().init(...args_init)
MxI.$Object().isInitialized()
```
These services provide the _Delayed Initialization_ feature. 
>Once `init()` service is called, if `args_init` is provided it is accessible to all instances of implementation class(es) via `this._$args_init`. 

>An object may be initialized only once: `this._$args_init` cannot then be set or changed.

>Short explanation on _Delayed Initialization_: a typical example in _GUI programming_ is when you need a widget (e.g. _PushButton_) but its container (e.g. _CommandBar_) is not yet created or known at instanciation time, so you may use later  `init()` service so that the PushButton can set its container (e.g. by calling setContainer() in the _PushButton_'s implementation of init() service).


***
## Custom Logger Services
```javascript
MxI.$ILogger
MxI.$DefaultLogger
MxI.$System.log(arg_msg, ...arg_values)
MxI.$System.banner(arg_msg, arg_single_line_banner, arg_separator_char, arg_separator_length)
MxI.$System.setLogger(logger)
MxI.$System.resetLogger()
```
* `MxI.$System.log()`: this is the _Custom Logger_ feature which is more effective and flexible than `console.log()`, like enabling/disabling traces, redirectog to a File or a Stream, define trace levels and categories etc... To use this feature just replace calls to `console.log()` by `MxI.$System.log()`. 

>A custom logger must implement `MxI.$ILogger` interface, `MxI.$DefaultLogger` is provided as the default implementation of this interface (NB: the implementation class should be a _Singleton_)

* `MxI.$System.setLogger(logger)`: sets the current _Logger_.

>`logger` must be an instance of a class which implements `MxI.$ILogger`
```javascript
const $StarPrefixLogger = require('./src/test_classes/star_prefix_logger.js').$StarPrefixLogger;
MxI.$System.setLogger($StarPrefixLogger.getSingleton());
```

* `MxI.$System.resetLogger()`: restore the default logger (`MxI.$DefaultLogger`):
```javascript
MxI.$System.resetLogger();
```

* `MxI.$System.banner()`: generates nicer logs by surrounding the message in a banner. Optional arguments (after `arg_msg`) allow to change      
  * the number of lines (3 by default, one if `arg_single_line_banner` is set to `true`)  
  * the separator ('=' by default, another if `arg_separator_char` is set)  
  * the banner size (60 by default, another if `arg_separator_length` is set)  

Example 1:
```bash
MxI.$System.banner("Unit Test for 'mixin-interface' package");
```
will generate this output:
```bash
============================================================
========== Unit Test for 'mixin-interface' package =========
============================================================
```

Example 2:
```bash
MxI.$System.banner("End of Unit Test", true);
```
will generate this output:
```bash
===================== End of Unit Test =====================
```

Here is the source code of `$StarPrefixLogger` (see [`./src/test_classes/star_prefix_logger.js`](https://github.com/Echopraxium/mixin-interface/blob/master/src/test_classes/star_prefix_logger.js)) .Once it is set as the current _Logger_ (with `MxI.$System.setLogger()`), it will add '* ' prefix on each output of `MxI.$System.log()` call (see [`./test.js`](https://github.com/Echopraxium/mixin-interface/blob/master/test.js)).

```javascript
const MxI = require('../mixin_interface.js').MxI;
//============ '$StarPrefixLogger' implementation class ============
class $StarPrefixLogger extends MxI.$Implementation(MxI.$Object).$with(MxI.$ILogger) {
  static getSingleton() {
	    if ($StarPrefixLogger._$singleton === undefined) {
		    $StarPrefixLogger._$singleton = new $StarPrefixLogger();
	    }
	    return $StarPrefixLogger._$singleton;
  } // $StarPrefixLogger.getSingleton
  
  log(arg_msg, ...arg_values) {
	    var   msg    = "";
		const prefix = "* ";
	    if (arg_msg === undefined || arg_msg === null) 
		  msg = "";		  
	    else
		  msg = arg_msg;
	
	    if (arg_values !== undefined && arg_values !== null) {
	      if (arg_values.length > 0) {
			console.log(prefix + msg, ...arg_values);
		    return;
	      }
        }
	    console.log(prefix + msg);
  } // $StarPrefixLogger.log
} // '$StarPrefixLogger' class
$StarPrefixLogger._$singleton;
MxI.$setClass($StarPrefixLogger).$asImplementationOf(MxI.$ILogger);
exports.$StarPrefixLogger = $StarPrefixLogger;
```

## References
* _A fresh look at JavaScript Mixins_  
  https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
* _Functional Mixins in ECMAScript 2015_   
  http://raganwald.com/2015/06/17/functional-mixins.html
* _JavaScript Mixins: Beyond Simple Object Extension_
  https://lostechies.com/derickbailey/2012/10/07/javascript-mixins-beyond-simple-object-extension/
* _"Real" Mixins with JavaScript Classes_
  http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
* _Classes versus Prototypes in Object-Oriented Languages_
  ftp://ftp.cs.washington.edu/pub/constraints/papers/fjcc-86.pdf
* _The Theory of Classification - Part 15: Mixins and the Superclass Interface_  
  http://www.jot.fm/issues/issue_2004_11/column1/
* _CSE 505 Lecture Notes Archive - Prototype-based Programming_
  https://en.wikipedia.org/wiki/Prototype-based_programming
* _19. Classes, Metaclasses, and Prototype-Based Languages_
  https://courses.cs.washington.edu/courses/cse505/00au/lectures/19-metaclasses.txt
* _Safe Metaclass Composition Using Mixin-Based Inheritance - ESUG_
  http://www.esug.org/data/ESUG2003/mixinsforsafemetaclasscomposition.nourybouraqadi.bled25aug2003.pdf
* _CSE 341: Smalltalk classes and metaclasses_
  http://courses.cs.washington.edu/courses/cse341/04wi/lectures/17-smalltalk-classes.html
* _Topiarist: A JavaScript OO library featuring mixins, interfaces & multiple inheritance_  
  http://bladerunnerjs.org/blog/topiarist/