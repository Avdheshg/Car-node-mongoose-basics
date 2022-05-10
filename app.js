

const express = require("express");

/* ******** Connection to Mongoose *********** */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

// console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
}).then(con => {
    // console.log(con.connections);
    console.log("DB Connection successful");
})
/* ************************************** */

/* ==========   Schema and Model    ======================= */
// Buidling a Schema
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
/* ==========   ======================= */

const app = express();

// READ: all cars
app.get("/", async (req, res) => {
    try {
        const cars = await Car.find();

        res.status(200).json({
            status: "success",
            results: cars.length,
            cars
        })
    } catch (err) {
        console.log(err);
    }
});

// CREATE: create a new Car
app.use(express.json());

app.post("/", async (req, res) => {
    // const newCar = req.body;

    const newCar = await Car.create(req.body);

    res.status(200).json({
        status: "success",
        newCar
    })
})

// UPDATE: update the car
// When async-await is used => then it returning the output ow it doesn't
app.patch("/:id", async (req, res) => {
    // console.log(req.params);
    
    const id = req.params.id;
    const bodyObj = req.body;
    // console.log("req.body is typeOf: ", typeof req.body);
    // console.log(name.name);
    // const car = await Car.find({name: name});
    const car = await Car.findByIdAndUpdate(id, req.body, {
        new: true
    });      

    res.status(200).json({
        status: "success",
        car
    })
    // console.log(car);
    
})

// DELETE: Delete a query
app.delete("/:id", async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id, (err) => {
            if (!err) {
                console.log("Deleted Successfully ")
            } else {
                console.log(err);
            }
        });

        res.status(204).json({
            status: "success",
            deletedCar
        })
    } catch (err) {
        console.log(err);
    }
})
 
const port = 4000;
app.listen(port, () => {
    console.log(`App is running on the port ${port}`);
})
























































/*
    Connect with mongoose 
    Apply query of mongoose on this project until U R not comfortable


    DB_PASSWORD = FkcMiQhKzA7oftt6

    

*/











