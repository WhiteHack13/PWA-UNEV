import { Link, useLocation } from "react-router-dom";
import Badge from "../../atoms/Badge/Badge.jsx";
import "./header.css";

export default function Header() {
    const { pathname } = useLocation();
    return (
        <header className="o-header">
        <div className="o-header__brand">
            <div className="o-header__logo" />
            <div>
            <div className="o-header__title">Atomic UI Lab</div>
            <div className="o-header__subtitle">Componentes consistentes, no pantallas aisladas</div>
            </div>
        </div>

        <nav className="o-header__nav">
            <Link className={`o-header__link ${pathname==="/inconsistente"?"is-active":""}`} to="/inconsistente">Inconsistente</Link>
            <Link className={`o-header__link ${pathname==="/atomic"?"is-active":""}`} to="/atomic">Atomic</Link>
            <Link className={`o-header__link ${pathname==="/usuarios"?"is-active":""}`} to="/usuarios">Usuarios</Link>
            <Badge tone="ok">Demo</Badge>
        </nav>
        </header>
    );
}
