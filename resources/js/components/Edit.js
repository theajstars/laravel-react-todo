import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import List from './List';

export default class Edit extends Component {
    constructor(props) {
        super(props)

        this.formSubmit = this.formSubmit.bind(this);
        this.titleChange = this.titleChange.bind(this);

        this.state = {
            todo_title: ''
        }
    }

    componentDidMount(){
        axios.get('/todos/edit/'+this.props.match.params.id)
            .then(response => {
                console.log(response)
                this.setState({
                    todo_title: response.data.title
                });
            })
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
        
        axios.put('/todos/update/'+this.props.match.params.id, todo)
            .then(res => console.log(res.data));

        this.setState({
            todo_title: ''
        });
    }

    
    
    render() {
        return (
                <div>
                    <form onSubmit={this.formSubmit}>
                        <input type="text" id="" className="form-control" onChange={this.titleChange} value={this.state.todo_title}/>
                        <br/>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
        );
    }
}

