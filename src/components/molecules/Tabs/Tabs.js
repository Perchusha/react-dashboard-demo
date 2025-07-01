import { Button } from '../../atoms/Button/Button.js';

export class Tabs {
  constructor(
    { tabs = [], preLoad = false, align = 'left', onTabChange = null } = {},
    existingEl = null
  ) {
    if (!Array.isArray(tabs)) {
      throw new Error('Tabs constructor expects an array of tab definitions.');
    }
    this.onTabChange = onTabChange;

    if (existingEl) {
      this.container = existingEl;
      const {
        tabs: pTabs,
        preLoad: pPre,
        align: pAlign,
        onTabChange: pOTC,
      } = JSON.parse(this.container.dataset.props);
      this.tabs = pTabs;
      this.preLoad = pPre;
      this.align = pAlign;
      this.onTabChange = pOTC;

      this.tablist = this.container.querySelector('[role="tablist"]');
      this.tabButtons = Array.from(this.tablist.querySelectorAll('[role="tab"]')).map(
        (el, idx) => ({
          index: idx,
          getElement: () => el,
          setActive: active => {
            el.classList.toggle('bg-blue-800', active);
            el.setAttribute('aria-selected', String(active));
            el.setAttribute('tabindex', active ? '0' : '-1');
          },
        })
      );

      if (this.preLoad) {
        this.panels = Array.from(this.container.querySelectorAll('[role="tabpanel"]'));
      } else {
        const firstPanel = this.container.querySelector('[role="tabpanel"]');
        this.panels = [];
        this.panelContainer = firstPanel
          ? firstPanel.parentElement
          : this.container.appendChild(document.createElement('div'));
      }

      this.panelMap = new Map(
        this.tabs.map((tab, i) => [`panel-${i}`, { content: tab.content, tabId: `tab-${i}` }])
      );

      this._attachEvents();
      return;
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
    const alignCls = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    }[this.align];
    this.tablist = document.createElement('div');
    this.tablist.setAttribute('role', 'tablist');
    this.tablist.className = `flex gap-2 px-2 py-2 border-b ${alignCls}`;

    this.container.appendChild(this.tablist);
    if (!this.preLoad) {
      this.container.appendChild(this.panelContainer);
    }

    this.tabs.forEach((tab, i) => {
      const isSel = i === 0;
      const btn = new Button({
        text: tab.label,
        variant: 'secondary',
        size: 'medium',
        disabled: !!tab.disabled,
        className: 'rounded-none border-b-2 border-transparent aria-selected:border-blue-500',
      });
      const el = btn.getElement();
      el.id = `tab-${i}`;
      el.setAttribute('role', 'tab');
      el.setAttribute('aria-controls', `panel-${i}`);
      el.setAttribute('aria-selected', String(isSel));
      el.setAttribute('tabindex', isSel ? '0' : '-1');

      this.tabButtons.push({
        index: i,
        getElement: () => el,
        setActive: active => {
          btn.setActive(active);
          el.setAttribute('aria-selected', String(active));
          el.setAttribute('tabindex', active ? '0' : '-1');
        },
      });
      this.tablist.appendChild(el);

      this.panelMap.set(`panel-${i}`, { content: tab.content, tabId: `tab-${i}` });

      if (this.preLoad) {
        const panel = document.createElement('div');
        panel.id = `panel-${i}`;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', `tab-${i}`);
        panel.tabIndex = 0;
        panel.hidden = !isSel;
        panel.className = 'p-4';
        panel.innerHTML = tab.content;
        this.panels.push(panel);
        this.container.appendChild(panel);
      }
    });

    this._attachEvents();
  }

  _attachEvents() {
    this.tabButtons.forEach(btn => {
      const el = btn.getElement();
      if (!el.disabled) {
        el.addEventListener('click', () => this.activateTab(btn.index));
        el.addEventListener('keydown', e => this._handleKeyDown(e));
      }
    });
  }

  activateTab(index) {
    this.tabButtons.forEach(tb => tb.setActive(tb.index === index));

    if (this.preLoad) {
      this.panels.forEach((panel, i) => {
        panel.hidden = i !== index;
      });
    } else {
      this._renderPanel(`panel-${index}`);
    }

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
    panel.innerHTML = data.content;
    this.panelContainer.appendChild(panel);
  }

  _handleKeyDown(e) {
    const key = e.key;
    const cur = this.tabButtons.findIndex(tb => tb.getElement() === e.target);
    if (cur < 0) return;
    let nxt = cur;
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      nxt = (cur + 1) % this.tabButtons.length;
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      nxt = (cur - 1 + this.tabButtons.length) % this.tabButtons.length;
    } else if (key === 'Home') {
      nxt = 0;
    } else if (key === 'End') {
      nxt = this.tabButtons.length - 1;
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      return this.activateTab(cur);
    } else {
      return;
    }
    e.preventDefault();
    this.tabButtons[nxt].getElement().focus();
  }

  setTabContent(index, newContent) {
    const panelId = `panel-${index}`;
    const data = this.panelMap.get(panelId);
    if (!data) return;
    data.content =
      typeof newContent === 'string' ? newContent : newContent.outerHTML || newContent.innerHTML;

    if (this.preLoad) {
      this.panels[index].innerHTML = data.content;
    } else if (this.tabButtons[index].getElement().getAttribute('aria-selected') === 'true') {
      this._renderPanel(panelId);
    }
  }

  getElement() {
    return this.container;
  }
}
