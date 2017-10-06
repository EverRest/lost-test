
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
 * return animal json
 */
Animal.prototype.toJson = function () {
    return JSON.stringify(this);
}

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
 * @param id
 * @param name
 * @param type
 * @param photo
 * @param lat
 * @param lng
 * @param info
 * @constructor
 */
function Dog(id, name, type, photo, lat, lng, info) {

    this.id = id;
    this.type = 'dog';
    this.type_id = 1;
    this.name = name;
    this.photo = photo;
    this.lat = lat;
    this.lng = lng;
    this.info = info;
}

/**
 * Class Cat
 * @param id
 * @param name
 * @param type
 * @param photo
 * @param lat
 * @param lng
 * @param info
 * @constructor
 */
function Cat(id, name, type, photo, lat, lng, info) {

    this.id = id;
    this.type = 'cat';
    this.type_id = 2;
    this.name = name;
    this.photo = photo;
    this.lat = lat;
    this.lng = lng;
    this.info = info;
}

/**
 * Class Parrot
 * @param id
 * @param name
 * @param type
 * @param photo
 * @param lat
 * @param lng
 * @param info
 * @constructor
 */
function Parrot(id, name, type, photo, lat, lng, info) {

    this.id = id;
    this.type = 'parrot';
    this.type_id = 3;
    this.name = name;
    this.photo = photo;
    this.lat = lat;
    this.lng = lng;
    this.info = info;
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