import React from 'react'
import {
    Box,
    Typography,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material'
import BarChart from '../GraphComponents/BarChart'
import { Container } from '@mui/system'

const UserData = ({user, perDayData}) => {

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
                            <TableCell>Game</TableCell>
                        </TableRow>
                    </TableHead>
                    {user?.scores.map((score, index) => {
                        return (
                            <>
                            </>
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
                </Table>
            </TableContainer>
        </Box>
    )
}
export default UserData