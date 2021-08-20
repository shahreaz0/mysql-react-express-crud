import React, { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

const UploadCsv = (props) => {
	const [csvFile, setCsvFile] = useState([]);

	return (
		<div className="my-3">
			<FilePond
				files={csvFile}
				onupdatefiles={setCsvFile}
				allowMultiple={false}
				server="http://localhost:3001/api/upload"
				name="csvFile"
				labelFileProcessingError="Only CSV file is allowed"
				labelFileProcessingComplete="Uploaded data to the database"
				dropOnPage={true}
				labelIdle='Drag & Drop .csv file or <span class="filepond--label-action">Browse</span>'
			/>
		</div>
	);
};

export default UploadCsv;