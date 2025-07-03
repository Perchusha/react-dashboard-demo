import { tabsTpl } from '../../../.storybook/preview.js';

export default {
  title: 'Molecules/Tabs',
  argTypes: {
    tabs: {
      tabs: { control: 'object' },
      preLoad: { control: 'boolean' },
      align: {
        control: { type: 'select', options: ['left', 'center', 'right'] },
      },
    },
  },
};

const Template = args => {
  const html = tabsTpl.render(args);
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
};

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { label: 'One', content: '<p>First</p>' },
    { label: 'Two', content: '<p>Second</p>' },
    { label: 'Three', content: '<p>Third</p>' },
  ],
  preLoad: false,
  align: 'left',
};

export const Preload = Template.bind({});
Preload.args = {
  ...Default.args,
  preLoad: true,
};

export const Centered = Template.bind({});
Centered.args = {
  ...Default.args,
  align: 'center',
};
