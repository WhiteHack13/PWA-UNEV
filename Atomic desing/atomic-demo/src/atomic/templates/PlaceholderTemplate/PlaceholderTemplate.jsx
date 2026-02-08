import "./placeholder.css";

export default function PlaceholderTemplate() {
    return (
        <div className="t-ph">
        <div className="t-ph__row">
            <div className="t-ph__box t-ph__box--lg" />
            <div className="t-ph__box" />
        </div>
        <div className="t-ph__box t-ph__box--xl" />
        <div className="t-ph__row">
            <div className="t-ph__box" />
            <div className="t-ph__box" />
            <div className="t-ph__box" />
        </div>
        <div className="t-ph__box t-ph__box--xl" />
        </div>
    );
}
