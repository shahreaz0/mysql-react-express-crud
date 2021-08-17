import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadCsv from "./UploadCsv";

const formInputData = [
	{ type: "text", name: "firstName", label: "First Name" },
	{ type: "text", name: "lastName", label: "Last Name" },
	{ type: "email", name: "email", label: "email" },
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
		<div key={key}>
			<input
				type={data.type}
				{...register(data.name)}
				placeholder={data.label}
			/>
			<p>{errors[data.name]?.message}</p>
		</div>
	));

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Add Employee</h1>
				{inputUI}
				<input type="submit" />
			</form>
			or
			<br />
			Add multiple users with csv file
			<UploadCsv />
		</div>
	);
};

export default EmployeeForm;
