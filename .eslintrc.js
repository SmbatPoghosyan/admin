module.exports = {
	"env": {
		"browser": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react-hooks"
	],
	"rules": {
		"react-hooks/rules-of-hooks": 'error',
		"react-hooks/exhaustive-deps": 'warn',
		'no-unused-vars': ['error', { "args": "none" }],
		"react/prop-types": 0,
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};