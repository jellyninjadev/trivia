import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import Api from './src/api'
import {Question} from "./src/types"
import Scene from "./src/Scene"

export default () => {
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState('')
  const [questions, setQuestions] = useState<Map<string, Question>>(new Map)

  useEffect(() => {
    const bootstrap = async () => {
      setReady(true)
      setLoading(false)
    }

    bootstrap()
  }, [])

  const start = async () => {
    setLoading(true)
    const newToken = await Api.token()
    setToken(token)
    const newQuestions = await Api.questions(newToken)
    const questionMap = newQuestions.reduce((map, question, i) => map.set(i, question), new Map)
    setQuestions(questionMap)
    console.log('starting with questions', questionMap)
    setLoading(false)
    setStarted(true)
  }

  if (!ready) return <View><ActivityIndicator /></View>

  if (!started) return <SafeAreaView>
    <Text>Trivia</Text>
    <Text>A trivia game or competition is one where the competitors are asked questions about interesting but unimportant facts in mane subjects</Text>
    <Button title="Start quiz" onPress={start} />
  </SafeAreaView>

  if (loading) return <View><ActivityIndicator /></View>

  return <Scene questions={questions} restart={start} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
