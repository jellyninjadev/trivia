import {stringify} from 'qs'
import {decode} from 'he'
import {Question} from "./types";

const url = 'https://opentdb.com/'

const mock = [
    {
        category: 'Science & Nature',
        type: 'boolean',
        difficulty: 'easy',
        question: 'Igneous rocks are formed by excessive heat and pressure.',
        correct_answer: 'False',
        incorrect_answers: ['True']
    },
    {
        category: 'Entertainment: Television',
        type: 'multiple',
        difficulty: 'easy',
        question:
            'In the TV show &quot;Cheers&quot;, Sam Malone was a former relief pitcher for which baseball team?',
        correct_answer: 'Boston Red Sox',
        incorrect_answers: [
            'New York Mets',
            'Baltimore Orioles',
            'Milwaukee Brewers'
        ]
    },
    {
        category: 'Sports',
        type: 'multiple',
        difficulty: 'medium',
        question:
            'What cricketing term denotes a batsman being dismissed with a score of zero?',
        correct_answer: 'Duck',
        incorrect_answers: ['Bye', 'Beamer', 'Carry']
    },
    {
        category: 'Entertainment: Film',
        type: 'boolean',
        difficulty: 'easy',
        question:
            'The movie &quot;The Nightmare before Christmas&quot; was all done with physical objects.',
        correct_answer: 'True',
        incorrect_answers: ['False']
    },
    {
        category: 'Animals',
        type: 'multiple',
        difficulty: 'hard',
        question: 'How many known living species of hyenas are there?',
        correct_answer: '4',
        incorrect_answers: ['8', '2', '6']
    },
    {
        category: 'Entertainment: Film',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What was the first movie to ever use a Wilhelm Scream?',
        correct_answer: 'Distant Drums',
        incorrect_answers: [
            'Treasure of the Sierra Madre',
            'The Charge at Feather River',
            'Indiana Jones'
        ]
    },
    {
        category: 'Entertainment: Music',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Which Nirvana album had a naked baby on the cover?',
        correct_answer: 'Nevermind',
        incorrect_answers: ['Bleach', 'In Utero', 'Incesticide']
    },
    {
        category: 'History',
        type: 'multiple',
        difficulty: 'medium',
        question: 'When did Norway get its constitution?',
        correct_answer: '1814',
        incorrect_answers: ['1932', '1905', '1854']
    },
    {
        category: 'Geography',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the capital of the US State of New York?',
        correct_answer: 'Albany',
        incorrect_answers: ['Buffalo', 'New York', 'Rochester']
    },
    {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'medium',
        question:
            'In Monster Hunter Generations, guild style is a type of hunting style.',
        correct_answer: 'True',
        incorrect_answers: ['False']
    }
]

export default {
    questions: async (token: string) => {
        const res = await fetch(`${url}/api.php?${stringify({amount: 10, token})}`)
        const data = await res.json() as {response_code: number, results: Array<Question>}
        return data.results.map(item => ({
            ...item,
            question: decode(item.question),
            incorrect_answers: item.incorrect_answers.map(answer => decode(answer))
        }))
    },
    token: async () => {
        const res = await fetch(`${url}/api_token.php?${stringify({command: 'request'})}`)
        const data = await res.json() as {response_code: number, response_message: string, token: string}
        return data.token
    },
    reset: async (token: string) => {
        const res = await fetch(`${url}/api.php?${stringify({command: 'reset', token})}`)
        const data = await res.json() as {response_code: number, results: Array<Question>}
    }
}