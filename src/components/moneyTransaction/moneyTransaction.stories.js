import React from 'react'
import { storiesOf } from '@storybook/react'
import { MoneyTransaction } from '.'

storiesOf('Money Transaction', module).add('Default', () => (
  <MoneyTransaction />
))
