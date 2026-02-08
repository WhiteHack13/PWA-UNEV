import Button from "../../atoms/Button/Button.jsx";
import Badge from "../../atoms/Badge/Badge.jsx";
import "./userCard.css";

export default function UserCard({ user, highlighted=false, disabled=false, selectedAction=false }) {
    return (
        <div className={`o-card ${highlighted ? "o-card--highlighted":""} ${disabled ? "o-card--disabled":""}`}>
        <div className="o-card__top">
            <div className="o-card__avatar">{user.name.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
            <div className="o-card__info">
            <div className="o-card__name">{user.name}</div>
            <div className="o-card__role">{user.role}</div>
            <div className="o-card__badges">
                <Badge tone={user.status==="Online" ? "ok" : "warn"}>{user.status}</Badge>
                <Badge>{user.stack}</Badge>
            </div>
            </div>
        </div>

        <div className="o-card__actions">
            <Button variant={selectedAction ? "primary":"ghost"}>Ver perfil</Button>
            <Button variant="danger" disabled={disabled}>Bloquear</Button>
        </div>
        </div>
    );
}
