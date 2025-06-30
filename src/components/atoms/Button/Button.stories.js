import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

const Template = ({ text, variant, active, disabled }) => {
  const button = new Button({ text, variant, active, disabled });
  return button.getElement();
};

export const Primary = Template.bind({});
Primary.args = {
  text: 'Primary Button',
  variant: 'primary',
  active: false,
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary Button',
  variant: 'secondary',
  active: false,
  disabled: false,
};

export const Active = Template.bind({});
Active.args = {
  text: 'Active Button',
  variant: 'primary',
  active: true,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled Button',
  variant: 'primary',
  active: false,
  disabled: true,
};
