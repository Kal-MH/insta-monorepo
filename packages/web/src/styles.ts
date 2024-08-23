import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme: DefaultTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all: unset;
    }
    body {
        background-color: #FAFAFA;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color:rgb(38, 38, 38);
    }

    a {
      text-decoration: none;
    }
`;
