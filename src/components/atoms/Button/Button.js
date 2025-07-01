export class Button {
  constructor({
    id = '',
    text = '',
    type = 'button',
    className = '',
    variant = 'primary', // 'primary' | 'secondary'
    size = 'medium', // 'small' | 'medium' | 'large'
    isSquare = false,
    active = false,
    disabled = false,
    isHtmlContent = false,
    onClick,
    ...attrs
  }) {
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
      attrs,
    });

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

    this.element = document.createElement('button');
    this.element.type = this.type;

    this._render();
  }

  _render() {
    // Очистка предыдущего обработчика
    if (this._clickHandler) {
      this.element.removeEventListener('click', this._clickHandler);
      this._clickHandler = null;
    }

    // Контент
    if (this.isHtmlContent) {
      this.element.innerHTML = this.text;
    } else {
      this.element.textContent = this.text;
    }

    // Атрибуты
    if (this.id) this.element.id = this.id;
    this.element.disabled = this.disabled;

    if (this.disabled) {
      this.element.setAttribute('aria-disabled', 'true');
    } else {
      this.element.removeAttribute('aria-disabled');
    }

    // Стили
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

    // Дополнительные атрибуты
    for (const [key, val] of Object.entries(this.attrs)) {
      this.element.setAttribute(key, val);
    }

    // Установка обработчика клика
    if (typeof this.onClick === 'function' && !this.disabled) {
      this._clickHandler = this.onClick;
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

  update({ text, id, className, variant, size, isSquare, isHtmlContent, onClick, ...attrs }) {
    if (text !== undefined) this.text = text;
    if (id !== undefined) this.id = id;
    if (className !== undefined) this.className = className;
    if (variant !== undefined) this.variant = variant;
    if (size !== undefined) this.size = size;
    if (isSquare !== undefined) this.isSquare = isSquare;
    if (isHtmlContent !== undefined) this.isHtmlContent = isHtmlContent;
    if (onClick !== undefined) this.onClick = onClick;

    Object.assign(this.attrs, attrs);
    this._render();
  }

  getElement() {
    return this.element;
  }
}
