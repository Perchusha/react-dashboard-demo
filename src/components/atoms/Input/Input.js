export class Input {
  constructor(
    {
      id = '',
      type = 'text',
      className = '',
      value = '',
      placeholder = '',
      disabled = false,
      required = false,
      name = '',
      ariaLabel = '',
      minLength,
      maxLength,
      pattern,
      errorMessage = 'Invalid format',
      showError = true,
      validation,
      fullWidth = false,
      attrs = {},
    } = {},
    existingEl = null
  ) {
    Object.assign(this, {
      id,
      type,
      className,
      placeholder,
      value,
      disabled,
      required,
      name,
      ariaLabel,
      minLength,
      maxLength,
      pattern,
      errorMessage,
      showError,
      validation,
      fullWidth,
    });
    this.attrs = attrs;

    if (existingEl) {
      this.element = existingEl;
      this.error = this.element.nextElementSibling;
      this._attachEvents();
    } else {
      this.element = document.createElement('input');
      this.error = document.createElement('div');
      this.error.className = 'absolute text-red-500 text-xs pointer-events-none';
      this.error.setAttribute('aria-live', 'polite');
      this.error.hidden = true;
      this._render();
      this._attachEvents();
    }
  }

  _render() {
    const el = this.element;
    el.type = this.type;
    el.id = this.id;
    el.name = this.name;
    el.placeholder = this.placeholder;
    el.value = this.value;
    el.disabled = this.disabled;
    el.required = this.required;
    if (this.ariaLabel) el.setAttribute('aria-label', this.ariaLabel);
    if (this.minLength != null) el.minLength = this.minLength;
    if (this.maxLength != null) el.maxLength = this.maxLength;
    if (this.pattern instanceof RegExp) el.pattern = this.pattern.source;

    const baseClass =
      'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300';
    const disabledClass = this.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';
    const fullWidthClass = this.fullWidth ? 'w-full' : '';

    el.className = [baseClass, disabledClass, fullWidthClass, this.className]
      .filter(Boolean)
      .join(' ');

    for (const [key, val] of Object.entries(this.attrs)) {
      el.setAttribute(key, val);
    }
  }

  _attachEvents() {
    this.element.addEventListener('input', () => this.validate());
  }

  validate() {
    const val = this.element.value;
    let error = '';

    if (this.required && !val) {
      error = 'This field is required';
    } else if (this.minLength && val.length < this.minLength) {
      error = `Minimum ${this.minLength} characters`;
    } else if (this.maxLength && val.length > this.maxLength) {
      error = `Maximum ${this.maxLength} characters`;
    } else if (this.pattern && !new RegExp(this.pattern).test(val)) {
      error = this.errorMessage;
    }

    if (!error && typeof this.validation === 'function') {
      const result = this.validation(val);
      if (typeof result === 'string' && result.trim()) {
        error = result;
      }
    }

    this.setError(error);
    return !error;
  }

  setError(message) {
    if (message) {
      this.element.classList.add('border-red-500');
      this.element.setAttribute('aria-invalid', 'true');
      this.error.textContent = message;
      this.error.hidden = !this.showError;
    } else {
      this.element.classList.remove('border-red-500');
      this.element.removeAttribute('aria-invalid');
      this.error.textContent = '';
      this.error.hidden = true;
    }
  }

  getElement() {
    const wrapper = document.createElement('div');
    wrapper.className = `relative${this.fullWidth ? ' w-full' : ''}`;
    wrapper.appendChild(this.element);
    wrapper.appendChild(this.error);
    return wrapper;
  }

  setValue(value) {
    this.element.value = value;
  }

  getValue() {
    return this.element.value;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    this._render();
  }
}
