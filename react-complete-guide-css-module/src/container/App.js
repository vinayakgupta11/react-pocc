/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import AuthContext from '../context/auth-context'
class App extends Component {
  state = {
    person: [
      { id: 1, name: "max", age: 28 },
      { id: 2, name: "manu", age: 50 },
      { id: 3, name: "vin", age: 40 },
    ],
    showPerson: false,
    changeCounter: 0,
    authentication:false
  };
  loginhandler=()=>{
    this.setState({authentication:true});
  }
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.person.findIndex((per) => {
      return per.id === id;
    });
    const persons = { ...this.state.person[personIndex] };
    persons.name = event.target.value;
    const per = [...this.state.person];
    per[personIndex] = persons;
    this.setState((prevState, props) => {
      return { person: per, changeCounter: prevState.changeCounter + 1 };
    });
  };
  toggleHandler = () => {
    console.log(this.state.showPerson);
    const doesshow = this.state.showPerson;
    console.log(doesshow);
    this.setState({
      showPerson: !doesshow,
    });
  };

  deleteHandler = (index) => {
    const persons = [...this.state.person];
    persons.splice(index, 1);
    this.setState({ person: persons });
  };
  render() {
    let person = null;

    if (this.state.showPerson) {
      person = (
        <div>
          <Persons
            person={this.state.person}
            click={this.deleteHandler}
            changed={this.nameChangeHandler}
            isAuthenticated={this.state.authentication}
          />
        </div>
      );
    }
    return (
      <div className={classes.App}>
        <AuthContext.Provider value={{authenticated:this.state.authentication, login: this.loginhandler}}>
        <Cockpit
          title={this.props.title}
          showpersons={this.state.showPerson}
          persons={this.state.person}
          clicked={this.toggleHandler}
          // login={this.loginhandler}
        />
        {person}
        </AuthContext.Provider>
      </div>
    );
  }
}
export default App;
  