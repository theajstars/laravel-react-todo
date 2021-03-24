import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import Create from './Create'
import Edit from './Edit'
import List from './List'

export default class App extends Component {
    constructor() {
        super()
    }
    render(){
        return(
            <div className="container">
                <Router>
                    <h1 align="center">ToDo App</h1>
                    <br/><br/>
                    <Link to = "/" className="btn btn-primary">Show All</Link> &nbsp; &nbsp;
                    <Link to ='/add' className="btn btn-secondary">Add New</Link>
                    <br/><br/>
                    <Route exact path="/" component={List}/>
                    <Route exact path="/todos/edit/:id" component={Edit} />
                    <Route exact path="/add" component={Create}/>
                </Router>
            </div>
        )
    }
}

if(document.getElementById('app')){
    ReactDOM.render(<App/>, document.getElementById('app'));
}
