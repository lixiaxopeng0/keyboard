const keyboardSpace = document.getElementsByClassName('keyboard-space')[0];
const showInput = document.getElementsByClassName('show-input')[0];

// 展示字符串
let showString = '';
// caps lock是否锁住
let isCapsLock = false;
// 创建按键
function keysCreate({ keys, className, parent }) {
    const functionSpace = document.createElement('div');
    functionSpace.className = className;

    for (let i = 0; i < keys.length; i++) {
        const key = document.createElement('p');
        const value = keys[i];
        key.className = value.value ?? value;
        key.textContent = value === 'close' ? '关机' : (value.content ?? value);
        functionSpace.appendChild(key);
    }
    parent.appendChild(functionSpace);
}

// 上方功能行按键
function functionKeysCreate() {
    const fKeys = Array.from({ length: 12 })?.map((_, index) => `F${index + 1}`);
    const keys = ['esc', ...fKeys, 'close'];
    keysCreate({ keys, className: 'keyboard-function-space', parent: keyboardSpace })
}
// 拼接字符传
function joinStr(item) {
    return `${item[0]}\n${item[1]}`;
}
// 数字行按键
function numberKeysCreate() {
    const fkeysArray = [
        ['~', '`', 'backquote'], ['!', 1, 'digit1'], ['@', 2, 'digit2'], ['#', 3, 'digit3'], ['$', 4, 'digit4'],
        ['%', 5, 'digit5'], ['^', 6, 'digit6'], ['&', 7, 'digit7'], ['*', 8, 'digit8'], ['(', 9, 'digit9'], [')', 0, 'digit0'],
        ['_', '-', 'minus'], ['+', '=', 'equal'], ['', 'delete', 'delete'],
    ];
    const keys = fkeysArray.map(item => ({ content: joinStr(item), value: item[2] }));
    keysCreate({ keys, className: 'keyboard-number-space', parent: keyboardSpace })
}

// 字母按键
function wordKeysCreate() {
    // 第一行
    const fkeysArrayOne = [['{', '[', 'bracketLeft'], ['}', ']', 'bracketRight'], ['|', '\\', 'backslash']].map(item => ({ content: joinStr(item), value: item[2] }));
    const keysOne = [{ content: joinStr(['', 'tab']), value: 'tab' }, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ...fkeysArrayOne];
    keysCreate({ keys: keysOne, className: 'keyboard-word-space-one', parent: keyboardSpace });
    // 第二行
    const fkeysArrayTwo = [[':', ';', 'semicolon'], [`"`, `'`, 'quote'], ['', 'enter', 'enter']].map(item => ({ content: joinStr(item), value: item[2] }));
    const keysTwo = [{ content: joinStr(['', 'caps lock']), value: 'caps-lock' }, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ...fkeysArrayTwo];
    keysCreate({ keys: keysTwo, className: 'keyboard-word-space-two', parent: keyboardSpace });
    // 第三行
    const fkeysArrayThree = [['<', ',', 'comma'], [`>`, `.`, 'period'], ['?', '/', 'slash'], ['', 'shift', 'shift']].map(item => ({ content: joinStr(item), value: item[2] }));
    const keysThree = [{ content: joinStr(['', 'shift']), value: 'shift-left' }, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ...fkeysArrayThree];
    keysCreate({ keys: keysThree, className: 'keyboard-word-space-three', parent: keyboardSpace });
}
// 辅助按键创建
function assistKeysCreate() {
    const keys = [
        { content: joinStr(['', 'fn']), value: 'fn' }, { content: joinStr(['', 'control']), value: 'control' }, { content: joinStr(['alt', 'option']), value: 'option-left' },
        { content: joinStr(['', 'command']), value: 'command-left' }, { content: '', value: 'space' },
        { content: joinStr(['', 'command']), value: 'command-right' }, { content: joinStr(['alt', 'option']), value: 'option-rignt' },
        'position',
    ];
    keysCreate({ keys, className: 'keyboard-assist-space', parent: keyboardSpace });
}
// 方向键
function positionKeysCreate() {
    const position = document.getElementsByClassName('position')[0];
    position.innerHTML = '';
    // 上∨
    keysCreate({ keys: [{ content: '↑', value: 'up' }], className: 'position-up', parent: position });
    // 左 下 右
    const positionKeys = [['left', '←'], ['down', '↓'], ['right', '→']].map(item => ({ content: item[1], value: item[0] }))
    keysCreate({ keys: positionKeys, className: 'position-other', parent: position });
}
function executeCreateKeys() {
    functionKeysCreate();
    numberKeysCreate();
    wordKeysCreate();
    assistKeysCreate();
    positionKeysCreate();
}

// 辅助按键，不显示
const assistArray = [
    'AltLeft', 'ControlLeft', 'MetaRight', 'MetaLeft', 'AltRight',
    'ShiftLeft', 'ShiftRight', 'Escape', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
    'CapsLock', 'Tab', 'fn', 'close', 'shift',
    ...Array.from({ length: 12 })?.map((_, index) => `F${index + 1}`),
];

// 文案显示处理
function showText({exclude = assistArray, type, value}) {
    switch (true) {
        case exclude.includes(type):
            break;
        case type === 'Backspace':
            showString = showString.slice(0, -1);
            showInput.value = showString;
            break;
        case type === 'Enter':
            showString = '';
            showInput.value = showString;
            break;
        default:
            showString += value;
            showInput.value = showString;
            break;
    }
}

// 键盘监听
// class操作
function classNameOperate({className, type = 'down', isMouse = false}) {
    const key = document.getElementsByClassName(className)[0];
    // lock特殊
    if (className === 'caps-lock') {
        key.classList.add('key-down');
        isCapsLock = !isCapsLock;
        isCapsLock && key.classList.add('locked');
        !isCapsLock && key.classList.remove('locked');
        setTimeout(() => {
            key.classList.remove('key-down');
        }, 100);
        return;
    }

    type === 'down' && key.classList.add('key-down');
    !isMouse && type === 'up' && key.classList.remove('key-down');
    // 鼠标点击、和tab按键，自动消除className
    (isMouse || type === 'down' && className === 'tab') && setTimeout(() => {
        key.classList.remove('key-down');
    }, 100);
}

function keyboardListen(keyType, e) {
    let type = e.code;
    let value = e.key;
    let className = KEY_TYPE[type];
    classNameOperate({className, type: keyType});
    if (keyType === 'down') {
        showText({type, value});
    }
}

// 点击按键
// 判读是否是字母
const reg = /^[a-zA-Z]{1}$/;
function click(e) {
    const content = e.target.textContent?.split('\n');
    let value = '';
    const className = e.target.classList[0];
    const type = CLASS_TYPE?.[className];
    // 方向按键，外部，点击不显示
    if (content?.length <= 2 && content[0]?.length < 10 && !className.includes('position')) {
        value = content?.length === 1 ? content[0] : content[1];
        value = type === 'Space' ? ' ' : value;
        value = reg.test(value) && !isCapsLock ? value.toLowerCase() : value;
        showText({type, value});
        classNameOperate({className, type: 'down', isMouse: true});
    }
}
// 初始化
function init() {
    executeCreateKeys();
    document.addEventListener('keydown', keyboardListen.bind(this, 'down'));
    document.addEventListener('keyup', keyboardListen.bind(this, 'up'));
    keyboardSpace.addEventListener('click', click);
}
init();

