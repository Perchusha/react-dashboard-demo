import { Application } from '@hotwired/stimulus';
import ButtonController from './button_controller.js';
import InputController from './input_controller.js';
import LabelController from './label_controller.js';
import TabsController from './tabs_controller.js';
import PasswordInputController from './password_input_controller.js';

const application = Application.start();
application.register('button', ButtonController);
application.register('input', InputController);
application.register('label', LabelController);
application.register('tabs', TabsController);
application.register('password-input', PasswordInputController);
