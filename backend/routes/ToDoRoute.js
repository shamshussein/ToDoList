const express = require('express');
const router = express.Router();
const todoController = require("../controllers/ToDoController");

router.get("/get-todo", todoController.getToDo);
router.post("/save-todo", todoController.saveToDo);
router.post("/delete-todo", todoController.deleteToDo);
router.post("/update-todo", todoController.updateToDo);
router.post("/clear-completed", todoController.clearCompleted);
router.get("/filter-todo", todoController.filterToDo);
module.exports = router;


