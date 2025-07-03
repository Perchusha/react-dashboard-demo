import { passwordInputTpl } from '../../../.storybook/preview.js';

export default {
  title: 'Molecules/PasswordInput',
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    labelInline: { control: 'boolean' },
    placeholder: { control: 'text' },
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    allowedPattern: { control: 'text' },
    errorMessage: { control: 'text' },
    showError: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    classNameInput: { control: 'text' },
    classNameToggle: { control: 'text' },
    value: { control: 'text' },
  },
};

const Template = args => {
  const html = passwordInputTpl.render(args);
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
};

export const Default = Template.bind({});
Default.args = {
  id: 'password',
  label: 'Password',
  labelInline: false,
  placeholder: 'Enter your password',
  value: '',
  minLength: 0,
  maxLength: 12,
  allowedPattern: '^[a-zA-Z0-9!@#$%&*]*$',
  errorMessage: 'Only letters, numbers and these characters are allowed: !@#$%&*',
  showError: true,
  fullWidth: false,
  classNameInput: '',
  classNameToggle: '',
};

export const InlineLabel = Template.bind({});
InlineLabel.args = {
  ...Default.args,
  labelInline: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Default.args,
  fullWidth: true,
};

export const DisableErrorText = Template.bind({});
DisableErrorText.args = {
  ...Default.args,
  value: 'abc123asd456qwe789',
  showError: false,
};

export const PatternError = Template.bind({});
PatternError.args = {
  ...Default.args,
  allowedPattern: '^[A-Za-z]*$',
  errorMessage: 'Only letters allowed',
  showError: true,
  value: 'abc123',
};
