module.exports = {
  extends: ["next", "next/core-web-vitals", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-img-element": "off",
    // "indent": [
    //   "warn",
    //   2,
    //   {
    //     "ignoredNodes": ["ConditionalExpression"],
    //     "SwitchCase": 1,
    //     "VariableDeclarator": 1,
    //     "ArrayExpression": 1,
    //     "ObjectExpression": 1
    //   }
    // ],
    // "semi": ["warn", "always"],
    // "quotes": [
    //   "warn",
    //   "double",
    //   {
    //     "avoidEscape": true,
    //     "allowTemplateLiterals": true
    //   }
    // ],
    "no-var": "warn",
    "no-new-object": "warn",
    "camelcase": [
      "warn",
      {
        "properties": "never",
        "ignoreDestructuring": true
      }
    ],
    "array-bracket-newline": ["warn", "consistent"],
    "array-element-newline": ["warn", "consistent"],
    "object-property-newline": "warn",
    "lines-between-class-members": ["warn", "always"],
    "no-new-func": "warn",
    "prefer-arrow-callback": "warn",
    "arrow-parens": ["warn", "always"],
    "no-async-promise-executor": "warn",
    "prefer-destructuring": [
      "warn",
      {
        "array": false,
        "object": true
      },
      {
        "enforceForRenamedProperties": false
      }
    ],
    "brace-style": ["warn", "1tbs"],
    "curly": "warn",
    "computed-property-spacing": ["warn", "never"],
    "array-bracket-spacing": ["warn", "never"],
    "object-curly-spacing": [
      "warn",
      "always",
      {
        "arraysInObjects": true,
        "objectsInObjects": true
      }
    ],
    "block-spacing": ["warn", "always"],
    "keyword-spacing": [
      "warn",
      {
        "before": true,
        "after": true
      }
    ],
    "arrow-spacing": [
      "warn",
      {
        "before": true,
        "after": true
      }
    ],
    "comma-spacing": [
      "warn",
      {
        "before": false,
        "after": true
      }
    ],
    "key-spacing": [
      "warn",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "semi-spacing": [
      "warn",
      {
        "before": false,
        "after": true
      }
    ],
    "space-in-parens": ["warn", "never"],
    "space-infix-ops": "warn",
    "no-fallthrough": "warn",
    "eqeqeq": ["warn", "always"],
    "padding-line-between-statements": [
      "warn",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      },
      {
        "blankLine": "always",
        "prev": ["case", "default"],
        "next": "*"
      }
    ]
  },
  env: {
    "jest": true,
    "browser": true
  }
};
