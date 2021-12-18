import { BoxscoreEntry } from './boxscore-entry';

describe('BoxscoreEntry', () => {
  it('should create an instance', () => {
    expect(new BoxscoreEntry("Scottie Barnes", 36, 18, 50, 13, 57, 14, 4, 37,
      35, 8, 77, 6, 3, 4, 1, 2, 1, 4, 9, "Toronto Raptors")).toBeTruthy();
  });
});
