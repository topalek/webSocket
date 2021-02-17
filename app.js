const body = document.getElementById('body');
const unit = document.getElementById('unit');

unit.style.backgroundColor = Math.random() < 0.5 ? '#107BAC' : '#ac1010';
//Open websocket connection

const ws = new WebSocket('ws://localhost:1080');

body.addEventListener('keyup', e => {
    let top = parseInt(unit.style.top ? unit.style.top.replace('px', '') : 0);
    let left = parseInt(unit.style.left ? unit.style.left.replace('px', '') : 0);

    const step = 5;

    switch (e.code) {
        case 'ArrowUp':
            unit.style.top = top - step + 'px';
            break

        case 'ArrowDown':
            unit.style.top = top + step + 'px';
            break

        case 'ArrowLeft':
            unit.style.left = left - step + 'px';
            break

        case 'ArrowRight':
            unit.style.left = left + step + 'px';
            break
    }

    let posData = {
        top: unit.style.top,
        left: unit.style.left
    }

    ws.send(JSON.stringify(posData));

})
ws.onmessage = resp => {
    let posData = JSON.parse(resp.data);
    unit.style.top = posData.top;
    unit.style.left = posData.left;
}
