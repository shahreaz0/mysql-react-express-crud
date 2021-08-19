import React from "react";
import axios from "axios";

export default class EmployeeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: [],
		};
	}

	async componentDidMount() {
		const { data } = await axios.get("http://localhost:3001/api/employees");
		this.setState({
			employees: data,
		});
	}

	render() {
		const { employees } = this.state;

		const employeeUI = employees.map((employee) => (
			<ul key={Math.random()}>
				<li>
					{employee.firstName} {employee.lastName}
				</li>
				<li>{employee.email}</li>
			</ul>
		));
		// {employeeUI}

		return (
			<div>
				<div className="row m-0">
					<div className="left-bar col-md-4 bg-dark">
						<h1 className="left-bar-text">All Employees</h1>
					</div>

					<div className="col d-flex m-3 flex-column justify-content-center">
						{employeeUI}
					</div>
				</div>
			</div>
		);
	}
}
