# MyReactPortfolio Documentation

## Project Overview

**MyReactPortfolio** is a developer portfolio web application built using **React**, with a **Firebase** backend and **Cloudinary** for image storage. This portfolio showcases the skills and projects of the developer, allowing visitors to explore various works, filtered by categories and searchable by keywords.

### Features

- **Portfolio Display**: Showcase of developer projects and skills.
- **Filtering and Search**: Projects can be filtered by categories and searched for keywords.
- **Admin Dashboard**: Hidden route where the admin can log in using their Gmail (currently under construction).
- **Future Features**:
  - EmailJS integration for contact forms (coming soon).
  - CV download feature (coming soon).
  - More features and functionalities to be added.

---

## How to Run the Project Locally

To run this project locally, follow these steps:

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```
   git clone <repository-url>
   ```

2. **Navigate to the Portfolio Folder**

   Change directory to the portfolio folder inside the project:

   ```
   cd portfolio
   ```

3. **Install Dependencies**

   Install the necessary dependencies by running:

   ```
   npm install
   ```

4. **Create a .env File**

   In the portfolio folder, create a .env file with the following environment variables:

   ```
   REACT_APP_AuthDomain= "your-auth-domain"
   REACT_APP_FireStoreAPIKey="your-firestore-api-key"
   REACT_APP_ProjectId= "your-project-id"
   REACT_APP_StorageBucket= "your-storage-bucket"
   REACT_APP_MessagingSenderId= "your-messaging-sender-id"
   REACT_APP_AppId= "your-app-id"
   REACT_APP_MeasurementId= "your-measurement-id"

   # Cloudinary
   REACT_APP_UploadUrl="your-upload-url"
   REACT_APP_DestroyUrl="your-destroy-url"
   REACT_APP_UploadPreset="your-upload-preset"
   REACT_APP_APIKey="your-api-key"
   REACT_APP_APISecret="your-api-secret"
   ```

   Replace the placeholders with your actual Firebase and Cloudinary credentials.

5. **Start the Application**

   After setting up your .env file, start the application:

   ```
   npm start
   ```

   The application will be hosted on http://localhost:3000 by default.

# Project Structure

The project is organized into the following directories and files:

- **`src/`**: Contains all the source code files for the project.

  - **`components/`**: Reusable UI components.
  - **`pages/`**: React pages for various sections of the site, such as the portfolio and the admin dashboard.
  - **`firebase/`**: Firebase-related functions (e.g., authentication, Firestore database operations).
  - **`services/`**: Services for interacting with Cloudinary and other external APIs.

- **`.env`**: Environment variables used to store Firebase and Cloudinary API credentials securely.

- **`public/`**: Publicly accessible files such as `index.html` and images.

## Technologies Used

The following technologies were used to build the application:

- **`React`**: A JavaScript library for building user interfaces.
- **`Firebase`**: A platform for web and mobile applications that includes authentication, Firestore, and Cloud Storage.
- **`Cloudinary`**: A cloud service for storing images and other media files.
- **`EmailJS` (Coming soon)**: Integration for sending emails from the contact form.
- **`React Router`**: A library for handling navigation and routing in React applications.
- **`CSS Modules`**: For scoping CSS styles to specific components.

---

## Admin Dashboard

The admin dashboard is still under construction. It will be accessible through a hidden route, and the admin must log in using their Gmail account. Once completed, the dashboard will allow the admin to manage the portfolio content.

---

## Deployment

This project can be deployed using Firebase Hosting. Follow these steps to deploy the project:

1. **Initialize Firebase Hosting**:

- Run the following command to initialize Firebase Hosting in the project:

  ```
  firebase init
  ```

2. **Initialize Firebase Hosting**:

- Run the following command to initialize Firebase Hosting in the project:

  ```
  firebase init
  ```

3. **Build the React App**:

- After initializing Firebase, run the following command inside the portfolio folder to build the React app:
    ```
    npm run build
    ```


# Future Enhancements
- CV Download Feature: Visitors will soon be able to download the developer's CV.
- EmailJS Integration: The contact form will use EmailJS to send emails.
- Additional Features: More features and improvements will be added over time.

# Website Link

You can visit the live website here: [Insert Website Link]



