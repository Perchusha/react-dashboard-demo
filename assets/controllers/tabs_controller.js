import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['tab', 'panel', 'panelContainer'];
  static values = {
    preLoad: Boolean,
    align: String,
  };

  connect() {
    this.activate(0);

    this.tabTargets.forEach((btn, i) => {
      btn.addEventListener('click', () => this.activate(i));
      btn.addEventListener('keydown', e => this._onKeydown(e));
    });
  }

  activate(index) {
    if (index < 0 || index >= this.tabTargets.length) return;

    const btn = this.tabTargets[index];
    if (!btn || btn.disabled) return;

    this.tabTargets.forEach((b, i) => {
      const isActive = i === index;

      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      b.setAttribute('tabindex', isActive ? '0' : '-1');
      b.dataset.buttonActiveValue = isActive ? '1' : '0';
      b.classList.toggle('border-blue-500', isActive);

      if (isActive) {
        setTimeout(() => b.focus(), 0);
      }
    });

    if (this.preLoadValue) {
      this.panelTargets.forEach((p, i) => {
        p.hidden = i !== index;
      });
    } else {
      const container = this.panelContainerTarget;
      const panel = this._makePanel(index);
      container.innerHTML = '';
      container.appendChild(panel);
    }
  }

  _makePanel(index) {
    const btn = this.tabTargets[index];
    const panelId = btn.getAttribute('aria-controls');
    const labelId = btn.id;

    const existing = this.panelTargets.find(p => p.id === panelId);
    if (existing) {
      return existing.cloneNode(true);
    }

    const raw = btn.dataset.tabsPanelContent;
    const div = document.createElement('div');
    div.id = panelId;
    div.setAttribute('role', 'tabpanel');
    div.setAttribute('aria-labelledby', labelId);
    div.tabIndex = 0;
    div.className = 'p-4';
    div.innerHTML = raw || '';
    return div;
  }

  _onKeydown(e) {
    const current = this.tabTargets.indexOf(document.activeElement);
    if (current < 0) return;

    let dir = 0;
    if (e.key === 'ArrowRight') dir = 1;
    if (e.key === 'ArrowLeft') dir = -1;

    if (dir !== 0) {
      e.preventDefault();
      let next = (current + dir + this.tabTargets.length) % this.tabTargets.length;

      while (this.tabTargets[next].disabled && next !== current) {
        next = (next + dir + this.tabTargets.length) % this.tabTargets.length;
      }

      this.tabTargets[next].focus();
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.activate(current);
    }
  }
}
