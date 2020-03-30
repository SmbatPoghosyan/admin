import React from "react";
import "./css/preview.css";
import StuffAroundTicker from "./preview/StuffAroundTicker";
import Screen from "./preview/Screen";

const PreviewComponent = ({setOpen, files, ticker}) =>
{
	const screens = localStorage.getItem("screens") || 1;
	const WIDTH = window.innerWidth / screens;
	const HEIGHT = window.innerHeight;
	const list = screens && ticker && files ? modifyData(files) : null;

	return (
		<div className="previewComponent">
			<div className="previewComponentHeader" style={{width: `${WIDTH * screens}px`}}>
				<i className="close" onClick={() => setOpen(false)}/>
			</div>
			<div className="previewComponentBody">
				{
					screens && ticker && files ? (
						<div style={{
							height: `${HEIGHT}px`,
							width: `${WIDTH * screens}px`,
							position: "relative",
							background: "#000"
						}}>
							{list}
							{ticker && ticker.text ?
								<div className="tickerContainer">
									<StuffAroundTicker ticker={ticker}/>
								</div> : null
							}
						</div>
					) : <h1>Loading...</h1>
				}
			</div>
		</div>
	);

	function modifyData(files)
	{
		return files.map((file, i) =>
		{
			let startTime = 0;
			for (let j = 0; j < i; j++)
			{
				if (files[j].screen.indexOf(file.screen[0]) !== -1)
				{
					startTime += files[j].showTime;
				}
			}
			let sum = 0;
			for (let k = 0; k < files.length; k++)
			{
				if (files[k].screen.indexOf(1) !== -1)
				{
					sum += files[k].showTime;
				}
			}

			let interval = sum - file.showTime;

			return (
				<Screen
					key={i}
					name={file.name}
					type={file.type}
					screens={file.screen}
					branchScr={screens}
					showTime={file.showTime * 1000}
					startTime={startTime * 1000}
					interval={interval * 1000}
					HEIGHT={HEIGHT}
					WIDTH={WIDTH}
				/>
			);
		});
	}
};
export default PreviewComponent;
