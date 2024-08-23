class Mempool {
  constructor() {
    this.transactions = [];
  }

  // Add a new transaction to the mempool
  addTransaction(transaction) {
    if (this.isValidTransaction(transaction)) {
      this.transactions.push(transaction);
    } else {
      throw new Error("Invalid transaction");
    }
  }

  // Retrieve transactions for mining
  getTransactionsForMining(limit) {
    return this.transactions.slice(0, limit);
  }

  // Remove transactions that have been included in a block
  removeTransactions(transactions) {
    this.transactions = this.transactions.filter(
      (tx) => !transactions.includes(tx)
    );
  }

  // Validate a transaction before adding it to the mempool
  isValidTransaction(transaction) {
    // Add your validation logic here (e.g., checking signatures, UTXO validity)
    return true; // Placeholder, replace with actual validation logic
  }

  // Get the number of transactions in the mempool
  getTransactionCount() {
    return this.transactions.length;
  }

  // Check if the mempool is empty
  isEmpty() {
    return this.transactions.length === 0;
  }
}

export default Mempool;
