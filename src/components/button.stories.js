import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from './button'

storiesOf('Button', module)
  .add('Primary', () => <Button onClick={action('clicked')}>Click me</Button>)
  .add('Secondary', () => (
    <Button variant="secondary" onClick={action('clicked')}>
      Click me
    </Button>
  ))
