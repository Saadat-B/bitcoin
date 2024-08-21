# `blockchain-core`

## Block.js

1. Block Properties:

- index: Position of the block in the chain.
- previousHash: Hash of the previous block.
- timestamp: Time when the block was created.
- transactions: List of transactions included in the block.
- difficulty: Mining difficulty.
- nonce: A value used to find a valid hash.

2. Methods:

- calculateMerkleRoot(): Computes the Merkle root for the transactions.
- calculateHash(): Generates the hash for the block based on its properties.
- findMerkleProof(transaction): Finds the Merkle proof for a given transaction.
- verifyTransaction(transaction, merkleProof, merkleRoot): Verifies a transaction using its Merkle proof.
- mineBlock(difficulty): Mines the block by finding a valid nonce.
- isValid(): Checks if the block's hash is valid and matches the expected format.
- hasValidPreviousBlock(previousBlock): Validates the previous block's hash.
- addTransaction(transaction): Adds a transaction to the block and updates Merkle root and hash.
- serialize(): Converts the block to a JSON string.
- deserialize(data): Converts a JSON string back to a block object.
- createGenesisBlock(): Creates the initial genesis block.
