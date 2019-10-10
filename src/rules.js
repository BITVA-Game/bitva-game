export default function isTarget(target, dragging, active, player) {
    if (!dragging) {
        return false;
    }
    if (!active) {
    // console.log(player.item);
        const itemKey = Object.keys(player.item)[0];
        // eslint-disable-next-line no-unused-expressions
        itemKey ? player.item[itemKey].category : null;
        // console.log(itemCategory);
        return (
            (target === 'opponent' && dragging.card.category === 'attack')
      || (target === 'itemOpponent' && dragging.card.category === 'attack')
      || (target === 'opponent' && dragging.card.category === 'holdCard')
      || (target === 'opponent' && dragging.card.category === 'attackItems')
      || (target === 'opponent' && dragging.card.category === 'turning')
      || (target === 'opponent' && dragging.card.category === 'showCards')
      || (target === 'opponent' && dragging.card.category === 'noCards')
        );
    }
    return (
        (target === 'hero' && dragging.card.category === 'heal')
    || (target === 'item' && dragging.card.type === 'item')
    || target === 'graveyard'
    );
}

export function getActiveProfile(app) {
    return app.profiles.find((p) => p.id === app.game.active);
}

export function sortedHeroesList(app) {
    // Sort characters' names based on profile and alphabet
    const heroes = app.heroSelect.heroes;
    return Object.values(app.heroSelect.allHeroes).sort((h1, h2) => {
        const id1 = heroes.indexOf(h1.id);
        const id2 = heroes.indexOf(h2.id);
        if (id1 === id2) {
            return h1.id > h2.id ? 1 : -1;
        }
        return id1 > id2 ? -1 : 1;
    });
}

export function getActivePlayer(app) {
    return app.game.players.find((p) => p.id === app.game.active);
}

export function getInActivePlayer(app) {
    return app.game.players.find((p) => p.id !== app.game.active);
}
