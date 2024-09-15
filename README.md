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
### Form validation
The data entered into the form fields is validated in real-time, allowing the user to be informed whether the input is correct. Validation is implemented on multiple levels: the first level uses Yup schema validation and additionally, if the frontend does not catch incorrect input or if the data is already in use by another user, an error message is displayed at the bottom of the form after receiving a response from the API. Also when data is entered properly according to the Yup validation schema, the submit button changes its appearance and becomes enabled for use.
 

