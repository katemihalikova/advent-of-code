// == PART 1 ==

function part1(input) {
  let ingredients = input.split("\n").map(l => {
    let [, capacity, durability, flavor, texture] = l.match(/^\w+: capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories -?\d+$/).map(Number);
    return {capacity, durability, flavor, texture};
  });

  let maxScore = 0;

  function addIngredient(amountUsed = 0, ingredientIndex = 0, props = {capacity: 0, durability: 0, flavor: 0, texture: 0}) {
    let ingredient = ingredients[ingredientIndex];
    if (ingredientIndex < ingredients.length - 1) {
      for (let amount = 0; amount <= 100 - amountUsed; amount++) {
        addIngredient(amountUsed + amount, ingredientIndex + 1, {
          capacity: props.capacity + (amount * ingredient.capacity),
          durability: props.durability + (amount * ingredient.durability),
          flavor: props.flavor + (amount * ingredient.flavor),
          texture: props.texture + (amount * ingredient.texture),
        });
      }
    } else {
      let amount = 100 - amountUsed;
      let capacity = Math.max(props.capacity + (amount * ingredient.capacity), 0);
      let durability = Math.max(props.durability + (amount * ingredient.durability), 0);
      let flavor = Math.max(props.flavor + (amount * ingredient.flavor), 0);
      let texture = Math.max(props.texture + (amount * ingredient.texture), 0);
      maxScore = Math.max(maxScore, capacity * durability * flavor * texture);
    }
  }

  addIngredient();

  return maxScore;
}

// == PART 2 ==

function part2(input) {
  let ingredients = input.split("\n").map(l => {
    let [, capacity, durability, flavor, texture, calories] = l.match(/^\w+: capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)$/).map(Number);
    return {capacity, durability, flavor, texture, calories};
  });

  let maxScore = 0;

  function addIngredient(amountUsed = 0, ingredientIndex = 0, props = {capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0}) {
    let ingredient = ingredients[ingredientIndex];
    if (ingredientIndex < ingredients.length - 1) {
      for (let amount = 0; amount <= 100 - amountUsed; amount++) {
        addIngredient(amountUsed + amount, ingredientIndex + 1, {
          capacity: props.capacity + (amount * ingredient.capacity),
          durability: props.durability + (amount * ingredient.durability),
          flavor: props.flavor + (amount * ingredient.flavor),
          texture: props.texture + (amount * ingredient.texture),
          calories: props.calories + (amount * ingredient.calories),
        });
      }
    } else {
      let amount = 100 - amountUsed;
      let capacity = Math.max(props.capacity + (amount * ingredient.capacity), 0);
      let durability = Math.max(props.durability + (amount * ingredient.durability), 0);
      let flavor = Math.max(props.flavor + (amount * ingredient.flavor), 0);
      let texture = Math.max(props.texture + (amount * ingredient.texture), 0);
      let calories = Math.max(props.calories + (amount * ingredient.calories), 0);
      if (calories === 500) {
        maxScore = Math.max(maxScore, capacity * durability * flavor * texture);
      }
    }
  }

  addIngredient();

  return maxScore;
}

// == ASSERTS ==

console.assert(part1("Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\nCinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3") === 62842880);

console.assert(part2("Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\nCinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3") === 57600000);
