const Task = require('../models/Task');
const priorityConvertor = require('../config/priorityConvertor');


const getAllTasks = async (req, res) => {
    try {
        const filter ={};
        const { status, priority, sortBy, order } = req.query;
        if(status) filter.status = status;
        if(priority) filter.priority = priorityConvertor(priority);
        let tasks = {};
        if(sortBy){
            const newOrder = (order)=>{
                if(!order) return 1;
                if(order.toLowerCase() === "asc"){
                    return 1;
                }else{
                    return -1;
                }
            }
            const sortOrder = newOrder(order); 
             tasks = await Task.find(filter).sort({[sortBy]:sortOrder});
        }else{
             tasks = await Task.find(filter);
        }


        
        if(!tasks.length) return res.status(404).json({ message: "No tasks found" });
        
        
        const updatedTasks = tasks.map(task => {
            const taskObj = task.toObject(); 
            taskObj.priority = priorityConvertor(task.priority);
            return taskObj;
        });
        
        res.json(updatedTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createTask = async (req, res) => {

    if(!req?.body?.title || !req?.body?.description || !req?.body?.dueDate) {
        return res.status(400).json({ message: "Please fill all the required fields" });
    }

    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.dueDate,
            priority: req.body.priority? priorityConvertor(req.body.priority) : 0,
            status:req.body.status ? req.body.status : "Pending"
        });
        const taskObj = task.toObject(); 
        taskObj.priority = priorityConvertor(task.priority);
        res.status(201).json(taskObj);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTask= async (req,res) =>{
    if(!req?.params?.id){
        return res.status(400).json({message:"Please provide a task id"});
    }

    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        const taskObj = task.toObject(); 
        taskObj.priority = priorityConvertor(task.priority);
        res.json(taskObj);
    }catch(err){
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req,res) =>{
    if(!req?.params?.id){
        return res.status(400).json({message:"Please provide a task id"});
    }

    try{
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message:"Task not found"});
        
        if(req.body.title) task.title = req.body.title;
        if(req.body.description) task.description = req.body.description;
        if(req.body.due_date) task.due_date = req.body.due_date;
        if(req.body.priority) task.priority = priorityConvertor(req.body.priority);
        if(req.body.status) task.status = req.body.status;

        const newTask = await task.save();
        const taskObj = newTask.toObject(); 
        taskObj.priority = priorityConvertor(newTask.priority);
        res.json(taskObj);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const deleteTask = async (req,res) =>{
    if(!req?.params?.id){
        return res.status(400).json({message:"Please provide a task id"});
    }

    try{
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(400).json({message:"Task not found"});

        const deletedTask = await Task.findOneAndDelete(req.params.id);
        
        const taskObj = deletedTask.toObject(); 
        taskObj.priority = priorityConvertor(deletedTask.priority);
        res.status(200).json(taskObj);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };