import {Question, Answer} from "./types";

export const random = (items: [string, Question][]) => {
    const index = Math.floor(Math.random() * items.length)
    return items[index]
}

export const randomQuestion = (questions: Map<string, Question>, finishedQuestions: Map<string, Answer>) => {
    const eligibleQuestions = Array.from(questions).filter(([index]) => !finishedQuestions.has(index))
    return random(eligibleQuestions)
}

export const shuffle = (items: string[]) => items.sort(() => Math.random() - 0.5)

export const computeAnswers = (question: Question) =>
    shuffle([...question.incorrect_answers, question.correct_answer])