const keyboardSpace = document.getElementsByClassName('keyboard-space')[0];
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
    const fKeys = Array.from({ length: 12 })?.map((_, index) => `F1${index + 1}`);
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
        ['~', '`'], ['!', 1], ['@', 2], ['#', 3], ['$', 4],
        ['%', 5], ['^', 6], ['&', 7], ['*', 8], ['(', 9], [')', 0],
        ['_', '-'], ['+', '='], ['', 'delete'],
    ];
    const keys = fkeysArray.map(item => ({ content: joinStr(item), value: item[1] }));
    keysCreate({ keys, className: 'keyboard-number-space', parent: keyboardSpace })
}

// 字母按键
function wordKeysCreate() {
    // 第一行
    const fkeysArrayOne = [['{', '['], ['}', ']'], ['|', '\\']].map(item => ({ content: joinStr(item), value: item[1] }));
    const keysOne = [{ content: joinStr(['', 'tab']), value: 'tab' }, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ...fkeysArrayOne];
    keysCreate({ keys: keysOne, className: 'keyboard-word-space-one', parent: keyboardSpace });
    // 第二行
    const fkeysArrayTwo = [[':', ';'], [`"`, `'`], ['', 'enter']].map(item => ({ content: joinStr(item), value: item[1] }));
    const keysTwo = [{ content: joinStr(['', 'caps lock']), value: 'caps-lock' }, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ...fkeysArrayTwo];
    keysCreate({ keys: keysTwo, className: 'keyboard-word-space-two', parent: keyboardSpace });
    // 第三行
    const fkeysArrayThree = [['<', ','], [`>`, `.`], ['?', '/'], ['', 'shift']].map(item => ({ content: joinStr(item), value: item[1] }));
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
    keysCreate({ keys: [{ content: '↑', value: 'top' }], className: 'position-top', parent: position });
    // 左 下 右
    const positionKeys = [['left', '←'], ['bottom', '↓'], ['right', '→']].map(item => ({ content: item[1], value: item[0] }))
    keysCreate({ keys: positionKeys, className: 'position-other', parent: position });
}
function executeCreateKeys() {
    functionKeysCreate();
    numberKeysCreate();
    wordKeysCreate();
    assistKeysCreate();
    positionKeysCreate();
}
// 初始化
function init() {
    executeCreateKeys();
}
init();

