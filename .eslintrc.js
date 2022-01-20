module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    
    'indent':['error', 4],
     // js/ts
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
     'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
     camelcase: ['error', { properties: 'never' }],
 
     'no-var': 'error',
     'no-empty': ['error', { allowEmptyCatch: true }],
     'no-void': 'error',
     'prefer-const': [
       'warn',
       { destructuring: 'all', ignoreReadBeforeAssign: true },
     ],
     'prefer-template': 'error',
     'object-shorthand': [
       'error',
       'always',
       { ignoreConstructors: false, avoidQuotes: true },
     ],
     'block-scoped-var': 'error',
     'no-constant-condition': ['error', { checkLoops: false }],
 
     '@typescript-eslint/explicit-module-boundary-types': 'off',
     '@typescript-eslint/no-explicit-any': 'off',
     '@typescript-eslint/no-non-null-assertion': 'off',
     '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
     '@typescript-eslint/consistent-type-imports': [
       'error',
      { disallowTypeAnnotations: false },
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
