import { Label } from './Label';

export default {
  title: 'Atoms/Label',
  argTypes: {
    text: { control: 'text' },
    htmlFor: { control: 'text' },
    className: { control: 'text' },
    isHtml: { control: 'boolean' },
  },
};

const Template = args => {
  const label = new Label(args);
  return label.getElement();
};

export const Default = Template.bind({});
Default.args = {
  text: 'Email address',
  htmlFor: 'email',
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  text: 'Custom Label',
  htmlFor: 'custom',
  className: 'text-red-600 italic',
};

export const WithHtml = Template.bind({});
WithHtml.args = {
  text: 'Email <span class="text-red-500">*</span>',
  htmlFor: 'email',
  isHtml: true,
};
