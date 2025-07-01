import { Input } from '../../atoms/Input/Input.js';
import { Label } from '../../atoms/Label/Label.js';
import { Button } from '../../atoms/Button/Button.js';

export class PasswordInput {
  constructor({
    id = 'password',
    label = 'Password',
    labelInline = false,
    placeholder = 'Enter password',
    value = '',
    minLength = 5,
    maxLength = 12,
    allowedPattern = '^[a-zA-Z0-9!@#$%&*]*$',
    showError = true,
    fullWidth = false,
    classNameInput = '',
    classNameToggle = '',
  }) {
    Object.assign(this, {
      id,
      labelInline,
      placeholder,
      value,
      minLength,
      maxLength,
      allowedPattern,
      showError,
      fullWidth,
      classNameInput,
      classNameToggle,
    });

    this.labelText = label;
    this.visible = false;

    this.container = document.createElement('div');
    this.container.className = `${this.labelInline ? 'flex items-center gap-4' : 'flex flex-col gap-1'} ${this.fullWidth ? 'w-full' : ''}`;

    this.label = new Label({ text: this.labelText, htmlFor: this.id });

    let patternRegex;
    try {
      patternRegex = new RegExp(this.allowedPattern);
    } catch (e) {
      console.warn('Invalid regex pattern:', this.allowedPattern);
      patternRegex = /^[a-zA-Z0-9!@#$%&*]*$/;
    }

    this.input = new Input({
      id: this.id,
      type: 'password',
      placeholder: this.placeholder,
      value: this.value,
      minLength: this.minLength,
      maxLength: this.maxLength,
      pattern: patternRegex,
      errorMessage: 'Only letters, numbers and these characters are allowed: !@#$%&*',
      className: `flex-1 ${this.classNameInput}`.trim(),
      showError: this.showError,
      fullWidth: this.fullWidth,
    });

    this.inputEl = this.input.element;

    this.toggle = new Button({
      text: this._getEyeIcon(false),
      size: 'small',
      isSquare: true,
      'aria-label': 'Show password',
      className: `ml-1 ${this.classNameToggle}`.trim(),
      variant: 'secondary',
      isHtmlContent: true,
    });

    this.wrapper = null;

    this._render();
    this._attachEvents();
  }

  _render() {
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'flex items-center gap-2';

    inputWrapper.appendChild(this.input.getElement());
    inputWrapper.appendChild(this.toggle.getElement());

    this.inputEl.setAttribute('aria-describedby', `${this.id}-error`);

    this.container.appendChild(this.label.getElement());
    this.container.appendChild(inputWrapper);
  }

  _attachEvents() {
    this.toggle.getElement().addEventListener('click', () => this.toggleVisibility());
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.inputEl.type = this.visible ? 'text' : 'password';

    this.toggle.getElement().innerHTML = this._getEyeIcon(this.visible);
    this.toggle
      .getElement()
      .setAttribute('aria-label', this.visible ? 'Hide password' : 'Show password');
  }

  _getEyeIcon(open) {
    return open
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`;
  }

  validate() {
    return this.input.validate();
  }

  getValue() {
    return this.input.getValue();
  }

  setValue(val) {
    this.input.setValue(val);
  }

  getElement() {
    if (!this.wrapper) {
      this.wrapper = this.container;
    }
    return this.wrapper;
  }
}
