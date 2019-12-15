const alice = {
    id: 'Alice',
    name: 'Alice Adams',
};

const bob = {
    id: 'Bob',
    name: 'Bob Brown',
};

const heroData = {
    [alice.id]: ['morevna', 'yaga', 'premudraya'],
    [bob.id]: ['morevna', 'yaga', 'hozyaika'],
};

function heroes(id) {
    return heroData[id];
}

const accounts = [alice, bob];

module.exports = {
    alice, bob, heroes, accounts,
};
