import "./Button.css";
import PropTypes from "prop-types";

export default function Button({ text, style }) {
	return (
		<button style={style} className="button">
			{text}
		</button>
	);
}

Button.propTypes = {
	text: PropTypes.string,
};
