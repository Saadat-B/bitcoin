import Block from "./block.js";

class Ledger {
  constructor() {
    this.chain = [Block.createGenesisBlock()]; // Initialize with the genesis block
    this.utxos = {}; // UTXO set, key is txid:outputIndex, value is the UTXO
  }

  // Method to get the latest block in the chain
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Method to handle a new block from a miner
  receiveBlock(newBlock) {
    if (this.isBlockValid(newBlock)) {
      // Update UTXO set before adding the block
      this.updateUTXOSet(newBlock);
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

  createUTXOs(transaction) {
    transaction.outputs.forEach((output, index) => {
      const utxoKey = `${transaction.id}:${index}`;
      this.utxos[utxoKey] = output;
    });
  }
  updateUTXOSet(block) {
    for (let transaction of block.transactions) {
      // Remove spent UTXOs
      for (let input of transaction.inputs) {
        const utxoKey = `${input.txid}:${input.index}`;
        delete this.utxos[utxoKey];
      }

      // Add new UTXOs
      this.createUTXOs(transaction);
    }
  }

  validateTransaction(transaction) {
    let inputSum = 0;
    let outputSum = 0;

    // Validate inputs
    for (let input of transaction.inputs) {
      const utxoKey = `${input.txid}:${input.index}`;
      const utxo = this.utxos[utxoKey];

      if (!utxo) {
        console.log(`Invalid transaction: UTXO ${utxoKey} does not exist`);
        return false;
      }

      inputSum += utxo.amount;
    }

    // Validate outputs
    for (let output of transaction.outputs) {
      outputSum += output.amount;
    }

    if (inputSum < outputSum) {
      console.log("Invalid transaction: outputs exceed inputs");
      return false;
    }

    return true;
  }

  // Method to process a transaction (placeholder for actual logic)
  //   processTransaction(transaction) {
  // Implement transaction validation and processing logic
  // This will involve updating the UTXO set or other relevant state
  //   }
}

export default Ledger;
