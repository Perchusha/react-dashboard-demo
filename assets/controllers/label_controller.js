import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static values = {
    text: String,
    isHtml: Boolean,
    htmlFor: String,
  };

  connect() {
    if (this.hasHtmlForValue) {
      this.element.htmlFor = this.htmlForValue;
    }

    if (this.isHtmlValue) {
      this.element.innerHTML = this.textValue;
    } else {
      this.element.textContent = this.textValue;
    }
  }
}
