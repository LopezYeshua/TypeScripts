import React, { useState, useContext } from 'react'
import { Container, Box, TextField } from '@mui/material'
import images from '../../static/images/index'
import EditIcon from '@mui/icons-material/Edit'
import PublishIcon from '@mui/icons-material/Publish'
import { LoggedinContext } from '../../context/LoggedinContext'

const UserNav = ({user, sendUsername}) => {
    const [openEdit, setOpenEdit] = useState(false)
    const [username, setUsername] = useState()
    const { loggedinInfo } = useContext(LoggedinContext)

    const handleOpenEdit = (e) => {
        setOpenEdit(!openEdit)
    }

    const handleSubmit = (e) => {
        setOpenEdit(!openEdit)
        sendUsername(username)
    }
    console.log(loggedinInfo.loggedin)
    return (
        <Container className="user-nav">
            {loggedinInfo.loggedinId === user?._id ?
                openEdit ? 
                    <div className="username">
                        <TextField 
                            onChange={(e) => setUsername(e.target.value)} 
                            defaultValue={user?.username}/>
                        <PublishIcon 
                            className="edit" 
                            onClick={(e) => handleSubmit(e)}/>
                    </div>
                    :
                    <div className="username">
                        <h2>{user?.username}</h2>
                        <EditIcon className="edit" 
                        onClick={handleOpenEdit}/>
                    </div>
                :
                <h2>{user?.username}</h2>
            }
            <Box className="iconBox">
                <img src={images[user?.icon]} className="user-icon" alt="icon" />
            </Box>
            <p>User Since: {user?.createdAt}</p>
        </Container>
    )
}
export default UserNav