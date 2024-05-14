import * as Yup from 'yup';
import { FormValues } from '../types/formsTypes';

export const orderDetailsSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .max(52, 'First name cannot be longer than 52 characters')
    .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
  lastName: Yup.string()
    .required('Last name is required')
    .max(52, 'Last name cannot be longer than 52 characters')
    .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  street: Yup.string()
    .required('Street is required')
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
    .transform(value => value.charAt(0).toUpperCase() + value.slice(1)),
  phoneNumber: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{3}$/, 'Invalid phone number format')
    .required('Phone number is required')
});

export const orderDetailsInitialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  streetNumber: '',
  homeNumber: '',
  postCode: '',
  city: '',
  phoneNumber: ''
};