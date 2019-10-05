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

module.exports = {
    alice, bob, heroes,
};
