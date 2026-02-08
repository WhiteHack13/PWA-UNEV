import "./button.css";

export default function Button({
    children,
    variant = "primary",
    loading = false,
    disabled = false,
    ...props
    }) {
    const isDisabled = disabled || loading;
    return (
        <button
        className={`a-btn a-btn--${variant} ${loading ? "a-btn--loading" : ""}`}
        disabled={isDisabled}
        {...props}
        >
        <span className="a-btn__content">{children}</span>
        {loading && <span className="a-btn__spinner" aria-hidden="true" />}
        </button>
    );
}
