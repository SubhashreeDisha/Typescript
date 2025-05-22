class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  showPerson(): void {
    console.log(`Owner: ${this.name}, Age: ${this.age}`);
  }
}

class Pet extends Person {
  type: string;
  breed: string;

  constructor(name: string, age: number, type: string, breed: string) {
    super(name, age);
    this.type = type;
    this.breed = breed;
  }

  showPet(): void {
    console.log(`Pet type: ${this.type}, Breed: ${this.breed}`);
  }

  showDetails(): void {
    this.showPerson();
    this.showPet();
  }
}

const p1 = new Pet("Disha", 20, "Dog", "Labrador");
p1.showDetails();
