import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const UploadCsv = (props) => {
	const { register, handleSubmit } = useForm();

	const fileUploadHandler = async (data) => {
		try {
			const formData = new FormData();
			formData.append("csvFile", data.csvFile[0]);

			await axios.post("http://localhost:3001/api/upload", formData);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit(fileUploadHandler)}>
				<input type="file" {...register("csvFile")} accept=".csv" />
				<input type="submit" />
			</form>
		</div>
	);
};

export default UploadCsv;
