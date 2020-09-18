import React, { Component } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionCreater from "../../store/action/index";

class Counter extends Component {
  // state = {
  //     counter: 0
  // }

  // counterChangedHandler = ( action, value ) => {
  //     switch ( action ) {
  //         case 'inc':
  //             this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
  //             break;
  //         case 'dec':
  //             this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
  //             break;
  //         case 'add':
  //             this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
  //             break;
  //         case 'sub':
  //             this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
  //             break;
  //     }
  // }

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl
          label="Add 10"
          clicked={() => this.props.onAddCounter(10)}
        />
        <CounterControl label="Subtract 10" clicked={this.props.onSubCounter} />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          store result
        </button>
        <ul>
          {this.props.storeResult.map((strres) => {
            return (
              <li
                key={strres.id}
                onClick={() => this.props.onDeleteResult(strres.id)}
              >
                {strres.val}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapToProps = (state) => {
  return {
    ctr: state.ctr.counterR,
    storeResult: state.res.results,
  };
};
const mapDispatch = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch(actionCreater.increment()),
    onDecrementCounter: () => dispatch(actionCreater.decrement()),
    onAddCounter: (addValue) => dispatch(actionCreater.add(addValue)),
    onSubCounter: () => dispatch(actionCreater.sub(10)),
    onStoreResult: (result) => dispatch(actionCreater.storeRes(result)),
    onDeleteResult: (id) => dispatch(actionCreater.delRes(id)),
  };
};
export default connect(mapToProps, mapDispatch)(Counter);
