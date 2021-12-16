export default function DevSelectorView({name, id, items, onChange}) {
    return (
        <select name={name} id={id} onChange={onChange}>
            <option value={null}>None</option>
            {items.map(([key, value]) => <option key={key} value={key}>{value}</option>)}
        </select>
    )
}