const element = document.querySelector('#custom-select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: ''
});
var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7(999) 999-99-99");
im.mask(selector);
new JustValidate('.form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 5
    },
    phone: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
    email: {
      required: true,
      email: true
    },
  },
});
new window.JustValidate('.js-validate-error-label', {
  colorWrong: '#FF5C00'
});

