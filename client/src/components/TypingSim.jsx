import React, {
    useState,
    useEffect,
    useRef
} from 'react'
import {
    Container,
    Box,
    Button,
    TextareaAutosize
} from '@mui/material'
import axios from 'axios'
import '../static/css/typeSim.css'
import '../App.css'

const TypingSim = () => {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
    const [loaded, setLoaded] = useState(false)
    const [state, setState] = useState({
        quote: "", // Stores the quote
        author: "", // Stores the author of the given quote
        started: false,
        completed: false,
    })
    const [charCount, setCharCount] = useState(0)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [startTime, setStartTime] = useState(undefined)
    const [wpm, setWpm] = useState(0)
    const [progress, setProgress] = useState(0)
    const [completedWords, setCompletedWords] = useState([])
    const [words, setWords] = useState([])
    const [input, setInput] = useState("")
    const [avgWpm, setAvgWpm] = useState(0)
    const ref = useRef(null) // used to set autofocus


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
        renderQuote()
        setState({
            ...state,
            started: true,
            completed: false,
        })
        setInput("")
        setStartTime(Date.now())
        setProgress(0)
        ref.current.focus()
    }

    // Counts all pressed keys except shift and backspace.
    const handleKeyDown = e => {
        if (e.key !== "Backspace" && e.key !== "Shift") {
            setCharCount(charCount + 1)
        }
    }

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

                // Some debugging
                console.log("wordsTyped: " + wordsTyped)
                console.log("charCount: " + charCount)
                console.log("diff: " + diff)

                const wpm = Math.ceil((charCount/5) / diff);
                console.log(wpm)
                setTimeElapsed(diff)
                setWpm(wpm)
            }, 1000)
        }
    })

    const calcAvgWpm = () => {
        setAvgWpm(Math.floor((charCount/5) / timeElapsed))
    }

    // only ran when the quote is finished.
    if (state.completed) {
        setLoaded(false)
        calcAvgWpm()
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
                <p>Current WPM: {wpm}</p>
                <p>Average WPM: {avgWpm}</p>
            </Container>
                <progress value={progress} max="100" />
            <Box sx={{ padding: "1em" }}>
                <p className="text">
                    {/* The loaded variable checks if */}
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
            <TextareaAutosize 
            type="input" 
            value={input} 
            name="inputValue" 
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
            className="quote-input" ref={ref}></TextareaAutosize>

            <Container>
                <Button 
                    type="submit" 
                    variant="outlined"
                    onClick={startGame} 
                    className="btn">
                        Start
                </Button>
            </Container>
        </Container>
    )
}
export default TypingSim