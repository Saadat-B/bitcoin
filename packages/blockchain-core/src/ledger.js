import Block from "./block.js";

class Ledger {
  constructor() {
    this.chain = [Block.createGenesisBlock()]; // Initialize with the genesis block
  }

  // Method to get the latest block in the chain
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Method to handle a new block from a miner
  receiveBlock(newBlock) {
    if (this.isBlockValid(newBlock)) {
      this.chain.push(newBlock);
      console.log("Block added:", newBlock);
    } else {
      console.log("Invalid block:", newBlock);
    }
  }

  // Method to validate the entire chain
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check if the current block's hash is correct
      if (!currentBlock.isValid()) {
        return false;
      }

      // Check if the previous block's hash is correct
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  // Method to validate a specific block
  isBlockValid(block) {
    // Check if the block is valid in terms of hash and previous block linkage
    return block.isValid() && block.previousHash === this.getLatestBlock().hash;
  }

  // Method to process a transaction (placeholder for actual logic)
//   processTransaction(transaction) {
    // Implement transaction validation and processing logic
    // This will involve updating the UTXO set or other relevant state
//   }
}

export default Ledger;
