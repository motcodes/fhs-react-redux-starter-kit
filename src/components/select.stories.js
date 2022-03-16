import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import { Select } from './select'

const StoryInput = () => {
  const [input, setInput] = useState({})
  return (
    <Select
      name="Input"
      id="input"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      options={[
        {
          value: 0,
          label: 'I owe somebody',
          debitorId: 0
        },
        {
          value: 1,
          label: 'Somebody owes me',
          debitorId: 1
        },
        {
          value: 2,
          label: 'Somebody other owes me',
          debitorId: 2
        }
      ]}
    />
  )
}

storiesOf('Select', module).add('Default', () => <StoryInput />)
