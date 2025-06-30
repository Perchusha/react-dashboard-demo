// src/components/molecules/Tabs/Tabs.stories.js

import { Tabs } from './Tabs';

export default {
  title: 'Molecules/Tabs',
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
    },
  },
};

const Template = args => {
  const tabs = new Tabs(args);
  return tabs.getElement();
};

export const Default = Template.bind({});
Default.args = {
  preLoad: true,
  align: 'left',
  tabs: [
    { label: 'Home', content: '<p>This is the home panel.</p>' },
    { label: 'Profile', content: '<p>This is the profile panel.</p>' },
    { label: 'Settings', content: '<p>This is the settings panel.</p>' },
  ],
};

export const LazyLoaded = Template.bind({});
LazyLoaded.args = {
  preLoad: false,
  align: 'center',
  tabs: [
    { label: 'Alpha', content: '<p>Alpha content loaded on demand.</p>' },
    { label: 'Beta', content: '<p>Beta content loaded on demand.</p>' },
  ],
};

export const RightAligned = Template.bind({});
RightAligned.args = {
  preLoad: true,
  align: 'right',
  tabs: [
    { label: 'One', content: '<p>Tab one.</p>' },
    { label: 'Two', content: '<p>Tab two.</p>' },
    { label: 'Three', content: '<p>Tab three.</p>' },
  ],
};
