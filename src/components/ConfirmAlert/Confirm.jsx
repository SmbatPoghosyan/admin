import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Confirmation = (message, onClickSubmit, submitArgs, onClickNo, noArgs) =>
{
	return confirmAlert({
		title: "Confirm to submit",
		message: message,
		buttons: [
			{
				label: "Yes",
				onClick: () =>
				{
					if (onClickSubmit)
					{
						return onClickSubmit(...submitArgs);
					}
				}
			},
			{
				label: "No",
				onClick: () =>
				{
					if (onClickNo)
					{
						return onClickNo(...noArgs);
					}
				}
			}
		]
	});
};

export default Confirmation;