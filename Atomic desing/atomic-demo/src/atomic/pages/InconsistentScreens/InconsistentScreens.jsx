import AppShell from "../../templates/AppShell/AppShell.jsx";

export default function InconsistentScreens() {
    return (
        <AppShell
        sidebar={
            <>
            <div>Escena 1: “pantallas diferentes”</div>
            <div>Capturar: botones distintos, márgenes raros</div>
            </>
        }
        >
        <div style={{display:"grid", gap:14}}>
            <div style={{padding:14, border:"1px solid rgba(255,255,255,.10)", borderRadius:14}}>
            <h3 style={{margin:"0 0 10px"}}>Pantalla A</h3>
            <button style={{padding:"8px 9px", borderRadius:6}}>Botón</button>
            <input style={{marginLeft:10, padding:"7px 8px", borderRadius:4}} placeholder="Input raro" />
            </div>

            <div style={{padding:22, border:"1px solid rgba(255,255,255,.10)", borderRadius:8}}>
            <h3 style={{margin:"0 0 10px"}}>Pantalla B</h3>
            <button style={{padding:"14px 18px", borderRadius:20, background:"#88CFE0"}}>BOTÓN</button>
            <div style={{marginTop:10}}>
                <label style={{display:"block", marginBottom:6}}>Nombre</label>
                <input style={{width:"70%", padding:"12px 14px", borderRadius:16}} />
            </div>
            </div>

            <div style={{padding:10, border:"1px solid rgba(255,255,255,.10)", borderRadius:18}}>
            <h3 style={{margin:"0 0 10px"}}>Pantalla C</h3>
            <a href="#" style={{textDecoration:"underline"}}>Link con estilo distinto</a>
            <div style={{marginTop:10, display:"flex", gap:6}}>
                <div style={{width:12, height:12, background:"#DB473C"}} />
                <div style={{width:18, height:18, background:"#2A6FA8"}} />
                <div style={{width:10, height:10, background:"#88CFE0"}} />
            </div>
            </div>
        </div>
        </AppShell>
    );
}
