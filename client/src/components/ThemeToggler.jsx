import React, { useContext } from 'react'
import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../context/ColorModeContext'
import { Box } from '@mui/material'

const ThemeToggler = () => {
    const theme = useTheme() // returns current theme pallet used.
    const colorMode  = useContext(ColorModeContext)

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
        }}>
            {theme.palette.mode} mode
            <IconButton 
                sx={{ml: 1}}
                onClick={colorMode.toggleColorMode}
                color="inherit">
                {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon />) :
                    (<Brightness4Icon />
                )}

            </IconButton>
        </Box>
    )
}
export default ThemeToggler