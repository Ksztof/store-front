# Overview
This project is the frontend of an e-commerce platform that allows users to purchase selected products. The platform offers multiple features, including an authentication system, synchronization of the current cart state with the database, and the option to complete transactions using a credit card or cash on delivery. The project was built using React.js and TypeScript.
# Tech Stack
### React.js
Used for building the user interface of the application.
### TypeScript 
JavaScript extension that includes static typing, which helps identify errors during development and making the code more reliable and easier to maintain.
### SCSS
Used pure SCSS for styling the application, allowing for greater control and flexibility in designing the layout and appearance without relying on pre-built UI frameworks.
### Redux Toolkit
Utilized for state management, including handling asynchronous actions using Redux Thunk, managing state slices with reducers, persisting certain states like authentication and shopping cart data, and using selectors to access specific slices of state.
### Axios
Used for making asynchronous requests to the backend, enabling efficient communication with the database for fetching and updating data.
### SignalR
Used to establish a connection with the API and receive real-time responses regarding the status of payment transactions.
### Formik
Used for managing form state and validation
### Yup
Used for schema-based form validation together with Formik providing a simple way to define validation rules for form inputs. 
### Zod
Used for creating type guards, enabling type-safe data parsing and validation in the application.
### Universal Cookie
Used for managing cookies within the application.
### React Router DOM
Used for managing client-side routing.
# Folders Structure
The folder organization follows a feature-based structure to maintain cleanliness and clarity. This approach groups all related files, such as actions, reducers, services, and components, under specific feature directories like authentication, cart, order, etc. This structure allows for easy navigation and makes it simpler to work on individual features without needing to jump across multiple generic folders. Additionally, the project includes a shared folder that groups resources used across various contexts, such as cart operations, products, authentication, and more. This folder also contains tools related to form and type validation (type guards), cookies, and Redux store configuration. In the main src folder, you will find the core components and their associated styles, such as index.tsx and App.tsx. These files are responsible for the root setup of the application, with index.tsx serving as the entry point for the application.

<div style="display: flex; gap: 10px; justify-content: flex-start;">
  <img src="https://github.com/user-attachments/assets/acce84f2-65d2-4a72-b2d5-74f0b9dd7121" alt="folders structure 1" width="33%" align="top">
  <img src="https://github.com/user-attachments/assets/0acef607-85a9-417e-899d-e6cefc4ea9ac" alt="folders structure 2" width="33%" align="top">
  <img src="https://github.com/user-attachments/assets/07265904-5864-4ef1-8500-ff15d317790a" alt="folders structure 3" width="33%" align="top">
</div>

# Key Features

In this section, I will describe the key features of the online store, intentionally omitting functionalities such as pagination, opening/closing the cart, UI responsiveness, etc., which are inherent elements of the site that ensure a convenient user experience.
### Form validation
The data entered into the form fields is validated in real-time, allowing the user to be informed whether the input is correct. Validation is implemented on multiple levels: the first level uses Yup schema validation and additionally, if the frontend does not catch incorrect input or if the data is already in use by another user, an error message is displayed at the bottom of the form after receiving a response from the API. Also when data is entered properly according to the Yup validation schema, the submit button changes its appearance and becomes enabled for use.

https://github.com/user-attachments/assets/90fd69ad-21a7-4ffc-a2d5-e5bc832a41ea

### Register
The user has the option to create an account by navigating to the `/register` page, where after entering their details in the form and submitting it, they will receive an activation link via email to activate their account.

https://github.com/user-attachments/assets/d3b021c9-7889-498a-b7ea-0b7493e239e8

### Login
After successful account activation, the user can log in by navigating to the `/login` page and entering their login credentials, which will be sent to the API for authentication. Upon successful authentication, the user will receive a cookie with the `HttpOnly = true` and `Secure = true` options, containing a JWT token that will be used for authorization purposes.

https://github.com/user-attachments/assets/ddd2528e-5df1-418a-a6a5-98118c104cd0

### Add products to cart

### Add/Delete/Modify products in cart

