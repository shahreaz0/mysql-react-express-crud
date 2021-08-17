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
		console.log(employees);

		const employeeUI = employees.map((employee) => (
			<ul key={Math.random()}>
				<li>
					{employee.firstName} {employee.lastName}
				</li>
				<li>{employee.email}</li>
			</ul>
		));

		return <div>{employeeUI}</div>;
	}
}
