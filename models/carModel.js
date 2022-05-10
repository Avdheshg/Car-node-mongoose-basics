
const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
    id: Number,
    rating: Number,
    transmission: String,
    fuelType: String,
    seatingCapacity: Number,
    brand: String,
    name: String,
    price: Number,
    bodyType: String,
    mileage: Number,
    engine: Number, 
    summary: String
})
// Defining a model
const Car = mongoose.model("Car", carsSchema);


module.exports = Car;
