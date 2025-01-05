import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ChipInput from "./ChipInput";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Navbar = () => {
	return (
		<div className="containers">
			<Box
			component={Link}
			to="/" id="picture"
			sx={{marginBottom: "10px"}}>
			</Box>
			<Typography variant="h1">watcha got?</Typography>
			<ChipInput />
		</div>
	);
};

export default Navbar;
