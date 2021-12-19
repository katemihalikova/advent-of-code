// == CLASSES & SHARED ==

class Scanner {
  beacons;
  number;
  diff = undefined;
  pos = undefined;
  dir = undefined;

  constructor(beacons, number) {
    this.beacons = beacons;
    this.number = number;
  }

  setCoords(diff, pos, dir) {
    this.diff = diff;
    this.pos = pos;
    this.dir = dir;
  }

  getAbsoluteBeacons() {
    return this.beacons.map(b => this.pos.map((p, i) => b[p] * this.dir[p] + this.diff[i]));
  }
}

const possiblePoss = [
  [0,1,2],
  [1,0,2],
  [2,0,1],
  [0,2,1],
  [1,2,0],
  [2,1,0],
];

const possibleDirs = [
  [+1,+1,+1],
  [+1,+1,-1],
  [+1,-1,+1],
  [+1,-1,-1],
  [-1,+1,+1],
  [-1,+1,-1],
  [-1,-1,+1],
  [-1,-1,-1],
];

function alignScanners(input) {
  let scanners = input.split("\n\n")
    .map(line => line.split("\n").slice(1).map(coords => coords.split(",").map(Number)))
    .map((beacons, i) => new Scanner(beacons, i));

  let [scanner0, ...unknownScanners] = scanners;
  scanner0.setCoords([0, 0, 0], possiblePoss[0], possibleDirs[0]);

  while (unknownScanners.length > 0) {
    for (let unknownScanner of unknownScanners) {
      let overlaps = {};

      for (let knownBeacon of scanner0.beacons) {
        for (let unknownBeacon of unknownScanner.beacons) {
          for (let pos of possiblePoss) {
            for (let dir of possibleDirs) {
              let positionedUnknownBeacon = pos.map(i => unknownBeacon[i] * dir[i]);
              if (positionedUnknownBeacon.some(coord => Object.is(coord, -0))) continue;

              let diff = [
                knownBeacon[0] - positionedUnknownBeacon[0],
                knownBeacon[1] - positionedUnknownBeacon[1],
                knownBeacon[2] - positionedUnknownBeacon[2],
              ];

              let encodedCoords = `${diff}|${pos}|${dir}`;
              overlaps[encodedCoords] = overlaps[encodedCoords] || 0;
              overlaps[encodedCoords]++;
            }
          }
        }
      }

      let possibleOverlap = Object.entries(overlaps).find(([, count]) => count >= 12);
      if (possibleOverlap) {
        let coords = possibleOverlap[0].split("|").map(part => part.split(",").map(Number));
        unknownScanners = unknownScanners.filter(scanner => scanner !== unknownScanner);
        unknownScanner.setCoords(...coords);
        scanner0.beacons.push(...unknownScanner.getAbsoluteBeacons());
        scanner0.beacons = [...new Set(scanner0.beacons.map(String))].map(e => e.split(",").map(Number));
        break;
      }
    }
  }

  return scanners;
}

// == PART 1 ==

function part1(input) {
  let [scanner0] = alignScanners(input);
  return scanner0.beacons.length;
}

// == PART 2 ==

function part2(input) {
  let scanners = alignScanners(input);
  let manhattanDistance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  let maxDistance = -Infinity;

  for (let scannerA of scanners) {
    for (let scannerB of scanners) {
      let distance = manhattanDistance(scannerA.diff, scannerB.diff);
      if (distance > maxDistance) {
        maxDistance = distance;
      }
    }
  }

  return maxDistance;
}

// == ASSERTS ==

let example = 
`--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14`;

console.assert(part1(example) === 79);

console.assert(part2(example) === 3621);
