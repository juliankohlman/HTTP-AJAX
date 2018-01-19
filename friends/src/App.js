import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [{name: 'Loading...Amigos....'}],
      newFriend: {
        name: null,
        age: null,
        email: null
      }
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.addNewFriend = this.addNewFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  componentDidMount() {
    const url = 'http://localhost:5000/friends';

    axios.get(url)
      .then(response => this.setState({ friends: response.data}))
      .catch(error => console.log(error));
  }

  handleNameChange(e) {
    console.log(e);
    const name = e.target.value;
    this.setState({
      newFriend: {
        name,
        age: this.state.newFriend.age,
        email: this.state.newFriend.email,
      }
    })
  }

  handleAgeChange(e) {
    const age = e.target.value;
    this.setState({
      newFriend: {
        age,
        name: this.state.newFriend.name,
        email: this.state.newFriend.email,
      }
    })
  }

  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({
      newFriend: {
        email,
        age: this.state.newFriend.name,
        name: this.state.newFriend.name,
      }
    })
  }

  addNewFriend(e) {
    e.preventDefault();
    const newFriend = this.state.newFriend;
    const url = 'http://localhost:5000/friends';
    axios.post(url, newFriend)
      .then(response => { this.setState({ friends: response.data})})
      .catch(err => console.log(err));
  }

  deleteFriend(e) {
    const id = e.target.id;
    const url = 'http://localhost:5000/friends/';
    axios.delete(url + id)
      .then(response => { this.setState({ friends: response.data})})
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
       <h1>App</h1>
       <p>print friends</p>
       <form onSubmit={this.addNewFriend}>
          <input required='string' onChange={this.handleNameChange} placeholder='Name'></input>
          <input type='number' onChange={this.handleAgeChange} placeholder='Age'></input>
          <input type='email' onChange={this.handleEmailChange} placeholder='Email'></input>
          <button onClick={this.addNewFriend}>Add Homie</button>
        </form>
       <ul>
        {this.state.friends.map(friend => {
          return <li key={friend.id}>
            <div>{friend.name}</div>
            <div>{friend.age}</div>
            <div>{friend.email}</div>
            <button onClick={this.deleteFriend} id={friend.id}>delete</button>
          </li>
        })}
       </ul>

      </div>

    )
  }
}


export default App;
