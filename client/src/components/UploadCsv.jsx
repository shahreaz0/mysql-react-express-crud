import React from "react";
import axios from "axios";

class UploadCsv extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
		};
	}

	onFormSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("csvFile", this.state.file);
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		axios
			.post("http://localhost:3001/api/upload", formData, config)
			.then((response) => {
				alert("The file is successfully uploaded");
			})
			.catch((error) => {});
	};

	onChange = (e) => {
		this.setState({ file: e.target.files[0] });
	};

	render() {
		return (
			<form onSubmit={this.onFormSubmit}>
				<h1>File Upload</h1>
				<input type="file" name="csvFile" onChange={this.onChange} />
				<button type="submit">Upload</button>
			</form>
		);
	}
}

export default UploadCsv;
