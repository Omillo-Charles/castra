import localFont from "next/font/local";

export const chirp = localFont({
  src: "../public/fonts/chirp/twitterchirp.ttf",
  variable: "--font-chirp",
  display: "swap",
});

export const glacial = localFont({
  src: [
    {
      path: "../public/fonts/glacial-indifference/GlacialIndifference-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/glacial-indifference/GlacialIndifference-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/glacial-indifference/GlacialIndifference-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-glacial",
  display: "swap",
});

export const mulish = localFont({
  src: [
    {
      path: "../public/fonts/mulish/Mulish-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-mulish",
  display: "swap",
});

// Alias exports for convenience
export const fontChirp = chirp;
export const fontGlacial = glacial;
export const fontMulish = mulish;
