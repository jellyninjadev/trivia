import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import Api from './src/api'
import { Question } from "./src/types"
import Scene from './src/Scene'
import { Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper'

export default () => {
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [questions, setQuestions] = useState<Map<string, Question>>(new Map)

  const start = async () => {
    setLoading(true)
    const newToken = await Api.token()
    setToken(token)
    const newQuestions = await Api.questions(newToken)
    const questionMap = newQuestions.reduce((map, question, i) => map.set(i, question), new Map)
    setQuestions(questionMap)
    setLoading(false)
    setStarted(true)
  }

  if (loading) return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator /></View>

  if (!started) return <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
    <View style={{paddingHorizontal: 12}}>
      <Title style={{fontSize: 46, lineHeight: 50}} accessibilityLabel="Trivia">Trivia</Title>
      <Paragraph>A trivia game or competition is one where the competitors are asked questions about interesting but unimportant facts in mane subjects</Paragraph>
      <Button onPress={start} accessibilityLabel="Start" testID="StartButton">Start quiz</Button>
    </View>
  </SafeAreaView>

  return <SafeAreaView style={{flex: 1, justifyContent: 'center'}}><Scene questions={questions} restart={start} /></SafeAreaView>
}

