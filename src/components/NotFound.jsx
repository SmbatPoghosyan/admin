import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import fadeIn from "./FadeIn";

const NotFound = () =>
{
	return (
		<div
			style={{
				position: "absolute",
				left: "50%",
				top: "40%",
				transform: "translate(-50%,-50%)"
			}}
		>
			<h1 style={{margin: "1rem", fontSize: "2rem", lineHeight: "3rem"}}>
				The Page Is Not Found !!!
			</h1>
			<Button>
				<Link to="/" style={{textDecoration: "none", color: "#fff"}}>
					Go Home
				</Link>
			</Button>
		</div>
	);
};

export default fadeIn(NotFound);
