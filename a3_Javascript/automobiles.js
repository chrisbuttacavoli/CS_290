/* Referencing https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for the sort method on arrays */

function Automobile(year, make, model, type) {
   this.year = year; //integer (ex. 2001, 1995);
   this.make = make; //string (ex. Honda, Ford);
   this.model = model; //string (ex. Accord, Focus);
   this.type = type; //string (ex. Pickup, SUV);
}

Automobile.prototype.logMe = function(bool) {
   if (bool)
      console.log(this.year + " " + this.make + " " + this.model);
   else
      console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
};

var automobiles = [
   new Automobile(1995, "Honda", "Accord", "Sedan"),
   new Automobile(1990, "Ford", "F-150", "Pickup"),
   new Automobile(2000, "GMC", "Tahoe", "SUV"),
   new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
   new Automobile(2005, "Lotus", "Elise", "Roadster"),
   new Automobile(2008, "Subaru", "Outback", "Wagon")
];

function sortArr(comparator, array) {
	return function(copy) {
   	return copy.sort(comparator);
   }(array);
}

function exComparator(int1, int2) {
   if (int1 > int2) {
      return true;
   } else {
      return false;
   }
}

function yearComparator(auto1, auto2) {
   if (auto1.year > auto2.year)
   	return 1;
   if (auto1.year < auto2.year)
   	return -1;
   return 0;
}

function makeComparator(auto1, auto2) {
   if (auto1.make.toUpperCase() > auto2.make.toUpperCase())
   	return 1;
   if (auto1.make.toUpperCase() < auto2.make.toUpperCase())
   	return -1;
   return 0;
}

function typeComparator(auto1, auto2) {
   if (auto1.type.toUpperCase() > auto2.type.toUpperCase())
   	return 1;
   if (auto1.type.toUpperCase() < auto2.type.toUpperCase())
   	return -1;
   return 0;
}

console.log("*****");

console.log("The cars sorted by year are:");
sortArr(yearComparator, automobiles).forEach(function(car){car.logMe(true)});
console.log(" ")

console.log("The cars sorted by make are:");
sortArr(makeComparator, automobiles).forEach(function(car){car.logMe(true)});

console.log(" ")
console.log("The cars sorted by type are:");
sortArr(typeComparator, automobiles).forEach(function(car){car.logMe(false)});

console.log("*****");
