export default function DevSelectorView({name, id, items}) {
    return (
        <select name={name} id={id}>
            <option value={null}>None</option>
            {items.map(([key, value]) => <option key={key} value={key}>{value}</option>)}
        </select>
    )
}