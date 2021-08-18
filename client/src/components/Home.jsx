import React from "react";
import EmployeeForm from "./EmployeeForm";
import UploadCsvForm from "./UploadCsvForm";

const Home = (props) => {
	return (
		<div>
			<EmployeeForm />
			or
			<br />
			Add multiple users with csv file
			<UploadCsvForm />
		</div>
	);
};

export default Home;
