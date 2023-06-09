import { auth, firestore } from "./firebase";
import logo from "./logo.svg";
import "./App.css";
import emailjs from "emailjs-com";

///env
emailjs.init("TdmGXBSlM9g0OIa13");

function App() {
	const sendEmail = () => {
		///env
		const serviceId = "service_k63n2um";
		const templateId = "template_kwr4qcr";

		const templateParams = {
			event_name: "TEST EVENT",
		};

		///See sendForm
		emailjs
			.send(serviceId, templateId, templateParams)
			.then(() => {
				console.log("Email sent successfully");
			})
			.catch((error) => {
				console.error("Error occurred while sending email", error);
			});
	};

	return (
		<div className="App">
			<header>Program Form</header>
			<div className="content">
				<button onClick={sendEmail()}>Send email</button>
			</div>
		</div>
	);
}

export default App;
