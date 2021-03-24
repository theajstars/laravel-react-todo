import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class List extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           todos: [],
           incomplete: []
        }

        this.checkChange = this.checkChange.bind(this);
      }
      componentDidMount(){
          axios.get('/todos')
            .then(response => {
                this.setState({
                    todos: response.data
                });
                console.log(this.state.todos)
                var incomplete = []
                this.state.todos.map(todo => {
                    if(todo.status == "Unfinished"){
                        incomplete.push(todo);
                        this.setState({
                            incomplete: incomplete
                        })
                    }
                })
                
            })
      }

      checkChange(e){
          axios.get('/todos/edit/'+e.target.id)
            .then(response => {
                const completedTodo = {
                    todo_title: response.data.title,
                    todo_status: "Completed"
                }
                axios.put(`/todos/complete/${response.data.id}`, completedTodo)
                    .then(responded => {
                        var todos = this.state.todos;

                        for(var i = 0; i < todos.length; i++){
                            if(todos[i].id == response.data.id){
                                todos[i].status = "Completed";
                                todos[i].updated_at = todos[i].updated_at;
                                this.setState({
                                    todos: todos
                                });
                            }
                        }
                    });
            });
      }


      onDelete(todo_id){
          axios.delete('/todos/delete/'+todo_id)
            .then(response => {
                var todos = this.state.todos;

                for(var i = 0; i < todos.length; i++){
                    if(todos[i].id == todo_id){
                        todos.splice(i, 1);
                        this.setState({todos: todos});
                    }
                }
            })
      }
      unfinishedDelete(todo_id){
          axios.delete('/todos/delete/'+todo_id)
            .then(response => {
                var todos = this.state.incomplete;

                for(var i = 0; i < todos.length; i++){
                    if(todos[i].id = todo_id){
                        todos.splice(i, 1);
                        this.setState({
                            incomplete: todos
                        });
                    }
                }
            })
      }
      render() {
        return (
          <div>
                <br/><br/><br/>
              {/* Display unfinished tasks */}
              <h4>Unfinished tasks</h4>
                <table className="table table-striped" border="0" id="unfinished">
                    <tbody>
                    {
                        this.state.incomplete.map(todo => {
                            if(todo.status === "Unfinished"){
                                return(
                                    <tr key={todo.id}>
                                        <td>{todo.title}</td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" onClick={this.checkChange} id={todo.id}/>
                                        </td>
                                        <td>
                                            <Link to={`/todos/edit/${todo.id}`}>Edit</Link>
                                        </td>
                                        <td style={{textAlign: "center"}}>
                                        <a href="#" onClick={this.unfinishedDelete.bind(this , todo.id)} style={{color: "red", fontWeight:"bolder", cursor:'pointer'}}><i className="far fa-trash-alt"></i></a>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                </table>
                <hr width="100%" size="2"/>
                {/* Display compleeted tasks */}
                <h4>Completed tasks</h4>
                <table className="table table-striped" border="0" id="completed">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Completed on</th>
                            <th style={{textAlign: "center"}}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(todo => {
                                if(todo.status === "Completed"){
                                    function todoDate(todoCompletedDate){
                                        var completedDate = new Date(todoCompletedDate);
                                        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                        var timee = completedDate.getHours() >= 12 ? "pm" : "am";
                                        var returnedCompletedDate = days[completedDate.getDay()] + " " + months[completedDate.getMonth()] + " " + completedDate.getDate() + " " + completedDate.getFullYear() + " " + completedDate.getHours() + ":" + completedDate.getMinutes() + timee;
                                        return returnedCompletedDate;
                                    }
                                    return(
                                        <tr key={todo.id}>
                                            <td><s>{todo.title}</s></td>
                                            <td>{todoDate(todo.updated_at)}</td>
                                            <td style={{textAlign: "center"}}>
                                                <a href="#" onClick={this.onDelete.bind(this , todo.id)} style={{color: "red", fontWeight:"bolder", cursor:'pointer'}}><i className="far fa-trash-alt"></i></a>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
          </div>
        )
      }

}
