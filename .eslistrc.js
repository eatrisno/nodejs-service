module.exports = {
    "env": {
      "es6": true,
      "node": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
      "ecmaVersion": 2021,
      "sourceType": "module"
    },
    "rules": {
      "indent": [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "double"
      ],
      "semi": [
        "error",
        "always"
      ],
      "no-unused-vars": [
        "error", { "caughtErrors": "all" }
      ],
      "no-param-reassign": 0,
      "max-len": 0,
      "strict": 0,
      "no-console": 0
    }
  };