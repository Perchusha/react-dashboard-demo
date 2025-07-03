import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static values = {
    active: Boolean,
    disabled: Boolean,
    isSquare: Boolean,
    isHtmlContent: Boolean,
  };

  connect() {
    this._updateClasses();
  }

  handleClick(event) {
    event.preventDefault();

    if (this.disabledValue) return;

    const href = this.element.dataset.buttonAttrHref;
    if (href) {
      window.location.href = href;
    } else {
      this.dispatch('click');
    }
  }

  keydown(event) {
    this.dispatch('keydown', {
      detail: { originalEvent: event },
      bubbles: true,
    });
  }

  activeValueChanged(value) {
    this.element.setAttribute('aria-pressed', value ? 'true' : 'false');
    this.element.setAttribute('data-button-active-value', value ? 1 : 0);
    this._updateClasses();
  }

  disabledValueChanged(value) {
    if (value) {
      this.element.setAttribute('aria-disabled', 'true');
    } else {
      this.element.removeAttribute('aria-disabled');
    }
    this.element.setAttribute('data-button-disabled-value', value ? 1 : 0);
    this._updateClasses();
  }

  _updateClasses() {
    const activeClass = 'bg-blue-800';
    const disabledClasses = ['opacity-50', 'cursor-not-allowed'];

    this.element.classList.toggle(activeClass, this.activeValue);

    disabledClasses.forEach(cls => {
      this.element.classList.toggle(cls, this.disabledValue);
    });
  }
}
