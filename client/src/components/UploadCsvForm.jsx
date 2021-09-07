import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

const UploadCsv = () => {
	// hook
	const [csvFile, setCsvFile] = useState([]);

	return (
		<div className="my-3">
			<FilePond
				files={csvFile}
				onupdatefiles={setCsvFile}
				allowRevert={true}
				server="http://localhost:3001/api/upload"
				instantUpload={false}
				name="csvFile"
				labelFileProcessingError="Only CSV file is allowed"
				dropOnPage={true}
				labelIdle='Drag & Drop .csv file or <span class="filepond--label-action">Browse</span>'
			/>
		</div>
	);
};

export default UploadCsv;
