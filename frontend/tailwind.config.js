const { values1to100pe, cColors } = require("./src/styles/syleConst");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			height: values1to100pe,
			width: values1to100pe,
			maxWidth: values1to100pe,
			maxHeight: values1to100pe,
			colors: {
				// Custom Colors
				// Gray Ranges from 1 to 38
				cGray: cColors.cGray,
				// Rest of colors ranges from 1 to 41
				cGreen: cColors.cGreen,
				cOrange: cColors.cOrange,
				cPurple: cColors.cPurple,
				cYellow: cColors.cYellow,
				cViolet: cColors.cViolet,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
