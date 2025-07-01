var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/components/atoms/Button/Button.js
var Button = class {
  constructor({
    id = "",
    text = "",
    type = "button",
    className = "",
    variant = "primary",
    size = "medium",
    isSquare = false,
    active = false,
    disabled = false,
    isHtmlContent = false,
    onClick = null,
    attrs = {}
  } = {}, existingEl = null) {
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
      onClick
    });
    this.attrs = attrs;
    this.sizeClasses = {
      small: "px-3 py-2 text-xs",
      medium: "px-5 py-2.5 text-sm",
      large: "px-5 py-3 text-base"
    };
    this.variants = {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
    };
    this.activeClass = "bg-blue-800";
    this.disabledClass = "opacity-50 cursor-not-allowed";
    this.element = existingEl || document.createElement("button");
    this.element.type = this.type;
    if (!existingEl) {
      this._render();
    }
    this._attachEvents();
  }
  _render() {
    if (this._clickHandler) {
      this.element.removeEventListener("click", this._clickHandler);
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
      this.element.setAttribute("aria-disabled", "true");
    } else {
      this.element.removeAttribute("aria-disabled");
    }
    const baseClass = [
      "font-bold",
      "rounded",
      !this.disabled ? "cursor-pointer" : "",
      this.sizeClasses[this.size] || this.sizeClasses.medium,
      this.isSquare ? "aspect-square p-0 w-auto" : ""
    ].filter(Boolean).join(" ");
    let variantClass = this.variants[this.variant] || "";
    if (this.disabled) {
      variantClass = variantClass.replace(/hover:[\w-:/]+/g, "");
    }
    const classList = [
      baseClass,
      variantClass,
      this.active ? this.activeClass : "",
      this.disabled ? this.disabledClass : "",
      this.className
    ].filter(Boolean).join(" ");
    this.element.className = classList;
    for (const [key, val] of Object.entries(this.attrs)) {
      this.element.setAttribute(key, val);
    }
  }
  _attachEvents() {
    if (typeof this.onClick === "function" && !this.disabled) {
      this._clickHandler = () => this.onClick();
      this.element.addEventListener("click", this._clickHandler);
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
};

// src/components/atoms/Input/Input.js
var Input = class {
  constructor({
    id = "",
    type = "text",
    className = "",
    value = "",
    placeholder = "",
    disabled = false,
    required = false,
    name = "",
    ariaLabel = "",
    minLength,
    maxLength,
    pattern,
    errorMessage = "Invalid format",
    showError = true,
    validation,
    fullWidth = false,
    attrs = {}
  } = {}, existingEl = null) {
    Object.assign(this, {
      id,
      type,
      className,
      placeholder,
      value,
      disabled,
      required,
      name,
      ariaLabel,
      minLength,
      maxLength,
      pattern,
      errorMessage,
      showError,
      validation,
      fullWidth
    });
    this.attrs = attrs;
    if (existingEl) {
      this.element = existingEl;
      this.error = this.element.nextElementSibling;
      this._attachEvents();
    } else {
      this.element = document.createElement("input");
      this.error = document.createElement("div");
      this.error.className = "absolute text-red-500 text-xs pointer-events-none";
      this.error.setAttribute("aria-live", "polite");
      this.error.hidden = true;
      this._render();
      this._attachEvents();
    }
  }
  _render() {
    const el = this.element;
    el.type = this.type;
    el.id = this.id;
    el.name = this.name;
    el.placeholder = this.placeholder;
    el.value = this.value;
    el.disabled = this.disabled;
    el.required = this.required;
    if (this.ariaLabel) el.setAttribute("aria-label", this.ariaLabel);
    if (this.minLength != null) el.minLength = this.minLength;
    if (this.maxLength != null) el.maxLength = this.maxLength;
    if (this.pattern instanceof RegExp) el.pattern = this.pattern.source;
    const baseClass = "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300";
    const disabledClass = this.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "";
    const fullWidthClass = this.fullWidth ? "w-full" : "";
    el.className = [baseClass, disabledClass, fullWidthClass, this.className].filter(Boolean).join(" ");
    for (const [key, val] of Object.entries(this.attrs)) {
      el.setAttribute(key, val);
    }
  }
  _attachEvents() {
    this.element.addEventListener("input", () => this.validate());
  }
  validate() {
    const val = this.element.value;
    let error = "";
    if (this.required && !val) {
      error = "This field is required";
    } else if (this.minLength && val.length < this.minLength) {
      error = `Minimum ${this.minLength} characters`;
    } else if (this.maxLength && val.length > this.maxLength) {
      error = `Maximum ${this.maxLength} characters`;
    } else if (this.pattern && !new RegExp(this.pattern).test(val)) {
      error = this.errorMessage;
    }
    if (!error && typeof this.validation === "function") {
      const result = this.validation(val);
      if (typeof result === "string" && result.trim()) {
        error = result;
      }
    }
    this.setError(error);
    return !error;
  }
  setError(message) {
    if (message) {
      this.element.classList.add("border-red-500");
      this.element.setAttribute("aria-invalid", "true");
      this.error.textContent = message;
      this.error.hidden = !this.showError;
    } else {
      this.element.classList.remove("border-red-500");
      this.element.removeAttribute("aria-invalid");
      this.error.textContent = "";
      this.error.hidden = true;
    }
  }
  getElement() {
    const wrapper = document.createElement("div");
    wrapper.className = `relative${this.fullWidth ? " w-full" : ""}`;
    wrapper.appendChild(this.element);
    wrapper.appendChild(this.error);
    return wrapper;
  }
  setValue(value) {
    this.element.value = value;
  }
  getValue() {
    return this.element.value;
  }
  setDisabled(disabled) {
    this.disabled = disabled;
    this._render();
  }
};

// src/components/atoms/Label/Label.js
var Label = class {
  constructor({ text = "", htmlFor = "", className = "", isHtml = false, id = "", attrs = {} } = {}, existingEl = null) {
    this.text = text;
    this.htmlFor = htmlFor;
    this.className = className;
    this.isHtml = isHtml;
    this.id = id;
    this.attrs = attrs;
    if (existingEl) {
      this.element = existingEl;
    } else {
      this.element = document.createElement("label");
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
      this.element.setAttribute("for", this.htmlFor);
    }
    const baseClass = "block text-sm font-medium text-gray-700";
    this.element.className = [baseClass, this.className].filter(Boolean).join(" ");
    for (const [key, val] of Object.entries(this.attrs)) {
      this.element.setAttribute(key, val);
    }
  }
  getElement() {
    return this.element;
  }
};

// src/components/molecules/PasswordInput/PasswordInput.js
var PasswordInput = class {
  /**
   * @param {Object} props
   * @param {HTMLDivElement|null} existingEl
   */
  constructor({
    id = "password",
    label = "Password",
    labelInline = false,
    placeholder = "Enter password",
    value = "",
    minLength = 5,
    maxLength = 12,
    allowedPattern = "^[a-zA-Z0-9!@#$%&*]*$",
    showError = true,
    fullWidth = false,
    classNameInput = "",
    classNameToggle = ""
  } = {}, existingEl = null) {
    Object.assign(this, {
      id,
      labelInline,
      placeholder,
      value,
      minLength,
      maxLength,
      allowedPattern,
      showError,
      fullWidth,
      classNameInput,
      classNameToggle
    });
    this.labelText = label;
    this.visible = false;
    if (existingEl) {
      this.container = existingEl;
      this.inputEl = this.container.querySelector("input");
      this.errorEl = this.container.querySelector("div[aria-live]");
      this.toggleEl = this.container.querySelector("button");
      try {
        const inputProps = JSON.parse(this.inputEl.getAttribute("data-props"));
        this.input = new Input(inputProps, this.inputEl);
      } catch (e) {
        console.warn("Failed to hydrate Input:", e);
      }
      try {
        const toggleProps = JSON.parse(this.toggleEl.getAttribute("data-props"));
        this.toggle = new Button(toggleProps, this.toggleEl);
      } catch (e) {
        console.warn("Failed to hydrate Button:", e);
      }
      this._attachEvents();
    } else {
      this.container = document.createElement("div");
      this.container.className = `${this.labelInline ? "flex items-center gap-4" : "flex flex-col gap-1"} ${this.fullWidth ? "w-full" : ""}`;
      this.label = new Label({ text: label, htmlFor: id });
      this.input = new Input({
        id: this.id,
        type: "password",
        placeholder: this.placeholder,
        value: this.value,
        minLength: this.minLength,
        maxLength: this.maxLength,
        pattern: new RegExp(this.allowedPattern),
        errorMessage: "Only letters, numbers and these characters are allowed: !@#$%&*",
        className: `flex-1 ${this.classNameInput}`.trim(),
        showError: this.showError,
        fullWidth: this.fullWidth
      });
      this.inputEl = this.input.element;
      this.inputEl.setAttribute(
        "data-props",
        JSON.stringify({
          id: this.id,
          type: "password",
          placeholder: this.placeholder,
          value: this.value,
          minLength: this.minLength,
          maxLength: this.maxLength,
          pattern: this.allowedPattern,
          showError: this.showError,
          fullWidth: this.fullWidth,
          className: `flex-1 ${this.classNameInput}`.trim()
        })
      );
      this.inputEl.setAttribute("data-component", "Input");
      const toggleProps = {
        text: this._getEyeIcon(false),
        size: "small",
        isSquare: true,
        "aria-label": "Show password",
        className: `${this.classNameToggle}`.trim(),
        variant: "secondary",
        isHtmlContent: true
      };
      this.toggle = new Button(toggleProps);
      this.toggleEl = this.toggle.getElement();
      this.toggleEl.setAttribute("data-props", JSON.stringify(toggleProps));
      this.toggleEl.setAttribute("data-component", "Button");
      this._render();
      this._attachEvents();
    }
  }
  _render() {
    const wrapper = document.createElement("div");
    wrapper.className = `flex items-center gap-2 ${this.fullWidth ? "w-full" : ""}`;
    if (this.labelText) {
      this.container.appendChild(this.label.getElement());
    }
    wrapper.appendChild(this.input.getElement());
    wrapper.appendChild(this.toggleEl);
    this.inputEl.setAttribute("aria-describedby", `${this.id}-error`);
    this.container.appendChild(wrapper);
  }
  _attachEvents() {
    this.toggleEl.addEventListener("click", () => this.toggleVisibility());
    if (this.input && this.inputEl) {
      this.inputEl.addEventListener("input", () => this.input.validate());
    }
  }
  toggleVisibility() {
    this.visible = !this.visible;
    this.inputEl.type = this.visible ? "text" : "password";
    this.toggleEl.innerHTML = this._getEyeIcon(this.visible);
    this.toggleEl.setAttribute("aria-label", this.visible ? "Hide password" : "Show password");
  }
  _getEyeIcon(open) {
    return open ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`;
  }
  validate() {
    return this.input.validate();
  }
  getValue() {
    return this.input.getValue();
  }
  setValue(val) {
    this.input.setValue(val);
  }
  getElement() {
    return this.container;
  }
};

// src/components/molecules/Tabs/Tabs.js
var Tabs = class {
  constructor({ tabs = [], preLoad = false, align = "left", onTabChange = null } = {}, existingEl = null) {
    if (!Array.isArray(tabs)) {
      throw new Error("Tabs constructor expects an array of tab definitions.");
    }
    this.onTabChange = onTabChange;
    if (existingEl) {
      this.container = existingEl;
      const {
        tabs: pTabs,
        preLoad: pPre,
        align: pAlign,
        onTabChange: pOTC
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
          setActive: (active) => {
            el.classList.toggle("bg-blue-800", active);
            el.setAttribute("aria-selected", String(active));
            el.setAttribute("tabindex", active ? "0" : "-1");
          }
        })
      );
      if (this.preLoad) {
        this.panels = Array.from(this.container.querySelectorAll('[role="tabpanel"]'));
      } else {
        const firstPanel = this.container.querySelector('[role="tabpanel"]');
        this.panels = [];
        this.panelContainer = firstPanel ? firstPanel.parentElement : this.container.appendChild(document.createElement("div"));
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
    this.container = document.createElement("div");
    this.tabButtons = [];
    this.panels = [];
    this.panelMap = /* @__PURE__ */ new Map();
    this.panelContainer = document.createElement("div");
    this._render();
    this.activateTab(0);
  }
  _render() {
    const alignCls = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end"
    }[this.align];
    this.tablist = document.createElement("div");
    this.tablist.setAttribute("role", "tablist");
    this.tablist.className = `flex gap-2 px-2 py-2 border-b ${alignCls}`;
    this.container.appendChild(this.tablist);
    if (!this.preLoad) {
      this.container.appendChild(this.panelContainer);
    }
    this.tabs.forEach((tab, i) => {
      const isSel = i === 0;
      const btn = new Button({
        text: tab.label,
        variant: "secondary",
        size: "medium",
        disabled: !!tab.disabled,
        className: "rounded-none border-b-2 border-transparent aria-selected:border-blue-500"
      });
      const el = btn.getElement();
      el.id = `tab-${i}`;
      el.setAttribute("role", "tab");
      el.setAttribute("aria-controls", `panel-${i}`);
      el.setAttribute("aria-selected", String(isSel));
      el.setAttribute("tabindex", isSel ? "0" : "-1");
      this.tabButtons.push({
        index: i,
        getElement: () => el,
        setActive: (active) => {
          btn.setActive(active);
          el.setAttribute("aria-selected", String(active));
          el.setAttribute("tabindex", active ? "0" : "-1");
        }
      });
      this.tablist.appendChild(el);
      this.panelMap.set(`panel-${i}`, { content: tab.content, tabId: `tab-${i}` });
      if (this.preLoad) {
        const panel = document.createElement("div");
        panel.id = `panel-${i}`;
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", `tab-${i}`);
        panel.tabIndex = 0;
        panel.hidden = !isSel;
        panel.className = "p-4";
        panel.innerHTML = tab.content;
        this.panels.push(panel);
        this.container.appendChild(panel);
      }
    });
    this._attachEvents();
  }
  _attachEvents() {
    this.tabButtons.forEach((btn) => {
      const el = btn.getElement();
      if (!el.disabled) {
        el.addEventListener("click", () => this.activateTab(btn.index));
        el.addEventListener("keydown", (e) => this._handleKeyDown(e));
      }
    });
  }
  activateTab(index) {
    this.tabButtons.forEach((tb) => tb.setActive(tb.index === index));
    if (this.preLoad) {
      this.panels.forEach((panel, i) => {
        panel.hidden = i !== index;
      });
    } else {
      this._renderPanel(`panel-${index}`);
    }
    if (typeof this.onTabChange === "function") {
      this.onTabChange(index);
    }
  }
  _renderPanel(panelId) {
    const data = this.panelMap.get(panelId);
    if (!data) return;
    this.panelContainer.innerHTML = "";
    const panel = document.createElement("div");
    panel.id = panelId;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", data.tabId);
    panel.tabIndex = 0;
    panel.className = "p-4";
    panel.innerHTML = data.content;
    this.panelContainer.appendChild(panel);
  }
  _handleKeyDown(e) {
    const key = e.key;
    const cur = this.tabButtons.findIndex((tb) => tb.getElement() === e.target);
    if (cur < 0) return;
    let nxt = cur;
    if (key === "ArrowRight" || key === "ArrowDown") {
      nxt = (cur + 1) % this.tabButtons.length;
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      nxt = (cur - 1 + this.tabButtons.length) % this.tabButtons.length;
    } else if (key === "Home") {
      nxt = 0;
    } else if (key === "End") {
      nxt = this.tabButtons.length - 1;
    } else if (key === "Enter" || key === " ") {
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
    data.content = typeof newContent === "string" ? newContent : newContent.outerHTML || newContent.innerHTML;
    if (this.preLoad) {
      this.panels[index].innerHTML = data.content;
    } else if (this.tabButtons[index].getElement().getAttribute("aria-selected") === "true") {
      this._renderPanel(panelId);
    }
  }
  getElement() {
    return this.container;
  }
};

// src/components/organisms/AuthForm/AuthForm.js
var AuthForm = class {
  constructor({ onSubmit } = {}, existingEl = null) {
    this.onSubmit = onSubmit;
    if (existingEl) {
      this.container = existingEl;
      const tabsEl = this.container.querySelector('[data-component="Tabs"]');
      const tabsProps = JSON.parse(tabsEl.dataset.props);
      this.tabs = new Tabs(tabsProps, tabsEl);
      this.container.querySelectorAll('[data-component="Input"]').forEach((el) => {
        const props = JSON.parse(el.dataset.props);
        new Input(props, el);
      });
      this.container.querySelectorAll('[data-component="PasswordInput"]').forEach((el) => {
        const props = JSON.parse(el.dataset.props);
        new PasswordInput(props, el);
      });
      this.container.querySelectorAll('[data-component="Button"]').forEach((el) => {
        const props = JSON.parse(el.dataset.props);
        new Button(props, el);
      });
      this._attachFormEvents();
    } else {
      this.container = document.createElement("div");
      this.container.className = "max-w-md w-full mx-auto p-6 bg-white rounded shadow";
      const tabsProps = {
        tabs: [
          { label: "Login", content: "" },
          { label: "Register", content: "" }
        ],
        preLoad: true,
        align: "left"
      };
      this.tabs = new Tabs(tabsProps);
      const tabsEl = this.tabs.getElement();
      tabsEl.setAttribute("data-component", "Tabs");
      tabsEl.setAttribute("data-props", JSON.stringify(tabsProps));
      this.loginForm = this._createLoginForm();
      this.registerForm = this._createRegisterForm();
      this.tabs.setTabContent(0, this.loginForm);
      this.tabs.setTabContent(1, this.registerForm);
      this.container.appendChild(tabsEl);
      this._attachFormEvents();
    }
  }
  _createLoginForm() {
    const form = document.createElement("form");
    form.className = "flex flex-col gap-4 w-full";
    const emailCmp = new Input({
      id: "login-email",
      type: "email",
      placeholder: "Email",
      fullWidth: true,
      required: true
    });
    const emailEl = emailCmp.getElement();
    const emailInputEl = emailEl.querySelector("input");
    emailInputEl.setAttribute("data-component", "Input");
    emailInputEl.setAttribute(
      "data-props",
      JSON.stringify({
        id: "login-email",
        type: "email",
        placeholder: "Email",
        fullWidth: true,
        required: true
      })
    );
    const pwdCmp = new PasswordInput({
      id: "login-password",
      placeholder: "Password",
      fullWidth: true,
      required: true,
      label: "",
      labelInline: true,
      allowedPattern: "",
      showError: true
    });
    const pwdEl = pwdCmp.getElement();
    pwdEl.setAttribute("data-component", "PasswordInput");
    pwdEl.setAttribute(
      "data-props",
      JSON.stringify({
        id: "login-password",
        placeholder: "Password",
        fullWidth: true,
        required: true,
        label: "",
        labelInline: true,
        allowedPattern: "",
        showError: true
      })
    );
    const submitCmp = new Button({
      type: "submit",
      text: "Login",
      variant: "primary"
    });
    const btnEl = submitCmp.getElement();
    btnEl.setAttribute("data-component", "Button");
    btnEl.setAttribute(
      "data-props",
      JSON.stringify({
        type: "submit",
        text: "Login",
        variant: "primary"
      })
    );
    form.append(emailEl, pwdEl, btnEl);
    return form;
  }
  _createRegisterForm() {
    const form = document.createElement("form");
    form.className = "flex flex-col gap-4 w-full";
    const emailCmp = new Input({
      id: "register-email",
      type: "email",
      placeholder: "Email",
      fullWidth: true,
      required: true
    });
    const emailEl = emailCmp.getElement();
    const emailInputEl = emailEl.querySelector("input");
    emailInputEl.setAttribute("data-component", "Input");
    emailInputEl.setAttribute(
      "data-props",
      JSON.stringify({
        id: "register-email",
        type: "email",
        placeholder: "Email",
        fullWidth: true,
        required: true
      })
    );
    const pwdCmp = new PasswordInput({
      id: "register-password",
      placeholder: "Password",
      fullWidth: true,
      required: true,
      label: "",
      labelInline: true,
      allowedPattern: "",
      showError: true
    });
    const pwdEl = pwdCmp.getElement();
    pwdEl.setAttribute("data-component", "PasswordInput");
    pwdEl.setAttribute(
      "data-props",
      JSON.stringify({
        id: "register-password",
        placeholder: "Password",
        fullWidth: true,
        required: true,
        label: "",
        labelInline: true,
        allowedPattern: "",
        showError: true
      })
    );
    const confCmp = new PasswordInput({
      id: "register-confirm",
      placeholder: "Confirm Password",
      fullWidth: true,
      required: true,
      label: "",
      labelInline: true,
      allowedPattern: "",
      showError: true
    });
    const confEl = confCmp.getElement();
    confEl.setAttribute("data-component", "PasswordInput");
    confEl.setAttribute(
      "data-props",
      JSON.stringify({
        id: "register-confirm",
        placeholder: "Confirm Password",
        fullWidth: true,
        required: true,
        label: "",
        labelInline: true,
        allowedPattern: "",
        showError: true
      })
    );
    const submitCmp = new Button({
      type: "submit",
      text: "Register",
      variant: "primary",
      className: "w-full"
    });
    const btnEl = submitCmp.getElement();
    btnEl.setAttribute("data-component", "Button");
    btnEl.setAttribute(
      "data-props",
      JSON.stringify({
        type: "submit",
        text: "Register",
        variant: "primary",
        className: "w-full"
      })
    );
    form.append(emailEl, pwdEl, confEl, btnEl);
    return form;
  }
  _attachFormEvents() {
    this.container.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        var _a;
        e.preventDefault();
        const data = {};
        new FormData(form).forEach((val, key) => data[key] = val);
        const type = form.querySelector('button[type="submit"]').textContent.toLowerCase();
        (_a = this.onSubmit) == null ? void 0 : _a.call(this, __spreadValues({ type }, data));
      });
    });
  }
  getElement() {
    return this.container;
  }
};

// public/client.js
var COMPONENTS = { Button, Input, Label, PasswordInput, Tabs, AuthForm };
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-component]").forEach((el) => {
    const name = el.dataset.component;
    const props = JSON.parse(el.dataset.props);
    const Comp = COMPONENTS[name];
    if (!Comp) return;
    new Comp(props, el);
  });
});
