const mongoose = require('mongoose');
const express = require('express');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, {
    useNewUrlParser :true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected', () => {
    console.log('****Mongo is connected****');
})

const Todo = require('./models/TodoSchema');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/api/todos', async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        next(err);
    }
})

app.post('/api/new', (req, res) => {
    const title = req.body.title;
    const completed = req.body.completed;

    //insance of the model and saving
    const newTodo = new Todo({
        title: title,
        completed: completed
    });

    newTodo.save((err) => {
        err ? console.log("Error! Something went wrong on save!") : console.log("Good in the hood. Data saved!");
    })

    res.json(newTodo);
})

app.delete('/api/delete/:id', (req, res, next) => {
    console.log(`Deleting _id: ${req.params.id}....\n of type ${typeof req.params.id}`)

    Todo.findByIdAndDelete(req.params.id, err => {
        err ? console.log(err) : console.log("Deletion Successful.");
      })
    
})

const PORT = process.env.PORT || 5001;
app.listen(PORT);