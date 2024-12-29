import logo from "./logo.svg";
import "./App.css";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
	return (
    <div id="body">
		<Router>
			<Navbar />
		</Router>
    </div>
	);
}

export default App;
