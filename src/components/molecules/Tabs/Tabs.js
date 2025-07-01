import { Button } from '../../atoms/Button/Button.js';

export class Tabs {
  constructor({ tabs = [], preLoad = false, align = 'left', onTabChange = null }) {
    if (!Array.isArray(tabs)) {
      throw new Error('Tabs constructor expects an array of tab definitions.');
    }

    this.tabs = tabs;
    this.preLoad = preLoad;
    this.align = align;
    this.onTabChange = onTabChange;

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
      const isDisabled = tab.disabled === true;
      const tabId = `tab-${index}`;
      const panelId = `panel-${index}`;

      const button = new Button({
        text: tab.label,
        variant: 'secondary',
        size: 'medium',
        disabled: isDisabled,
        className: 'rounded-none border-b-2 border-transparent aria-selected:border-blue-500',
      });

      const el = button.getElement();
      el.id = tabId;
      el.setAttribute('role', 'tab');
      el.setAttribute('aria-controls', panelId);
      el.setAttribute('aria-selected', String(isSelected));
      el.setAttribute('tabindex', isDisabled ? '-1' : isSelected ? '0' : '-1');

      this.tabButtons.push(button);
      this.tablist.appendChild(el);

      this.panelMap.set(panelId, { content: tab.content, tabId });

      if (this.preLoad) {
        const panel = document.createElement('div');
        panel.id = panelId;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabId);
        panel.tabIndex = 0;
        panel.hidden = !isSelected;
        panel.className = 'p-4';
        panel.innerHTML = typeof tab.content === 'string' ? tab.content : '';
        this.panels.push(panel);
      }
    });

    this.tabButtons.forEach((btn, i) => {
      const el = btn.getElement();
      if (!el.disabled) {
        el.addEventListener('click', () => this.activateTab(i));
        el.addEventListener('keydown', e => this._handleKeyDown(e));
      }
    });

    this.container.appendChild(this.tablist);
    if (this.preLoad) {
      this.panels.forEach(panel => this.container.appendChild(panel));
    } else {
      this.container.appendChild(this.panelContainer);
    }
  }

  activateTab(index) {
    const btn = this.tabButtons[index];
    if (!btn || btn.getElement().disabled) return;

    this.tabButtons.forEach((btn, i) => {
      const isActive = i === index;
      const el = btn.getElement();

      btn.setActive(isActive);
      el.setAttribute('aria-selected', String(isActive));
      el.setAttribute('tabindex', isActive ? '0' : '-1');

      if (this.preLoad && this.panels[i]) {
        this.panels[i].hidden = !isActive;
      }
    });

    const panelId = `panel-${index}`;
    if (!this.preLoad) {
      this._renderPanel(panelId);
    }

    const el = this.tabButtons[index].getElement();
    if (el.offsetParent !== null) el.focus();

    if (typeof this.onTabChange === 'function') {
      this.onTabChange(index);
    }
  }

  _renderPanel(panelId) {
    const data = this.panelMap.get(panelId);
    if (!data) return;

    this.panelContainer.innerHTML = '';

    const panel = document.createElement('div');
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', data.tabId);
    panel.tabIndex = 0;
    panel.className = 'p-4';

    if (typeof data.content === 'string') {
      panel.innerHTML = data.content;
    } else if (data.content instanceof HTMLElement) {
      panel.appendChild(data.content);
    }

    this.panelContainer.appendChild(panel);
  }

  setTabContent(index, newContent) {
    const panelId = `panel-${index}`;
    const data = this.panelMap.get(panelId);
    if (!data) return;

    data.content = newContent;

    if (this.preLoad && this.panels[index]) {
      const panel = this.panels[index];
      panel.innerHTML = '';
      if (typeof newContent === 'string') {
        panel.innerHTML = newContent;
      } else if (newContent instanceof HTMLElement) {
        panel.appendChild(newContent);
      }
    } else {
      const isActive = this.tabButtons[index].getElement().getAttribute('aria-selected') === 'true';
      if (isActive) {
        this._renderPanel(panelId);
      }
    }
  }

  _handleKeyDown(e) {
    const current = this.tabButtons.findIndex(btn => btn.getElement() === document.activeElement);
    if (current === -1) return;

    let next = current;
    const dir = ['ArrowRight', 'End'].includes(e.key) ? 1 : -1;

    do {
      next = (next + dir + this.tabButtons.length) % this.tabButtons.length;
    } while (this.tabButtons[next].getElement().disabled && next !== current);

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.activateTab(current);
      return;
    }

    e.preventDefault();
    this.tabButtons[next].getElement().focus();
  }

  getElement() {
    return this.container;
  }
}
