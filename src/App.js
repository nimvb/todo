import React, { Component } from "react";
import "./App.css";
import Input from "./component/Input";
import List from "./component/List";
import Status from "./component/Status";

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="todoapp">
          <Input model={this.props.model} />
          <List model={this.props.model} />
          <Status model={this.props.model}/>
        </section>
        <div style={{textAlign:"center",fontWeight:700}}>
        <p>Double-click to edit a todo</p>
        <p>Press [ESC] to cancel edit mode</p>
        </div>
      </div>
    );
  }
}

export default App;
