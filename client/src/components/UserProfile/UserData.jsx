import React from 'react'
import {
    Box,
    Typography,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material'
import BarChart from '../GraphComponents/BarChart'

const UserData = ({ user, perDayData }) => {

    return (
        <Box className="user-data">
            {user?.scores.length >= 1 &&
                <>
                    {/* <LineChart data={perDayData}/> */}
                    <BarChart data={perDayData} />
                </>
            }
            <TableContainer className="table" component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Game</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Speed (WPM)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user?.scores.map((score, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{score.game}</TableCell>
                                    <TableCell>{score.createdAt}</TableCell>
                                    <TableCell>{score.wpm}</TableCell>
                                </TableRow>
                                // <Paper
                                //     elevation={5}
                                //     className="scoreBoard"
                                //     key={index}>
                                //     <Typography variant="h6">
                                //         {score.game}:
                                //     </Typography>
                                //     <p>
                                //         Score: {score.wpm} wpm<br />
                                //         {score.createdAt}
                                //     </p>
                                // </Paper>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default UserData