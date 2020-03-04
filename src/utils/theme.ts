interface ThemeInterface {
  colors: {
    neutral: {
      [key: string]: string;
    };
    text: {
      [key: string]: string;
    };
    container: {
      [key: string]: string;
    };
  };
  borders: Array<string>;
  shadows: Array<string>;
  scaling: (val: number) => number;
}

///* Color Theme Swatches in Hex */
// @Wilderness-1-hex: #C2D2F2;
// @Wilderness-2-hex: #5176A6;
// @Wilderness-3-hex: #70731F;
// @Wilderness-4-hex: #A67D4B;
// @Wilderness-5-hex: #A64B29;

export const theme: ThemeInterface = {
  colors: {
    neutral: {
      white: '#e5dada',
      black: '#002642',
    },
    text: {
      secondary: '#e5dada',
      primary: '#002642',
      tertiary: '#421700',
    },
    container: {
      //primary: '#dff2d8',
      //secondary: '#b4e5b2',
      primary: '#5176A6',
      secondary: '#C2D2F2',
    },
  },
  borders: ['1px solid #002642'],
  shadows: ['0px 0px 0px 0px #ccc2'],
  scaling: val => val * 8,
};
