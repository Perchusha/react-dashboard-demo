import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    isSquare: { control: 'boolean' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    isHtmlContent: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

const Template = args => {
  const button = new Button(args);
  return button.getElement();
};

export const Primary = Template.bind({});
Primary.args = {
  text: 'Primary Button',
  variant: 'primary',
  size: 'medium',
  isSquare: false,
  active: false,
  disabled: false,
  isHtmlContent: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary Button',
  variant: 'secondary',
  size: 'medium',
  isSquare: false,
  active: false,
  disabled: false,
  isHtmlContent: false,
};

export const Small = Template.bind({});
Small.args = {
  text: 'Small Button',
  variant: 'primary',
  size: 'small',
  isSquare: false,
  active: false,
  disabled: false,
  isHtmlContent: false,
};

export const Large = Template.bind({});
Large.args = {
  text: 'Large Button',
  variant: 'primary',
  size: 'large',
  isSquare: false,
  active: false,
  disabled: false,
  isHtmlContent: false,
};

export const Square = Template.bind({});
Square.args = {
  text: '★',
  variant: 'primary',
  size: 'medium',
  isSquare: true,
  active: false,
  disabled: false,
  isHtmlContent: false,
};

export const Active = Template.bind({});
Active.args = {
  text: 'Active Button',
  variant: 'primary',
  size: 'medium',
  isSquare: false,
  active: true,
  disabled: false,
  isHtmlContent: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled Button',
  variant: 'primary',
  size: 'medium',
  isSquare: false,
  active: false,
  disabled: true,
  isHtmlContent: false,
};

export const HtmlContent = Template.bind({});
HtmlContent.args = {
  text: '<div class="flex flex-col gap-2"><span>Sleepy Puppies</span><img src="https://placedog.net/300/200?id=1" alt="Cute puppy" class="rounded" /></div>',
  variant: 'primary',
  size: 'medium',
  isSquare: false,
  active: false,
  disabled: false,
  isHtmlContent: true,
};
