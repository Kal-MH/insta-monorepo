import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme: DefaultTheme = {
  fontColor: "#fff",
  bgColor: "#000",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all: unset;
    }
    body {
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.fontColor};
    }

    a {
      text-decoration: none;
      color : ${(props) => props.theme.fontColor};
    }
`;
