import React, { useState } from 'react'
import BeefItPopup from './BeefItPopup'
import {
    Typography,
    Button,
    ButtonGroup,
    TextField,
    Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom' 
const BeefitContent = ({ isVisible, togglePopup }) => {
    const [buttonAction, setButtonAction] = useState(0)
    const [roomID, setRoomID] = useState("")
    const navigate = useNavigate()

    const sendRoom = () => {
        if (roomID.length < 4) return null
        navigate(`/beefit/${roomID}`)
    } 
    return (

        <>
            { isVisible && <BeefItPopup
                content={
                    <>
                        <Typography variant="h3">BeefIt!</Typography>
                        <Typography>
                            BeefIt is where you compete with friends on games like WeScripts and TicTacToe
                        </Typography>
                        {buttonAction === 0 && 
                        <ButtonGroup variant="outlined">
                            <Button onClick={() => setButtonAction(2)}>Join</Button>
                            <Button onClick={() => setButtonAction(1)}>Host</Button>
                            <Button disabled>Random</Button>
                        </ButtonGroup>
                        }
                        {buttonAction === 1 &&
                            <Box sx={{ display: "flex", flexDirection: "column"}}>

                                <TextField 
                                label="Create Room ID"
                                onChange={(e) => setRoomID(e.target.value)} />
                                <ButtonGroup>
                                    <Button onClick={sendRoom}>Submit</Button>
                                    <Button onClick={() => setButtonAction(0)}>Cancel</Button>
                                </ButtonGroup>
                            </Box>
                        }

                        {buttonAction === 2 &&
                            <Box sx={{ display: "flex", flexDirection: "column"}}>

                                <TextField 
                                label="Enter Room ID"
                                onChange={(e) => setRoomID(e.target.value)} />
                                <ButtonGroup>
                                    <Button onClick={sendRoom}>Submit</Button>
                                    <Button onClick={() => setButtonAction(0)}>Cancel</Button>
                                </ButtonGroup>
                            </Box>
                        }
                    </>
                }
                isVisible={isVisible}
                handleClose={togglePopup}
            />}
        </>
    )
}
export default BeefitContent