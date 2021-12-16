// == SHARED ==

const bin2int = b => parseInt(b, 2);

// == PART 1 ==

function part1(input) {
  input = BigInt(`0x${input}`).toString(2).padStart(input.length * 4, "0");

  let versionSum = 0;

  function processPacket(binary) {
    let version = bin2int(binary.slice(0, 3));
    versionSum += version;

    let typeId = bin2int(binary.slice(3, 6));

    if (typeId === 4) { // literal packet

      let bytes = "";
      for (let i = 6;; i += 5) {
        bytes += binary.slice(i + 1, i + 5);

        if (binary.at(i) === "0") break;
      }

      return 6 + bytes.length * 5 / 4;

    } else if (binary.at(6) === "0") { // operator packet, length is number of bits

      let length = 22 + bin2int(binary.slice(7, 22));
      let bits = binary.slice(22, length);

      while (bits.length > 0) {
        let packetLength = processPacket(bits);
        bits = bits.slice(packetLength);
      }

      return length;

    } else { // operator packet, length is number of packets

      let count = bin2int(binary.slice(7, 18));
      let bits = binary.slice(18);

      for (let i = 1; i <= count; i++) {
        let packetLength = processPacket(bits);
        bits = bits.slice(packetLength);
      }

      return binary.length - bits.length;

    }
  }

  processPacket(input);

  return versionSum;
}

// == PART 2 ==

function part2(input) {
  input = BigInt(`0x${input}`).toString(2).padStart(input.length * 4, "0");

  function processPacket(binary) {
    let typeId = bin2int(binary.slice(3, 6));

    if (typeId === 4) { // literal packet

      let bytes = "";
      for (let i = 6;; i += 5) {
        bytes += binary.slice(i + 1, i + 5);

        if (binary.at(i) === "0") break;
      }

      return {
        length: 6 + bytes.length * 5 / 4,
        value: bin2int(bytes),
      };

    } else { // operator packet

      let length;
      let values = [];

      if (binary.at(6) === "0") { // length is number of bits

        length = 22 + bin2int(binary.slice(7, 22));
        let bits = binary.slice(22, length);

        while (bits.length > 0) {
          let packet = processPacket(bits);
          values.push(packet.value);
          bits = bits.slice(packet.length);
        }

      } else { // length is number of packets

        let count = bin2int(binary.slice(7, 18));
        let bits = binary.slice(18);

        for (let i = 1; i <= count; i++) {
          let packet = processPacket(bits);
          values.push(packet.value);
          bits = bits.slice(packet.length);
        }

        length = binary.length - bits.length;

      }

      let value;
      if (typeId === 0) value = values.reduce((a, b) => a + b, 0);
      if (typeId === 1) value = values.reduce((a, b) => a * b, 1);
      if (typeId === 2) value = Math.min(...values);
      if (typeId === 3) value = Math.max(...values);
      if (typeId === 5) value = values[0] > values[1] ? 1 : 0;
      if (typeId === 6) value = values[0] < values[1] ? 1 : 0;
      if (typeId === 7) value = values[0] === values[1] ? 1 : 0;

      return {length, value};

    }
  }

  return processPacket(input).value;
}

// == ASSERTS ==

console.assert(part1("D2FE28") === 6);
console.assert(part1("38006F45291200") === 9);
console.assert(part1("EE00D40C823060") === 14);
console.assert(part1("8A004A801A8002F478") === 16);
console.assert(part1("620080001611562C8802118E34") === 12);
console.assert(part1("C0015000016115A2E0802F182340") === 23);
console.assert(part1("A0016C880162017C3686B18A3D4780") === 31);

console.assert(part2("D2FE28") === 2021);
console.assert(part2("C200B40A82") === 3);
console.assert(part2("04005AC33890") === 54);
console.assert(part2("880086C3E88112") === 7);
console.assert(part2("CE00C43D881120") === 9);
console.assert(part2("D8005AC2A8F0") === 1);
console.assert(part2("F600BC2D8F") === 0);
console.assert(part2("9C005AC2F8F0") === 0);
console.assert(part2("9C0141080250320F1802104A08") === 1);
