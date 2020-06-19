import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import Header from './Components/Layout/Header'
import Todos from './Components/Todos'
import AddTodo from './Components/AddTodo';
import About from './Components/pages/About'
// import {v4 as uuid} from "uuid";
import Axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    todos: []
  }

  //make a get request to server to load todos
  componentDidMount(){
    Axios.get('/api/todos')
      .then(res => this.setState({ todos: res.data }))
  }

  //toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  delTodo = (id) => {
    Axios.delete(`/api/delete/${id}`)
      .then(res => res.status === 'error' ? console.log(res.status) : console.log('Data sent.'))
      // .then(res => this.setState({ todos: this.state.todos.filter(todo => todo._id !== id) }, res.data));
      this.setState({ todos: this.state.todos.filter(todo => todo._id !== id) });
  }

  addTodo = (title) => {
    Axios.post('/api/new', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
      
  }
  
  render(){
    return (
      <Router>
        <div className="App">
          <div className="conainter">
            <Header />
            <Route exact path='/' render={props => (
              <Fragment>
                <AddTodo addTodo={this.addTodo}/>
                {console.log(this.state.todos.id)}
                <Todos
                  todos={this.state.todos}
                  markComplete={this.markComplete} 
                  delTodo={this.delTodo}
                />
              </Fragment>
              )}
              />
            <Route path="/about" component={ About } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
