import Typography from "typography";

const typography = new Typography({
    baseFontSize: "18px",
    baseLineHeight: 1.666,
    headerFontFamily: ["Lovelyn", "Georgia", "serif"],
    bodyFontFamily: ["Lovelyn", "Georgia", "serif"],
    overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
        a: {
            fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
        },
    })
});


export default typography
