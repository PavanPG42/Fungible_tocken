// Global variables
let tokenSystem;
let currentUser = null;

// Initialize the token system when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create token system with initial setup
    tokenSystem = new FungibleToken('EduCoin', 'EDU', 1000000, 'admin');
    
    // Add some demo users with initial balances for testing
    tokenSystem.transfer('admin', 'user1', 50000);
    tokenSystem.transfer('admin', 'user2', 25000);
    
    // Set up event listeners
    setupEventListeners();
    
    // Update UI
    updateTokenInfo();
    updateExplorer();
});

function setupEventListeners() {
    // Login functionality
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('userIdInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') login();
    });
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Balance checker
    document.getElementById('checkBalanceBtn').addEventListener('click', checkBalance);
    document.getElementById('checkBalanceInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkBalance();
    });
    
    // Transfer functionality
    document.getElementById('transferBtn').addEventListener('click', transferTokens);
    
    // Mint functionality
    document.getElementById('mintBtn').addEventListener('click', mintTokens);
}

function login() {
    const userId = document.getElementById('userIdInput').value.trim();
    
    if (!userId) {
        showMessage('Please enter a User ID', 'error');
        return;
    }
    
    currentUser = userId;
    
    // Update UI
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('currentUser').textContent = `Logged in as: ${userId}`;
    document.getElementById('logoutBtn').style.display = 'inline-block';
    
    // Show mint section only for admin
    if (userId === tokenSystem.creatorId) {
        document.getElementById('mintSection').style.display = 'block';
    } else {
        document.getElementById('mintSection').style.display = 'none';
    }
    
    // Update all displays
    updateUserBalance();
    updateTokenInfo();
    updateExplorer();
    updateTransactionHistory();
    
    showMessage(`Welcome, ${userId}!`, 'success');
}

function logout() {
    currentUser = null;
    
    // Reset UI
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('currentUser').textContent = 'Not logged in';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('userIdInput').value = '';
    
    // Clear form inputs
    clearAllInputs();
    clearAllMessages();
    
    showMessage('Logged out successfully', 'info');
}

function updateUserBalance() {
    if (!currentUser) return;
    
    const balance = tokenSystem.getBalance(currentUser);
    document.getElementById('userBalance').textContent = balance.toLocaleString();
}

function updateTokenInfo() {
    const info = tokenSystem.getTokenInfo();
    
    document.getElementById('tokenName').textContent = info.name;
    document.getElementById('tokenSymbol').textContent = info.symbol;
    document.getElementById('totalSupply').textContent = info.totalSupply.toLocaleString();
    document.getElementById('totalHolders').textContent = info.totalHolders;
}

function updateExplorer() {
    const balances = tokenSystem.getAllBalances();
    const totalSupply = tokenSystem.getTotalSupply();
    const tbody = document.getElementById('explorerBody');
    
    tbody.innerHTML = '';
    
    // Sort users by balance (descending)
    const sortedUsers = Object.entries(balances).sort((a, b) => b[1] - a[1]);
    
    sortedUsers.forEach(([userId, balance]) => {
        const percentage = ((balance / totalSupply) * 100).toFixed(2);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${userId}</td>
            <td>${balance.toLocaleString()} EDU</td>
            <td>${percentage}%</td>
        `;
        
        tbody.appendChild(row);
    });
}

function updateTransactionHistory() {
    const history = tokenSystem.getTransactionHistory();
    const container = document.getElementById('transactionHistory');
    
    if (history.length === 0) {
        container.innerHTML = '<div class="no-transactions">No transactions yet</div>';
        return;
    }
    
    // Show last 10 transactions
    const recentTransactions = history.slice(-10).reverse();
    
    container.innerHTML = recentTransactions.map(tx => {
        const date = new Date(tx.timestamp).toLocaleString();
        const typeIcon = tx.type === 'mint' ? 'fas fa-plus-circle' : 'fas fa-paper-plane';
        const typeColor = tx.type === 'mint' ? '#28a745' : '#667eea';
        
        return `
            <div class="transaction-item">
                <div class="transaction-type" style="color: ${typeColor}">
                    <i class="${typeIcon}"></i> ${tx.type}
                </div>
                <div class="transaction-details">
                    <strong>${tx.from}</strong> → <strong>${tx.to}</strong>
                    <br>
                    <small>${date}</small>
                </div>
                <div class="transaction-amount">
                    ${tx.amount.toLocaleString()} EDU
                </div>
            </div>
        `;
    }).join('');
}

function checkBalance() {
    const userId = document.getElementById('checkBalanceInput').value.trim();
    const resultDiv = document.getElementById('balanceResult');
    
    if (!userId) {
        showResultMessage(resultDiv, 'Please enter a User ID', 'error');
        return;
    }
    
    const balance = tokenSystem.getBalance(userId);
    showResultMessage(resultDiv, `${userId} has ${balance.toLocaleString()} EDU tokens`, 'success');
}

function transferTokens() {
    if (!currentUser) {
        showMessage('Please log in first', 'error');
        return;
    }
    
    const toUserId = document.getElementById('transferToInput').value.trim();
    const amount = parseInt(document.getElementById('transferAmountInput').value);
    const resultDiv = document.getElementById('transferResult');
    
    if (!toUserId || !amount) {
        showResultMessage(resultDiv, 'Please fill in all fields', 'error');
        return;
    }
    
    const result = tokenSystem.transfer(currentUser, toUserId, amount);
    
    if (result.success) {
        showResultMessage(resultDiv, result.message, 'success');
        updateUserBalance();
        updateExplorer();
        updateTransactionHistory();
        
        // Clear inputs
        document.getElementById('transferToInput').value = '';
        document.getElementById('transferAmountInput').value = '';
        
        showMessage('Transfer completed successfully!', 'success');
    } else {
        showResultMessage(resultDiv, result.message, 'error');
    }
}

function mintTokens() {
    if (!currentUser) {
        showMessage('Please log in first', 'error');
        return;
    }
    
    const toUserId = document.getElementById('mintToInput').value.trim();
    const amount = parseInt(document.getElementById('mintAmountInput').value);
    const resultDiv = document.getElementById('mintResult');
    
    if (!toUserId || !amount) {
        showResultMessage(resultDiv, 'Please fill in all fields', 'error');
        return;
    }
    
    const result = tokenSystem.mint(currentUser, toUserId, amount);
    
    if (result.success) {
        showResultMessage(resultDiv, result.message, 'success');
        updateUserBalance();
        updateTokenInfo();
        updateExplorer();
        updateTransactionHistory();
        
        // Clear inputs
        document.getElementById('mintToInput').value = '';
        document.getElementById('mintAmountInput').value = '';
        
        showMessage('Tokens minted successfully!', 'success');
    } else {
        showResultMessage(resultDiv, result.message, 'error');
    }
}

function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `toast ${type}`;
    messageDiv.textContent = message;
    
    messageContainer.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

function showResultMessage(container, message, type) {
    container.innerHTML = `<div class="result-message ${type}">${message}</div>`;
}

function clearAllInputs() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => input.value = '');
}

function clearAllMessages() {
    const messages = document.querySelectorAll('.result-message');
    messages.forEach(msg => msg.innerHTML = '');
}

// Utility function to format numbers
function formatNumber(num) {
    return num.toLocaleString();
}

// Auto-refresh data every 30 seconds
setInterval(() => {
    if (currentUser) {
        updateUserBalance();
        updateTokenInfo();
        updateExplorer();
        updateTransactionHistory();
    }
}, 30000);
