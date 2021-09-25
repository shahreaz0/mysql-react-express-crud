import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// utils
import fetch from "../utils/axios";

// mail form validation schema
const schema = yup.object().shape({
	subject: yup.string().required(),
	body: yup.string().required(),
});

const MailForm = () => {
	const onSubmitForm = async (data) => {
		try {
			await fetch.post("/api/employees/sendmail", {
				subject: data.subject,
				body: data.body,
				emails: props.emails,
			});
			alert("successfully sent email. Click Ok to continue");
		} catch (error) {
			alert("Error happend. Try Again.");
			console.log(error);
		}
	};

	// hook
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmitForm)} className="mx-auto">
				<div className="col-md-12">
					<label htmlFor="subject" className="form-label">
						Subject
					</label>
					<input
						type="subject"
						className="form-control form-control-sm"
						id="subject"
						{...register("subject")}
					/>
					<div className="my-2">
						<p className="error-msg">
							{errors["subject"]?.message}
						</p>
					</div>
				</div>

				<div className="col-md-12">
					<label htmlFor="subject" className="form-label">
						Body
					</label>
					<textarea
						className="form-control form-control-sm"
						id="body"
						{...register("body")}
					></textarea>
					<div className="my-2">
						<p className="error-msg">{errors["body"]?.message}</p>
					</div>
				</div>

				<input type="submit" className="btn btn-dark btn-sm" />
			</form>
		</div>
	);
};

export default MailForm;
