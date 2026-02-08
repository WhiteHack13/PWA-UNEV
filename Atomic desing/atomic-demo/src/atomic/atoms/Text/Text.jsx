export function H2({children}) {
    return <h2 style={{margin:"0 0 8px"}}>{children}</h2>;
}
export function P({children, muted=false}) {
    return <p style={{margin:"0 0 10px", color: muted ? "var(--muted)" : "var(--text)"}}>{children}</p>;
}

