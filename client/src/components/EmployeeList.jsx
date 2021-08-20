import React from "react";
import axios from "axios";
import "./EmployeeList.css";
import _ from "lodash";
import { Route, Link } from "react-router-dom";
import MailForm from "./MailForm";

const employeePerPage = 5;
export default class EmployeeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: [],
			paginate: [],
			currentPage: 1,
			allEmails: [],
			checked: false,
		};
	}

	async componentDidMount() {
		try {
			const { data } = await axios.get(
				"http://localhost:3001/api/employees"
			);
			this.setState({
				employees: data,
				paginate: _(data).slice(0).take(employeePerPage).value(),
			});
		} catch (e) {
			console.log(e);
		}
	}

	pagination = (pageNumber) => {
		const startIndex = (pageNumber - 1) * employeePerPage;
		const paginatedEmployee = _(this.state.employees)
			.slice(startIndex)
			.take(employeePerPage)
			.value();
		this.setState({
			currentPage: pageNumber,
			paginate: paginatedEmployee,
		});
	};

	checkboxHandler = (e) => {
		console.log(e.target.value);
		const { value, checked } = e.target;

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

	render() {
		const { employees, paginate, currentPage, allEmails } = this.state;

		const pageCount = employees
			? Math.ceil(employees.length / employeePerPage)
			: 0;

		if (pageCount === 1) return null;
		const pages = _.range(1, pageCount + 1);

		const employeesUI = (
			<div>
				{!employees ? (
					"No employee on the list"
				) : (
					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>ID</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Send Email</th>
								</tr>
							</thead>
							<tbody>
								{paginate.map((employee, key) => (
									<tr key={key}>
										<td>{employee.id}</td>
										<td>{employee.firstName}</td>
										<td>{employee.lastName}</td>
										<td>{employee.email}</td>
										<td>
											<div className="form-check">
												<input
													className="form-check-input"
													type="checkbox"
													value={employee.email}
													onChange={
														this.checkboxHandler
													}
													id="flexCheckDefault"
												/>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				<nav className="d-flex justify-content-center">
					<ul className="pagination">
						{pages.map((page, key) => (
							<li
								key={key}
								className={
									page === currentPage
										? "page-item active"
										: "page-item"
								}
							>
								<a
									className="page-link"
									onClick={() => this.pagination(page)}
								>
									{page}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		);

		return (
			<div className="EmployeeList row m-0">
				<div className="left-bar col-md-4 bg-dark">
					<h1 className="left-bar-text barlow-font-600">
						All Employees
					</h1>
				</div>
				<div className="col d-flex flex-column margin">
					{employeesUI}
					{employees.length === 0 ? (
						"No employees."
					) : allEmails.length === 0 ? (
						<p className="mt-3">No employee selected</p>
					) : (
						<MailForm emails={allEmails} />
					)}
				</div>
			</div>
		);
	}
}
