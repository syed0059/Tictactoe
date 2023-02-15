
function PastGames({ past }) {

    const games = [];
    for (const game of Object.keys(past)) {
        games.push(
            <div key={game}>
                <tr><td style={{padding:10}}><h2>Game {game}</h2></td>
                <td style={{padding:10}}><h3>{past[game].map(el => {
                    return (<div>{el}</div>)
                })}</h3></td></tr>
            </div>
        )
    }

    return (
        <div>
            {past === {} ? <h3>No past games</h3> : games}
        </div>
    )
}

export default PastGames;