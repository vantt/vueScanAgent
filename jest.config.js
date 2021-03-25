module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    setupFiles: ['<rootDir>/tests/unit/setup.js'],
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\js$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleNameMapper: {
        "\\.txt$": 'identity-obj-proxy',
        "^vue$": "<rootDir>/node_modules/vue/dist/vue.common.js"
    }
}
