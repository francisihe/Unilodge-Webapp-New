# Real Estate App

The Unilodge Real Estate App is a web application that provides a platform for users to view and book properties for inspection. It was created for a real estate company Unilodge that offers real estate services such as sale of lands, houses and rental of same. 

It also offers administrative functionalities for managing users and properties, while managers can oversee both properties and users effectively. The webapp utilizes WordPress as the Content Management System for its blog, which is deployed on a subdomain, and utilizes WooCommerce for its shop page also deployed on a sub domain.

The backend of this project, in addition to the other functionalities listed above, has a separate route to query the REST API for the WordPress blog, pulling in only the required data.

The backend also employs a mail verification system that generates a 6-digit code for new user sign ups, verification of signed up users but unverified users, resetting of password and notifying a specific admin email when there are new bookings.

## Project Owner

- Francis Ihejirika (Fullstack Developer)
- Email: francis.ihejirika@gmail.com
- Twitter: @francisihej
- Phone/WhatsApp: +2348165148492 / +1(469)892-8855


## Features

- **User Dashboard:**
  - Users can view a list of available properties.
  - Users can search, filter, and view property details.
  - Users can book properties for inspection.

- **Admin Panel:**
  - Admins can manage user accounts (create, update, delete).
  - Admins can manage property listings (add, edit, remove properties).

- **Manager Dashboard:**
  - Managers can oversee property listings.
  - Managers can perform same functions as admin except manage users (edit or delete users)

## Technologies Used

- Frontend:
  - HTML, CSS, Tailwind CSS, JavaScript, Vite
  - React.js for the user interface

- Backend:
  - Node.js and Express.js
  - MongoDB for database management

- Authentication:
  - User authentication is managed using JWT (JSON Web Tokens).
  - Users can create accounts using Google (via Google Firebase Authentication)

- Mailing
  - Nodemailer, along with Google SMTP (using App Password), is utilized for password reset, user verification and notification of bookings to admin email

- Cloud Storage: 
  - Google Cloud Storage is utilized to store images

- Deployment:
  - Netlify will be used for deployment of frontend app, and linked to GitHub repo for Continous Integration and Continous Delivery
  - Firebase Serverless was used for deployment (similar version will be deployed to AWS)
  - AWS Lambda or AWS Amplify will be used to host NodeJS/Express API backend as either serverless for the former or Express app with latter

- Code Versioning:
  - Git via GitHub

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/francisihe/unilodge-webapp-new.git
   ```

2. Navigate to the project directory:
   ```bash
   cd unilodge-webapp-new
   ```

3. Install dependencies for the frontend and backend:

   For the frontend:
   ```bash
   cd client
   npm install
   ```

   For the backend:
   ```bash
   cd api
   npm install
   ```

4. Configure the environment variables:

   - Create a `.env` file in the `server` directory and set the necessary environment variables (e.g., MongoDB connection string, JWT secret).

5. Start the development server:

   For the frontend:
   ```bash
   cd client
   npm run dev
   ```

   For the backend:
   ```bash
   cd server
   npm start
   ```


## Mini Notes
- The index file in the api folder, has two connections to the Database. Depending on where your project will be deployed, (either developed and tested on localhost or Firebase Functions), decide which to utilize.