import AppShell from "../../templates/AppShell/AppShell.jsx";
import { H2, P } from "../../atoms/Text/Text.jsx";
import Button from "../../atoms/Button/Button.jsx";
import FormField from "../../molecules/FormField/FormField.jsx";
import UserCard from "../../organisms/UserCard/UserCard.jsx";
import PlaceholderTemplate from "../../templates/PlaceholderTemplate/PlaceholderTemplate.jsx";

export default function AtomicShowcase() {
    const demoUser = { name:"María López", role:"Frontend Developer", status:"Online", stack:"React" };
    return (
        <AppShell
        sidebar={
            <>
            <div><b>Capturas por escena</b></div>
            <div>2–3: Modelo mental + diagrama</div>
            <div>4–5: Átomos + estados</div>
            <div>6–7: Molécula FormField</div>
            <div>8–9: Organismo UserCard</div>
            <div>10–11: Plantilla con placeholders</div>
            <div>13: decisiones visuales abajo (tokens)</div>
            <div>16: flexibilidad del modelo</div>
            </>
        }
        >
        <H2>Atomic Design = modelo mental</H2>
        <P muted>
            La interfaz se construye desde piezas pequeñas (átomos) hacia estructuras complejas (páginas).
        </P>
        <section style={{marginTop:14, padding:14, border:"1px solid rgba(255,255,255,.10)", borderRadius:16}}>
            <H2>Átomos: Button (estados)</H2>
            <P muted>Capturar botones: normal, loading, disabled y variantes.</P>
            <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
            <Button>Primario</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Peligro</Button>
            <Button loading>Enviando</Button>
            <Button disabled>Deshabilitado</Button>
            </div>
        </section>

        <section style={{marginTop:14, padding:14, border:"1px solid rgba(255,255,255,.10)", borderRadius:16}}>
            <H2>Moléculas: FormField</H2>
            <P muted>Label + input + hint + error como unidad reutilizable.</P>
            <div style={{display:"grid", gap:12, maxWidth:520}}>
            <FormField label="Correo" hint="Usar formato válido" placeholder="correo@dominio.com" />
            <FormField label="Password" type="password" error="Campo requerido" placeholder="••••••••" />
            </div>
        </section>

        <section style={{marginTop:14, padding:14, border:"1px solid rgba(255,255,255,.10)", borderRadius:16}}>
            <H2>Organismos: UserCard</H2>
            <P muted>Sección completa reutilizable con acciones.</P>
            <div style={{display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))"}}>
            <UserCard user={demoUser} highlighted selectedAction />
            <UserCard user={{...demoUser, name:"Carlos Reyes", status:"Offline", stack:"Node"}} disabled />
            </div>
        </section>

        <section style={{marginTop:14, padding:14, border:"1px solid rgba(255,255,255,.10)", borderRadius:16}}>
            <H2>Plantilla: estructura sin datos reales</H2>
            <P muted>Placeholders para validar layout antes de conectar backend.</P>
            <PlaceholderTemplate />
        </section>

        <section style={{marginTop:14, padding:14, border:"1px solid rgba(255,255,255,.10)", borderRadius:16}}>
            <H2>Flexibilidad</H2>
            <P muted>
            No todos los componentes encajan perfecto en una categoría. El valor está en reutilización y consistencia, no en forzar etiquetas.
            </P>
        </section>
        </AppShell>
    );
}
