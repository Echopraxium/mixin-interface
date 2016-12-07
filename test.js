//==============================================================
// test.js
// Purpose: Unit Test for the implementation of interface classes
// Project: mixin-interface module
//==============================================================
'use strict';
/*jshint node: true*/
/*jshint esversion: 6*/
const appRoot        = require('app-root-path');
const MixinInterface = require(appRoot + '/src/mixin_interface.js').MixinInterface;

const ILifeForm      = require(appRoot + '/src/test_classes/i_life_form.js').ILifeForm;
const IAnimal        = require(appRoot + '/src/test_classes/i_animal.js').IAnimal;
const IMammal        = require(appRoot + '/src/test_classes/i_mammal.js').IMammal;
const IFish          = require(appRoot + '/src/test_classes/i_fish.js').IFish;
const IBird          = require(appRoot + '/src/test_classes/i_bird.js').IBird;

const Animal         = require(appRoot + '/src/test_classes/animal.js').Animal;
const Cat            = require(appRoot + '/src/test_classes/cat.js').Cat;
const FlyingFish     = require(appRoot + '/src/test_classes/flying_fish.js').FlyingFish;


//==================== start of test.js ====================
console.log();
console.log("---------- Unit Test for mixin-interface module ----------");
var an_animal = new Animal();
console.log("Instance of 'Animal' created: " + an_animal.name);
console.log(an_animal.name + " is a 'Animal':     " + MixinInterface.isInstanceOf(Animal, an_animal));
console.log(an_animal.name + " is a 'ILifeForm':  " + MixinInterface.isInstanceOf(ILifeForm, an_animal));
console.log(an_animal.name + " is a 'IAnimal':    " + MixinInterface.isInstanceOf(IAnimal, an_animal));
console.log(an_animal.name + " is a 'IMammal':    " + MixinInterface.isInstanceOf(IMammal, an_animal));
console.log(an_animal.name + " is a 'IBird':      " + MixinInterface.isInstanceOf(IBird, an_animal));
console.log(an_animal.name + " is a 'IFish':      " + MixinInterface.isInstanceOf(IFish, an_animal));
an_animal.run();
an_animal.live();

console.log("----------");
var a_cat = new Cat();
console.log("Instance of 'Cat' created: " + a_cat.name);
console.log(a_cat.name + " is a 'Animal':     " + MixinInterface.isInstanceOf(Animal, a_cat));
console.log(a_cat.name + " is a 'ILifeForm':  " + MixinInterface.isInstanceOf(ILifeForm, a_cat));
console.log(a_cat.name + " is a 'IAnimal':    " + MixinInterface.isInstanceOf(IAnimal, a_cat));
console.log(a_cat.name + " is a 'IMammal':    " + MixinInterface.isInstanceOf(IMammal, a_cat));
a_cat.run();
a_cat.suckle();
a_cat.live();

console.log("----------");
var a_flying_fish = new FlyingFish();
console.log("Instance of 'FlyingFish' created: " + a_flying_fish.name);
console.log(a_flying_fish.name + " is a 'Animal':     " + MixinInterface.isInstanceOf(Animal, a_flying_fish));
console.log(a_flying_fish.name + " is a 'FlyingFish': " + MixinInterface.isInstanceOf(FlyingFish, a_flying_fish));
console.log(a_flying_fish.name + " is a 'ILifeForm':  " + MixinInterface.isInstanceOf(ILifeForm, a_flying_fish));
console.log(a_flying_fish.name + " is a 'IAnimal':    " + MixinInterface.isInstanceOf(IAnimal, a_flying_fish));
console.log(a_flying_fish.name + " is a 'IBird':      " + MixinInterface.isInstanceOf(IBird, a_flying_fish));
console.log(a_flying_fish.name + " is a 'IFish':      " + MixinInterface.isInstanceOf(IFish, a_flying_fish));
a_flying_fish.fly();
a_flying_fish.swim();
a_flying_fish.run();
a_flying_fish.live();

console.log("---------- End of UnitTest ----------");
console.log();
