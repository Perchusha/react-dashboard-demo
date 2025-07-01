import { Tabs } from '../../molecules/Tabs/Tabs.js';
import { Input } from '../../atoms/Input/Input.js';
import { PasswordInput } from '../../molecules/PasswordInput/PasswordInput.js';
import { Button } from '../../atoms/Button/Button.js';

export class AuthForm {
  constructor({ onSubmit } = {}, existingEl = null) {
    this.onSubmit = onSubmit;

    if (existingEl) {
      this.container = existingEl;

      const tabsEl = this.container.querySelector('[data-component="Tabs"]');
      const tabsProps = JSON.parse(tabsEl.dataset.props);
      this.tabs = new Tabs(tabsProps, tabsEl);

      this.container.querySelectorAll('[data-component="Input"]').forEach(el => {
        const props = JSON.parse(el.dataset.props);
        new Input(props, el);
      });

      this.container.querySelectorAll('[data-component="PasswordInput"]').forEach(el => {
        const props = JSON.parse(el.dataset.props);
        new PasswordInput(props, el);
      });

      this.container.querySelectorAll('[data-component="Button"]').forEach(el => {
        const props = JSON.parse(el.dataset.props);
        new Button(props, el);
      });

      this._attachFormEvents();
    } else {
      this.container = document.createElement('div');
      this.container.className = 'max-w-md w-full mx-auto p-6 bg-white rounded shadow';

      const tabsProps = {
        tabs: [
          { label: 'Login', content: '' },
          { label: 'Register', content: '' },
        ],
        preLoad: true,
        align: 'left',
      };
      this.tabs = new Tabs(tabsProps);
      const tabsEl = this.tabs.getElement();
      tabsEl.setAttribute('data-component', 'Tabs');
      tabsEl.setAttribute('data-props', JSON.stringify(tabsProps));

      this.loginForm = this._createLoginForm();
      this.registerForm = this._createRegisterForm();

      this.tabs.setTabContent(0, this.loginForm);
      this.tabs.setTabContent(1, this.registerForm);

      this.container.appendChild(tabsEl);

      this._attachFormEvents();
    }
  }

  _createLoginForm() {
    const form = document.createElement('form');
    form.className = 'flex flex-col gap-4 w-full';

    const emailCmp = new Input({
      id: 'login-email',
      type: 'email',
      placeholder: 'Email',
      fullWidth: true,
      required: true,
    });
    const emailEl = emailCmp.getElement();
    const emailInputEl = emailEl.querySelector('input');
    emailInputEl.setAttribute('data-component', 'Input');
    emailInputEl.setAttribute(
      'data-props',
      JSON.stringify({
        id: 'login-email',
        type: 'email',
        placeholder: 'Email',
        fullWidth: true,
        required: true,
      })
    );

    const pwdCmp = new PasswordInput({
      id: 'login-password',
      placeholder: 'Password',
      fullWidth: true,
      required: true,
      label: '',
      labelInline: true,
      allowedPattern: '',
      showError: true,
    });
    const pwdEl = pwdCmp.getElement();
    pwdEl.setAttribute('data-component', 'PasswordInput');
    pwdEl.setAttribute(
      'data-props',
      JSON.stringify({
        id: 'login-password',
        placeholder: 'Password',
        fullWidth: true,
        required: true,
        label: '',
        labelInline: true,
        allowedPattern: '',
        showError: true,
      })
    );

    const submitCmp = new Button({
      type: 'submit',
      text: 'Login',
      variant: 'primary',
    });
    const btnEl = submitCmp.getElement();
    btnEl.setAttribute('data-component', 'Button');
    btnEl.setAttribute(
      'data-props',
      JSON.stringify({
        type: 'submit',
        text: 'Login',
        variant: 'primary',
      })
    );

    form.append(emailEl, pwdEl, btnEl);
    return form;
  }

  _createRegisterForm() {
    const form = document.createElement('form');
    form.className = 'flex flex-col gap-4 w-full';

    const emailCmp = new Input({
      id: 'register-email',
      type: 'email',
      placeholder: 'Email',
      fullWidth: true,
      required: true,
    });
    const emailEl = emailCmp.getElement();
    const emailInputEl = emailEl.querySelector('input');
    emailInputEl.setAttribute('data-component', 'Input');
    emailInputEl.setAttribute(
      'data-props',
      JSON.stringify({
        id: 'register-email',
        type: 'email',
        placeholder: 'Email',
        fullWidth: true,
        required: true,
      })
    );

    // Password input
    const pwdCmp = new PasswordInput({
      id: 'register-password',
      placeholder: 'Password',
      fullWidth: true,
      required: true,
      label: '',
      labelInline: true,
      allowedPattern: '',
      showError: true,
    });
    const pwdEl = pwdCmp.getElement();
    pwdEl.setAttribute('data-component', 'PasswordInput');
    pwdEl.setAttribute(
      'data-props',
      JSON.stringify({
        id: 'register-password',
        placeholder: 'Password',
        fullWidth: true,
        required: true,
        label: '',
        labelInline: true,
        allowedPattern: '',
        showError: true,
      })
    );

    const confCmp = new PasswordInput({
      id: 'register-confirm',
      placeholder: 'Confirm Password',
      fullWidth: true,
      required: true,
      label: '',
      labelInline: true,
      allowedPattern: '',
      showError: true,
    });
    const confEl = confCmp.getElement();
    confEl.setAttribute('data-component', 'PasswordInput');
    confEl.setAttribute(
      'data-props',
      JSON.stringify({
        id: 'register-confirm',
        placeholder: 'Confirm Password',
        fullWidth: true,
        required: true,
        label: '',
        labelInline: true,
        allowedPattern: '',
        showError: true,
      })
    );

    const submitCmp = new Button({
      type: 'submit',
      text: 'Register',
      variant: 'primary',
      className: 'w-full',
    });
    const btnEl = submitCmp.getElement();
    btnEl.setAttribute('data-component', 'Button');
    btnEl.setAttribute(
      'data-props',
      JSON.stringify({
        type: 'submit',
        text: 'Register',
        variant: 'primary',
        className: 'w-full',
      })
    );

    form.append(emailEl, pwdEl, confEl, btnEl);
    return form;
  }

  _attachFormEvents() {
    this.container.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const data = {};
        new FormData(form).forEach((val, key) => (data[key] = val));
        const type = form.querySelector('button[type="submit"]').textContent.toLowerCase();
        this.onSubmit?.({ type, ...data });
      });
    });
  }

  getElement() {
    return this.container;
  }
}
