class FungibleToken {
    constructor(name, symbol, initialSupply, creatorId) {
        this.name = name;
        this.symbol = symbol;
        this.totalSupply = initialSupply;
        this.creatorId = creatorId;
        this.balances = new Map();
        this.transactionHistory = [];
        
        // Give all initial tokens to creator
        this.balances.set(creatorId, initialSupply);
        
        console.log(`Token ${name} (${symbol}) created with ${initialSupply} tokens`);
    }

    // Check balance of a specific user
    getBalance(userId) {
        return this.balances.get(userId) || 0;
    }

    // Get total supply
    getTotalSupply() {
        return this.totalSupply;
    }

    // Get all user balances (for explorer functionality)
    getAllBalances() {
        return Object.fromEntries(this.balances);
    }

    // Transfer tokens between users
    transfer(fromUserId, toUserId, amount) {
        // Validate inputs
        if (amount <= 0) {
            return { success: false, message: "Amount must be positive" };
        }

        if (fromUserId === toUserId) {
            return { success: false, message: "Cannot transfer to yourself" };
        }

        const fromBalance = this.getBalance(fromUserId);
        
        if (fromBalance < amount) {
            return { success: false, message: "Insufficient balance" };
        }

        // Perform transfer
        this.balances.set(fromUserId, fromBalance - amount);
        const toBalance = this.getBalance(toUserId);
        this.balances.set(toUserId, toBalance + amount);

        // Record transaction
        const transaction = {
            type: 'transfer',
            from: fromUserId,
            to: toUserId,
            amount: amount,
            timestamp: new Date().toISOString()
        };
        this.transactionHistory.push(transaction);

        return { 
            success: true, 
            message: `Successfully transferred ${amount} ${this.symbol} to ${toUserId}`,
            transaction: transaction
        };
    }

    // Mint new tokens (only creator can do this)
    mint(requesterId, recipientId, amount) {
        // Check if requester is the creator
        if (requesterId !== this.creatorId) {
            return { success: false, message: "Only the creator can mint tokens" };
        }

        if (amount <= 0) {
            return { success: false, message: "Amount must be positive" };
        }

        // Mint tokens
        this.totalSupply += amount;
        const currentBalance = this.getBalance(recipientId);
        this.balances.set(recipientId, currentBalance + amount);

        // Record transaction
        const transaction = {
            type: 'mint',
            from: 'system',
            to: recipientId,
            amount: amount,
            timestamp: new Date().toISOString()
        };
        this.transactionHistory.push(transaction);

        return { 
            success: true, 
            message: `Successfully minted ${amount} ${this.symbol} to ${recipientId}`,
            transaction: transaction
        };
    }

    // Get transaction history
    getTransactionHistory() {
        return this.transactionHistory;
    }

    // Get token info
    getTokenInfo() {
        return {
            name: this.name,
            symbol: this.symbol,
            totalSupply: this.totalSupply,
            creatorId: this.creatorId,
            totalHolders: this.balances.size
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FungibleToken;
}
