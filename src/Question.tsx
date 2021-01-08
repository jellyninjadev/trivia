import React from 'react'
import {Question} from "./types";
import {computeAnswers} from "./model";
import {Button, FlatList, View, Text} from "react-native";

export default ({question, answer}: {question: [string, Question], answer: (i: string) => void}) => {
    const [index, q] = question
    const items = computeAnswers(q).map((answer, i) => ({title: `${answer}`, key: `${i}`}))

    return <View>
        <Text>Category {q.category}</Text>
        <Text>{q.question}</Text>
        <FlatList data={items} renderItem={({item}) => <Button title={item.title} onPress={() => answer(item.title)} />} />
    </View>
}