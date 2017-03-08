# mixin-interface

An extension of 'mixin-interface-api' with utility features (e.g: _Custom Logger_) and more detailed unit test(s).

### Changelog in release 4.7.0 (Refactoring Step 2/2):
* Major changes: release of _Singleton_ and _Null Object_ features in latest release of [`mixin-interface-api`](https://www.npmjs.com/package/mixin-interface-api). These features also brings the benefit to provide the corresponding _Design Patterns_ in [`design-patterns-api`](https://www.npmjs.com/package/design-patterns-api)  
* Usability changes: they are described in latest release of [`mixin-interface-api`](https://www.npmjs.com/package/mixin-interface-api)

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
'animal_0' is a 'Animal' ?           true
'animal_0' is a 'IAnimal' ?          true
--> Animal.run
--> Animal.live
----------------------------------
2. Instance of 'Cat' created: cat_0
'cat_0' is a 'Animal' ?      true
'cat_0' is a 'Cat' ?         true
'cat_0' is a 'IAnimal' ?     true
'cat_0' is a 'IMammal' ?     true
--> Animal.run
--> Cat.suckle
--> Animal.live
----------------------------------
3. Check if a type is an Interface class or an Implementation class
'IBird'               is an interface ?         true
'IFish'               is an interface ?         true
----------------------------------
4. Check if an Implementation class implements a given Interface
'FlyingFish'          implements 'IBird' ?      true
'FlyingFish'          implements 'IFish' ?      true
----------------------------------
5. get Superclass of a type
Superclass of 'ILifeForm' is:                   $IBaseInterface
Superclass of 'Animal' is:                      $Object
Superclass of 'IAnimal' is:                     ILifeForm
Superclass of 'Cat' is:                         Animal
----------------------------------
6. Instance of 'Cat' created: cat_1
'cat_1' is a 'ILifeForm' ?                      true
'cat_1' is a 'IAnimal' ?                        true
'cat_1' is a 'IMammal' ?                        true
--> Animal.run
--> Cat.suckle
--> Animal.live
----------------------------------
7. Instance of 'FlyingFish' created: flying_fish_0
'flying_fish_0' is a 'Animal' ?                 true
'flying_fish_0' is a 'FlyingFish' ?             true
'flying_fish_0' is a 'IAnimal' ?                true
'flying_fish_0' is a 'IBird' ?                  true
'flying_fish_0' is a 'IFish' ?                  true
--> FlyingFish.fly
--> FlyingFish.swim
--> Animal.run
--> Animal.live
----------------------------------
8. Check generated names for instances
Another instance of 'Cat' created:              'cat_2'
Another instance of 'Animal' created:           'animal_1'
----------------------------------
9. Change Logger
* Logger changed to 'StarPrefixLogger'
----------------------------------
10. 'Null Object' feature, check if input value is 'MxI.NULL' or 'undefined'
MxI.$isNull(undefined):                         true
MxI.$isNull(MxI.NULL):                          true
----------------------------------
11. Singleton feature
isSingleton(MxI.NULL):                          true
'MxI.NULL' is a 'MxI.$ISingleton' ?             true
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


# Base API services (provided by 'mixin-interface-api')

For these services please refer to (['mixin-interface-api](https://www.npmjs.com/package/mixin-interface-api)) for their documentation

* **MxI.$isInstanceOf()**: replacement for javascript `instanceof` operator.  
* **MxI.$isInterface()**: checks if a _type_ is an _interface class_ or not.
* **MxI.$implements()**: checks if a _type_ implements an _interface class_ or not
* **MxI.$getSuperclass()**: get the superclass of a a _type 
* **MxI.$Interface()**: defines an _interface class_ and its _super_interface_.  
* **MxI.$setAsInterface().$asChildOf()**: defines that a class is an _interface class_ and its _super_implementation_.  
 >This is syntactically redundant but nevertheless required in order that `MxI.$isInstanceOf()` works correctly.  

* **MxI.$Implementation().$with()**: defines an _implementation class_ and its superclass (`Mxi.$Object` if no other class applies).  
* **MxI.$setClass().$asImplementationOf()**: defines  the _interface class(es)_ implemented by an _implementation class_.  

* **MxI.$raiseNotImplementedError()**: error handling when a service (defined by of an _interface class_) is not implemented  

* **MxI.$Object().init()**: _Delayed Initialization_ feature  
* **MxI.$Object().isInitialized()**: checks if an object has been initialized  

* **MxI.$ISingleton**: _interface class_ for the _Singleton_ (i.e. Unique instance) design pattern (see [`design-patterns-api`](https://www.npmjs.com/package/design-patterns-api))
* **MxI.$Singleton**: Default _implementation_ for `MxI.$ISingleton` _interface_  
* **MxI.$isSingleton()**: Checks if an object is a _Singleton_  
* **MxI.$setAsSingleton()**: Required to define that an _implementation_ is a _Singleton_  

* **MxI.$INullObject**: _interface class_ for the _Null Object_ design pattern (see [`design-patterns-api`](https://www.npmjs.com/package/design-patterns-api))
* **MxI.$NullObject**: Default _implementation_ for `MxI.$INullObject` _interface_  
* **MxI.$Null**: Singleton of `MxI.$NullObject` 
* **MxI.$isNull()**: Returns `true` in 2 cases. The first is when the input value is an object which is both a _Null Object_ an a _Singleton_ (typically the 'default Null Object' which is `MxI.$Null`). The second case is when the input value is `undefined`


# Extension API services
* **MxI.$System.log()**: _Custom Logger_ feature, more effective and flexible than `console.log()`  
* **MxI.$System.banner()**: a variant of `MxI.$System.log()` which allows "decorated logs" with _banners_  
* **MxI.$ILogger**: interface class for _Custom Logger_ feature   
* **MxI.$DefaultLogger**: Default implementation of `MxI.$ILogger` (NB: it's a _Singleton_)  
* **MxI.$System.setLogger()**: Changes the _Logger_ by providing a instance of a class which implements `MxI.$ILogger`  
* **MxI.$System.getLogger()**: get the current _Logger_ (an instance of a class which implements `MxI.$ILogger`)
* **MxI.$System.resetLogger()**: Restores the _Default Logger_ (`MxI.$DefaultLogger`)   


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

Here is the source code of `StarPrefixLogger` (see [`./src/test_classes/star_prefix_logger.js`](https://github.com/Echopraxium/mixin-interface/blob/master/src/test_classes/star_prefix_logger.js)). Once it is set as the current _Logger_ (with `MxI.$System.setLogger()`), it will add '* ' prefix on each output of `MxI.$System.log()` call (see [`./test.js`](https://github.com/Echopraxium/mixin-interface/blob/master/test.js)).

```javascript
const MxI = require('../mixin_interface.js').MxI;
//============ 'StarPrefixLogger' implementation class ============
class StarPrefixLogger extends MxI.$Implementation(MxI.$DefaultLogger).$with(MxI.$ILogger, MxI.$ISingleton) {
  constructor(...args) {
	  super();
      this._$prefix = "* ";
  } // 'StarPrefixLogger' constructor
} // 'StarPrefixLogger' class
MxI.$setClass(StarPrefixLogger).$asImplementationOf(MxI.$ILogger, MxI.$ISingleton);
MxI.$setAsSingleton(StarPrefixLogger);
exports.StarPrefixLogger = StarPrefixLogger;
```