import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AlertMe = ( message ) => 
{
	return confirmAlert({
		title: "Alert info",
		message: message,
		buttons: [
			{
				label: "OK",
				onClick: () => {}
			}
		]
	});
};

export default AlertMe;