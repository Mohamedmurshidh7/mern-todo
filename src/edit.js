import React, { Component } from 'react';
import axios from 'axios'


export default class EditTodo extends Component {
    constructor(props)
    {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangedescription=this.onChangedescription.bind(this);
        this.onChangeresponsible=this.onChangeresponsible.bind(this);
        this.onChangecompleted=this.onChangecompleted.bind(this);
        this.onChangeTodoPriority=this.onChangeTodoPriority.bind(this);
        this.state={
            description : '',
            responsible : '',
            priority : '',
            completed : false
        }
    }
    componentDidMount()
    {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                description:response.data.description,
                responsible : response.data.responsible,
                priority : response.data.priority,
                completed: response.data.completed
            })
        })
        .catch(function(err)
        {
            console.log(err);
        })
    }
   
    onChangedescription(e)
    {
        this.setState({
            description : e.target.value
        });
    }
    onChangeresponsible(e)
    {
        this.setState({
            responsible: e.target.value
        });
    }
    onChangeTodoPriority(e)
    {
        this.setState({
            priority:e.target.value
        });
    }
    onChangecompleted(e)
    {
        this.setState({
            completed: !this.state.completed
        })
    }
    onSubmit(e)
    {
        e.preventDefault();
        const obj = {
                description:this.state.description, 
                responsible:this.state.responsible,
                priority:this.state.priority,
                completed:this.state.completed
        };
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id,obj)
        .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
               <h3> Update todo</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Description</label>
                       <input type="text" 
                       className="form-control" 
                       value={this.state.description}
                       onChange={this.onChangedescription}/>    
                   </div>
                   <div className="form-group">
                       <label>Responsible</label>
                       <input type="text" 
                       className="form-control" 
                       value={this.state.responsible}
                       onChange={this.onChangeresponsible}/>    
                   </div>
                   <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                        </div>
                        <div className="form-check">
                            <input type="checkbox"
                            className="form-check-input"
                            onChange={this.onChangecompleted}
                            checked={this.state.completed}
                            value={this.state.completed}
                            />
                            <label className="form-check-label" >Completed</label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update todo" className="btn-btn-primary"/>
                        </div>
               </form>
            </div>
        )
    }
}