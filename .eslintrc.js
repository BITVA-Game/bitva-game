module.exports = {
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": { "jsx": true }
	},
    "extends": "airbnb",
    "rules": {
    	"indent": ["error", 4],
    	"no-console": [0]
    },
    "env": {
    	"browser": true,
    	"jest": true
    }
};