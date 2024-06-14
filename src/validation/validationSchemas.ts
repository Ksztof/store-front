import * as Yup from 'yup';

export const shippingDetailsSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .max(52, 'First name cannot be longer than 52 characters')
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
  lastName: Yup.string()
    .required('Last name is required')
    .max(52, 'Last name cannot be longer than 52 characters')
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
  email: Yup.string()
    .email('Invalid email format. Please enter a valid email address like name@domain.com')
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/, 'Please enter a valid email address with proper format and domain')
    .required('Email is required'),
  street: Yup.string()
    .required('Street is required')
    .max(66, 'Street name cannot be longer than 66 characters')
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
  streetNumber: Yup.string()
    .matches(/^\d{1,6}$/, 'Street number must be up to 6 digits')
    .required('Street number is required'),
  homeNumber: Yup.string()
    .matches(/^\d{1,6}$/, 'Home number must be up to 6 digits')
    .required('Home number is required'),
  postCode: Yup.string()
    .matches(/^\d{2}-\d{3}$/, 'Invalid post code format')
    .required('Post code is required'),
  city: Yup.string()
    .required('City is required')
    .max(50, 'City cannot be longer than 50 characters')
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{3}$/, 'Invalid phone number format')
    .required('Phone number is required')
});

export const passwordValidation = Yup.string()
  .required('Password is required.')
  .min(7, 'Password must be at least 7 characters long.')
  .matches(/[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/, 'Password must contain at least 4 letters.')
  .matches(/\d.*\d/, 'Password must contain at least 2 digits.')
  .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain at least one special character.')
  .matches(/^\S*$/, 'Password must not contain any white spaces.');

export const registerSchema = Yup.object({
  login: Yup.string()
    .required('Login is required.')
    .min(2, 'Login must be at least 2 characters long.')
    .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, 'Login must start with a letter and contain only letters and digits.')
    .max(15, 'Login can have a maximum of 15 characters'),
  email: Yup.string()
    .email('Invalid email format. Please enter a valid email address like name@domain.com')
    .matches(/^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z0-9]+)?\.[a-zA-Z]{2,5}$/
      , 'Please enter a valid email address with proper format and domain')
    .required('Email is required'),
  password: passwordValidation,
  confirmPassword: passwordValidation.oneOf([Yup.ref('password')], 'Confirm password must match password.'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format. Please enter a valid email address like name@domain.com')
    .matches(/^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z0-9]+)?\.[a-zA-Z]{2,5}$/
      , 'Please enter a valid email address with proper format and domain')
    .required('Email is required'),
  password: passwordValidation,
});


