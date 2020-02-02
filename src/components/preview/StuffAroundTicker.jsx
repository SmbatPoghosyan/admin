import React from "react";
import Marquee from "react-smooth-marquee";

const StuffAroundTicker = ({ ticker }) => 
{
	const { r, g, b, a } = ticker.color;
	const color = ticker.color ? `rgba(${r},${g},${b},${a})`: "#fff";
	const fontSize = ticker.fontSize+"px";
	return (
		<div
			style={{
				overflow: "hidden",
				whiteSpace: "nowrap",
				color: color,
				fontSize: fontSize
			}}
		>
			<Marquee velocity="0.12">
				{ticker.text}
			</Marquee>
		</div>
	);
};

export default StuffAroundTicker;
