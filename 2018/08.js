// == PART 1 ==

function part1(input) {
  input = input.split(" ").map(Number);

  let parseNode = input => {
    let size = 2;
    let childCount = input[0];
    let metadataCount = input[1];
    let metadataSum = 0;
    
    for (let i = 0; i < childCount; i++) {
      let child = parseNode(input.slice(size));
      size += child.size;
      metadataSum += child.metadataSum;
    }

    for (let i = size; i < size + metadataCount; i++) {
      metadataSum += input[i];
    }
    size += metadataCount;

    return {size, metadataSum};
  }

  return parseNode(input).metadataSum;
}

// == PART 2 ==

function part2(input) {
  input = input.split(" ").map(Number);

  let parseNode = input => {
    let size = 2;
    let childCount = input[0];
    let childValues = [];
    let metadataCount = input[1];
    let metadata = [];
    let value;
    
    for (let i = 0; i < childCount; i++) {
      let child = parseNode(input.slice(size));
      childValues.push(child.value);
      size += child.size;
    }

    for (let i = size; i < size + metadataCount; i++) {
      metadata.push(input[i]);
    }
    size += metadataCount;

    if (childCount === 0) {
      value = metadata.reduce((acc, nr) => acc + nr, 0);
    } else {
      value = metadata.reduce((acc, i) => acc + (childValues[i - 1] || 0), 0);
    }

    return {size, value};
  }

  return parseNode(input).value;
}

// == ASSERTS ==

console.assert(part1("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2") === 138);
console.assert(part2("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2") === 66);
