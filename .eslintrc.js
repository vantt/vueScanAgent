module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
    ],

    rules: {
        "no-console": "off",
        "no-debugger": "off",
        "indent": ["warn", 4]
    },

    parserOptions: {
        parser: "babel-eslint"
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
