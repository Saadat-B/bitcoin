import crypto from "crypto";

class Block {
  constructor(index, previousHash, timestamp, transactions, difficulty, nonce) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.merkleRoot = this.calculateMerkleRoot();
    this.hash = this.calculateHash();
  }

  /**
    calculateMerkleRoot() --

   * This function calculates the Merkle root of the transactions in the block.
   * It starts by hashing each transaction and then repeatedly hashes pairs of hashes together
   * until there's only one hash left (the Merkle root). If there's an odd number of hashes at any step, it duplicates the last hash so that there's an even number of hashes to pair up.
   */
  calculateMerkleRoot() {
    const transactionHashes = this.transactions.map((tx) =>
      crypto.createHash("sha256").update(JSON.stringify(tx)).digest("hex")
    );

    if (transactionHashes.length === 1) {
      return transactionHashes[0];
    }

    while (transactionHashes.length > 1) {
      if (transactionHashes.length % 2 !== 0) {
        transactionHashes.push(transactionHashes[transactionHashes.length - 1]);
      }

      const newHashes = [];
      for (let i = 0; i < transactionHashes.length; i += 2) {
        newHashes.push(
          crypto
            .createHash("sha256")
            .update(transactionHashes[i] + transactionHashes[i + 1])
            .digest("hex")
        );
      }

      transactionHashes.length = 0;
      transactionHashes.push(...newHashes);
    }

    return transactionHashes[0];
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          this.merkleRoot +
          this.difficulty +
          this.nonce
      )
      .digest("hex");
  }

  findMerkleProof(transaction) {
    let index = this.transactions.findIndex(
      (tx) => JSON.stringify(tx) === JSON.stringify(transaction)
    );

    if (index === -1) {
      throw new Error("Transaction not found in the block");
    }

    let proof = [];
    let transactionHashes = this.transactions.map((tx) =>
      crypto.createHash("sha256").update(JSON.stringify(tx)).digest("hex")
    );

    while (transactionHashes.length > 1) {
      if (transactionHashes.length % 2 !== 0) {
        transactionHashes.push(transactionHashes[transactionHashes.length - 1]);
      }

      const newHashes = [];
      for (let i = 0; i < transactionHashes.length; i += 2) {
        if (i === index || i + 1 === index) {
          proof.push(
            i === index ? transactionHashes[i + 1] : transactionHashes[i]
          );
        }

        newHashes.push(
          crypto
            .createHash("sha256")
            .update(transactionHashes[i] + transactionHashes[i + 1])
            .digest("hex")
        );
      }

      index = Math.floor(index / 2);
      transactionHashes = newHashes;
    }

    return proof;
  }

  // Method to verify a transaction using a Merkle proof
  static verifyTransaction(transaction, merkleProof, merkleRoot) {
    let currentHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(transaction))
      .digest("hex");

    for (const hash of merkleProof) {
      if (currentHash < hash) {
        currentHash = crypto
          .createHash("sha256")
          .update(currentHash + hash)
          .digest("hex");
      } else {
        currentHash = crypto
          .createHash("sha256")
          .update(hash + currentHash)
          .digest("hex");
      }
    }

    return currentHash === merkleRoot;
  }

  mineBlock(difficulty) {
    while (!this.hash.startsWith("0".repeat(difficulty))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }

  isValid() {
    return (
      this.hash === this.calculateHash() &&
      this.hash.substring(0, this.difficulty) ===
        Array(this.difficulty + 1).join("0")
    );
  }

  hasValidPreviousBlock(previousBlock) {
    return this.previousHash === previousBlock.hash;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    this.merkleRoot = this.calculateMerkleRoot();
    this.hash = this.calculateHash(); // Recalculate hash since block data has changed
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    const obj = JSON.parse(data);
    return new Block(
      obj.index,
      obj.previousHash,
      obj.timestamp,
      obj.transactions,
      obj.difficulty,
      obj.nonce
    );
  }

  static createGenesisBlock() {
    return new Block(0, "0", Date.now(), [], 1, 0);
  }
}

export default Block;
