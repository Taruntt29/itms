import { useState } from "react";
import { InputGroup, FormControl, FormLabel, FormGroup } from "react-bootstrap";
// import { FiEye, FiEyeOff } from "react-icons/fi";
import "./InputField.css";

const InputField = ({
  id,
  label,
  inputName,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  minLength,
  maxLength,
  pattern,
  icon,
  showPassword,
  onTogglePassword,
  feedback,
  InputFieldClassName,
  inputFieldData,
  readonly = false,
}) => {
  const inputType = showPassword ? "text" : type;
  const [touched, setTouched] = useState(false);

  const handleValidation = () => {
    if (!!pattern && !pattern.test(value)) {
      setTouched(true);
    } else {
      setTouched(false);
    }
  };

  return (
    <FormGroup controlId={id} className="custom-input-form-group">
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup hasValidation>
        {icon && <InputGroup.Text>{icon}</InputGroup.Text>}
        <FormControl
          readOnly={readonly}
          size="lg"
          name={inputName}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onChange(event);
            handleValidation();
          }}
          // onBlur={() => {
          //   handleValidation();
          //   onBlur && onBlur();
          // }}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          isInvalid={touched && !!pattern && !pattern.test(value)}
          className={`custom-input ${InputFieldClassName}`}
          data-input-field={inputFieldData}
        />
        {type === "password" && (
          <InputGroup.Text
            onClick={onTogglePassword}
            className="rounded-0 border-0 bg-transparent input-bottom"
          >
            {/* {showPassword ? <FiEye /> : <FiEyeOff />} */}
          </InputGroup.Text>
        )}
        {!!pattern && (
          <FormControl.Feedback type="invalid">
            {feedback ? feedback : "Please enter a valid value."}
          </FormControl.Feedback>
        )}
      </InputGroup>
    </FormGroup>
  );
};

export default InputField;
