const ToDoModel = require("../models/ToDoModal");

exports.getToDo = async (req, res) => {
  try {
    const todo = await ToDoModel.find();
    res.send(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.saveToDo = async (req, res) => {
  try {
    const { text } = req.body;
    await ToDoModel.create({ text, completed: false }); 
    res.status(201).send("Todo added successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const { _id } = req.body;
    await ToDoModel.findByIdAndDelete(_id);
    res.status(201).send("Todo deleted successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateToDo = async (req, res) => {
  try {
    const { _id, text, completed } = req.body;
    const updateData = {};

    if (text !== undefined) updateData.text = text;
    if (completed !== undefined) updateData.completed = completed;

    await ToDoModel.findByIdAndUpdate(_id, updateData);
    res.status(201).send("Todo updated successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCompleted = async (req, res) => {
  try {
    await ToDoModel.deleteMany({ completed: true });
    res.status(201).send("All completed todos cleared successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.filterToDo = async (req, res) => {
  try {
    const { filter } = req.query;
    let query = {};

    if (filter === "completed") query.completed = true;
    else if (filter === "active") query.completed = false;

    const todos = await ToDoModel.find(query);
    res.send(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
