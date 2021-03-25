import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';

/*const Todo = props=>(
    <tr>
        <td><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg></td>
        <td className={props.todo.completed ? 'completed' : ''} >
            {props.todo.description}
        </td>
        <td className={props.todo.completed ? 'completed' : ''}>
            {props.todo.responsible}
        </td>
        <td className={props.todo.completed ? 'completed' : ''}>
            {props.todo.priority}
        </td>
        <td >
            <Link to ={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>

)*/
class Todo extends Component
{
    constructor(props)
    {
        super(props);
    }
    onDelete()
    {
        axios.get('http://localhost:4000/todos/Delete/'+this.props.match.params.id)
        .then(res => console.log(res.data));

        this.props.history.push('/');
    }
    render()
    {
        return(
     <tr>
        <td> <Link to ={"/delete/" + this.props.todo._id}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg></Link>
        </td>
        <td className={this.props.todo.completed ? 'completed' : ''} >
            {this.props.todo.description}
        </td>
        <td className={this.props.todo.completed ? 'completed' : ''}>
            {this.props.todo.responsible}
        </td>
        <td className={this.props.todo.completed ? 'completed' : ''}>
            {this.props.todo.priority}
        </td>
        <td >
            <Link to ={"/edit/" + this.props.todo._id}>Edit</Link>
        </td>
    </tr>
        );
    }
}

export default class TodosList extends Component {
   constructor(props)
   {
       super(props);
       this.state={todos : []};
   }
   componentDidMount()
   {
       axios.get('http://localhost:4000/todos')
       .then(res =>
         {this.setState({todos : res.data});
            })
        .catch(error => console.log(error))
   }
   componentDidUpdate()
   {
    axios.get('http://localhost:4000/todos')
    .then(res =>
      {this.setState({todos : res.data});
         })
     .catch(error => console.log(error))
   }
   todolist()
   {
       return this.state.todos.map(function(current,i)
       {
        return (<Todo todo = {current} key = {i}/>);
       });
   }
    render() {
        return (
            <div>
                <h3>Todos list</h3>
                <table className="table table-striped" style={{marginTop : 20}}>
                <thead>
                <tr>
                <th></th>
                <th>Description </th>
                <th>Responsibility </th>
                <th>Priority</th>
                <th>Action</th>
                </tr>  
                  
                </thead> 
                <tbody>
                {this.todolist()}    
                </tbody>   
                </table> 
            </div>
        )
    }
}