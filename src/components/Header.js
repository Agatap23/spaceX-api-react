import React from "react";
import Form from 'react-bootstrap/Form';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        let query = {"query": {}, "options": {"pagination": false}};
        switch (e.target.value) {
            case "":
            break;
            case "success":
                query.query = {"success": true};
            break;
            case "failed":
                query.query = {"success": false};
            break;
            case "upcoming":
                query.query = {"upcoming": true};
            break;
        }
        this.props.onSelectChange(query)
    }

    render() {
        return (
            <div className="bg-primary p-4 mb-3">
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