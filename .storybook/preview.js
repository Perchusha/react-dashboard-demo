import '../public/styles/output.css';
import '../public/build/app.js';

import Twig from 'twig';
import ButtonTpl from '../templates/atoms/Button/Button.html.twig';
import InputTpl from '../templates/atoms/Input/Input.html.twig';
import LabelTpl from '../templates/atoms/Label/Label.html.twig';
import PasswordInputTpl from '../templates/molecules/PasswordInput/PasswordInput.html.twig';
import TabsTpl from '../templates/molecules/Tabs/Tabs.html.twig';

export const buttonTpl = Twig.twig({
  id: 'atoms/Button/Button.html.twig',
  data: ButtonTpl,
});
export const inputTpl = Twig.twig({
  id: 'atoms/Input/Input.html.twig',
  data: InputTpl,
});
export const labelTpl = Twig.twig({
  id: 'atoms/Label/Label.html.twig',
  data: LabelTpl,
});

export const passwordInputTpl = Twig.twig({
  id: 'molecules/PasswordInput/PasswordInput.html.twig',
  data: PasswordInputTpl,
  allowInlineIncludes: true,
});
export const tabsTpl = Twig.twig({
  id: 'molecules/Tabs/Tabs.html.twig',
  data: TabsTpl,
  allowInlineIncludes: true,
});

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
