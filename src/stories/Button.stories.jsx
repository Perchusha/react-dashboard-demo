import React from 'react';
import { Button } from '../atoms';

export default {
  title: 'Atoms/Button',
  component: Button,
  args: {
    onClick: () => alert('onClick'),
  },
};

export const Default = args => {
  return <Button {...args}>Click Me</Button>;
};
