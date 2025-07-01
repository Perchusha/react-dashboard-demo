import { Input } from './Input.js';

export default {
  title: 'Atoms/Input',
  argTypes: {
    id: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
    placeholder: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    pattern: {
      control: 'text',
      description: 'RegExp string (e.g. ^[a-zA-Z0-9]*$)',
    },
    errorMessage: { control: 'text' },
    showError: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

const Template = args => {
  const finalArgs = { ...args };

  if (finalArgs.pattern) {
    try {
      finalArgs.pattern = new RegExp(finalArgs.pattern);
    } catch (e) {
      console.warn('Invalid RegExp in pattern:', finalArgs.pattern);
      delete finalArgs.pattern;
    }
  }

  const input = new Input(finalArgs);
  return input.getElement();
};

export const Default = Template.bind({});
Default.args = {
  id: 'input-default',
  type: 'text',
  placeholder: 'Enter text',
  name: 'default',
  value: '',
  disabled: false,
  required: false,
  showError: true,
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  id: 'input-validated',
  type: 'text',
  placeholder: 'Only letters allowed',
  name: 'validated',
  required: true,
  minLength: 3,
  maxLength: 10,
  pattern: '^[a-zA-Z]+$',
  errorMessage: 'Only letters (a-z, A-Z) allowed',
  showError: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'input-disabled',
  type: 'text',
  placeholder: 'Disabled input',
  name: 'disabled',
  disabled: true,
  showError: false,
};

export const CustomValidation = Template.bind({});
CustomValidation.args = {
  id: 'even-check',
  type: 'number',
  placeholder: 'Enter an even number',
  name: 'even',
  showError: true,
  validation: value => {
    const number = parseInt(value, 10);
    if (isNaN(number)) return 'Must be a number';
    if (number % 2 !== 0) return 'Must be an even number';
    return '';
  },
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  id: 'fullwidth-input',
  type: 'text',
  placeholder: 'Full width input',
  fullWidth: true,
  showError: true,
};
