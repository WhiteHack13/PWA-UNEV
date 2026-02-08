import "./input.css";

export default function Input({ invalid=false, ...props }) {
    return <input className={`a-input ${invalid ? "a-input--invalid" : ""}`} {...props} />;
}
