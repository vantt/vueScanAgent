module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
        "@vue/typescript/recommended",
        "@vue/prettier/@typescript-eslint"
    ],

    rules: {
        "no-console": "off",
        "no-debugger": "off",
        "indent": ["warn", 4]
    },

    parserOptions: {
        //parser: "babel-eslint"
        "parser": "@typescript-eslint/parser"
    },

    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            env: {
                jest: true
            }
        }
    ]
};
