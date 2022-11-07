import { common } from '@mui/material/colors';

const palette = {
    light: {
        primary: {
            main: '#34C0AC',
            light: '#76e4bd',
            dark: '#00765A'
        }
    },
    dark: {
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5'
        }
    }
}

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: palette.light.primary.main,
                    light: palette.light.primary.light,
                    dark: palette.light.primary.dark,
                }
            }
            : {
                primary: {
                    main: palette.dark.primary.main,
                    light: palette.dark.primary.light,
                    dark: palette.dark.primary.dark,
                },
                background: {
                    default: "#0a1929"
                },
            }),
    },
    typography: {
        fontFamily: [
            'rubik',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        body1: {
            fontFamily: 'rubik, Arial, sans-serif',
        },
    },
})

export const getThemedComponents = (mode) => ({
    components: {
        ...(mode === 'light'
            ? {
                MuiAppBar: {
                    styleOverrides: {
                        root: {
                        },
                    },
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            borderRadius: ".5rem",
                        }
                    }
                },
                MuiContainer: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "#34C0AC",
                        }
                    }
                },
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            margin: "10px 0"
                        }
                    }
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            "& $notchedOutline": {
                                borderColor: common.black
                            },
                            "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                                borderColor: common.black,
                                "@media (hover: none)": {
                                    borderColor: common.black
                                }
                            },
                            "&$focused $notchedOutline": {
                                borderColor: common.black,
                                borderWidth: 1
                            }
                        }
                    }
                },
                MuiLink: {
                    styleOverrides: {
                        root: {
                            textDecoration: "none",
                            color: common.black
                        }
                    },
                    variants: [
                        {
                            props: { variant: "h3" }
                        }
                    ]
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 6,
                            color: common.black,
                            fontFamily:
                                "rubik, Roboto, 'Helvetica Neue', Arial, sans-serif",
                            fontSize: 15,
                            borderColor: common.black,
                            borderWidth: 2,
                            '&:hover': {
                                borderWidth: 2,
                            },
                        },
                    },
                    variants: [
                        {
                            props: { variant: 'contained' },
                            style: {
                                fontFamily:
                                    "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                            },
                        },
                        {
                            props: { variant: 'outlined' },
                            style: {
                                color: common.black,
                            },
                        },
                        {
                            props: { variant: 'primary', color: 'primary' },
                            style: {
                                border: '4px dashed blue',
                            },
                        },
                    ],
                },
                MuiList: {
                    styleOverrides: {
                        root: {},
                    },
                },
                MuiMenuItem: {
                    styleOverrides: {
                        root: {
                            color: common.white,
                            alignItems: 'stretch',
                            fontFamily:
                                "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                        },
                    },
                },
                MuiAccordion: {
                    styleOverrides: {
                        root: {
                            color: common.white,
                            fontFamily:
                                "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                        },
                    },
                },
            }
            : {
                MuiAppBar: {
                    styleOverrides: {
                        root: {
                        },
                    },
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            // border: `4px solid #ff1178`,
                            background: "#001C41",
                            borderRadius: ".5rem",
                        }
                    }
                },
                MuiContainer: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "#001c41",
                        }
                    }
                },
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            margin: "10px 0"
                        }
                    }
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        notchedOutline: {
                            border: "2px solid black"
                        }
                    }
                },
                MuiLink: {
                    styleOverrides: {
                        root: {
                            textDecoration: "none",
                            color: common.white
                        }
                    },
                    variants: [
                        {
                            props: { variant: "h3" }
                        }
                    ]
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 6,
                            color: common.black,
                            fontFamily:
                                "rubik, Roboto, 'Helvetica Neue', Arial, sans-serif",
                            fontSize: 15,
                            borderColor: common.white,
                            borderWidth: 2,
                            '&:hover': {
                                borderWidth: 2,
                            },
                        },
                    },
                    variants: [
                        {
                            props: { variant: 'contained' },
                            style: {
                                fontFamily:
                                    "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                            },
                        },
                        {
                            props: { variant: 'outlined' },
                            style: {
                                color: "white",
                            },
                        },
                        {
                            props: { variant: 'primary', color: 'primary' },
                            style: {
                                border: '4px dashed blue',
                            },
                        },
                    ],
                },
            }
        ),
    },
})