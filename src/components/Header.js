import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    submitSearch = (e) => {
        e.preventDefault();
        this.props.onSearchValue(e.target[0].value)
    }

    handleChange = (e) => {
        let query = {};
        switch (e.target.value) {
            case "":
            break;
            case "success":
                query = {"success": true}
            break;
            case "failed":
                query = {"success": false}
            break;
            case "upcoming":
                query= {"upcoming": true}
            break;
        }
        this.props.onSelectChange(query)
    }

    render() {
        return (
            <div className="bg-primary p-4 mb-3">
                <Form onSubmit={this.submitSearch} className="d-flex mb-2">
                    <Form.Control type="text"></Form.Control>
                    <Button type="submit" className="bg-white text-black">Search</Button>
                </Form>
                <Form.Select onChange={this.handleChange}>
                    <option value="">Show all launches</option>
                    <option value="success">Show only successful launches</option>
                    <option value="failed">Show only failed launches</option>
                    <option value="upcoming">Show only upcoming launches</option>
                </Form.Select>
            </div>
        )
    }
}

export default Header;