import React, {useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import Api, {defaultQuestions} from './src/api'
import {Provider} from './src/theme'
import {Question} from "./src/types"
import Scene from "./src/Scene"
import { Title, Text, Paragraph, Button, ActivityIndicator, Colors } from 'react-native-paper'

const App = () => {
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(true)
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

  if (!ready || loading) return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator /></View>

  if (!started) return <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
    <View style={{paddingHorizontal: 12}}>
      <Title style={{fontSize: 46, lineHeight: 50}}>Trivia</Title>
      <Paragraph>A trivia game or competition is one where the competitors are asked questions about interesting but unimportant facts in mane subjects</Paragraph>
      <Button onPress={start}>Start quiz</Button>
    </View>
  </SafeAreaView>

  return <SafeAreaView style={{flex: 1, justifyContent: 'center'}}><Scene questions={questions} restart={start} /></SafeAreaView>
}

export default () => <Provider><App /></Provider>

// TODO
// 1. iPad support
// 2. Animations
// 3. Theming and dark mode
// 4. Style refactor
// 6. Start over navigation top right button
