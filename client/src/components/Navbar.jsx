import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					HRman
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
						<NavLink
							className="nav-link"
							aria-current="page"
							to="/"
						>
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
