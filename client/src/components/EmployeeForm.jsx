import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./EmployeeForm.css";

const formInputData = [
	{ type: "text", name: "firstName", label: "First Name" },
	{ type: "text", name: "lastName", label: "Last Name" },
	{ type: "email", name: "email", label: "Email" },
];

const schema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
});

const EmployeeForm = () => {
	const onSubmit = async (data) => {
		try {
			await axios.post("http://localhost:3001/api/employees", {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
			});
			alert("successful");
		} catch (e) {
			console.log(e);
		}
	};

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
			<div className="my-2">
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
