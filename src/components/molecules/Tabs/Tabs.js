import { Button } from '../../atoms/Button/Button';

/**
 * Accessible and reusable Tabs component
 * - Compliant with WCAG AA
 * - Supports keyboard navigation and ARIA attributes
 * - Follows Atomic Design principles
 */
export class Tabs {
  constructor({ tabs = [], preLoad = false, align = 'left' }) {
    if (!Array.isArray(tabs)) {
      throw new Error('Tabs constructor expects an array of tab definitions.');
    }

    this.tabs = tabs;
    this.preLoad = preLoad;
    this.align = align;

    this.container = document.createElement('div');
    this.tabButtons = [];
    this.panels = [];
    this.panelMap = new Map();
    this.panelContainer = document.createElement('div');

    this._render();
    this.activateTab(0);
  }

  _render() {
    const alignment = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    this.tablist = document.createElement('div');
    this.tablist.setAttribute('role', 'tablist');
    this.tablist.setAttribute('aria-label', 'Tabs');
    this.tablist.className = `flex gap-2 px-2 py-2 border-b ${alignment[this.align] || alignment.left}`;

    this.tabs.forEach((tab, index) => {
      const isSelected = index === 0;
      const tabId = `tab-${index}`;
      const panelId = `panel-${index}`;

      const button = new Button({
        text: tab.label,
        id: tabId,
        role: 'tab',
        variant: 'primary',
        active: isSelected,
        disabled: false,
        'aria-controls': panelId,
        'aria-selected': String(isSelected),
        tabindex: isSelected ? '0' : '-1',
      });

      this.tabButtons.push(button);
      this.tablist.appendChild(button.getElement());

      this.panelMap.set(panelId, {
        content: tab.content,
        tabId,
      });

      if (this.preLoad) {
        const panel = document.createElement('div');
        panel.id = panelId;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabId);
        panel.tabIndex = 0;
        panel.hidden = !isSelected;
        panel.className = 'p-4';
        panel.innerHTML = tab.content;
        this.panels.push(panel);
      }
    });

    this.tabButtons.forEach((btn, i) => {
      const element = btn.getElement();
      element.addEventListener('click', () => this.activateTab(i));
      element.addEventListener('keydown', e => this.handleKeyDown(e));
    });

    this.container.appendChild(this.tablist);
    if (this.preLoad) {
      this.panels.forEach(panel => this.container.appendChild(panel));
    } else {
      this.container.appendChild(this.panelContainer);
    }
  }

  renderPanel(panelId) {
    const data = this.panelMap.get(panelId);
    if (!data) return;

    this.panelContainer.innerHTML = '';

    const panel = document.createElement('div');
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', data.tabId);
    panel.tabIndex = 0;
    panel.className = 'p-4';
    panel.innerHTML = data.content;

    this.panelContainer.appendChild(panel);
  }

  activateTab(index) {
    this.tabButtons.forEach((btn, i) => {
      const isActive = i === index;
      const el = btn.getElement();

      btn.setActive(isActive);
      el.setAttribute('aria-selected', String(isActive));
      el.setAttribute('tabindex', isActive ? '0' : '-1');

      if (this.preLoad) {
        this.panels[i].hidden = !isActive;
      }
    });

    const panelId = `panel-${index}`;
    if (!this.preLoad) {
      this.renderPanel(panelId);
    }

    this.tabButtons[index].getElement().focus();
  }

  handleKeyDown(e) {
    const current = this.tabButtons.findIndex(btn => btn.getElement() === document.activeElement);
    if (current === -1) return;

    let next = current;
    switch (e.key) {
      case 'ArrowRight':
        next = (current + 1) % this.tabButtons.length;
        break;
      case 'ArrowLeft':
        next = (current - 1 + this.tabButtons.length) % this.tabButtons.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = this.tabButtons.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.activateTab(current);
        return;
      default:
        return;
    }

    e.preventDefault();
    this.tabButtons[next].getElement().focus();
  }

  getElement() {
    return this.container;
  }
}
