const KEY_TYPE = {
    // 功能按键
    fn: 'fn',
    ControlLeft: 'control',
    AltLeft: 'option-left',
    AltRight: 'option-rignt',
    MetaLeft: 'command-left',
    MetaRight: 'command-right',
    Space: 'space',
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowRight: 'right',

    ShiftLeft: 'shift-left',
    ShiftRight: 'shift',

    CapsLock: 'caps-lock',
    Enter: 'enter',
    Tab: 'tab',
    Backspace: 'delete',

    KeyA: 'A', KeyB: 'B', KeyC: 'C', KeyD: 'D', KeyE: 'E', KeyF: 'F', KeyG: 'G',
    KeyH: 'H', KeyI: 'I', KeyJ: 'J', KeyK: 'K', KeyL: 'L', KeyM: 'M', KeyN: 'N',
    KeyO: 'O', KeyP: 'P', KeyQ: 'Q', KeyR: 'R', KeyS: 'S', KeyT: 'T', KeyU: 'U',
    KeyV: 'V', KeyW: 'W', KeyX: 'X', KeyY: 'Y', KeyZ: 'Z',

    Comma: 'comma',
    Period: 'period',
    Slash: 'slash',
    shift: 'shift',

    Semicolon: 'semicolon',
    Quote: 'quote',
    Enter: 'enter',

    BracketLeft: 'bracketLeft',
    BracketRight: 'bracketRight',
    Backslash: 'backslash',

    Backquote: 'backquote',
    Digit1: 'digit1', Digit2: 'digit2', Digit3: 'digit3', Digit4: 'digit4', Digit5: 'digit5',
    Digit6: 'digit6', Digit7: 'digit7', Digit8: 'digit8', Digit9: 'digit9', Digit0: 'digit0',
    Minus: 'minus',
    Equal: 'equal',
    Escape: 'esc',

    F1: 'F1', F2: 'F2', F3: 'F3', F4: 'F4', F5: 'F5', F6: 'F6',
    F7: 'F7', F8: 'F8', F9: 'F9', F10: 'F10', F11: 'F11', F12: 'F12',
};

const CLASS_TYPE = Object.entries(KEY_TYPE)?.reduce(
    (total, [key, value]) => {
        return {...total, [value]: key};
    },
    {close: 'close'}
);
