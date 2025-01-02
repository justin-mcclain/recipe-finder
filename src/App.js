import logo from "./logo.svg";
import "./App.css";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Results from "./components/Results";
import Footer from "./components/Footer";
import Recipe from "./components/Recipe";
import ChipInput from "./components/ChipInput";

export const AppContext = createContext();

function App() {
	const [returnedRecipes, setReturnedRecipes] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	return (
		<div id="body">
			<Router>
				<AppContext.Provider
					value={{
						returnedRecipes,
						setReturnedRecipes,
						selectedRecipe,
						setSelectedRecipe,
					}}>
					<Navbar />
					<Routes>
						<Route path="/" />
						<Route path="/results" element={<Results />} />
						<Route path="recipe/:recipeid" element={<Recipe />} />
					</Routes>
					<Footer />
				</AppContext.Provider>
			</Router>
		</div>
	);
}

export default App;
