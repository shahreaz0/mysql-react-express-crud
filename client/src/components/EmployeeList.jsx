import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeList.css";
import ReactPaginate from "react-paginate";

//components
import MailForm from "./MailForm";

// utils
import fetch from "../utils/axios";

const EmployeeList = () => {
	// states
	const [employees, setEmployees] = useState([]);
	const [emails, setEmails] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(async () => {
		try {
			setLoading(true);

			const { data } = await fetch.get("/api/employees");
			setEmployees(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			alert("Error happned. Try Again. Click OK to continue");
		}
	}, []);

	// Add email to emails array when checkbox is checked
	const checkboxHandler = (event) => {
		const { value, checked } = event.target;

		if (checked) {
			setEmails((prevEmails) => [...prevEmails, value]);
		} else {
			setEmails((prevEmails) => prevEmails.filter((e) => e !== value));
		}
	};

	// employee list pagination change page
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	// Pagination vars
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
							onChange={checkboxHandler}
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
				<h1 className="left-bar-text barlow-font-600">All Employees</h1>
			</div>
			<div className="col d-flex flex-column margin">
				{loading ? (
					<div className="loader">
						<div
							className="spinner-border text-secondary"
							role="status"
						>
							<span className="sr-only"></span>
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
								previousLabel="Prev"
								pageCount={pageCount}
								onPageChange={changePage}
								containerClassName="paginationBttns"
								previousLinkClassName="previousBttn"
								nextLinkClassName="nextBttn"
								disabledClassName="paginationDisabled"
								activeClassName="paginationActive"
							/>
						)}

						{employees.length === 0 ? (
							"No employees on the database."
						) : emails.length === 0 ? (
							<p className="mt-3">
								No employee checked. Check for send email.
							</p>
						) : (
							<MailForm emails={emails} />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default EmployeeList;
