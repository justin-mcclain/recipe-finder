import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";

const Recipe = () => {
	const { selectedRecipe, setSelectedRecipe } = useContext(AppContext);
	const recipeid = useParams();
	const apiKey = process.env.REACT_APP_SPOON_API_KEY;
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getRecipe = async () => {
			try {
				const recipe = await axios.get(
					`https://api.spoonacular.com/recipes/${recipeid.recipeid}/information?includeNutrition=true&apiKey=${apiKey}`
				);
				setSelectedRecipe(recipe.data);
			} catch (error) {
				console.log("NOPE! RECIPE");
			} finally {
				setLoading(false);
			}

			console.log(recipeid);
		};
		getRecipe();
		console.log(selectedRecipe);
	}, [recipeid, setSelectedRecipe]);
	if (!loading) {
		return (
			<Box
				sx={{
					display: "flex",
					marginTop: "40px",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					color: "#ececec",
				}}>
				{selectedRecipe.instructions}
			</Box>
		);
	}
    if (loading) {
        return (<box>hold tight buddy</box>)
    }
};

export default Recipe;
