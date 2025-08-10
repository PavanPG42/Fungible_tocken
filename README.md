# EduCoin - Fungible Token System

A complete web-based fungible token system built with vanilla JavaScript, featuring a modern UI and comprehensive token management capabilities.

## 🚀 Features

### Core Token Functionality
- **Token Data Management**: Track total supply, user balances, and unique user IDs
- **Initial Distribution**: 1,000,000 EDU tokens initially assigned to creator
- **Balance Checking**: View any user's token balance
- **Token Transfers**: Send tokens between users with validation
- **Admin Minting**: Creator can mint new tokens (increases total supply)
- **Transaction History**: Complete audit trail of all token operations

### Modern Web Interface
- **Responsive Design**: Works on desktop and mobile devices
- **User Authentication**: Simple login system with demo users
- **Real-time Updates**: Live balance and supply information
- **Token Explorer**: View all token holders and their percentages
- **Beautiful UI**: Modern gradient design with smooth animations
- **Toast Notifications**: User-friendly success/error messages

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Icons**: Font Awesome for beautiful UI elements
- **Architecture**: Pure client-side application (no backend required)

## 📁 Project Structure

```
├── index.html          # Main HTML interface
├── styles.css          # Modern CSS styling
├── token.js            # Core token system logic
├── app.js              # Frontend application logic
└── README.md           # Project documentation
```

## 🎯 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HarshathKS/FungibleToken.git
   cd FungibleToken
   ```

2. **Start a local web server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open your browser** and navigate to `http://localhost:8000`

## 👥 Demo Users

The system comes with pre-configured demo users:

- **`admin`** - Creator/Administrator (925,000 EDU tokens)
  - Can mint new tokens
  - Full access to all features
  
- **`user1`** - Regular User (50,000 EDU tokens)
  - Can transfer tokens
  - Can check balances
  
- **`user2`** - Regular User (25,000 EDU tokens)
  - Can transfer tokens
  - Can check balances

## 🔧 How to Use

### Login
1. Enter one of the demo user IDs (`admin`, `user1`, or `user2`)
2. Click "Login" to access the dashboard

### Check Balances
- Your balance is displayed prominently on the dashboard
- Use the "Check Any User's Balance" section to view other users' balances

### Transfer Tokens
1. Enter the recipient's User ID
2. Enter the amount to transfer
3. Click "Send Tokens"
4. System validates sufficient balance before transfer

### Mint Tokens (Admin Only)
1. Login as `admin`
2. Use the "Mint Tokens" section (only visible to admin)
3. Enter recipient User ID and amount
4. Click "Mint Tokens" to create new tokens

### View Token Explorer
- See all token holders and their balances
- View percentage distribution of tokens
- Real-time updates as transactions occur

## 🏗️ Architecture

### Token System (`token.js`)
- `FungibleToken` class manages all token operations
- Uses JavaScript Map for efficient balance storage
- Maintains transaction history for audit trail
- Validates all operations before execution

### User Interface (`index.html` + `styles.css`)
- Responsive design with mobile-first approach
- Modern gradient backgrounds and smooth animations
- Intuitive forms with real-time validation feedback
- Toast notifications for user actions

### Application Logic (`app.js`)
- Handles all user interactions and events
- Updates UI in real-time based on token operations
- Manages user sessions and authentication
- Provides comprehensive error handling

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Beautiful purple-blue gradients
- **Glass Morphism Effects**: Semi-transparent cards with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Works on all screen sizes
- **Intuitive Icons**: Font Awesome icons for better UX
- **Real-time Updates**: Live data refresh every 30 seconds

## 🔐 Security Features

- Input validation for all user operations
- Balance verification before transfers
- Admin-only access controls for minting
- Transaction logging for audit trail
- Error handling with user-friendly messages

## 📈 Future Enhancements

- [ ] Add user registration system
- [ ] Implement token burning functionality
- [ ] Add transaction filtering and search
- [ ] Create API endpoints for external integration
- [ ] Add multi-token support
- [ ] Implement staking/rewards system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**PavanPG42**
- GitHub: [@HarshathKS](https://github.com/PavanPG42/Fungible_tocken)

---

⭐ **Star this repository if you found it helpful!**
