import React, {
    useState, useEffect,
    useRef, useReducer
} from 'react'
import {
    TextareaAutosize
} from '@mui/material'
import axios from 'axios'
import '../static/css/typeSim.css'
import '../App.css'

const initialState = {
    started: false,
    completed: false,
    loaded: false,
    startTime: 0,
    timeElapsed: 0
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'start':
            return { 
                ...state,
                started: true,
                loaded: true,
            }
        case 'complete':
            return {
                ...state,
                started: false,
                completed: true,
                loaded: false,
            }
        case 'runTime':
            return {
                ...state,
                startTime: state.startTime + 1
            }
        default:
            throw new Error()
    }
}

const TypingSim2 = () => {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
    const [quote, setQuote] = useState({
        content: "",
        author: ""
    })
    const [checkProgress, setCheckProgress] = useState({
        progress: 0,
        completedWords: [],
        words: [],
        input: ""
    })
    const [state, dispatch] = useReducer(reducer, initialState);
    const input = checkProgress.input
    const idRef = useRef(0)

    const renderQuote = () => {
        axios.get(RANDOM_QUOTE_API_URL)
            .then(res => {
                const givenQuote = res.data.content // stores the quote given
                const author = res.data.author // stores the author of the quote
                const quoteWords = givenQuote.split(" ") // splits the quote into an array of words.
                setQuote({
                    content: givenQuote,
                    author: author
                })
                setCheckProgress({
                    ...checkProgress,
                    words: quoteWords
                })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!state.loaded) return
        setInterval(() => {
            dispatch({ type: "runTime" })
        }, 1000)
    })

    const handleChange = (e) => {
        const { words, completedWords } = checkProgress
        const inputValue = e.target.value
        const lastLetter = inputValue[inputValue.length - 1]
        const currentWord = words[0]

        if (lastLetter === " " || lastLetter === ".") {
            console.log(inputValue)
            console.log(currentWord)
            console.log(completedWords)
            if (inputValue.trim() === currentWord) {
                const newWords = [...words.slice(1)]
                const newCompletedWords = completedWords != 0 ?
                [...completedWords, currentWord] : [currentWord]
                const progress = (
                    newCompletedWords.length /
                    (newWords.length + newCompletedWords.length)
                ) * 100

                newWords.length === 0 ? 
                dispatch({ type: 'complete'}) :
                setCheckProgress({
                    progress: progress,
                    completedWords: newCompletedWords,
                    words: newWords,
                    input: ""
                })
            }
        } else {
            setCheckProgress({
                ...checkProgress,
                input: e.target.value
            })
        }
    }

    const startGame = (e) => {
        e.preventDefault()
        renderQuote()
        dispatch({ type: 'start' })
    }

    return (
        <div>
            <p className="timer">{state.startTime}s</p>
            <p>{state.loaded && quote.content?.split(" ").map((word, w_idx) => {
                        let highlight = false
                        let currentWord = false
                        const { completedWords, input} = checkProgress

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
                                    const isCurrentWord = completedWords? 
                                    w_idx === completedWords.length : false
                                    const isWronglyTyped = 
                                    input ? letter !== input[l_idx] : false
                                    const shouldBeHighLighted = input?
                                    l_idx < input.length : false
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
                    })}</p>
            <p> <strong>Author: </strong> {quote.author}</p>
            <TextareaAutosize value={input} onChange={handleChange} />
            <button onClick={startGame}> Start</button>
        </div>
    )
}
export default TypingSim2