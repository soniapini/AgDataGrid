var faker = require('faker');

var database = {
  baseGrid: [],
  dateTimeGrid: [],
  userMasterGrid: [],
  accessDetailGrid: [],
  booleanGrid: []
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
  let fakeDate = faker.date.past(1);
  const fakeDateString = (JSON.stringify(fakeDate)).slice(1, -2);
  database.dateTimeGrid.push({
    patient: faker.name.firstName(1) + ' ' + faker.name.lastName(0),
    admission: fakeDate,
    date: fakeDate,
    time: fakeDate,
    id: i + 1
  });
}

// POPOLA USER_GRID
for (let i=0; i<15; i++) {
  database.userMasterGrid.push({
    user: faker.name.firstName(1) + ' ' + faker.name.lastName(0),
    email: faker.internet.email(),
    department: faker.random.arrayElement(['Operating Rooms', 'Intensive Care Units', 'Neuro Surgery', 'Cardiology', 'Oncology', 'Geriatric Unit', 'Pediatric Unit', 'Obstetrics and Gynecology', 'Oncology', 'Neurology', 'Neonatal intensive care unit']),
    hiringYear: faker.random.number({min: 1974, max: 2020}),
    note: faker.lorem.paragraph(),
    accessDetailGrid: generateAccess(),
    id: i + 1
  });
}

function generateAccess() {
  let accessDetailGrid = [];
  for (let i=0; i<5; i++) {
    accessDetailGrid.push({
      ipv4: faker.internet.ip(),
      ipv6: faker.internet.ipv6(),
      login: faker.date.recent(),
      id: i + 1
    });
  }
  return accessDetailGrid
}

// POPOLA ACCESS_GRID
for (let i=0; i<5; i++) {
  database.accessDetailGrid.push({
    ipv4: faker.internet.ip(),
    ipv6: faker.internet.ipv6(),
    login: faker.date.recent(),
    id: i + 1
  });
}

console.log(JSON.stringify(database));
