export default function DevSelectorView({name, id, items}) {
    return (
        <select name={name} id={id}>
            {items.map(([key, value]) => <option key={key} value={key}>{value}</option>)}
        </select>
    )
}