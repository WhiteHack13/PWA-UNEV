import AppShell from "../../templates/AppShell/AppShell.jsx";
export default function NotFound(){
    return (
        <AppShell sidebar={<div>Ruta no encontrada</div>}>
        <h2>404</h2>
        <p style={{color:"var(--muted)"}}>La ruta no existe.</p>
        </AppShell>
    );
}
