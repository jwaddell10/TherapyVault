import "./Button.css";
import PropTypes from "prop-types";

export default function Button({ text, className }) {
	return (
		<button className={className}>
			{text}
		</button>
	);
}

Button.propTypes = {
	text: PropTypes.string,
};
