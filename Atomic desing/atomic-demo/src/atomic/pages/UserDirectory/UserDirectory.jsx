import { useMemo, useState } from "react";
import AppShell from "../../templates/AppShell/AppShell.jsx";
import { H2, P } from "../../atoms/Text/Text.jsx";
import SearchBar from "../../molecules/SearchBar/SearchBar.jsx";
import UserCard from "../../organisms/UserCard/UserCard.jsx";
import Button from "../../atoms/Button/Button.jsx";

const USERS = [
    { id:1, name:"Ana Pineda", role:"QA Engineer", status:"Online", stack:"Testing" },
    { id:2, name:"Luis Mejía", role:"Backend Developer", status:"Online", stack:"Node" },
    { id:3, name:"Sofía Núñez", role:"Frontend Developer", status:"Offline", stack:"React" },
];

export default function UserDirectory() {
    const [q, setQ] = useState("");
    const [mode, setMode] = useState("ok");

    const filtered = useMemo(()=>{
        if(mode==="error") return null;
        const list = mode==="empty" ? [] : USERS;
        const qq = q.trim().toLowerCase();
        if(!qq) return list;
        return list.filter(u =>
        u.name.toLowerCase().includes(qq) || u.role.toLowerCase().includes(qq) || u.stack.toLowerCase().includes(qq)
        );
    },[q, mode]);

    return (
        <AppShell
        sidebar={
            <>
            <div><b>Escena 12</b>: página con datos reales</div>
            <div>Capturar: estado normal, vacío y error</div>
            <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:10}}>
                <Button variant={mode==="ok"?"primary":"ghost"} onClick={()=>setMode("ok")}>Normal</Button>
                <Button variant={mode==="empty"?"primary":"ghost"} onClick={()=>setMode("empty")}>Vacío</Button>
                <Button variant={mode==="error"?"danger":"ghost"} onClick={()=>setMode("error")}>Error</Button>
            </div>
            </>
        }
        >
        <H2>Página: Directorio de usuarios</H2>
        <P muted>Plantilla + datos reales + estados del sistema (vacío/error).</P>

        <SearchBar value={q} onChange={setQ} onSearch={()=>{}} />

        <div style={{marginTop:14}}>
            {mode==="error" && (
            <div style={{border:"1px solid rgba(219,71,60,.35)", background:"rgba(219,71,60,.10)", padding:14, borderRadius:16}}>
                <b>Error:</b> No fue posible cargar los datos. Reintentar o validar conexión con el backend.
            </div>
            )}

            {filtered && filtered.length===0 && (
            <div style={{border:"1px solid rgba(255,255,255,.14)", background:"rgba(255,255,255,.03)", padding:14, borderRadius:16}}>
                <b>Sin resultados</b>
                <div style={{color:"var(--muted)", marginTop:6}}>
                No hay usuarios para mostrar. Revisar filtros o estado de datos.
                </div>
            </div>
            )}

            {filtered && filtered.length>0 && (
            <div style={{display:"grid", gap:12, marginTop:12, gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))"}}>
                {filtered.map(u => <UserCard key={u.id} user={u} highlighted={u.status==="Online"} />)}
            </div>
            )}
        </div>
        </AppShell>
    );
}
