import { Input } from '../../atoms/Input/Input.js';
import { Label } from '../../atoms/Label/Label.js';
import { Button } from '../../atoms/Button/Button.js';

export class PasswordInput {
  /**
   * @param {Object} props
   * @param {HTMLDivElement|null} existingEl
   */
  constructor(
    {
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
    } = {},
    existingEl = null
  ) {
    // assign props
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

    if (existingEl) {
      // Hydrate existing markup
      this.container = existingEl;
      this.inputEl = this.container.querySelector('input');
      this.errorEl = this.container.querySelector('div[aria-live]');
      this.toggleEl = this.container.querySelector('button');

      // Rehydrate Input instance
      try {
        const inputProps = JSON.parse(this.inputEl.getAttribute('data-props'));
        this.input = new Input(inputProps, this.inputEl);
      } catch (e) {
        console.warn('Failed to hydrate Input:', e);
      }

      // Rehydrate Toggle Button instance
      try {
        const toggleProps = JSON.parse(this.toggleEl.getAttribute('data-props'));
        this.toggle = new Button(toggleProps, this.toggleEl);
      } catch (e) {
        console.warn('Failed to hydrate Button:', e);
      }

      this._attachEvents();
    } else {
      // Initial render
      this.container = document.createElement('div');
      this.container.className = `${
        this.labelInline ? 'flex items-center gap-4' : 'flex flex-col gap-1'
      } ${this.fullWidth ? 'w-full' : ''}`;

      // Label
      this.label = new Label({ text: label, htmlFor: id });

      // Create Input
      this.input = new Input({
        id: this.id,
        type: 'password',
        placeholder: this.placeholder,
        value: this.value,
        minLength: this.minLength,
        maxLength: this.maxLength,
        pattern: new RegExp(this.allowedPattern),
        errorMessage: 'Only letters, numbers and these characters are allowed: !@#$%&*',
        className: `flex-1 ${this.classNameInput}`.trim(),
        showError: this.showError,
        fullWidth: this.fullWidth,
      });
      this.inputEl = this.input.element;
      // Attach data-props for hydration
      this.inputEl.setAttribute(
        'data-props',
        JSON.stringify({
          id: this.id,
          type: 'password',
          placeholder: this.placeholder,
          value: this.value,
          minLength: this.minLength,
          maxLength: this.maxLength,
          pattern: this.allowedPattern,
          showError: this.showError,
          fullWidth: this.fullWidth,
          className: `flex-1 ${this.classNameInput}`.trim(),
        })
      );
      this.inputEl.setAttribute('data-component', 'Input');

      const toggleProps = {
        text: this._getEyeIcon(false),
        size: 'small',
        isSquare: true,
        'aria-label': 'Show password',
        className: `${this.classNameToggle}`.trim(),
        variant: 'secondary',
        isHtmlContent: true,
      };
      this.toggle = new Button(toggleProps);
      this.toggleEl = this.toggle.getElement();
      // Attach data-props for hydration
      this.toggleEl.setAttribute('data-props', JSON.stringify(toggleProps));
      this.toggleEl.setAttribute('data-component', 'Button');

      // Render structure
      this._render();
      this._attachEvents();
    }
  }

  _render() {
    const wrapper = document.createElement('div');
    wrapper.className = `flex items-center gap-2 ${this.fullWidth ? 'w-full' : ''}`;

    // Append label if present
    if (this.labelText) {
      this.container.appendChild(this.label.getElement());
    }

    // Wrap input + toggle
    wrapper.appendChild(this.input.getElement());
    wrapper.appendChild(this.toggleEl);

    // Link error
    this.inputEl.setAttribute('aria-describedby', `${this.id}-error`);

    this.container.appendChild(wrapper);
  }

  _attachEvents() {
    // Toggle visibility
    this.toggleEl.addEventListener('click', () => this.toggleVisibility());
    // Validation on input
    if (this.input && this.inputEl) {
      this.inputEl.addEventListener('input', () => this.input.validate());
    }
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.inputEl.type = this.visible ? 'text' : 'password';
    this.toggleEl.innerHTML = this._getEyeIcon(this.visible);
    this.toggleEl.setAttribute('aria-label', this.visible ? 'Hide password' : 'Show password');
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
    return this.container;
  }
}
