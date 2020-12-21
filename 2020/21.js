// == PART 1 ==

function part1(input) {
  input = input.split("\n").map(line => {
    let [, ingredients, allergens] = line.match(/^([\w\s]+)(?: \(contains ([\w\s,]+)\))?$/);
    ingredients = ingredients.split(" ");
    allergens = allergens.split(", ");
    return {ingredients, allergens};
  });

  let allIngredients = input.flatMap(({ingredients}) => ingredients);

  let ingredientSetsWithAllergen = {};

  for (let {ingredients, allergens} of input) {
    for (let allergen of allergens) {
      ingredientSetsWithAllergen[allergen] = ingredientSetsWithAllergen[allergen] || [];
      ingredientSetsWithAllergen[allergen].push(ingredients);
    }
  }

  let possibleAllergicIngredients = Object.values(ingredientSetsWithAllergen).flatMap(ingredientSets => {
    return ingredientSets[0].filter(ingredient => ingredientSets.every(set => set.includes(ingredient)));
  });

  return allIngredients
    .filter(ingredient => !possibleAllergicIngredients.includes(ingredient))
    .length;
}

// == PART 2 ==

function part2(input) {
  input = input.split("\n").map(line => {
    let [, ingredients, allergens] = line.match(/^([\w\s]+)(?: \(contains ([\w\s,]+)\))?$/);
    ingredients = ingredients.split(" ");
    allergens = allergens.split(", ");
    return {ingredients, allergens};
  });

  let ingredientSetsWithAllergen = {};

  for (let {ingredients, allergens} of input) {
    for (let allergen of allergens) {
      ingredientSetsWithAllergen[allergen] = ingredientSetsWithAllergen[allergen] || [];
      ingredientSetsWithAllergen[allergen].push(ingredients);
    }
  }

  let possibleAllergicIngredients = {};

  for (let [allergen, ingredientSets] of Object.entries(ingredientSetsWithAllergen)) {
    possibleAllergicIngredients[allergen] = ingredientSets[0].filter(ingredient => ingredientSets.every(set => set.includes(ingredient)));
  }

  let allergicIngredients = {};

  while(Object.keys(possibleAllergicIngredients).length > 0) {
    let [foundAllergen, [foundIngredient]] = Object.entries(possibleAllergicIngredients).find(([, ingredients]) => ingredients.length === 1);
    delete possibleAllergicIngredients[foundAllergen];
    allergicIngredients[foundAllergen] = foundIngredient;

    for (let allergen in possibleAllergicIngredients) {
      possibleAllergicIngredients[allergen] = possibleAllergicIngredients[allergen].filter(ingredient => ingredient !== foundIngredient);
    }
  }

  return Object.keys(allergicIngredients)
    .sort()
    .map(allergen => allergicIngredients[allergen])
    .join(",");
}

// == ASSERTS ==

console.assert(part1(
`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`
) === 5);

console.assert(part2(
`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`
) === "mxmxvkd,sqjhc,fvjkl");
