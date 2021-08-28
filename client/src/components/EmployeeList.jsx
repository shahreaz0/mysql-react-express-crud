import React, { Component } from "react";
import axios from "axios";
import "./EmployeeList.css";
import ReactPaginate from "react-paginate";

//components
import MailForm from "./MailForm";

export default class EmployeeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: [],
			pageNumber: 0,
			allEmails: [],
			checked: false,
			isLoading: true,
		};
	}

	async componentDidMount() {
		try {
			const { data } = await axios.get(
				"http://localhost:3001/api/employees"
			);
			this.setState(
				{
					employees: data,
					isLoading: true,
				},
				() => this.setState({ isLoading: false })
			);
		} catch (error) {
			alert("Error happned. Try Again. Click OK to continue");
			console.log(error);
		}
	}

	checkboxHandler = (event) => {
		const { value, checked } = event.target;

		if (checked) {
			this.setState((prevState) => {
				return {
					allEmails: [...prevState.allEmails, value],
				};
			});
		} else {
			this.setState((prevState) => {
				return {
					allEmails: prevState.allEmails.filter((e) => e !== value),
				};
			});
		}
	};

	changePage = ({ selected }) => {
		this.setState({ pageNumber: selected });
	};

	render() {
		const { employees, pageNumber, allEmails, isLoading } = this.state;
		const employeePerPage = 5;
		const pagesVisited = pageNumber * employeePerPage;
		const pageCount = Math.ceil(employees.length / employeePerPage);

		const displayEmployees = employees
			.slice(pagesVisited, pagesVisited + employeePerPage)
			.map((employee, key) => (
				<tr key={key}>
					<td>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value={employee.email}
								onChange={this.checkboxHandler}
								id="flexCheckDefault"
							/>
						</div>
					</td>
					<td>{employee.id}</td>
					<td>{employee.firstName}</td>
					<td>{employee.lastName}</td>
					<td>{employee.email}</td>
				</tr>
			));

		return (
			<div className="EmployeeList row m-0">
				<div className="left-bar col-md-4 bg-dark">
					<h1 className="left-bar-text barlow-font-600">
						All Employees
					</h1>
				</div>
				<div className="col d-flex flex-column margin">
					{isLoading ? (
						<div className="loader">
							<div className="lds-ripple">
								<div></div>
								<div></div>
							</div>
						</div>
					) : (
						<div>
							<div className="table-responsive">
								<table className="table table-hover">
									<thead>
										<tr>
											<th></th>
											<th>ID</th>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Email</th>
										</tr>
									</thead>
									<tbody>{displayEmployees}</tbody>
								</table>
							</div>

							{employees.length !== 0 && (
								<ReactPaginate
									previousLabel={"Prev"}
									pageCount={pageCount}
									onPageChange={this.changePage}
									containerClassName={"paginationBttns"}
									previousLinkClassName={"previousBttn"}
									nextLinkClassName={"nextBttn"}
									disabledClassName={"paginationDisabled"}
									activeClassName={"paginationActive"}
								/>
							)}

							{employees.length === 0 ? (
								"No employees on the database."
							) : allEmails.length === 0 ? (
								<p className="mt-3">
									No employee checked. Check for send email.
								</p>
							) : (
								<MailForm emails={allEmails} />
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}
