module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: { jsx: true }
  },
  extends: "airbnb",
  rules: {
    "guard-for-in": [0],
    indent: ["error", 4],
    "jsx-a11y/control-has-associated-label": [0],
    "jsx-a11y/label-has-associated-control": [0],
    "jsx-a11y/no-noninteractive-tabindex": [0],
    "jsx-a11y/tabindex-no-positive": [0],
    "linebreak-style": [0, "error", "windows"],
    "no-console": [0],
    "no-restricted-syntax": [0],
    "prefer-destructuring": [0],
    "react/destructuring-assignment": [0],
    "react/forbid-prop-types": [0],
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],
    "react/jsx-filename-extension": [0]
  },
  env: {
    browser: true,
    jest: true
  }
};
