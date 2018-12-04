// == PART 1 ==

function part1(input) {
  input = input
    .split("\n")
    .sort()
    .map(record => {
      let [, month, day, hour, minute, text, guardId] = record.match(/^\[\d+-(\d+)-(\d+) (\d+):(\d+)\] (Guard #(\d+) begins shift|falls asleep|wakes up)$/);
      [month, day, hour, minute] = [month, day, hour, minute].map(Number);

      if (hour === 23) {
        day++;
        if (day > 31 || (day > 30 && ([4, 6, 9, 11].indexOf(month) > -1)) || (day > 28 && month === 2)) {
          day = 1;
          month++;
        }
      }

      if (guardId) minute = 0;
      let state = text === "falls asleep" ? "asleep" : "awake";

      return {date: `${month}-${day}`, minute, state, guardId};
    });

  let dates = input.reduce((dates, {date, minute, state, guardId}) => {
    dates[date] = dates[date] || {};
    dates[date].stateChanges = dates[date].stateChanges || [];
    dates[date].stateChanges.unshift({state, minute});
    if (guardId) dates[date].guardId = guardId;
    return dates;
  }, {});

  let guardShifts = Object.values(dates).reduce((guardShifts, {guardId, stateChanges}) => {
    let shift = [];

    for (let m = 0; m < 60; m++) {
      shift[m] = stateChanges.find(({minute}) => minute <= m).state;
    }

    guardShifts[guardId] = guardShifts[guardId] || [];
    guardShifts[guardId].push(shift);
    return guardShifts;
  }, {});

  let guardSleeps = Object.entries(guardShifts).reduce((guardSleeps, [guardId, shifts]) => {
    guardSleeps[guardId] = shifts.reduce((acc, shift) => acc + shift.filter(state => state === "asleep").length, 0);
    return guardSleeps;
  }, {});

  let mostSleepingGuardId = Object.entries(guardSleeps).reduce((acc, [guardId, sleeps]) => sleeps > acc.sleeps ? {sleeps, guardId} : acc, {sleeps: -Infinity}).guardId;

  let minuteSleeps = [];
  for (let m = 0; m < 60; m++) {
    minuteSleeps[m] = guardShifts[mostSleepingGuardId].filter(shift => shift[m] === "asleep").length;
  }

  let mostSleepingMinute = minuteSleeps.reduce((acc, sleeps, minute) => sleeps > acc.sleeps ? {sleeps, minute} : acc, {sleeps: -Infinity}).minute;

  return mostSleepingGuardId * mostSleepingMinute;
}

// == PART 2 ==

function part2(input) {
  input = input
    .split("\n")
    .sort()
    .map(record => {
      let [, month, day, hour, minute, text, guardId] = record.match(/^\[\d+-(\d+)-(\d+) (\d+):(\d+)\] (Guard #(\d+) begins shift|falls asleep|wakes up)$/);
      [month, day, hour, minute] = [month, day, hour, minute].map(Number);

      if (hour === 23) {
        day++;
        if (day > 31 || (day > 30 && ([4, 6, 9, 11].indexOf(month) > -1)) || (day > 28 && month === 2)) {
          day = 1;
          month++;
        }
      }

      if (guardId) minute = 0;
      let state = text === "falls asleep" ? "asleep" : "awake";

      return {date: `${month}-${day}`, minute, state, guardId};
    });

  let dates = input.reduce((dates, {date, minute, state, guardId}) => {
    dates[date] = dates[date] || {};
    dates[date].stateChanges = dates[date].stateChanges || [];
    dates[date].stateChanges.unshift({state, minute});
    if (guardId) dates[date].guardId = guardId;
    return dates;
  }, {});

  let guardShifts = Object.values(dates).reduce((guardShifts, {guardId, stateChanges}) => {
    let shift = [];

    for (let m = 0; m < 60; m++) {
      shift[m] = stateChanges.find(({minute}) => minute <= m).state;
    }

    guardShifts[guardId] = guardShifts[guardId] || [];
    guardShifts[guardId].push(shift);
    return guardShifts;
  }, {});

  let guardMinuteSleeps = Object.entries(guardShifts).reduce((guardMinuteSleeps, [guardId, shifts]) => {
    guardMinuteSleeps[guardId] = [];

    shifts.forEach(shift => {
      shift.forEach((state, minute) => {
        guardMinuteSleeps[guardId][minute] = guardMinuteSleeps[guardId][minute] || 0;
        if (state === "asleep") guardMinuteSleeps[guardId][minute]++;
      })
    })

    return guardMinuteSleeps;
  }, {})

  let mostSleepingGuardMinute = Object.entries(guardMinuteSleeps).reduce((acc, [guardId, sleepsOnMinute]) => {
    let mostSleepingMinute = sleepsOnMinute.reduce((acc, sleeps, minute) => sleeps > acc.sleeps ? {sleeps, minute} : acc, {sleeps: -Infinity});

    return mostSleepingMinute.sleeps > acc.sleeps ? {...mostSleepingMinute, guardId} : acc;
  }, {sleeps: -Infinity})

  return mostSleepingGuardMinute.guardId * mostSleepingGuardMinute.minute;
}

// == ASSERTS ==

console.assert(part1(`[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`) === 240);

console.assert(part2(`[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`) === 4455);
