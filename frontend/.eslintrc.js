module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        quotes: ['error', 'single'],
        indent: ['error', 4, { 'SwitchCase': 1 }],
        semi: ['error', 'never'],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }]
    }
}
