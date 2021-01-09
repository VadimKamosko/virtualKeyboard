let keyboard = document.querySelector('.keyboard');
let textarea = document.querySelector('.area');
let sound = document.querySelector('#sound');
sound.playbackRate = 10;

let shift = false;
let ru = false;

let masEn = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'backspace'],
    ['en/ru', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['shift', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter'],
    ['hide', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'],
    [' ']
]
let masRu = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'backspace'],
    ['en/ru', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', "ъ"],
    ['shift', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
    ['hide', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '.', '?'],
    [' ']
]
function fillKeyBoard(mas) {
    if (keyboard.children.length) {
        clear();
    }
    for (value of mas) {
        let row = document.createElement('div');
        row.classList.add('row')
        for (key of value) {
            let k = document.createElement('div');
            k.classList.add('key');
            k.setAttribute('data-key', key);
            k.innerHTML = key;
            row.appendChild(k);
        }
        keyboard.appendChild(row);
    }
}
textarea.addEventListener('click', () => {
    keyboard.style.display = 'block';
})
fillKeyBoard(masEn)
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey) {
        ru = !ru;
        shift=!shift;
        ru ? fillKeyBoard(masRu) : fillKeyBoard(masEn);
    }
    let n = document.querySelector(`[data-key='${e.key.toLowerCase()}']`);
    if (n) {
        n.style['background-color'] = 'grey';
        addEvent(e);
        play();
        e.preventDefault();
    }
})

document.addEventListener('keyup', (e) => {
    let button = e.key.toLowerCase();
    let n = document.querySelector(`[data-key='${button}']`);
    if (n)
        n.style['background-color'] = '#847575';
})

keyboard.addEventListener('click', (e) => {
    if (e.target.dataset.key) {
        addEvent(e.target.dataset);
        play();
    }

})

function play() {
    sound.play();
}

function addEvent(e) {
    if (e.key.toLowerCase() == 'enter') {
        textarea.value += '\n';
        return
    }
    if (e.key.toLowerCase() == 'backspace') {
        textarea.value = textarea.value.slice(0, -1);
        return
    }
    if (e.key.toLowerCase() == 'hide') {
        keyboard.style.display = 'none';
        return
    }
    if (e.key.toLowerCase() == 'en/ru') {
        ru = !ru;
        ru ? fillKeyBoard(masRu) : fillKeyBoard(masEn);
        return
    }
    if (e.key.toLowerCase() == 'shift') {
        shift = !shift;
        shift ? document.querySelector(`[data-key='shift']`).style.border = "1px solid green" : document.querySelector(`[data-key='shift']`).style.border = "1px solid white";
        return
    }

    if (shift) {
        textarea.value += e.key.toLocaleUpperCase();
        return
    }
    textarea.value += e.key;
}
function clear() {
    while (keyboard.firstChild) {
        keyboard.firstChild.remove();
    }
}