import React, { useState } from 'react'
import { Answer, Question } from "./types";
import { randomQuestion } from "./model";
import { View } from 'react-native'
import { Button, Title, Paragraph } from 'react-native-paper';
import QuestionComponent from './Question'

const conj = (num: number, noun: string) => `${num} ${noun}${num > 1 || num === 0 ? 's' : ''}`
const getAverage = (answers: Map<string, Answer>) => Math.floor(Array.from(answers).reduce((value, [, answer]) => value + answer.seconds, 0) / answers.size)

export default ({ questions, restart }: { questions: Map<string, Question>, restart: () => void }) => {
    const [score, setScore] = useState(0)
    const [start, setStart] = useState(new Date().getTime())
    const [finished, setFinished] = useState(false)
    const [answers, setAnswers] = useState<Map<string, Answer>>(new Map)

    const question = randomQuestion(questions, answers)

    const answer = (answer: string) => {
        if (questions.size === answers.size + 1) {
            setFinished(true)
        } else {
            const [index, q] = question
            setScore(score + 10)
            const seconds = new Date().getTime() - start
            answers.set(index, { answered: q.correct_answer === answer, seconds })
            setAnswers(answers)
            setStart(new Date().getTime())
        }
    }

    if (finished) {
        const average = getAverage(answers)

        return <View style={{ paddingHorizontal: 12, justifyContent: 'center' }}>
            <Title style={{ textAlign: 'center' }}>Finished</Title>
            <Paragraph>Average time: {conj(average, 'second')}</Paragraph>
            <Paragraph>Score: {conj(score, 'point')}</Paragraph>
            <Button onPress={restart}>Restart</Button>
        </View>
    }

    return <QuestionComponent question={question} answer={answer} />
}
