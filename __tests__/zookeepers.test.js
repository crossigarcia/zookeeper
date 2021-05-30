const fs = require('fs');
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('create zookeper object', () => {
   const zookeeper = createNewZookeeper(
      { name: "Lola", id:"23"},
      zookeepers
   );

   expect(zookeeper.name).toBe("Lola");
   expect(zookeeper.id).toBe("23");
});

test('filters by query', () => {
   const startingZookeepers = [
      {
      id: "8",
      name: "Lernantino",
      age: 19,
      favoriteAnimal: "Business Cat"
      },
      {
      name: "Les",
      age: 64,
      favoriteAnimal: "Rabbit",
      id: "9"
      }
   ];

   const updatedZookeepers = filterByQuery({name: "Les"}, startingZookeepers);

   expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
   const startingZookeepers = [
      {
      id: "8",
      name: "Lernantino",
      age: 19,
      favoriteAnimal: "Business Cat"
      },
      {
      name: "Les",
      age: 64,
      favoriteAnimal: "Rabbit",
      id: "9"
      }
   ];

   const result = findById("8", startingZookeepers);

   expect(result.name).toBe("Lernantino");
});

test('validates zookepers', () => {
   const zookeeper = {
      id: "8",
      name: "Lernantino",
      age: 19,
      favoriteAnimal: "Business Cat"
      };
   const invalidZookeeper = {
      id: "",
      name: 4,
      age: 20,
      favoriteAnimal: "dog"
   };

   const result = validateZookeeper(zookeeper);
   const result2 = validateZookeeper(invalidZookeeper);

   expect(result).toBe(true);
   expect(result2).toBe(false);
});