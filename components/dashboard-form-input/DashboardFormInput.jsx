import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import CustomSelect from "../input-select/CustomSelect";
// import "./DashboardFormInput.css";
import { Form } from "react-bootstrap";

const DashboardFormInput = (props) => {
  let input = (
    <TextField
      type={props.textField?.type || "text"}
      className={`${props.className}`}
      label={props.label}
      variant="outlined"
      value={props.textField?.value}
      onChange={props.textField?.onChange}
      onBlur={props.textField?.onBlur}
      name={props.textField?.name}
      InputProps={props.textField?.InputProps || {}}
      helperText={props.textField?.helperText}
      error={props.textField?.error}
    />
  );
  if (props.inputType === "select") {
    input = (
      <CustomSelect
        className={`${props.className}`}
        options={props.select.options}
        select={{
          value: props.select.value,
          onChange: props.select.onChange,
          isMulti: props.select.isMulti,
          name: props.select.name,
        }}
        input={{ label: props.select.label }}
      />
    );
  }
  if (props.inputType === "check") {
    input = (
      <div className={`${props.className}`}>
        {props.dataOptions.map((itm, i) => (
          <Form.Check
            key={i}
            inline
            name={props.label}
            label={itm.label}
            type={itm.type}
            defaultChecked={itm.status}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${props.divClassName || ""}`}>
      <span className={`ps-5 ${props.labelClassName}`}>
        {props.label}
        {props.isRequired && <span className="text-danger">*</span>}
      </span>
      {input}
    </div>
  );
};
DashboardFormInput.propTypes = {
  divClassName: PropTypes.string,
  textField: PropTypes.object,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  isRequired: PropTypes.bool.isRequired,
  className: PropTypes.string,
  inputType: PropTypes.string,
  inputLabel: PropTypes.string,
  select: PropTypes.object,
  dataOptions: PropTypes.array,
};
export default DashboardFormInput;
