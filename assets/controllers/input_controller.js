import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['field', 'error'];
  static values = {
    minLength: Number,
    maxLength: Number,
    pattern: String,
    errorMessage: String,
    showError: Boolean,
  };

  connect() {
    this.validate();
  }

  validate() {
    const val = this.fieldTarget.value;
    let error = '';

    if (this.fieldTarget.required && !val) {
      error = 'This field is required';
    } else if (this.minLengthValue && val.length < this.minLengthValue) {
      error = `Minimum ${this.minLengthValue} characters`;
    } else if (this.maxLengthValue && val.length > this.maxLengthValue) {
      error = `Maximum ${this.maxLengthValue} characters`;
    } else if (this.patternValue) {
      const re = new RegExp(this.patternValue);
      if (!re.test(val)) {
        error = this.errorMessageValue || 'Invalid format';
      }
    }

    this._showError(error);
    return !error;
  }

  _showError(message) {
    if (message) {
      this.fieldTarget.classList.add('border-red-500');
      this.fieldTarget.setAttribute('aria-invalid', 'true');
      this.errorTarget.textContent = message;
      this.errorTarget.hidden = !this.showErrorValue;
    } else {
      this.fieldTarget.classList.remove('border-red-500');
      this.fieldTarget.removeAttribute('aria-invalid');
      this.errorTarget.textContent = '';
      this.errorTarget.hidden = true;
    }
  }
}
