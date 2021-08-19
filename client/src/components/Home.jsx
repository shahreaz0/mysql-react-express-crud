import React from "react";
import EmployeeForm from "./EmployeeForm";
import UploadCsvForm from "./UploadCsvForm";
import "./Home.css";

const Home = (props) => {
	return (
		<div className="Home">
			<div className="row m-0">
				<div className="left-bar col-md-4 bg-dark">
					<h1 className="left-bar-text">Add Employee</h1>
				</div>

				<div className="col-md-5 d-flex my-5 mx-auto flex-column justify-content-center">
					<EmployeeForm />
					<h3 className="text-center my-3">OR</h3>
					<p className="text-center m-0">
						Add multiple users with CSV file
					</p>
					<p className="warning text-center m-0">
						Only CSV file is allowed
					</p>
					<UploadCsvForm />
				</div>
			</div>
		</div>
	);
};

export default Home;
