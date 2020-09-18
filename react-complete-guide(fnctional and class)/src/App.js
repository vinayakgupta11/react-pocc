import React, { Component } from "react";
// import Radium,{StyleRoot} from 'radium'
import styled from "styled-components";
import "./App.css";
import Person from "./Person/Person";
const AppStyle = styled.button`
border: 1px solid blue;
background-color: ${(pr)=> pr.alt ? 'red': 'green'};
color : white;
&:hover {
  background-color:${(pr)=> pr.alt ? 'blue': 'lightgreen'};
  color:black
}

`;

class App extends Component {
  state = {
    person: [
      { id: 1, name: "max", age: 28 },
      { id: 2, name: "manu", age: 50 },
      { id: 3, name: "vin", age: 40 },
    ],
    showPerson: false,
  };

  switchNameHandler = (newName) => {
    //console.log('switch');
    //Dont do like this-- this.state.person[0].name= 'maximum'
    this.setState({
      person: [
        { id: 1, name: newName, age: 28 },
        { id: 2, name: "manu", age: 50 },
        { id: 3, name: "vin", age: 40 },
      ],
      otherState: "some other val",
    });
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.person.findIndex((per) => {
      return per.id === id;
    });

    // const persons= Object.assign({},this.state.persons[personIndex]);
    const persons = { ...this.state.person[personIndex] };
    console.log("personsss", persons);

    persons.name = event.target.value;

    const per = [...this.state.person];
    console.log("per", per);

    per[personIndex] = persons;
    this.setState({ person: per });

    // this.setState({
    //   person: [
    //     { name: event.target.value, age: 28 },
    //     { name: "manu", age: 50 },
    //     { name: "vin", age: 40 },
    //   ],
    //   otherState: "some other val",
    // });
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
    console.log("index", index);

    // const persons = this.state.person.slice();
    const persons = [...this.state.person];
    console.log("54", persons);

    persons.splice(index, 1);
    console.log("57", persons);
    this.setState({ person: persons });
  };
  render() {
    // const style = {
    //   border: "1px solid blue",
    //   cursor: "pointer",
    //   backgroundColor:'green',
    //   color : 'white',
    //   ':hover':{
    //     backgroundColor:'lightgreen',
    //     color:'black'
    //   }
    // };
    let person = null;
    if (this.state.showPerson) {
      person = (
        <div>
          {this.state.person.map((person, index) => {
            return (
              <Person
                click={() => this.deleteHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                change={(event) => this.nameChangeHandler(event, person.id)}
              />
            );
          })}
          {/* <Person
        change={this.nameChangeHandler}
        name={this.state.person[0].name}
        age={this.state.person[0].age}
      >
        My hobbies
      </Person>
      <Person
        click={this.switchNameHandler.bind(this, "max")}
        name={this.state.person[1].name}
        age={this.state.person[1].age}
      />
      <Person
        name={this.state.person[2].name}
        age={this.state.person[2].age}
      /> */}
        </div>
      );
      // style.backgroundColor = "red";
      // style[":hover"] = {
      //   backgroundColor: "lightred",
      //   color: "black",
      // };
    }
    // let paraClass = ['red', 'bold'].join(' ');
    let parClass = [];
    if (this.state.person.length <= 2) {
      parClass.push("red");
    }
    if (this.state.person.length <= 1) {
      parClass.push("bold");
    }
    return (
     
       <div className="App">
          <p className={parClass.join(" ")}>hi, welcome to app</p>
          <button onClick={() => this.switchNameHandler("maximum")}>
            switch
          </button>
          <AppStyle alt= {this.state.showPerson} onClick={this.toggleHandler}>
            Toggle
            </AppStyle>
          <p>it is working</p>
          {person}
        </div>
     
        
    
    );

    {
      /* {
          this.state.showPerson ?
          <div>
          <Person
          change={this.nameChangeHandler}
          name={this.state.person[0].name}
          age={this.state.person[0].age}
        >
          My hobbies
        </Person>
        <Person
          click={this.switchNameHandler.bind(this, "max")}
          name={this.state.person[1].name}
          age={this.state.person[1].age}
        />
        <Person
          name={this.state.person[2].name}
          age={this.state.person[2].age}
        />
        </div>:null
        } */
    }

    // return React.createElement('div',{className: 'App'}, React.createElement('h1', null, 'welcome to app'));
  }
}
// const app = (props) => {
//   const [personState, setPersonState] = useState({
//     person: [
//       { name: "max", age: 28 },
//       { name: "vin", age: 50 },
//     ],
//   });
//   const [otherSta, setOtherSta] = useState({ otherstate: "abc" });
//   console.log(personState, otherSta);
//   const switchNameHandler = () => {
//     setPersonState({
//       person: [
//         { name: "maximum", age: 28 },
//         { name: "vin", age: 50 },
//       ],
//     });
//   };
//   return (
//     <div className="App">
//       <h1>hi, welcome to app</h1>
//       <button onClick={switchNameHandler}>switch</button>
//       <p>it is working</p>
//       <Person name={personState.person[0].name} age={personState.person[0].age}>
//         My hobbies
//       </Person>
//       <Person
//         name={personState.person[1].name}
//         age={personState.person[1].age}
//       ></Person>
//     </div>
//   );
// };

export default App;
