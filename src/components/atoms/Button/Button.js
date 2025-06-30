export class Button {
  constructor({
    text,
    id = '',
    className = '',
    variant = 'primary',
    active = false,
    disabled = false,
    ...attrs
  }) {
    this.text = text;
    this.id = id;
    this.className = className;
    this.variant = variant;
    this.active = active;
    this.disabled = disabled;
    this.attrs = attrs;

    this.baseClass = `font-bold py-2 px-4 rounded ${!this.disabled && 'cursor-pointer'}`;

    this.variants = {
      primary: `bg-blue-500 text-white ${!this.disabled && 'hover:bg-blue-600'}`,
      secondary: `bg-gray-200 text-gray-800 ${!this.disabled && 'hover:bg-gray-300'}`,
    };
    this.activeClass = 'bg-blue-800';
    this.disabledClass = 'opacity-50 cursor-not-allowed';

    this.element = document.createElement('button');
    this.element.type = 'button';

    this._render();
  }

  _render() {
    this.element.textContent = this.text;
    if (this.id) this.element.id = this.id;

    this.element.disabled = this.disabled;
    if (this.disabled) {
      this.element.setAttribute('aria-disabled', 'true');
    }

    const classList = [
      this.baseClass,
      this.variants[this.variant],
      this.active ? this.activeClass : '',
      this.disabled ? this.disabledClass : '',
      this.className,
    ]
      .filter(Boolean)
      .join(' ');

    this.element.className = classList;

    for (const [key, val] of Object.entries(this.attrs)) {
      this.element.setAttribute(key, val);
    }
  }

  setActive(value) {
    this.active = value;
    this._render();
  }

  setDisabled(value) {
    this.disabled = value;
    this._render();
  }

  update({ text, id, className, variant, ...attrs }) {
    if (text !== undefined) this.text = text;
    if (id !== undefined) this.id = id;
    if (className !== undefined) this.className = className;
    if (variant !== undefined) this.variant = variant;
    Object.assign(this.attrs, attrs);
    this._render();
  }

  getElement() {
    return this.element;
  }
}
