import React, { useContext, useState, useEffect } from "react";
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
import { AppContext } from "../App";
import { Link } from "react-router-dom";

const ChipInput = () => {
	const { setReturnedRecipes, returnedRecipes } = useContext(AppContext);
	const [input, setInput] = useState("");
	const [chips, setChips] = useState([]);
	const apiKey = process.env.REACT_APP_SPOON_API_KEY;
	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

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

	const handleDeleteChip = (chipToDelete) => {
		setChips((prevChips) =>
			prevChips.filter((chip) => chip !== chipToDelete)
		);
	};

	const findRecipe = async () => {
		var ingredients = chips.join(",+");
		const results = await axios
			.get(
				`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&ignorePantry=true`
			)
			.catch(() => {
				console.log("NOPE!");
			});
		setReturnedRecipes(results.data);
		console.log(returnedRecipes);
		console.log(results);
	};

	useEffect(() => {
	}, [returnedRecipes]);

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
						boxShadow:
							"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
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
							textTransform: "capitalize",
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
					boxShadow:
						"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
				}}
				component={Link}
				to="/results"
				onClick={findRecipe}>
				let's eat
			</Button>
		</Box>
	);
};

export default ChipInput;
