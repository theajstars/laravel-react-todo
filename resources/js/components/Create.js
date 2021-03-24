import axios from 'axios';
import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import List from './List'

export default class Create extends Component {
    constructor() {
        super()

        this.formSubmit = this.formSubmit.bind(this);
        this.titleChange = this.titleChange.bind(this);

        this.state = {
             todo_title: ''
        }
    }

    titleChange(e){
        this.setState({
            todo_title: e.target.value
        });
    }

    formSubmit(e){
        e.preventDefault();
        const todo = {
            todo_title: this.state.todo_title,
            todo_status: "Unfinished"
        }
        axios.post('/todos/add', todo)
            .catch(error => console.log(error.response));
        
        this.setState({
            todo_title: ''
        });
    }

    
    
    render() {
        return (
                <div>
                    <form onSubmit={this.formSubmit}>
                        <input type="text" placeholder="Task" id="" className="form-control" onChange={this.titleChange} value={this.state.todo_title}/>
                        <br/>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
        );
    }
}

