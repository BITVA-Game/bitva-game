console.log('dragging.js:', '¡hola, mundo!');

let dragged;
const place = { old: null, new: null };
let startX;
let startY;
let x;
let y;

function startDrag(drag) {
    x = drag.clientX - startX;
    y = drag.clientY - startY;
    dragged.style.transform = `translate(${x}px,${y}px) scale(1.1,1.1)`;
}

function stopDrag() {
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('mousemove', startDrag, true);
    if (dragged) {
        dragged.style.zIndex = -1;
        dragged.style.transform = null;
        dragged.style.willChange = null;
        dragged.style.position = null;
        dragged = null;
    }
}

function droppedTo(drop, target) {
    // console.log(`${target.id}: ${target.offsetLeft} < ${drop.clientX} < (${target.offsetLeft} + ${target.offsetWidth}) = ${target.offsetLeft + target.offsetWidth}`);
    // console.log(`${target.id}: ${target.offsetTop} < ${drop.clientY} < (${target.offsetTop} + ${target.offsetHeight}) = ${target.offsetTop + target.offsetHeight}`);
    const dropped = (
        target.offsetLeft < drop.clientX
        && drop.clientX < (target.offsetLeft + target.offsetWidth)
        && target.offsetTop < drop.clientY
        && drop.clientY < (target.offsetTop + target.offsetHeight)
    );
    if (dropped) console.log('dragging:', 'dropped to', target.id);
    return dropped;
}

function dropToGrave(grave, card) {
    grave.appendChild(card);
    grave.childNodes[1].innerText = grave.childNodes.length - 2;
}

function dropCard(drop) {
    const item = document.getElementById('item');
    const grave = document.getElementById('grave');
    const hero = document.getElementById('hero');
    let enemy = document.getElementById('enemy');
    enemy = enemy.getBoundingClientRect();
    enemy = {
        id: 'enemy',
        offsetLeft: enemy.left,
        offsetWidth: enemy.width,
        offsetTop: enemy.top,
        offsetHeight: enemy.height,
    };
    if (droppedTo(drop, item)) {
        if (!item.hasChildNodes()) {
            item.appendChild(dragged);
        }
    } else if (droppedTo(drop, grave)) {
        dropToGrave(grave, dragged);
        dragged.style.display = 'none';
    } else if (droppedTo(drop, hero)) {
        dropToGrave(grave, dragged);
        dragged.style.display = 'none';
    } else if (droppedTo(drop, enemy)) {
        dropToGrave(grave, dragged);
        dragged.style.display = 'none';
    }
    stopDrag();
}

document.addEventListener('mousedown', (down) => {
    down.preventDefault();
    if (down.target.draggable && down.target.classList.contains('card')) {
        dragged = down.target;
        dragged.style.willChange = 'transform';
        dragged.style.position = 'absolute';
        dragged.style.zIndex = 999;
        dragged.style.transform = 'scale(1.1,1.1)';
        place.old = dragged.parentNode;
        startX = down.clientX;
        startY = down.clientY;
        document.addEventListener('mouseup', dropCard);
        document.addEventListener('mousemove', startDrag, true);
    }
}, true);
