var faker = require('faker');

var database = {
  baseGrid: [],
  dateTimeGrid: []
};

// POPOLA BASE_GRID
for (var i = 0; i < 15; i++) {
  database.baseGrid.push({
    athlete: faker.name.firstName(1) + ' ' + faker.name.lastName(0),
    age: faker.random.number({min: 20, max: 50}),
    sport: faker.random.arrayElement(['Swimming', 'Gymnastics', 'Speed Skating', 'Cross Country Skiing', 'Short-Track Speed Skating', 'Diving', 'Cycling', 'Biathlon', 'Alpine Skiing', 'Speed Skating', 'Ski Jumping']),
    year: faker.random.number({min: 2000, max: 2020}),
    points: faker.finance.amount(0, 100, 2),
    note: faker.random.alphaNumeric(20),
    id: i + 1
  });
}

// POPOLA DATE_TIME_GRID
for (var i = 0; i < 15; i++) {
  let fakeDate = JSON.stringify(faker.date.past(1)).slice(1, -2);
  database.dateTimeGrid.push({
    patient: faker.name.firstName(1) + ' ' + faker.name.lastName(0),
    admission: fakeDate,
    date: fakeDate.slice(0, 10),
    time: fakeDate.slice(-12),
    id: i + 1
  });
}

console.log(JSON.stringify(database));
