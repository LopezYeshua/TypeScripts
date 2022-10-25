import React from 'react'
import {
    Container,
    Box,
    Typography,
    Paper
} from '@mui/material'
import { useSpring, animated as a } from 'react-spring'

const BeefItPopup = ({ content, handleClose, isVisible }) => {
    // content props checks the before and after state of the modal.
    const contentProps = useSpring({
        opacity: isVisible ? 1 : 0,
        marginTop: isVisible ? 0 : -500
    })

    const popupBox = {
        position: "fixed",
        background: "#00000050",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 14
    }

    const box = {
        position: "relative",
        width: "70%",
        margin: "0 auto",
        height: "auto",
        maxHeight: "70vh",
        marginTop: "calc(100vh - 85vh - 20px)",
        padding: "20px",
        overflow: "auto",
        zIndex: 1
    }

    const closePopup = {
        content: '"x"',
        cursor: "pointer",
        position: "fixed",
        right: "calc(15% - 10px)",
        top: "calc(100vh - 85vh - 33px)",
        backgroundColor: "#ededed",
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        lineHeight: "20px",
        textAlign: "center",
        border: "1px solid #999",
        fontSize: "20px",
        zIndex: 2
    }

    return (
        <a.div style={{ ...contentProps, ...popupBox }}>
                <Typography component="span" sx={closePopup} onClick={handleClose}>x</Typography>
                <Paper style={box}>{content}</Paper>
        </a.div>
    )
}
export default BeefItPopup