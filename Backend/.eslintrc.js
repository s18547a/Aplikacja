module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
       
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        '@typescript-eslint/no-var-requires': 0,
    }
};
