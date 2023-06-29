import "./App.scss";

import "react-datepicker/dist/react-datepicker.css";
import ContextSwitcher from "./components/ContextSwitcher/ContextSwitcher";

//Remove events from database

function App() {
	return (
		<div className="App">
			<header>
				<span className="pageTitle">Program Form</span>
			</header>
			<div className="content">
				<ContextSwitcher></ContextSwitcher>
			</div>
		</div>
	);
}

export default App;
