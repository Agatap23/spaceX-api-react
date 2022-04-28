import React from "react";
import Pagination from "react-bootstrap/Pagination";

class Paginate extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePrevPage = () => {
    this.props.onPrevPage();
  }

  handleNextPage = () => {
    this.props.onNextPage();
  }

  render() {
    return (
      <Pagination className="d-flex justify-content-center">
        <Pagination.Prev disabled={!this.props.hasPrevPage} onClick={this.handlePrevPage}/>
        <Pagination.Next disabled={!this.props.hasNextPage} onClick={this.handleNextPage}/>
      </Pagination>
    );
  }
}

export default Paginate;