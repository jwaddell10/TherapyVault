import "./Button.css";
import PropTypes from "prop-types";

export default function Button({ text }) {
	return (
		<button className="button">
			{text}
		</button>
	);
}

Button.propTypes = {
	text: PropTypes.string,
};
