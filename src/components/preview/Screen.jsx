import React, {createRef} from "react";
import {isEqual} from "lodash-es";
import {apiURL} from "../../env";

const path = `${apiURL}/files/`;

class Screen extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			display: "none"
		};
		this.time = 0;
		this.videoRef = createRef();
	}

	toBlock = () =>
	{
		this.reset();
		if (this.videoRef && this.videoRef.current && this.props.type.split("/")[0] === "video")
		{
			this.videoRef.current.play();
		}
		this.setState({display: "block"});
		this.time = setTimeout(this.toNone, this.props.showTime);
	};

	toNone = () =>
	{
		this.reset();
		this.setState({display: "none"});
		this.time = setTimeout(this.toBlock, this.props.interval);
	};

	reset = () =>
	{
		clearTimeout(this.time);
		this.time = 0;
		if (this.videoRef && this.videoRef.current && this.props.type.split("/")[0] === "video")
		{
			this.videoRef.current.pause();
			this.videoRef.current.currentTime = 0;
		}
	};

	componentDidMount()
	{
		this.reset();
		this.time = setTimeout(this.toBlock, this.props.startTime);
	}

	componentDidUpdate(prevProps)
	{
		if (!isEqual(prevProps, this.props))
		{
			this.setState({display: "none"}, () =>
			{
				this.reset();
				this.time = setTimeout(this.toBlock, this.props.startTime);
			});
		}
	}

	componentWillUnmount()
	{
		this.setState({display: "none"});
		this.reset();
	}

	render()
	{
		const {screens, name, type, WIDTH, HEIGHT} = this.props;
		const styleFile = {
			position: "absolute",
			height: HEIGHT + "px",
			objectFit: "contain",
			display: this.state.display,
			left: (screens[0] === 1) ? "0px" : (screens[0] === 2) ? WIDTH + "px" : WIDTH * 2 + "px",
			width: `${WIDTH * screens.length}px`
		};
		return this.state.display ? (
			type.split("/")[0] === "image" ?
				<img
					style={styleFile}
					src={`${path + name}`}
					alt={name}
				/>
				:
				<video
					loop
					ref={this.videoRef}
					style={styleFile}
					src={`${path + name}`}
					alt={name}
				/>
		) : null;
	}
}

export default Screen;

