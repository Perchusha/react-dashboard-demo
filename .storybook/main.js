const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    {
      "name": "@storybook/addon-essentials",
      "options": {
        "docs": false
      }
    }
  ],
  "framework": {
    "name": "@storybook/web-components-webpack5",
    "options": {}
  }
};

export default config;