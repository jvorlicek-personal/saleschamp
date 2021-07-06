import React from "react";
import "./App.css";
import AppBody from "./components/appBody/AppBody"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      fakeData: true,
    };
  }

  render() {
    return (
      <AppBody 
      fakeData={this.state.fakeData}
      />
    );
  }
}

export default App;
