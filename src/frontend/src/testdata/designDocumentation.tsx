export const designDocumenationData = `
# Blockchain-Based Raffle Platform

## Overview
The blockchain-based raffle platform aims to provide a transparent, fair, and engaging raffle experience. The platform leverages blockchain technology to ensure transparency and immutability, while also integrating cryptocurrencies for seamless transactions.

## User Personas
- **Raffle Participants**: Users who buy tickets and participate in raffles.
- **Raffle Organizers**: Entities or individuals who create and manage raffles.
- **Administrators**: Platform administrators who oversee operations, handle disputes, and ensure compliance.

## Key Features
- **User Registration and Authentication**: Secure user registration and login using JWT.
- **Raffle Creation and Management**: Tools for organizers to create and manage raffles.
- **Ticket Purchase**: Integration with cryptocurrency wallets for ticket purchases.
- **Random Number Generation**: Use Chainlink VRF for verifiable randomness in raffle draws.
- **Notifications**: Email and in-app notifications for raffle updates.
- **Admin Dashboard**: Tools for administrators to manage the platform and generate reports.
- **Security**: Smart contract audits, secure transaction handling, and data encryption.

## Technology Stack
- **Frontend**: React.js, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Blockchain**: Ethereum, Solidity for smart contracts
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Gateway**: Coinbase Commerce, MetaMask integration
- **Random Number Generation**: Chainlink VRF

## Flows

### User Registration and Authentication Flow
1. **User Registration**:
   - User visits the registration page.
   - User fills out the registration form (username, email, password).
   - System validates the input and creates a new user account.
   - User receives a confirmation email.

2. **User Login**:
   - User visits the login page.
   - User enters their credentials (email, password).
   - System validates the credentials and generates a JWT token.
   - User is redirected to their dashboard.

### Raffle Creation and Management Flow
1. **Raffle Creation**:
   - Organizer logs in and navigates to the raffle creation page.
   - Organizer fills out the raffle details (title, description, prize, ticket price, end date).
   - System validates the input and creates a new raffle entry in the database.
   - Smart contract is deployed to handle the raffle.

2. **Raffle Management**:
   - Organizer logs in and navigates to the raffle management page.
   - Organizer can view active raffles, edit details, and monitor participation.
   - System updates the raffle details in the database and on the blockchain.

### Ticket Purchase Flow
1. **Ticket Purchase**:
   - Participant logs in and navigates to the raffle page.
   - Participant selects the number of tickets to purchase.
   - System calculates the total cost and prompts the participant to confirm the purchase.
   - Participant completes the transaction using a cryptocurrency wallet (e.g., MetaMask).
   - System records the transaction and updates the raffle entry.

### Raffle Draw and Notification Flow
1. **Raffle Draw**:
   - At the end of the raffle period, the system triggers the raffle draw.
   - Chainlink VRF generates a verifiable random number to determine the winner.
   - System updates the raffle entry with the winner's details.

2. **Notification**:
   - System sends an email and in-app notification to the winner.
   - System updates the raffle page with the winner's details.

## Architectures

### System Architecture
The system architecture is divided into several layers:

- **Frontend**: React.js for the user interface.
- **Backend**: Node.js with Express.js for the server-side logic.
- **Blockchain**: Ethereum for smart contracts and transaction handling.
- **Database**: MongoDB for storing user data, raffle details, and transaction logs.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
- **Payment Gateway**: Integration with cryptocurrency payment gateways like Coinbase Commerce.

### Component Architecture
- **Frontend Components**:
  - **Header**: Navigation bar with links to Home, Raffles, My Account, Contact.
  - **HomePage**: Displays featured raffles and search functionality.
  - **RafflePage**: Displays raffle details, ticket purchase options, and related raffles.
  - **UserDashboard**: Displays active raffles, past raffles, and account balance.
  - **AdminDashboard**: Tools for user management, raffle management, and transaction logs.

**Backend Components**:
  - **UserController**: Handles user registration, login, and profile management.
  - **RaffleController**: Handles raffle creation, management, and participation.
  - **TransactionController**: Handles ticket purchases and cryptocurrency transactions.
  - **NotificationController**: Handles email and in-app notifications.
`;