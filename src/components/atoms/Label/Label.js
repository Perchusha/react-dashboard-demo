export class Label {
  constructor(
    { text = '', htmlFor = '', className = '', isHtml = false, id = '', attrs = {} } = {},
    existingEl = null
  ) {
    this.text = text;
    this.htmlFor = htmlFor;
    this.className = className;
    this.isHtml = isHtml;
    this.id = id;
    this.attrs = attrs;

    if (existingEl) {
      this.element = existingEl;
    } else {
      this.element = document.createElement('label');
      this._render();
    }
  }

  _render() {
    if (this.id) {
      this.element.id = this.id;
    }
    if (this.isHtml) {
      this.element.innerHTML = this.text;
    } else {
      this.element.textContent = this.text;
    }
    if (this.htmlFor) {
      this.element.setAttribute('for', this.htmlFor);
    }
    const baseClass = 'block text-sm font-medium text-gray-700';
    this.element.className = [baseClass, this.className].filter(Boolean).join(' ');
    for (const [key, val] of Object.entries(this.attrs)) {
      this.element.setAttribute(key, val);
    }
  }

  getElement() {
    return this.element;
  }
}
