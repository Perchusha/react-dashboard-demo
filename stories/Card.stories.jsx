import React from 'react';
import { Card } from '../src/components';

export default {
  title: 'Molecules/Card',
  component: Card,
  args: {
    title: 'Sample',
    value: '123',
  },
};

export const Default = args => <Card {...args} />;
