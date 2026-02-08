import Input from "../../atoms/Input/Input.jsx";
import "./formField.css";

export default function FormField({ label, hint, error, ...props }) {
    const invalid = Boolean(error);
    return (
        <div className="m-field">
        <div className="m-field__top">
            <label className="m-field__label">{label}</label>
            {hint && <span className="m-field__hint">{hint}</span>}
        </div>
        <Input invalid={invalid} aria-invalid={invalid} {...props} />
        {error && <div className="m-field__error">{error}</div>}
        </div>
    );
}
