import React, { Component } from "react";
import classes from "./Person.css";
import WithClass from "../../../hoc/WithClasses";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  constructor(props) {
    super(props);
    this.InputElRef = React.createRef();
  }
  static contextType= AuthContext;
  componentDidMount() {
    // this.InputEl.focus();
    //here also 
    this.InputElRef.current.focus();
  }
  render() {
    return (
      <WithClass classes={classes.Person}>
          {this.context.authenticated? <p>Authenicated</p> : <p>please login</p>}
        {/* <AuthContext.Consumer>
          {(context) =>
            context.authenticated? <p>Authenicated</p> : <p>please login</p>
          }
        </AuthContext.Consumer> */}
        <p onClick={this.props.click}>
          in {this.name} person {this.age} component
        </p>
        <p>{this.children}</p>
        <input
          type="text"
          //   ref={(inputEl)=>{this.InputEl= inputEl}}
          ref={this.InputElRef}
          onChange={this.props.change}
          value={this.props.name}
        />
      </WithClass>
    );
  }
}
Person.propTypes = {
  click: PropTypes.func,
  change: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
};
export default Person;
