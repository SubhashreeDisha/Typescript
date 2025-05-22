"use strict";
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    showPerson() {
        console.log(`Owner: ${this.name}, Age: ${this.age}`);
    }
}
class Pet extends Person {
    type;
    breed;
    constructor(name, age, type, breed) {
        super(name, age);
        this.type = type;
        this.breed = breed;
    }
    showPet() {
        console.log(`Pet type: ${this.type}, Breed: ${this.breed}`);
    }
    showDetails() {
        this.showPerson();
        this.showPet();
    }
}
const p1 = new Pet("Disha", 20, "Dog", "Labrador");
p1.showDetails();
