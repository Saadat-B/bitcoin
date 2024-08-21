function adjustDifficulty(previousBlock, currentTime) {
  const expectedTime = 60000; // 1 minute in milliseconds
  const timeTaken = currentTime - previousBlock.timestamp;

  if (timeTaken < expectedTime / 2) {
    return previousBlock.difficulty + 1;
  } else if (timeTaken > expectedTime * 2) {
    return previousBlock.difficulty - 1;
  } else {
    return previousBlock.difficulty;
  }
}
