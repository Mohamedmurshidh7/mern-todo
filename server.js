const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors= require('cors'); 
const port= 4000;
const todoroutes=express.Router();
const mongoose = require('mongoose');
let todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/todos',{ useNewUrlParser : true });
const connection = mongoose.connection;

connection.once('open',function(){console.log("connection successful")});

todoroutes.route('/').get(function(req,res){
    todo.find(function(err,todos)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(todos);
        }
    })
})

todoroutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    todo.findById(id,function(err,todo)
    {
        res.json(todo);
    })
})

todoroutes.route('/add').post(function(req,res){
    let Todo = new todo(req.body);
    Todo.save()
    .then(todo=>{
        res.status(200).json({'todo':'todo added successfully'});
    })
    .catch(err=>{
        res.status(400).send('adding todo failed ');
    })
})
todoroutes.route('/update/:id').post(function(req,res){
    todo.findById(req.params.id,function(err,todo){
        if(!todo)
        {
            res.status(404).send('data not found');
        }
        else
        {
            todo.description=req.body.description;
            todo.responsible=req.body.responsible;
            todo.priority=req.body.priority;
            todo.completed= req.body.completed;
            todo.save().then(todo=>{
                console.log(req.body);
                res.json('todo updated');
            }) 
            .catch(err=>{res.send(err);
            })

        }
    })
})
todoroutes.route('/Delete/:id').get(function(req,res){
    todo.findByIdAndDelete({_id : req.params.id}).then(function(err,todos)
    {
            res.json('todo deleted');
    });
});
app.use('/todos',todoroutes);
app.listen(port,()=>console.log("server running on "+port))
