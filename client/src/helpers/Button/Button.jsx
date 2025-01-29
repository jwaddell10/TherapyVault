import "./Button.css";
import PropTypes from "prop-types";

export default function Button({ disabled, text, className }) {
	return (
		<button disabled={disabled} className={className}>
			{text}
		</button>
	);
}

Button.propTypes = {
	text: PropTypes.string,
};
