import axios from "axios";

const fetch = axios.create({
	baseURL: "https://workman-server.herokuapp.com",
});

export default fetch;
