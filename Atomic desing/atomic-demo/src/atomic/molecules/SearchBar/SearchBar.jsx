import FormField from "../FormField/FormField.jsx";
import Button from "../../atoms/Button/Button.jsx";

export default function SearchBar({ value, onChange, onSearch }) {
    return (
        <div style={{display:"flex", gap:10, alignItems:"end"}}>
        <div style={{flex:1}}>
            <FormField
            label="Buscar"
            hint="Nombre o rol"
            placeholder="Ej: Backend, React..."
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            />
        </div>
        <Button variant="ghost" onClick={onSearch}>Buscar</Button>
        </div>
    );
}
