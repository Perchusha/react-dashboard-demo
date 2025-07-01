import { AuthForm } from './AuthForm.js';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Organisms/AuthForm',
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
};

const Template = args => {
  const form = new AuthForm(args);
  return form.getElement();
};

export const Default = Template.bind({});
Default.args = {
  onSubmit: action('formSubmitted'),
};
