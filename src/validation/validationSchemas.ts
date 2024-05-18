import * as Yup from 'yup';

export const orderDetailsSchema = Yup.object({
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
