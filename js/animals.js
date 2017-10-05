
/**
 * Class Animal
 * @param name
 * @param type
 * @param photo
 * @param lat
 * @param lng
 * @param info
 * @constructor
 */
function Animal(name, type, photo, lat, lng, info) {
    this.name = name;
    this.type = type;
    this.photo = photo;
    this.lat = lat;
    this.lng = lng;
    this.info = info;
}

/**
 * save animal
 * @returns void
 */
Animal.prototype.save = function(animal) {

    $.ajax({
        url: URL + 'index.php/app/save',
        type: "POST",
        data: animal,
        success: function (data) {
            if (data.success) {
                console.log('success');
            } else {
                alert('Error: Can not save the animal!');
            }
        },
        dataType: 'json'
    });
};

/**
 * test function
 * return void
 */
Animal.prototype.sayHello = function() {
    console.log( 'Hello my name is ' + this.name);
    console.log( this );
};

/**
 * Class Dog
 * @param animal_id
 * @param id
 * @param name
 * @param type_id
 * @param photo
 * @param lat
 * @param lng
 * @param info
 * @constructor
 */
function Dog(animal_id, id, name, type_id, photo, lat, lng, info) {
    Animal.apply(this, arguments);
    this.id = id;
    this.type = 'dog';
    this.animal_id = animal_id;
}

/**
 * Cat
 * @param animal_id
 * @param id
 * @param name
 * @param type_id
 * @param photo
 * @param lat
 * @param lng
 * @param info
 * @constructor
 */
function Cat(animal_id, id, name, type_id, photo, lat, lng, info) {
    Animal.apply(this, arguments);
    this.id = id;
    this.type = 'cat';
    this.animal_id = animal_id;
}

/**
 * Parrot
 * @param animal_id
 * @param id
 * @param name
 * @param type_id
 * @param photo
 * @param lat
 * @param lng
 * @param info
 * @constructor
 */
function Parrot(animal_id, id, name, type_id, photo, lat, lng, info) {
    Animal.apply(this, arguments);
    this.id = id;
    this.type = 'parrot';
    this.animal_id = animal_id;
}


// Dog extends Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Cat extends Animal
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

// Parrot extends Animal
Parrot.prototype = Object.create(Animal.prototype);
Parrot.prototype.constructor = Parrot;