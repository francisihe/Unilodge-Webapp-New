
Developing Project for Real Estate Platform:

Basics:
1. App allows users create accounts
2. App allows users see properties (houses or lands) for sale or rent
3. App allows users book and pay for inspection
4. App allows users bookmark houses for viewing later

Admins and Managers:
1. Three categories of users - Admins, Managers, User
2. Admins can perform all actions - including creating and deleting property, users, bookings and payments and adjusting access levels
3.  Managers can do same except delete users or change access level
4.  Regular can only view, book inspection and update own profile

Properties:
1. Properties will be either houses or lands
2. They belong to either sell or rent categories

Single property page:
1. View details of house including pictures
2. Have a button with link to view view of property on youtube or instagram
3. Booking section appears below each property to allow for easy booking



// Active Process
1. 

// To-do
1. Implement email verification via code. Refer: https://dev.to/cyberwolves/how-to-verify-user-email-in-node-express-eaj
Second ref: https://firebase.google.com/docs/auth/web/password-auth
2. Implement password forgot process
3. Check cookie timeout and set timeout on leaving page
4. Update the sign in and sign up pages to use Redux reducers defined in the userSlice, and useDispatch
5. Implement logout on leaving webapp and add timeout to token
6. Implement use signin with redirect for mobile users
7. Confirm Booking route to return user's own bookings on profile page (different from admin/manager return all booking routes)
8. Form checker for add property prices not showing before refreshing page
9. Work on navigation menu to close automatically on click out, and to dynamically render sign in or out
10. Create verify admin or manager component to protect pages, create admin/manager menu items
11. Add related properties below property listing, using ML
12. Add Catetaker details below property for managers and admin to view
13. Update all controllers to use the custom error handler
14. Enable limit and pagination for all the get routes
15. Update Sign In with email process to be handled fully by firebase
16. Fixed error handling and navigation for when credentials are wrong on signin page
17. Add Caretaker Ref form to frontend, to allow assigning caretakers to properties using their refs, and ability to view all properties assigned to a caretaker

// Fixed persistence and signout issue
1. To see the logic, check SignOutFunction in utils folder - FIXED

//Highlight
1. Auto linking booking to existing user without signing in - FIXED


Testing Notes:

1. After updating a user, it logged into that users account - FIXED
2. WhatsApp has a weird link on load - FIXED
3. Autorefresh user after updating permission to show admin panel - FIXED
4. Separate the profile update form for admin form the user's profile form, and call their separate endpoints - FIXED
5. Booking not showing on user's profile immediately after booking - FIXED
6. Dashboard summary not showing - FIXED
7. 

TO DO:
1. Implement Verify User on Sign Up
2. Implement auto-logout after cookie expiry, add cookie timeout
3. Add logged in message on sign in
4. Remove testing url link in forgot Password email in mailer
5. Add currently logged in notification on sign in and sign up pages
6. 