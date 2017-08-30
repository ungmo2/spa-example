module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true,
      "jquery": true
    },
    "extends": "airbnb-base",
    "plugins": ["import", "html"],
    "rules": {
      // 0 "off", 1 "warn" 2 "error"
      // "no-console": 1,
      "quotes": [2, "single"],
      "no-underscore-dangle": 1,
      "no-plusplus": [2, { "allowForLoopAfterthoughts": true }],
      "comma-dangle": [2, "never"],
      "func-names": [2, "never"],
      "arrow-parens": ["error", "as-needed"],
      "no-param-reassign": ["error", { "props": false }],
      "no-return-assign": ["warn", "always"],
      "no-var": 0,
      "no-plusplus": 0,
      "no-console": 0,
      "prefer-arrow-callback": "off",
      "quote-props": ["error", "as-needed", { "keywords": true, "unnecessary": false }]
    }
  };