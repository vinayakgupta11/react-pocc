import React,{Component} from 'react';
import Person from './Person/Person';

class Persons extends Component{
  render()
  {
    return this.props.person.map((person, index) => {
      return (
        <Person
          click={() => this.props.click(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          change={(event) => this.props.changed(event, person.id)}
          // isAuth={this.props.isAuthenticated}
        />
      );
    });
  }
}
      export default Persons;