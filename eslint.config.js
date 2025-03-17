import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';


/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['**/*.{js,mjs,cjs,ts,vue}']},
    {languageOptions: {globals: {...globals.browser, ...globals.node}}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {files: ['**/*.vue'], languageOptions: {parserOptions: {parser: tseslint.parser}}},
    {
        'rules': {
            'vue/no-v-model-argument': 0,
            '@typescript-eslint/no-empty-interface': 0,
            'vue/no-v-for-template-key': 'off',
            'no-lonely-if': 0,
            'no-console': 'off',
            'camelcase': 'off',
            'quotes': [
                'error',
                'single'
            ],
            'max-len': [
                'error',
                {
                    'code': 150,
                    'tabWidth': 2,
                    'ignoreComments': true,
                    'ignoreTrailingComments': true,
                    'ignoreUrls': true,
                    'ignorePattern': 'd="([\\s\\S]*?)"',
                    'ignoreStrings': true,
                    'ignoreTemplateLiterals': true,
                    'ignoreRegExpLiterals': true
                }
            ],
            'vue/first-attribute-linebreak': ['error', {
                'singleline': 'ignore',
                'multiline': 'below'
            }],
            'vue/max-attributes-per-line': [
                'error',
                {
                    'singleline': {
                        'max': 10
                    },
                    'multiline': {
                        'max': 1
                    }
                }
            ],
            'no-use-before-define': [
                'error',
                {
                    'functions': true,
                    'classes': true,
                    'variables': true,
                    'allowNamedExports': false
                }
            ]
        }
    }
];
