const ToDoModel = require("../models/ToDoModal");

exports.getToDo = async(req, res) =>{
    try {
        const todo = await ToDoModel.find();
        res.send(todo);

    } catch (err) {
        res.status(500).json({message:err.message});
    }
};

exports.saveToDo = async (req,res) =>{
    try {
        const text = req.body.text;
        await ToDoModel.create({text});
        res.set(201).send("Todo added successfully");

    } catch (err) {
        res.status(500).json({message:err.message});
    }
};

exports.deleteToDo = async (req,res) =>{
    try {
        const {_id} = req.body;
        await ToDoModel.findByIdAndDelete({_id});
        res.set(201).send("Todo deleted successfully");

    } catch (err) {
        res.status(500).json({message:err.message});
    }
};

exports.updateToDo = async (req,res) =>{
    try {
        const {_id, text} = req.body;
        await ToDoModel.findByIdAndUpdate(_id, {text});
        res.set(201).send("Todo updated successfully");

    } catch (err) {
        res.status(500).json({message:err.message});
    }
};