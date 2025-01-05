import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const Recipe = () => {
	const { selectedRecipe, setSelectedRecipe } = useContext(AppContext);
	const { recipeid } = useParams();
	const apiKey = process.env.REACT_APP_SPOON_API_KEY;
	const [loading, setLoading] = useState(true);
	const [nutritionLabel, setNutritionLabel] = useState(null);

	useEffect(() => {
		const getRecipe = async () => {
			try {
				const recipe = await axios.get(
					`https://api.spoonacular.com/recipes/${recipeid}/information?includeNutrition=true&apiKey=${apiKey}`
				);
				setSelectedRecipe(recipe.data);
				const nutritionLabel = await axios.get(
					`https://api.spoonacular.com/recipes/${recipeid}/nutritionLabel.png?apiKey=${apiKey}`
				);
				setNutritionLabel(nutritionLabel.config.url);
			} catch (error) {
				console.log("NOPE! RECIPE");
			} finally {
				setLoading(false);
			}
		};
		getRecipe();
	}, [apiKey, recipeid, setSelectedRecipe, nutritionLabel]);

	if (loading) {
		return <Box>hold tight buddy</Box>;
	}
	const sanitizedInstructions = DOMPurify.sanitize(
		selectedRecipe?.instructions
	);
	const sanitizedSummary = DOMPurify.sanitize(selectedRecipe?.summary);

	return (
		<div className="containers">
			<Box
				className="recipe-containers"
				sx={{
					width: "60%",
				}}>
				<Box className="recipe-containers" sx={{ width: "100%" }}>
					<Box
						component="img"
						src={selectedRecipe.image}
						sx={{ objectFit: "cover", objectPosition: "center" }}
					/>
					<Box className="recipe-containers">
						<Box className="recipe-containers" sx={{ gap: "0px" }}>
							<Typography variant="h2">
								{selectedRecipe.title}
							</Typography>
							{(selectedRecipe.dairyFree ||
								selectedRecipe.glutenFree ||
								selectedRecipe.vegan ||
								selectedRecipe.vegetarian) && (
								<Typography variant="body2">
									{selectedRecipe.dairyFree && (
										<span style={{ color: "blue" }}>
											DF{" "}
										</span>
									)}
									{selectedRecipe.glutenFree && (
										<span style={{ color: "orange" }}>
											GF{" "}
										</span>
									)}
									{selectedRecipe.vegetarian && (
										<span style={{ color: "green" }}>
											VG{" "}
										</span>
									)}
									{selectedRecipe.vegan && (
										<span style={{ color: "light-green" }}>
											V
										</span>
									)}
									{selectedRecipe.ketogenic && (
										<span style={{ color: "red" }}>K</span>
									)}
								</Typography>
							)}
							<Typography variant="subtitle1">
								Ready In: {selectedRecipe.readyInMinutes} Minutes
							</Typography>
						</Box>
						<Typography
							variant="body1"
							dangerouslySetInnerHTML={{
								__html: sanitizedSummary,
							}}
						/>
					</Box>
				</Box>
				<Box
					className="recipe-containers"
					sx={{ flexDirection: "row", alignItems: "stretch" }}>
					<Box
						sx={{
							display: "flex",
							gap: "15px",
							width: "70%",
							backgroundColor: "#2f2f2f",
							borderRadius: "8px",
							padding: "20px",
							flex: "2",
						}}>
						<Box sx={{ flex: "1", height: "100%" }}>
							<Typography variant="h4">Ingredients</Typography>
							<List>
								{selectedRecipe.extendedIngredients.map(
									(ingred, index) => (
										<ListItem key={ingred.id}>
											<Typography
												variant="body1"
												sx={{
													textTransform: "capitalize",
												}}>
												{Math.round(
													ingred.measures.metric
														.amount
												)}{" "}
												{
													ingred.measures.metric
														.unitShort
												}{" "}
												{ingred.name}
											</Typography>
										</ListItem>
									)
								)}
							</List>
						</Box>
						<Box sx={{ flex: "1" }}>
							<Typography
								variant="h4"
								sx={{ marginBottom: "10px" }}>
								Instructions
							</Typography>
							<Typography
								variant="body1"
								dangerouslySetInnerHTML={{
									__html: sanitizedInstructions,
								}}
							/>
						</Box>
					</Box>
					<Box
						component="img"
						src={nutritionLabel}
						sx={{ flex: "1", height: "100%" }}
					/>
				</Box>
			</Box>
		</div>
	);
};

export default Recipe;
