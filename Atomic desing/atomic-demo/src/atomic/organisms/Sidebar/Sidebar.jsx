import "./sidebar.css";

export default function Sidebar({ children }) {
    return (
        <aside className="o-sidebar">
        <div className="o-sidebar__title">Secciones</div>
        <div className="o-sidebar__content">{children}</div>
        </aside>
    );
}
