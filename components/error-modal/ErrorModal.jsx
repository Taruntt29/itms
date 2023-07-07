import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const ErrorModal = (props) => {
    return (
        <Alert
            variant="danger"
            onClose={props.onClose}
            dismissible
            className={props.className}
        >
            <p>{props.message}</p>
        </Alert>
    );
};

ErrorModal.propTypes = {
    onClose: PropTypes.func,
    className: PropTypes.string,
    message: PropTypes.string.isRequired,
};
export default ErrorModal;
