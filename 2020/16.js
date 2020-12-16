// == PART 1 ==

function part1(input) {
  input = input.split("\n\n");

  let fieldDefinitions = input[0].split("\n").map(q => {
    let [, from1, to1, from2, to2] = q.match(/^[\w ]+: (\d+)-(\d+) or (\d+)-(\d+)$/).map(Number);
    return {from1, to1, from2, to2};
  });
  let nearbyTicketFields = input[2].split("\n").slice(1).map(l => l.split(",").map(Number)).flat();

  return nearbyTicketFields
    .filter(fieldValue => !fieldDefinitions.some(({from1, to1, from2, to2}) => (fieldValue >= from1 && fieldValue <= to1) || (fieldValue >= from2 && fieldValue <= to2)))
    .reduce((a, b) => a + b, 0);
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n\n");

  let fieldDefinitions = input[0].split("\n").map(q => {
    let [, field, from1, to1, from2, to2] = q.match(/^([\w ]+): (\d+)-(\d+) or (\d+)-(\d+)$/);
    [from1, to1, from2, to2] = [from1, to1, from2, to2].map(Number);
    return {field, from1, to1, from2, to2};
  });
  let myTicket = input[1].split("\n")[1].split(",").map(Number);
  let nearbyTickets = input[2].split("\n").slice(1).map(l => l.split(",").map(Number));

  let tickets = [
    ...nearbyTickets.filter(ticket => {
      return ticket.every(fieldValue => {
        return fieldDefinitions.some(({from1, to1, from2, to2}) => (fieldValue >= from1 && fieldValue <= to1) || (fieldValue >= from2 && fieldValue <= to2));
      });
    }),
    myTicket,
  ];

  let valuesPerFields = tickets[0].map((_, fieldIndex) => tickets.map(ticket => ticket[fieldIndex]));

  let possibleFields = valuesPerFields.map(values => {
    return fieldDefinitions.filter(({from1, to1, from2, to2}) => {
      return values.every(fieldValue => (fieldValue >= from1 && fieldValue <= to1) || (fieldValue >= from2 && fieldValue <= to2));
    });
  });

  let knownFields = new Set();

  while (knownFields.size < valuesPerFields.length) {
    possibleFields.filter(fields => fields.length === 1).forEach(([field]) => knownFields.add(field));

    possibleFields = possibleFields.map(fields => {
      if (fields.length > 1) return fields.filter(field => !knownFields.has(field))
      else return fields;
    });
  }

  return possibleFields
    .flat()
    .map((field, fieldIndex) => ({...field, value: myTicket[fieldIndex]}))
    .filter(({field}) => field.startsWith('departure'))
    .map(({value}) => value)
    .reduce((a, b) => a * b, 1);
}

// == ASSERTS ==

console.assert(part1(
`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`
) === 71);

console.assert(part2(
`class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`
) === 1);
