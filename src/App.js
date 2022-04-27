import React from "react";
import Launches from "./components/Launches";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      launches: [],
      apiUrl: "https://api.spacexdata.com/v5/launches",
    };
  }

  getLaunches = (url, body) => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        this.setState({ launches: resp.docs });
      });
  };

  selectChange = (query) => {
    this.getLaunches(this.state.apiUrl + "/query", query);
  };

  componentDidMount() {
    this.getLaunches(this.state.apiUrl + "/query", {"options": {"page": 1}});
  }

  render() {
    return (
      <div className="App">
        <Header onSelectChange={this.selectChange} />
        <Launches launches={this.state.launches} />
      </div>
    );
  }
}

export default App;
