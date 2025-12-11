// == PART 1 ==

function part1(input: string): number {
  let connections = Object.fromEntries(input
    .split("\n")
    .map(line => line.split(/\W+/))
    .map(([from, ...to]) => [from, to]));

  let devices = ["you"];

  while (devices.some(device => device !== "out")) {
    devices = devices.flatMap(from => from === "out" ? from : connections[from]);
  }

  return devices.length;
}

// == PART 2 ==

interface Device {
  name: string;
  count: number;
  dac: boolean;
  fft: boolean;
}

function part2(input: string): number {
  let connections = Object.fromEntries(input
    .split("\n")
    .map(line => line.split(/\W+/))
    .map(([from, ...to]) => [from, to]));

  let devices: Device[] = [{name: "svr", count: 1, dac: false, fft: false}];
  let correctPathCount = 0;

  while (devices.length > 0) {
    correctPathCount += devices
      .filter(({name, dac, fft}) => name === "out" && dac && fft)
      .reduce((sum, {count}) => sum + count, 0);

    devices = devices
      .filter(({name}) => name !== "out")
      .map<Device>(({name, dac, fft, ...rest}) => ({name, dac: dac || name === "dac", fft: fft || name === "fft", ...rest}))
      .flatMap<Device>(({name, ...rest}) => connections[name].map(next => ({name: next, ...rest})))
      .reduce<Device[]>((acc, {name, count, dac, fft}) => {
        let path = acc.find(d => d.name === name && d.dac === dac && d.fft === fft);
        if (path) {
          path.count += count;
        } else {
          acc.push({name, count, dac, fft});
        }
        return acc;
      }, []);
  }

  return correctPathCount;
}

// == ASSERTS ==

console.assert(part1(`\
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`) === 5);

console.assert(part2(`\
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`) === 2);
