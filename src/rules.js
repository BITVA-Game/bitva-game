export default function isTarget(target, dragging, active) {
    if (!dragging) {
        return false;
    }
    if (!active) {
        return (
            (target === 'opponent' && dragging.card.category === 'attack')
            || (target === 'itemOpponent' && dragging.card.category === 'attack')
        );
    }
    return (
        (target === 'hero' && dragging.card.category === 'heal')
        || (target === 'item' && dragging.card.type === 'item')
        || (target === 'graveyard')
    );
}
