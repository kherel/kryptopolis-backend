module.exports = {
  "parser": "babel-eslint",
  "env": {
    "es6": false,
    "node": true,
  },
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": false
  },
  "plugins": [
    "node",
    "import",
  ],
  "extends": [
    "airbnb-base",
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  "globals": {
    "it": false,
    "expect": false,
    "describe": false,
    "app": false,
    "before": false,
    "after": false,
    "factory": false,
    "beforeEach": false,
    "afterEach": false,
    "sinon": false,
    "nock": false,
    "xdescribe": false,
    "request": false,
    "timekeeper": false,
    "Promise": false,
  },
  "rules": {
    "import/named": 0,
    "strict": 0,
    "node/no-unsupported-features": 0,
    "no-useless-escape": 0,
    "no-process-exit": 0,
    "no-console": 0,
    "node/no-extraneous-import": [
      "error", {
        "allowModules": [
          "config"
        ]
      }
    ],
    "node/exports-style": [
      "error",
      "module.exports"
    ],
  }
}
