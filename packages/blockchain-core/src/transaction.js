class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs; // Each input refers to a UTXO (txid and index)
    this.outputs = outputs; // Each output creates a new UTXO
    this.id = this.calculateTransactionId();
  }

  calculateTransactionId() {
    return crypto
      .createHash("sha256")
      .update(JSON.stringify(this))
      .digest("hex");
  }
}

class Input {
  constructor(txid, index, signature) {
    this.txid = txid;
    this.index = index;
    this.signature = signature;
  }
}

class Output {
  constructor(amount, recipient) {
    this.amount = amount;
    this.recipient = recipient;
  }
}
