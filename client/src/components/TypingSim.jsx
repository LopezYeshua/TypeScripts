import React, {
    useState,
    useEffect,
    useRef,
    useContext
} from 'react'
import {
    Container,
    Box,
    Button,
    TextField
} from '@mui/material'
import axios from 'axios'
import '../static/css/typeSim.css'
import '../App.css'
import { LoggedinContext } from '../context/LoggedinContext'

const TypingSim = ({opponentProgress, p2Loaded}) => {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
    const [loaded, setLoaded] = useState(false)
    const [state, setState] = useState({
        quote: "", // Stores the quote
        author: "", // Stores the author of the given quote
        started: false,
        completed: false,
    })
    const [charCount, setCharCount] = useState(0)
    const [errorCount, setErrorCount] = useState(0)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [startTime, setStartTime] = useState(undefined)
    const [wpm, setWpm] = useState(0)
    const [progress, setProgress] = useState(0)
    const [completedWords, setCompletedWords] = useState([])
    const [words, setWords] = useState([])
    const [input, setInput] = useState("")
    const [avgWpm, setAvgWpm] = useState(0)
    const ref = useRef(null) // used to set autofocus
    const { loggedinInfo } = useContext(LoggedinContext)

    // Pulls quote from API
    const renderQuote = () => {
        axios.get(RANDOM_QUOTE_API_URL)
            .then(res => {
                const givenQuote = res.data.content // stores the quote given
                const author = res.data.author // stores the author of the quote
                const quoteWords = givenQuote.split(" ") // splits the quote into an array of words.
                setState({
                    ...state,
                    quote: givenQuote,
                    author: author,
                })
                setWords(quoteWords)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }

    // Starts the game on button click
    const startGame = (e) => {
        e.preventDefault()
        ref.current.focus()
        renderQuote()
        setState({
            ...state,
            started: true,
            completed: false,
        })
        setInput("")
        setStartTime(Date.now())
        setProgress(0)
    }

    // Counts all pressed keys except shift and backspace.

    // c
    const handleChange = e => {
        e.preventDefault()
        const innputValue = e.target.value
        // stores the last letter of the user input
        const lastLetter = innputValue[innputValue.length - 1]
        const currentWord = words[0] // stores the current word        

        if (lastLetter === " " || lastLetter === ".") {
            // checks if inputValue is equal to the current word
            if (innputValue.trim() === currentWord) {
                // cuts off the first word in the array of words
                const newWords = [...words.slice(1)]
                const newCompletedWords = [...completedWords, currentWord]

                const progress = (
                    newCompletedWords.length /
                    (newWords.length + newCompletedWords.length)) * 100
                console.log(progress)
                setState({
                    ...state,
                    completed: newWords.length === 0,
                })
                setProgress(progress)
                setCompletedWords(newCompletedWords)
                setWords(newWords)
                setInput("")
            }
        } else {
            setInput(innputValue)
        }
    }

    const handleKeyDown = e => {
        if (e.key !== "Backspace" && e.key !== "Shift") {
            setCharCount(charCount + 1)
        }
        if (e.key === "Backspace" && input.length > 0) {
            setErrorCount(errorCount + 1)
            console.log(errorCount)
        }
    }
    // When loaded, this hook will run and calulate the current words per minute.
    useEffect(() => {
        if (loaded) {
            setTimeout(() => {
                // grabs the currenttime
                const now = Date.now()
                // difference between time now and time when the game started.
                const diff = (now - startTime) / 1000 / 60
                // calculates the words completed
                const wordsTyped = Math.ceil(
                    completedWords.reduce((acc, word) =>
                        (acc += word.length), 0) / 5
                )

                const wpm = Math.ceil((charCount / 5) / diff);
                setTimeElapsed(diff)
                setWpm(wpm)
            }, 1000)
        }
    })

    const calcAvgWpm = () => {
        setAvgWpm(Math.floor((charCount / 5) / timeElapsed))
    }

    const submitScore = () => {
        axios.post('http://localhost:8000/api/scores/1', {
            player1: loggedinInfo.loggedinId,
            game: "We Scripts",
            wpm: Math.floor((charCount / 5) / timeElapsed),
            timePlayed: Math.floor(timeElapsed * 60),
            points: 200
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    if (state.completed) {
        calcAvgWpm()
        setLoaded(false)
        submitScore()
        setState({
            quote: "", // Stores the quote
            author: "", // Stores the author of the given quote
            started: false,
            completed: false,
        })
        setTimeElapsed(0)
        setStartTime(undefined)
        setWpm(0)
        setCompletedWords([])
        setWords([])
        setCharCount(0)
        setInput("")
        setProgress(0)
    }

    return (
        <Container sx={{ padding: "5px" }}>
            <Box className="timer">{Math.floor(timeElapsed * 60)}s</Box>
            <Container className="stats">
                {/* <p>Current WPM: {wpm}</p> */}
                <p>Average WPM: {avgWpm}</p>
            </Container>
            <progress value={progress} max="100" />
            { p2Loaded && <progress value={opponentProgress} max="100" />}
            <Box sx={{ padding: "1em" }}>
                <p className="text">
                    {loaded && state.quote?.split(" ").map((word, w_idx) => {
                        let highlight = false
                        let currentWord = false

                        if (completedWords && completedWords.length > w_idx) {
                            highlight = true
                        }
                        if (completedWords && completedWords.length === w_idx) {
                            currentWord = true
                        }
                        return (
                            <span
                                className={`word
                                    ${highlight && "green"}
                                    ${currentWord && "underline"}`}
                                key={w_idx}>
                                {word.split("").map((letter, l_idx) => {
                                    const isCurrentWord =
                                        w_idx === completedWords.length
                                    const isWronglyTyped =
                                        input ? letter !== input[l_idx] : false
                                    const shouldBeHighLighted =
                                        l_idx < input.length
                                    return (
                                        <span
                                            className={`letter
                                        ${isCurrentWord && shouldBeHighLighted ?
                                                    isWronglyTyped ? "red" : "green" : ""}`}
                                            key={l_idx}>
                                            {letter}
                                        </span>
                                    )
                                })}
                            </span>
                        )
                    })}
                </p>
            </Box>
            <TextField
                type="input"
                value={input}
                name="inputValue"
                multiline
                rows={2}
                sx={{
                    width: "100%"
                }}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                inputRef={ref} />
            <Container>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={startGame}
                    className="btn">
                    Start
                </Button>
            </Container>
        </Container>
    )
}
export default TypingSim