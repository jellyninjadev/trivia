import React, {useEffect, useState} from 'react'
import {Answer, Question} from "./types";
import {randomQuestion} from "./model";
import {SafeAreaView, View} from 'react-native'
import {Button, Text, Title} from 'react-native-paper';
import QuestionComponent from './Question'

export default ({questions, restart}: {questions: Map<string, Question>, restart: () => void}) => {
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

    if (finished) return <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <Title style={{textAlign: 'center'}}>Finished</Title>
        <Button onPress={restart}>Restart</Button>
    </SafeAreaView>

    return <QuestionComponent question={question} answer={answer} />
}