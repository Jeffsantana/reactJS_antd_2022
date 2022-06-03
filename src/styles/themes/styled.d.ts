import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;
      background: string;
      sidebar: string;
      menu: string;
      text: string;
      danger: string;
      success: string;
      warning: string;
      info: string;
    };
  }
}
