import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";

const CopyButton = (props) =>
{
	return (
		<span className="copyStyle">
			<IconButton
				aria-label="Copy"
				onClick={props.onClick}
				title="Copy"
				style={{ padding: "3px" }}
			>
				<FileCopyIcon fontSize="small" />
			</IconButton>
		</span>
	);
};

export default CopyButton;