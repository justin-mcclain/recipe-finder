import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import ChipInput from "./ChipInput";
import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Navbar = () => {
	let theme = createTheme({
		typography: {
			h1: {
				fontSize: "4rem",
			},
			body1: {
				fontSize: "1rem",
			},
		},
	});
	theme = responsiveFontSizes(theme);
	return (
		<div id="nav">
			<Box
			component={Link}
			to="/" id="picture">
				
			</Box>
			<ThemeProvider theme={theme}>
				<Typography variant="h1" sx={{color: "#ececec", textAlign: "center", marginTop: "10px"}}>watcha got?</Typography>
			</ThemeProvider>
			<ChipInput />
		</div>
	);
};

export default Navbar;
