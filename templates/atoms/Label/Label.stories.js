import { labelTpl } from '../../../.storybook/preview.js';

export default {
  title: 'Atoms/Label',
  argTypes: {
    text: { control: 'text' },
    htmlFor: { control: 'text' },
    className: { control: 'text' },
    isHtml: { control: 'boolean' },
    id: { control: 'text' },
    attrs: { control: 'object' },
  },
};

const Template = args => {
  const html = labelTpl.render(args);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  return wrapper.firstElementChild;
};

export const Default = Template.bind({});
Default.args = {
  text: 'Username',
  htmlFor: 'demo-input',
  className: '',
  isHtml: false,
  id: '',
  attrs: {},
};

export const WithHtml = Template.bind({});
WithHtml.args = {
  ...Default.args,
  isHtml: true,
  text: '<span class="text-blue-500">Email Address</span>',
};

export const WithIdAndClass = Template.bind({});
WithIdAndClass.args = {
  ...Default.args,
  id: 'my-label',
  className: 'underline text-gray-900',
};
