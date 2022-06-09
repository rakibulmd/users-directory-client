module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#05b29b",
                    secondary: "#77ccda",
                    accent: "#37cdbe",
                    neutral: "#3d4451",
                    "base-100": "#ffffff",
                },
            },
            "dark",
            "cupcake",
        ],
    },
};
