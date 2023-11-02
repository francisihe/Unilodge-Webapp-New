# Real Estate App

The Unilodge Real Estate App is a web application that provides a platform for users to view and book properties for inspection. It also offers administrative functionalities for managing users and properties, while managers can oversee both properties and users effectively.

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
  - Managers can manage user accounts (limited to some user-related actions).

## Technologies Used

- Frontend:
  - HTML, CSS, Tailwind CSS, JavaScript, Vite
  - React.js for the user interface

- Backend:
  - Node.js and Express.js
  - MongoDB for database management

- Authentication:
  - User authentication is managed using JWT (JSON Web Tokens).
  - Users can create accounts using Google (via Google Firebase)

- Cloud Storage: 
  - Google Cloud Storage is utilized to store images

- Deployment:
  - Netlify will be used for deployment of frontend app, and linked to GitHub repo for Continous Integration and Continous Delivery
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

## Usage

- **User Dashboard:**
  - Browse available properties.
  - Search and filter properties.
  - View property details and book inspections.

- **Admin Panel:**
  - Access the admin dashboard with appropriate credentials.
  - Manage user accounts (create, update, delete).
  - Manage property listings (add, edit, remove properties).

- **Manager Dashboard:**
  - Access the manager dashboard with appropriate credentials.
  - Oversee property listings.
  - Manage user accounts (limited actions).

## Contributors

- Francis Ihejirika (Fullstack Developer)

## License

This project is licensed under the XYZ License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to Sahand Ghavidel, Code with Dawid and John Smilga for helpful references

