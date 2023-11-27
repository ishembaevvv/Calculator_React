import React from 'react';
import store from './store';
import scss from './App.module.scss';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      out: "0",
    }
    this.refOutput = React.createRef();
  }

  tapeNumber = (value) => {
    let currentValue = value;
    let output = this.refOutput.current;

    this.setState({
      out: currentValue
    })
    if (output.value === "0") output.value = "";
    output.value += currentValue;
  }

  tapeOperation = (value) => {
    let output = this.refOutput.current;

    if (value === "<") {
      if (output.value.length === 1) {
        output.value = "0";
      } else {
        output.value = output.value.substring(0, output.value.length - 1);
      }
    } else if (value === "AC") {
      output.value = "0";
      output.style.color = "black";
    } else if (value === "=") {
      try {
        output.value = eval(output.value);
        output.style.color = "green";
      } catch {
        output.value = "Error!";
        output.style.color = "red";
        setTimeout(() => {
          output.value = "0";
          output.style.color = "black"
        }, 2000)
      }
    }
  }

  render() {
    return (
      <div className={scss.container}>
        <div className={scss.output}>
          <input ref={this.refOutput} type='text' defaultValue={this.state.out} />
        </div>
        <div className={scss.buttons}>
          {
            store.buttons.map((item) => {
              return <button
                onClick={() => { this.tapeNumber(item.val) }}
                style={{ backgroundColor: item.bg }}>{item.val}</button>
            })
          }
          {
            store.operations.map((item) => {
              return <button
                onClick={() => { this.tapeOperation(item.val) }}
                style={{ backgroundColor: item.bg }}>{item.val}</button>
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
