module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        //   "standard",
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        "plugin:vue/vue3-recommended"
        // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        "eqeqeq": 1,
        "no-var": 2,
        "no-console": 0,
        "no-debugger": 0,
        "no-new-wrappers": 2, // 禁止new String() 等等
        "no-duplicate-imports": 1, // 禁止重复imports
        "no-multiple-empty-lines": [1, {
            "max": 2
        }],
        "vue/no-empty-component-block": 2, // 禁止<template> <script> <style>块为空
        "vue/html-self-closing": 0,
        "vue/max-attributes-per-line": 0,
        "vue/singleline-html-element-content-newline": 0,
        "vue/attribute-hyphenation": 0,
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }]
        // 'comma-dangle': [2, 'never'] //禁止使用拖尾逗号
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
    },
}