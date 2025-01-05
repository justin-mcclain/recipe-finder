import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const Footer = () => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "#ececec", marginTop: "50px"}}>
			<Typography variant="subtitle2">
                justin mcclain
            </Typography>
            <Typography variant="caption">
                &copy; 2025
            </Typography>
		</Box>
	);
};

export default Footer