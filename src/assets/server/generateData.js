var faker = require('faker');

var database = {
  baseGrid: []
};

// POPOLA BASE_GRID
for (var i = 0; i < 15; i++) {
  database.baseGrid.push({
    athlete: faker.name.firstName(1) + ' ' + faker.name.lastName(0),
    age: faker.random.number({min: 20, max: 50}),
    sport: faker.random.arrayElement(['Swimming', 'Gymnastics', 'Speed Skating', 'Cross Country Skiing', 'Short-Track Speed Skating', 'Diving', 'Cycling', 'Biathlon', 'Alpine Skiing', 'Speed Skating', 'Ski Jumping']),
    year: faker.random.arrayElement([2010, 2011, 2012, 2012, 2013, 2014, 2015, 1016, 2017, 2018, 2019, 2020, 2000, 2001, 2002, 2003]),
    points: faker.finance.amount(0, 100, 2),
    note: faker.random.alphaNumeric(20),
    id: i + 1
  });
}


console.log(JSON.stringify(database));
