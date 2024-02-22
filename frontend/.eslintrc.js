module.exports = {
  extends: ['eslint:recommended', 'react-app', 'plugin:jsx-a11y/recommended'],
  plugins: ['react', 'jsx-a11y', 'prettier'],
  rules: {
    'no-useless-computed-key': 'off',
    'no-mixed-operators': 'off',
    'no-throw-literal': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/no-array-index-key': 'warn',
    'no-console': 'off',
    'default-case': 'off',
    'no-empty': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-constant-condition': 'warn',
    'no-undef': ['warn'],
    'no-prototype-builtins': 'warn',
    'import/no-anonymous-default-export': 'off',
    'no-redeclare': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-import-assign': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
