import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

const navWidth = {
  min: "72px",
  max: "240px",
};

const breakPoints = {
  desktop: 1200,
  tablet: 768,
  mobile: 600,
};

const device = {
  desktop: "",
  tablet: `screen and (max-width: ${breakPoints.desktop}px)`,
  mobile: `screen and (max-width: ${breakPoints.tablet}px)`,
};

export const lightTheme: DefaultTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
  device,
  navWidth,
};

export const darkTheme: DefaultTheme = {
  fontColor: "#fff",
  bgColor: "#000",
  device,
  navWidth,
};

export const GlobalStyles = createGlobalStyle`
    ${reset}

    html {
      font-size: 62.5%;
      line-height: 1.15;
      -webkit-text-size-adjust: 100%; 
    }
    body {
      font-size: 1.4rem;
      font-family: 'Open Sans', sans-serif;
      background-color:${(props) => props.theme.bgColor};
      color:${(props) => props.theme.fontColor};
      -ms-overflow-style: none;
    }

    ::-webkit-scrollbar {
      display: none;
    }
    
    input {
      all: unset;
    }
    a {
      text-decoration: none;
      color : ${(props) => props.theme.fontColor};
    }
`;
