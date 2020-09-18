import React from 'react';
// import Radium from 'radium'
import styled from 'styled-components';
import './Person.css'
const person = (props) => {
    const PersonStyle = styled.div`
    width: 60%;
    box-shadow: 0 2px 3px #ccc;
    border: 1px solid #eee;
    margin: auto;
    padding: 16px;
    text-align: center;
    @media (min-width:500px) {
        width: 400px;
    }
    `;
//   const style= {
//       '@media (min-width:500px)':{
//           width: '400px'
//       }
//   }
    return  (
        <PersonStyle>
             <p onClick={props.click}>in {props.name} person {props.age} component</p>
            <p>{props.children}</p>
            <input type='text'  onChange={props.change} value={props.name}  />
        </PersonStyle>
           
    
    )

}
export default person;