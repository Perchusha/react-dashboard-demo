import { Tabs } from '../../molecules/Tabs/Tabs.js';
import { Input } from '../../atoms/Input/Input.js';
import { PasswordInput } from '../../molecules/PasswordInput/PasswordInput.js';
import { Button } from '../../atoms/Button/Button.js';

export class AuthForm {
  constructor({ onSubmit }) {
    this.onSubmit = onSubmit;
    this.container = document.createElement('div');
    this.container.className = 'max-w-md w-full mx-auto p-6 bg-white rounded shadow';

    this.tabs = new Tabs({
      tabs: [
        { label: 'Login', content: '' },
        { label: 'Register', content: '' },
      ],
      preLoad: true,
      align: 'left',
    });

    this.loginForm = this._createLoginForm();
    this.registerForm = this._createRegisterForm();

    this.tabs.setTabContent(0, this.loginForm);
    this.tabs.setTabContent(1, this.registerForm);

    this.container.appendChild(this.tabs.getElement());
  }

  _createLoginForm() {
    const form = document.createElement('form');
    form.className = 'flex flex-col gap-4';

    const emailInput = new Input({
      id: 'login-email',
      type: 'email',
      placeholder: 'Email',
      fullWidth: true,
      required: true,
    });
    const passwordInput = new PasswordInput({
      id: 'login-password',
      placeholder: 'Password',
      fullWidth: true,
      required: true,
    });

    const submitButton = new Button({
      type: 'submit',
      text: 'Login',
      variant: 'primary',
      className: 'w-full mt-2',
    });

    form.append(emailInput.getElement(), passwordInput.getElement(), submitButton.getElement());

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = emailInput.getValue();
      const validPwd = passwordInput.validate();
      if (!validPwd) return;

      const password = passwordInput.getValue();
      this.onSubmit?.({ type: 'login', email, password });
    });

    return form;
  }

  _createRegisterForm() {
    const form = document.createElement('form');
    form.className = 'flex flex-col gap-4';

    const emailInput = new Input({
      id: 'register-email',
      type: 'email',
      placeholder: 'Email',
      fullWidth: true,
      required: true,
    });
    const passwordInput = new PasswordInput({
      id: 'register-password',
      placeholder: 'Password',
      fullWidth: true,
      required: true,
    });
    const confirmPasswordInput = new PasswordInput({
      id: 'register-confirm',
      placeholder: 'Confirm Password',
      fullWidth: true,
      required: true,
    });

    const submitButton = new Button({
      type: 'submit',
      text: 'Register',
      variant: 'primary',
      className: 'w-full mt-2',
    });

    form.append(
      emailInput.getElement(),
      passwordInput.getElement(),
      confirmPasswordInput.getElement(),
      submitButton.getElement()
    );

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = emailInput.getValue();
      const valid1 = passwordInput.validate();
      const valid2 = confirmPasswordInput.validate();
      if (!valid1 || !valid2) return;

      const pwd = passwordInput.getValue();
      const confirm = confirmPasswordInput.getValue();
      if (pwd !== confirm) {
        confirmPasswordInput.input.setError('Passwords do not match');
        return;
      }

      confirmPasswordInput.input.setError('');
      this.onSubmit?.({ type: 'register', email, password: pwd });
    });

    return form;
  }

  getElement() {
    return this.container;
  }
}
