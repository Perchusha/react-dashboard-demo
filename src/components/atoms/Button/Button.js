export class Button {
  constructor(
    {
      id = '',
      text = '',
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'medium',
      isSquare = false,
      active = false,
      disabled = false,
      isHtmlContent = false,
      onClick = null,
      attrs = {},
    } = {},
    existingEl = null
  ) {
    Object.assign(this, {
      id,
      text,
      type,
      className,
      variant,
      size,
      isSquare,
      active,
      disabled,
      isHtmlContent,
      onClick,
    });

    this.attrs = attrs;

    this.sizeClasses = {
      small: 'px-3 py-2 text-xs',
      medium: 'px-5 py-2.5 text-sm',
      large: 'px-5 py-3 text-base',
    };

    this.variants = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    };

    this.activeClass = 'bg-blue-800';
    this.disabledClass = 'opacity-50 cursor-not-allowed';

    this.element = existingEl || document.createElement('button');
    this.element.type = this.type;

    if (!existingEl) {
      this._render();
    }
    this._attachEvents();
  }

  _render() {
    if (this._clickHandler) {
      this.element.removeEventListener('click', this._clickHandler);
      this._clickHandler = null;
    }

    if (this.isHtmlContent) {
      this.element.innerHTML = this.text;
    } else {
      this.element.textContent = this.text;
    }

    this.element.id = this.id;
    this.element.disabled = this.disabled;
    if (this.disabled) {
      this.element.setAttribute('aria-disabled', 'true');
    } else {
      this.element.removeAttribute('aria-disabled');
    }

    const baseClass = [
      'font-bold',
      'rounded',
      !this.disabled ? 'cursor-pointer' : '',
      this.sizeClasses[this.size] || this.sizeClasses.medium,
      this.isSquare ? 'aspect-square p-0 w-auto' : '',
    ]
      .filter(Boolean)
      .join(' ');

    let variantClass = this.variants[this.variant] || '';
    if (this.disabled) {
      variantClass = variantClass.replace(/hover:[\w-:/]+/g, '');
    }

    const classList = [
      baseClass,
      variantClass,
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

  _attachEvents() {
    if (typeof this.onClick === 'function' && !this.disabled) {
      this._clickHandler = () => this.onClick();
      this.element.addEventListener('click', this._clickHandler);
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

  update(newProps = {}) {
    Object.assign(this, newProps);
    if (newProps.attrs) Object.assign(this.attrs, newProps.attrs);
    this._render();
  }

  getElement() {
    return this.element;
  }
}
