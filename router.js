import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('pages/index.twig');
});

router.get('/button', (req, res) => {
  res.render('pages/button.twig', {
    button: {
      text: 'Click me',
      variant: 'primary',
      size: 'medium',
      active: false,
      disabled: false,
      className: 'my-custom',
      isSquare: false,
      isHtmlContent: false,
      attrs: {},
    },
  });
});

router.get('/input', (req, res) => {
  res.render('pages/input.twig', {
    input: {
      id: 'demo-input',
      type: 'text',
      className: '',
      value: '',
      placeholder: 'Type here…',
      disabled: false,
      required: false,
      name: 'demo',
      ariaLabel: '',
      minLength: 3,
      maxLength: 10,
      pattern: '\\d+',
      errorMessage: 'Only digits allowed',
      showError: true,
      fullWidth: false,
      attrs: {},
    },
  });
});

router.get('/label', (req, res) => {
  res.render('pages/label.twig', {
    label: {
      text: 'Username',
      htmlFor: 'demo-input',
      className: '',
      isHtml: false,
      id: '',
      attrs: {},
    },
  });
});

router.get('/tabs', (req, res) => {
  res.render('pages/tabs.twig', {
    tabs: {
      align: 'center',
      preLoad: true,
      tabs: [
        {
          label: 'Puppies',
          content: `<img src="https://placedog.net/500/300?id=1" alt="Cute puppy" class="rounded shadow w-full" />`,
        },
        {
          label: 'Kittens',
          content: `<img src="https://placecats.com/bella/500/300" alt="Cute kitten" class="rounded shadow w-full" />`,
        },
        {
          label: 'Bunnies',
          content: `<img src="https://placebear.com/500/300" alt="Just kidding, a bear!" class="rounded shadow w-full" />`,
        },
      ],
    },
  });
});

router.get('/password-input', (req, res) => {
  res.render('pages/password-input.twig', {
    passwordInput: {
      id: 'password',
      label: 'Your Password',
      labelInline: false,
      placeholder: 'Enter your password',
      value: '',
      minLength: 5,
      maxLength: 12,
      allowedPattern: '^[a-zA-Z0-9!@#$%&*]*$',
      errorMessage: 'Only letters, numbers and these characters are allowed: !@#$%&*',
      showError: true,
      fullWidth: false,
      classNameInput: '',
      classNameToggle: '',
    },
  });
});

export default router;
