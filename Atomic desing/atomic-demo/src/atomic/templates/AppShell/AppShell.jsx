import Header from "../../organisms/Header/Header.jsx";
import Sidebar from "../../organisms/Sidebar/Sidebar.jsx";
import "./appShell.css";

export default function AppShell({ sidebar, children }) {
    return (
        <div className="t-shell">
        <Header />
        <div className="t-shell__grid">
            <Sidebar>{sidebar}</Sidebar>
            <main className="t-shell__main">{children}</main>
        </div>
        </div>
    );
}
