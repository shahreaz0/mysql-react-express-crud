import React from "react";
import axios from "axios";

export default class EmployeeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
		};
	}

	formHandler = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	};

	submitHandler = async () => {
		try {
			await axios.post("http://localhost:3001/api/employees", {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
			});
			alert("successful");
		} catch (e) {
			// statements
			console.log(e);
		}
	};

	render() {
		const { firstName, lastName, email } = this.state;
		return (
			<div>
				<form action="">
					<h1>Add Employee</h1>
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						value={firstName}
						onChange={this.formHandler}
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last Name"
						value={lastName}
						onChange={this.formHandler}
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={this.formHandler}
					/>
					<button onClick={this.submitHandler}>Submit</button>
				</form>
			</div>
		);
	}
}
