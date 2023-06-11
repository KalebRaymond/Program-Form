import "./App.scss";

import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./components/EventForm/EventForm";

function App() {
	return (
		<div className="App">
			<header>
				<span className="pageTitle">Program Form</span>
			</header>
			<div className="content">
				<EventForm></EventForm>
			</div>
		</div>
	);
}

export default App;
