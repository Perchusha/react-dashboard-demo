import { PasswordInput } from './PasswordInput.js';

export default {
  title: 'Molecules/PasswordInput',
  argTypes: {
    id: { control: 'text' },
    value: { control: 'text' },
    label: { control: 'text' },
    labelInline: { control: 'boolean' },
    placeholder: { control: 'text' },
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    showError: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    allowedPattern: {
      control: 'text',
      description: 'Allowed regex as string, e.g. ^[a-zA-Z0-9!@#$%&*]*$',
    },
  },
};

const Template = args => {
  const input = new PasswordInput(args);
  return input.getElement();
};

export const Default = Template.bind({});
Default.args = {
  id: 'password',
  label: 'Enter your password',
  placeholder: 'Type something',
  labelInline: false,
  minLength: 5,
  maxLength: 12,
  showError: true,
};

export const InlineLabel = Template.bind({});
InlineLabel.args = {
  id: 'password-inline',
  label: 'Password',
  labelInline: true,
  placeholder: 'Inline example',
  minLength: 5,
  maxLength: 12,
  showError: true,
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  id: 'password-filled',
  value: '12345!',
  label: 'Pre-filled password',
  labelInline: false,
  placeholder: 'You can still edit',
  showError: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  id: 'password-full',
  label: 'Full Width',
  fullWidth: true,
  placeholder: 'Stretch me',
  showError: false,
};
