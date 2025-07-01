import express from 'express';
import { Button } from './components/atoms/Button/Button.js';
import { Input } from './components/atoms/Input/Input.js';
import { Label } from './components/atoms/Label/Label.js';
import { PasswordInput } from './components/molecules/PasswordInput/PasswordInput.js';
import { Tabs } from './components/molecules/Tabs/Tabs.js';
import { AuthForm } from './components/organisms/AuthForm/AuthForm.js';

const router = express.Router();

function wrapPage(content, title = 'Vanilla SSR Demo') {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="/assets/styles.css">
</head>

<body class="p-8 bg-gray-50 min-h-screen">
  <main class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-6">${title}</h1>
    <section aria-label="${title}">${content}</section>
  </main>
  
  <script src="/assets/bundle.js"></script>
</body>
</html>`;
}

router.get('/button', (req, res) => {
  const props = {
    id: 'demo-btn',
    text: 'Press me',
    variant: 'primary',
    size: 'large',
  };

  const btn = new Button(props);
  const el = btn.getElement();

  el.setAttribute('data-component', 'Button');
  el.setAttribute('data-props', JSON.stringify(props));

  const html = el.outerHTML;
  res.send(wrapPage(html, 'Atom: Button'));
});

router.get('/input', (req, res) => {
  const props = {
    id: 'demo-input',
    name: 'demo',
    placeholder: 'Enter some text here',
    required: true,
    minLength: 5,
    maxLength: 12,
    fullWidth: true,
    showError: true,
  };

  const inputCmp = new Input(props);
  const wrapper = inputCmp.getElement();

  const inputEl = wrapper.querySelector('input');

  inputEl.setAttribute('data-component', 'Input');
  inputEl.setAttribute('data-props', JSON.stringify(props));

  const html = wrapper.outerHTML;
  res.send(wrapPage(html, 'Atom: Input'));
});

router.get('/label', (req, res) => {
  const props = {
    id: 'demo-label',
    text: 'Username',
    htmlFor: 'demo-input',
  };

  const label = new Label(props);

  const wrapper = label.getElement();

  wrapper.setAttribute('data-component', 'Label');
  wrapper.setAttribute('data-props', JSON.stringify(props));

  const html = wrapper.outerHTML;
  res.send(wrapPage(html, 'Atom: Label'));
});

router.get('/password-input', (req, res) => {
  const props = {
    id: 'user-password',
    label: 'Your Password',
    labelInline: false,
    placeholder: 'Enter password',
    value: '',
    minLength: 5,
    maxLength: 12,
    allowedPattern: '^[a-zA-Z0-9!@#$%&*]*$',
    showError: true,
    fullWidth: false,
    classNameInput: '',
    classNameToggle: '',
  };

  const pw = new PasswordInput(props);

  const wrapper = pw.getElement();

  wrapper.setAttribute('data-component', 'PasswordInput');
  wrapper.setAttribute('data-props', JSON.stringify(props));

  const html = wrapper.outerHTML;
  res.send(wrapPage(html, 'Molecule: PasswordInput'));
});

router.get('/tabs', (req, res) => {
  const props = {
    tabs: [
      { label: 'Tab 1', content: '<p>Content for Tab 1</p>' },
      { label: 'Tab 2', content: '<p>Content for Tab 2</p>' },
      { label: 'Tab 3', content: '<p>Content for Tab 3</p>' },
    ],
    preLoad: false,
    align: 'left',
    onTabChange: null,
  };

  const tabs = new Tabs(props);
  const wrapper = tabs.getElement();

  wrapper.setAttribute('data-component', 'Tabs');
  wrapper.setAttribute('data-props', JSON.stringify(props));

  const html = wrapper.outerHTML;
  res.send(wrapPage(html, 'Molecule: Tabs'));
});

router.get('/auth-form', (req, res) => {
  const props = {
    onSubmit: data => {
      console.log('AuthForm submit:', data);
    },
  };

  const formCmp = new AuthForm(props);
  const el = formCmp.getElement();

  el.setAttribute('data-component', 'AuthForm');
  el.setAttribute('data-props', JSON.stringify(props));

  const html = el.outerHTML;
  res.send(wrapPage(html, 'Organism: AuthForm'));
});

export default router;
