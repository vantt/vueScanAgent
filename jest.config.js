module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['<rootDir>/tests/unit/setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest"
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    "\\.txt$": 'identity-obj-proxy'
  }
}
