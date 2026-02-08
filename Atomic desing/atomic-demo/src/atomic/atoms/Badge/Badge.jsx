import "./badge.css";
export default function Badge({ children, tone="neutral" }) {
    return <span className={`a-badge a-badge--${tone}`}>{children}</span>;
}
