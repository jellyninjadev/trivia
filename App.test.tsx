import React from 'react'
import renderer, { ReactTestRendererJSON } from 'react-test-renderer'

import App from './App'

describe('<App />', () => {
    it('first test', async () => {
        const tree = renderer.create(<App />).toJSON() as ReactTestRendererJSON
        expect(tree.children?.length).toBe(1)
    })
})