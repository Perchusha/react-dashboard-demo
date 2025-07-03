import { inputTpl } from '../../../.storybook/preview.js';

export default {
  title: 'Atoms/Input',
  argTypes: {
    id: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    pattern: { control: 'text' },
    errorMessage: { control: 'text' },
    showError: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    className: { control: 'text' },
    attrs: { control: 'object' },
  },
};

const Template = args => {
  const html = inputTpl.render(args);
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
};

export const Default = Template.bind({});
Default.args = {
  id: '',
  value: '',
  placeholder: 'Type something…',
  disabled: false,
  required: false,
  minLength: undefined,
  maxLength: undefined,
  pattern: '',
  errorMessage: '',
  showError: true,
  fullWidth: false,
  className: '',
  attrs: {},
};

export const Required = Template.bind({});
Required.args = { ...Default.args, required: true };

export const MinLength = Template.bind({});
MinLength.args = { ...Default.args, minLength: 5 };

export const MaxLength = Template.bind({});
MaxLength.args = { ...Default.args, maxLength: 10 };

export const Pattern = Template.bind({});
Pattern.args = {
  ...Default.args,
  pattern: '\\d+',
  errorMessage: 'Only digits allowed',
};

export const Disabled = Template.bind({});
Disabled.args = { ...Default.args, disabled: true };

export const FullWidth = Template.bind({});
FullWidth.args = { ...Default.args, fullWidth: true };
