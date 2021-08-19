import React from "react";
import axios from "axios";
import "./EmployeeList.css";
import _ from "lodash";
const employeePerPage = 5;

export default class EmployeeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: [],
			paginate: [],
			currentPage: 1,
		};
	}

	async componentDidMount() {
		const { data } = await axios.get("http://localhost:3001/api/employees");
		this.setState({
			employees: data,
			paginate: _(data).slice(0).take(employeePerPage).value(),
		});
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

	render() {
		const { employees, paginate, currentPage } = this.state;

		const pageCount = employees
			? Math.ceil(employees.length / employeePerPage)
			: 0;

		if (pageCount === 1) return null;
		const pages = _.range(1, pageCount + 1);

		return (
			<div className="EmployeeList row m-0">
				<div className="left-bar col-md-4 bg-dark">
					<h1 className="left-bar-text barlow-font-600">All Employees</h1>
				</div>

				<div className="col d-flex flex-column justify-content-center margin">
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
														value=""
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
			</div>
		);
	}
}
