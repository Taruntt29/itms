import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomFormGroup = (props) => {
    return (
        <div>
            <Form.Group className={props.groupClass}>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    className={props.className}
                    type={props.control?.type ?? "text"}
                    placeholder={props.control?.placeholder}
                    value={props.control?.value}
                    onChange={props.control?.onChange}
                />
            </Form.Group>
        </div>
    );
};

CustomFormGroup.propTypes = {
    control: PropTypes.shape({
        placeholder: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        type: PropTypes.string,
    }),
    className: PropTypes.string,
    label:PropTypes.string,
    groupClass: PropTypes.string,
};

export default CustomFormGroup;
