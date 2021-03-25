import React, { Component } from 'react';
import axios from 'axios'

export default class deleteTodo extends Component {
    constructor(props)
    {
        super(props);

    }
    componentDidMount()
    {
        axios.get('http://localhost:4000/todos/delete/'+this.props.match.params.id)
        .then(res => {
            console.log(res);
            this.props.history.push('/');   
        })
        .catch(function(err)
        {
            console.log(err);
        })
        
    }
    render()
    {
        return(<div>Delete component</div>);
    }
   
}
