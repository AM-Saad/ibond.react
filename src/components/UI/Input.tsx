


import { useField } from "formik";
import { StyledInput } from '../../styles/Input.styled.js'

interface Props {
  label: string;
  id?: string;
  name: string;
  placeholder?: string
  data?: string;
  className?: string;
  type?: string;
}

const Input: React.FC<Props> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <StyledInput invalid={meta.touched && meta.error}>
      <div >
        <label htmlFor={props.id || props.name}>{label}</label>
      </div>
      <input id={props.id || props.name} {...field}  {...props} />
      {meta.touched && meta.error ? (
        <p className="text-danger">{meta.error}</p>
      ) : null}
    </StyledInput>
  );
};

export default Input
