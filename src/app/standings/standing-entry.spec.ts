import { StandingEntry } from './standing-entry';

describe('StandingEntry', () => {
  it('should create an instance', () => {
    expect(new StandingEntry("Toronto Raptors", 82, 0, 1, 1, 1, 1, 1, 1, "EAST" )).toBeTruthy();
  });
});
