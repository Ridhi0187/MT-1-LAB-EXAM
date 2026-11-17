const express = require('express');

const app = express();
app.use(express.json());

let foods = [
    { id: 1, name: "Pizza", price: 250 },
    { id: 2, name: "Burger", price: 120 },
    { id: 3, name: "Pasta", price: 180 }
];

// GET all foods
app.get('/foods', (req, res) => {
    res.json(foods);
});

// GET single food
app.get('/foods/:id', (req, res) => {
    const food = foods.find(f => f.id === parseInt(req.params.id));

    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }

    res.json(food);
});

// POST new food
app.post('/foods', (req, res) => {
    const newFood = {
        id: foods.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    foods.push(newFood);
    res.status(201).json(newFood);
});

// PUT update food
app.put('/foods/:id', (req, res) => {
    const food = foods.find(f => f.id === parseInt(req.params.id));

    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }

    food.name = req.body.name;
    food.price = req.body.price;

    res.json(food);
});

// DELETE food
app.delete('/foods/:id', (req, res) => {
    const index = foods.findIndex(f => f.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Food not found" });
    }

    foods.splice(index, 1);
    res.json({ message: "Food deleted successfully" });
});

// Start server
// Home Route
app.get('/', (req, res) => {
    res.send("Welcome to Online Food Ordering Express API!");
});
app.listen(4000, () => {
    console.log("Express server running on http://localhost:4000");
});
