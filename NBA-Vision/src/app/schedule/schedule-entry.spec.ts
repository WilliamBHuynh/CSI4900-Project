import { ScheduleEntry } from './schedule-entry';

describe('ScheduleEntry', () => {
  it('should create an instance', () => {
    expect(new ScheduleEntry(new Date, "Toronto Raptors", "Brooklyn Nets", false)).toBeTruthy();
  });
});
