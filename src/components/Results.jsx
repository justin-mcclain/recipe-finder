import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Results = () => {
	const { returnedRecipes, selectedRecipe, setSelectedRecipe } =
		useContext(AppContext);
        const apiKey = process.env.REACT_APP_SPOON_API_KEY;
	let theme = createTheme({
		typography: {
			h5: {
				fontSize: ".5rem",
			},
			body1: {
				fontSize: "1rem",
			},
		},
	});
    const getRecipe = async (id) => {
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
        .catch(() => {
            console.log("NOPE! RECIPE")
        });
        setSelectedRecipe(recipe.data);
        console.log(selectedRecipe);
        console.log(recipe);
    }
        useEffect(() => {
        }, [selectedRecipe]);
	return (
		<div id="results-container">
			{returnedRecipes.map((result, index) => (
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						width: 350,
						height: 215,
						backgroundColor: "#2f2f2f",
						borderRadius: "8px",
						overflow: "hidden",
						boxShadow:
							"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
					}}>
					<Box
						component="img"
						sx={{
							height: "100%",
							width: "50%",
							objectFit: "cover",
							objectPosition: "center",
							flex: 1,
						}}
						src={result.image}
						alt={result.title}
					/>
					<Box
						sx={{
							padding: "10px 15px",
							flex: 1,
							height: "100%",
							width: "50%",
							display: "flex",
							justifyContent: "space-between",
							flexDirection: "column",
						}}>
						<Typography
							variant="subtitle2"
							sx={{ color: "#b4b4b4", fontWeight: "bold" }}>
							{result.title}
						</Typography>
						<Box>
							<Typography
								variant="caption"
								sx={{ color: "#b4b4b4" }}>
								Missing Ingredients:{" "}
								{result.missedIngredients.length}
							</Typography>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#5e5e5e",
									color: "#fff",
									width: "100%",
									marginTop: "12px",
									marginBottom: "5px",
								}}
                                onClick={() => getRecipe(result.id)}
                                component={Link}
                                to={`/recipe/${result.id}`}>
                                    Learn More
							</Button>
						</Box>
					</Box>
				</Box>
			))}
		</div>
	);
};

export default Results;
