import React from "react";
import { Link, withRouter } from "react-router-dom";
import CopyButton from "./CopyButton";
import { useState } from "react";
import PreviewComponent from "./PreviewComponent";

const PlaylistHeader = ({playlist,copyHandleClick,branchId,files,ticker}) =>
{
	const [open,setOpen] = useState(false);

	return (
		<>
			<div className="head">
				<span>{playlist ? "Update" : "Create Playlist"}</span>
				<div style={{display: "flex"}}>
					{playlist ? (
						<CopyButton onClick={() => copyHandleClick(playlist)} />
					) : null}
					<span className="preview">
						<img 
							onClick={() => setOpen(true)} 
							src={require("../images/preview.png")} 
							alt="Preview" title="Preview" />
					</span>
				</div>
				<Link to={`/branches/${branchId}/`}>
					<i className="close" />
				</Link>
			</div>
			{open ? (
				<PreviewComponent
					setOpen={setOpen}
					files={files}
					ticker={ticker}
				/> 
			) : null}
		</>
	);
};

export default withRouter(PlaylistHeader);
