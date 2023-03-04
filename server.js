const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
require('dotenv').config();


mongoose.connect(process.env.DB_URL, {
	
useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();
	
	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})
	// todo.isNew = true;
	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.put('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

// app.listen('https://priyanka-mern-backend.onrender.com', ()=>console.log("server started"));
app.listen(PORT,()=>{
	console.log(`server is running at ${PORT}`)
})
