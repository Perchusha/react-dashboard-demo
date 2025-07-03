const config = {
  stories: ['../templates/**/*.mdx', '../templates/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
  ],
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {},
  },
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.twig$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default config;
