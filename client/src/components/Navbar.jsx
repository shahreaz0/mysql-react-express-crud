import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed">
			<div className="container-fluid">
				<NavLink className="navbar-brand barlow-font-600" to="/">
					HRMAN
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarNavAltMarkup"
				>
					<div className="navbar-nav">
						<NavLink className="nav-link" to="/">
							Home
						</NavLink>
						<NavLink className="nav-link" to="/employees">
							All Employees
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
