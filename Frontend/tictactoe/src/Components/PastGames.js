import { TableCell, TableRow, Typography } from "@mui/material";

function PastGames({ past }) {

    const games = [];
    for (const game of Object.keys(past)) {
        games.push(
            <div key={game}>
                <TableRow><TableCell style={{padding:10}}><Typography variant="h3">Game {game}</Typography></TableCell>
                <TableCell style={{padding:10}}><Typography variant="h4">{past[game].map(el => {
                    return (<Typography variant="h6">{el}</Typography>)
                })}</Typography></TableCell></TableRow>
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