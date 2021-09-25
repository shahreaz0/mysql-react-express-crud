import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// utils
import fetch from "../utils/axios";

// form data
const formInputData = [
	{ type: "text", name: "firstName", label: "First Name" },
	{ type: "text", name: "lastName", label: "Last Name" },
	{ type: "email", name: "email", label: "Email" },
];

// error validation schema
const schema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
});

const EmployeeForm = () => {
	const onSubmit = async (data) => {
		try {
			await fetch.post("/api/employees", {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
			});
			alert("Successfully Added to the database. Click OK to continue.");
		} catch (error) {
			console.log(error);
			alert("Error happend. Try Again.");
		}
	};

	// hooks
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const inputUI = formInputData.map((data, key) => (
		<div className="col-md-12" key={key}>
			<label htmlFor="firstName" className="form-label">
				{data.label}
			</label>
			<input
				type={data.type}
				className="form-control"
				id="firstName"
				{...register(data.name)}
			/>
			<div className="my-1">
				<p className="error-msg">{errors[data.name]?.message}</p>
			</div>
		</div>
	));

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
				{inputUI}
				<input type="submit" className="btn btn-dark" />
			</form>
		</div>
	);
};

export default EmployeeForm;
