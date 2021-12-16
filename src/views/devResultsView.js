export default function DevResultsView({criteria, entities}) {
    console.log("#############################################################################");
    console.log(criteria);
    console.log(entities);
    return (
        Object.entries(entities).length === 0 ?
            <p>No criteria selected!</p> :
            <table>
                <thead>
                <tr>
                    <th>NAME</th>
                    <th>VALUE</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(entities).map(([name, value]) =>
                    <tr key={name}>
                        <td>{name}</td>
                        <td>{criteria} : {value[criteria]}</td>
                    </tr>)}
                </tbody>
            </table>
    )
}