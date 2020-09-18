import React, { useEffect, useRef,useContext } from "react";
import classes from "./cockpit.css";
import Aux from "../../hoc/auxillary";
import AuthContext from "../../context/auth-context";

const cockpit = (props) => {
    const auth= useContext(AuthContext);
  const toggle = useRef(null);
  useEffect(() => {
    toggle.current.click();
  }, []);
  let parClass = [];
  let btnClass = [classes.Button];
  if (props.showpersons) {
    btnClass.push(classes.Red);
  }
  if (props.persons.length <= 2) {
    parClass.push(classes.red);
  }
  if (props.persons.length <= 1) {
    parClass.push(classes.bold);
  }
  return (
    <Aux>
      <p className={parClass.join(" ")}>{props.title}</p>
      <button
        className={btnClass.join(" ")}
        onClick={props.clicked}
        ref={toggle} >
        Toggle
      </button>
      <button onClick={auth.login}>login</button>
      {/* <AuthContext.Consumer>
        {(context)=>
        {
            return(<button onClick={context.login}>login</button>);
        }}
      </AuthContext.Consumer> */}

      <p>it is working</p>
    </Aux>
  );
};
export default cockpit;
