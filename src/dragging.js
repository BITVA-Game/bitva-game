console.log('dragging.js:', '¡hola, mundo!');

let dragged;
const place = { old: null, new: null };
let startX;
let startY;
let x;
let y;

function dragCard(drag) {
    x = drag.clientX - startX;
    y = drag.clientY - startY;
    dragged.style.transform = `translate(${x}px,${y}px) scale(1.1,1.1)`;
}

function stopDrag() {
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('mousemove', dragCard, true);
    if (dragged) {
        dragged.style.zIndex = -1;
        dragged.style.transform = null;
        dragged.style.willChange = null;
        dragged.style.position = null;
        dragged = null;
    }
}

function dropCard(drop) {
    const item = document.getElementById('item');
    if (!item.hasChildNodes()) {
        if ((item.offsetLeft < drop.clientX < (item.offsetLeft + item.offsetWidth))
            && (item.offsetTop < drop.clientY < (item.offsetTop + item.offsetHeight))) {
            item.appendChild(dragged);
            dragged.draggable = false;
        }
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
        document.addEventListener('mousemove', dragCard, true);
    }
}, true);
