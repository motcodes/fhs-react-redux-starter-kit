import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import { Input } from './input'

const StoryInput = () => {
  const [input, setInput] = useState('')
  return (
    <Input
      name="Input"
      id="input"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  )
}

storiesOf('Input', module).add('Default', () => <StoryInput />)
