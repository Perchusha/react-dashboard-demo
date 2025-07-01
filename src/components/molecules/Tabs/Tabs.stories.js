import { Tabs } from './Tabs';

export default {
  title: 'Molecules/Tabs',
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    preLoad: { control: 'boolean' },
  },
};

const Template = args => {
  const tabs = new Tabs({
    ...args,
    onTabChange: index => {
      console.log('Tab changed to:', index);
    },
  });

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

export const DynamicContent = Template.bind({});
DynamicContent.args = {
  preLoad: false,
  align: 'left',
  tabs: [
    {
      label: 'Alpha',
      content: '<p><strong>Alpha</strong> content loaded on demand.</p>',
    },
    {
      label: 'Beta',
      content: (() => {
        const div = document.createElement('div');
        div.className = 'text-sm text-blue-700';
        div.textContent = 'This is a dynamically generated DOM element.';
        return div;
      })(),
    },
  ],
};

export const CenterAligned = Template.bind({});
CenterAligned.args = {
  preLoad: true,
  align: 'center',
  tabs: [
    { label: 'One', content: '<p>Tab one.</p>' },
    { label: 'Two', content: '<p>Tab two.</p>' },
    { label: 'Three', content: '<p>Tab three.</p>' },
  ],
};

export const WithDisabledTab = Template.bind({});
WithDisabledTab.args = {
  preLoad: true,
  align: 'left',
  tabs: [
    { label: 'Available', content: '<p>This tab works.</p>' },
    { label: 'Disabled', content: '<p>Should not be shown.</p>', disabled: true },
    { label: 'Another', content: '<p>Another active tab.</p>' },
  ],
};
