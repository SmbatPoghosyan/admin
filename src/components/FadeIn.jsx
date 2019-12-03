import React from "react";

function fadeIn(WrappedComponent)
{
	return class FadeIn extends React.Component
	{
		constructor(props)
		{
			super(props);
			this._container = React.createRef();
		}

		componentDidMount()
		{
			requestAnimationFrame(() =>
			{
				if (this._container)
				{
					this._container.current.style.opacity = "1";
				}
			});
		}

		render()
		{
			return (
				<div style={Object.assign({}, styles)} ref={this._container}>
					<WrappedComponent {...this.props} />
				</div>
			);
		}
	};
}

export default fadeIn;

const styles = {
	height: "100%",
	width: "100%",
	transition: "opacity 0.4s cubic-bezier(.17,.67,.17,.91)",
	opacity: 0,
	display: "inherit",
};