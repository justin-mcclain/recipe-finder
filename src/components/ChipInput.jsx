import React, { useState } from "react";
import {
	TextField,
	Chip,
	InputAdornment,
	IconButton,
	Box,
	Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlatwareIcon from "@mui/icons-material/Flatware";
import axios from "axios";

const ChipInput = () => {
	const [input, setInput] = useState("");
	const [chips, setChips] = useState([]);
	const apiKey = process.env.SPOON_API_KEY;
	// Handle input change
	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	// Handle creating a new chip
	const handleAddChip = () => {
		if (input.trim() !== "") {
			if (!chips.includes(input.trim())) {
				setChips((prevChips) => [...prevChips, input.trim()]);
				setInput("");
			} else {
				setInput("");
			}
		}
	};

	// Handle deleting a chip
	const handleDeleteChip = (chipToDelete) => {
		setChips((prevChips) =>
			prevChips.filter((chip) => chip !== chipToDelete)
		);
	};

	const findRecipe = () => {
		var ingredients = chips.join(",+");
		axios
			.get(
				`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ignorePantry=true`
			)
			.catch(() => {
				console.log("NOPE!");
			});
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "70%",
			}}>
			<TextField
				variant="standard"
				placeholder="Enter food"
				color="white"
				value={input}
				onChange={handleInputChange}
				onKeyDown={(e) => {
					if (/\d/.test(e.key)) {
						e.preventDefault();
					}
					if (e.key === "Enter") {
						handleAddChip();
					}
				}}
				fullWidth
				margin="normal"
				sx={{
					"& .MuiInputBase-input": {
						paddingLeft: "10px",
					},
					"& .MuiInput-root": {
						backgroundColor: "#2f2f2f",
						borderRadius: "12px",
						padding: "0 8px",
						height: "50px",
					},
					"& .MuiInput-input": {
						color: "#b4b4b4",
					},
					"& .MuiInput-root:before": {
						borderBottom: "none",
					},
					"& .MuiInput-root:after": {
						borderBottom: "none",
					},
					"& .MuiInput-root.Mui-focused": {
						boxShadow: "none",
					},
					"& .MuiInput-root:hover:not(.Mui-disabled):before": {
						borderBottom: "none",
					},
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={handleAddChip}>
								<AddIcon sx={{ color: "#b4b4b4" }} />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Box mt={2}>
				{chips.map((chip, index) => (
					<Chip
						key={index}
						label={chip}
						size="large"
						onDelete={() => handleDeleteChip(chip)}
						sx={{
							margin: 0.5,
							color: "#b4b4b4",
							backgroundColor: "#2f2f2f",
						}}
					/>
				))}
			</Box>
			<Button
				variant="contained"
				size="large"
				endIcon={<FlatwareIcon />}
				sx={{
					marginTop: "20px",
					color: "#b4b4b4",
					backgroundColor: "#2f2f2f",
					borderColor: "#b4b4b4",
					textTransform: "capitalize",
				}}>
				let's eat
			</Button>
		</Box>
	);
};

export default ChipInput;
