module.exports = {
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": { "jsx": true }
	},
    "extends": "airbnb",
    "rules": {
    	"indent": ["error", 4],
    	"no-console": [0],
    	"react/jsx-indent": ["error", 4],
        "react/jsx-filename-extension": [0],
        "prefer-destructuring": [0],
        "react/destructuring-assignment": [0]
    },
    "env": {
    	"browser": true,
    	"jest": true
    }
};