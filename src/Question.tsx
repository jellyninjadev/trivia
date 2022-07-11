import React from 'react'
import {Question} from "./types"
import {computeAnswers} from './model'
import {View, FlatList, SafeAreaView} from 'react-native'
import {Button, Text, Headline} from 'react-native-paper'

export default ({question, answer}: {question: [string, Question], answer: (i: string) => void}) => {
    const [index, q] = question
    const items = computeAnswers(q).map((answer, i) => ({title: `${answer}`, key: `${i}`}))

    return <View style={{paddingHorizontal: 12, flex: 1, paddingTop: 40, justifyContent: 'center'}}>
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
            <View>
            <Text>{q.category}</Text>
            <Headline>{q.question}</Headline>
            </View>
        </View>
        <View style={{paddingVertical: 4, maxHeight: 224}}>
        <FlatList 
            data={items} 
            renderItem={
							({item, index}) => <View style={{paddingVertical: 4}}>
								<Button 
								accessibilityLabel={`Answer-${index}`}
								mode="contained" 
								compact={true} 
							onPress={() => answer(item.title)}>
							{item.title}
							</Button>
								</View>
            }/>
        </View>
        </View>
}
