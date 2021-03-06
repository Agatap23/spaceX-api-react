import React from "react";
import Launches from "./components/Launches";
import Header from "./components/Header";
import Paginate from "./components/Paginate";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      launches: [],
      response: {},
      apiUrl: "https://api.spacexdata.com/v5/launches/query",
      pageNumber: 1,
      searchName: null,
      body: {
        query: {},
        options: {
          page: 1,
        },
      },
    };
  }

  getLaunches = () => {
    fetch(this.state.apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(this.state.body),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        this.setState({ response: resp });
        this.setState({ launches: resp.docs });
      });
  };

  searchValue = (value) => {
    const currentQuery = this.state.body;
    if (value.length) {
      currentQuery.query["name"] = value;
    } else delete currentQuery.query.name;
    this.setState({ searchName: value });
    this.setState({ body: currentQuery });
    this.getLaunches();
  };

  selectChange = (query) => {
    const currentQuery = this.state.body;
    currentQuery.query = query;
    if (this.state.searchName) {
      currentQuery.query["name"] = this.state.searchName;
    }
    currentQuery.options.page = 1;
    this.setState({ body: currentQuery });
    this.getLaunches();
  };

  nextPage = () => {
    if (this.state.response.hasNextPage) {
      const currentQuery = this.state.body;
      currentQuery.options.page = currentQuery.options.page + 1;
      this.getLaunches();
    }
  };

  prevPage = () => {
    if (this.state.response.hasPrevPage) {
      const currentQuery = this.state.body;
      currentQuery.options.page = currentQuery.options.page - 1;
      this.getLaunches();
    }
  };

  componentDidMount() {
    this.getLaunches();
  }

  render() {
    return (
      <div className="App">
        <Header onSelectChange={this.selectChange} onSearchValue={this.searchValue} />
        <Launches launches={this.state.launches} />
        <Paginate
          onNextPage={this.nextPage}
          onPrevPage={this.prevPage}
          hasPrevPage={this.state.response.hasPrevPage}
          hasNextPage={this.state.response.hasNextPage}
          display={this.state.launches.length}
        />
      </div>
    );
  }
}

export default App;
