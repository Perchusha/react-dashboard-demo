import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['field', 'toggle', 'error'];
  static values = {};

  connect() {
    this.inputField = this.fieldTarget;
    this.toggleBtn = this.toggleTarget;

    this.toggleBtn.addEventListener('click', () => this.toggleVisibility());
  }

  toggleVisibility() {
    const isNowText = this.inputField.type === 'password';
    this.inputField.type = isNowText ? 'text' : 'password';

    this.toggleBtn.setAttribute('aria-label', isNowText ? 'Hide password' : 'Show password');

    this.toggleBtn.innerHTML = isNowText
      ? this.element.dataset.passwordEyeOpen
      : this.element.dataset.passwordEyeClosed;
  }
}
