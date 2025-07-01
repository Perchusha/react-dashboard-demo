import { Button } from '../src/components/atoms/Button/Button.js';
import { Input } from '../src/components/atoms/Input/Input.js';
import { Label } from '../src/components/atoms/Label/Label.js';
import { PasswordInput } from '../src/components/molecules/PasswordInput/PasswordInput.js';
import { Tabs } from '../src/components/molecules/Tabs/Tabs.js';
import { AuthForm } from '../src/components/organisms/AuthForm/AuthForm.js';

const COMPONENTS = { Button, Input, Label, PasswordInput, Tabs, AuthForm };

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-component]').forEach(el => {
    const name = el.dataset.component;
    const props = JSON.parse(el.dataset.props);
    const Comp = COMPONENTS[name];
    if (!Comp) return;
    new Comp(props, el);
  });
});
