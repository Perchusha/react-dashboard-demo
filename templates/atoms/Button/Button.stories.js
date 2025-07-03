import { buttonTpl } from '../../../.storybook/preview.js';

export default {
  title: 'Atoms/Button',
  argTypes: {
    text: { control: 'text' },
    variant: { control: { type: 'select', options: ['primary', 'secondary'] } },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    isSquare: { control: 'boolean' },
    isHtmlContent: { control: 'boolean' },
  },
};

const Template = args => {
  const html = buttonTpl.render(args);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  return wrapper.firstElementChild;
};

export const Default = Template.bind({});
Default.args = {
  text: 'Click me',
  variant: 'primary',
  size: 'medium',
  active: false,
  disabled: false,
  isSquare: false,
  isHtmlContent: false,
};

export const Active = Template.bind({});
Active.args = { ...Default.args, active: true };

export const Disabled = Template.bind({});
Disabled.args = { ...Default.args, disabled: true };

export const Square = Template.bind({});
Square.args = { ...Default.args, text: '★', isSquare: true };

export const Html = Template.bind({});
Html.args = {
  ...Default.args,
  isHtmlContent: true,
  text: '<strong>Bold</strong>',
};
