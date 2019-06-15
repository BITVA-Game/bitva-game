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
            || (player.item[0].id === 'forestMushroom' && dragging.card.panic === 'true' ? dragging.card.panic === 'true' : null)
        );
    }
    return (
        (target === 'hero' && dragging.card.category === 'heal')
            || (target === 'item' && dragging.card.type === 'item')
            || (target === 'graveyard')
    );
}
