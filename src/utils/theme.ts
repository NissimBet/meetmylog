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

/**
 * 67c3eb -- skyblue
 * 73dbdf -- lightblue
 * f0f4b9 -- yellow
 * 222222 -- black
 * 1c3144 -- darkblue
 */

const colors = {
  white: '#eaeaea',
  skyblue: '#67c3eb',
  lightblue: '#73dbdf',
  yellow: '#f0f4b9',
  black: '#222222',
  darkblue: '#1c3144',
  grey: '#d0dae4',
};

export const theme: ThemeInterface = {
  colors: {
    neutral: {
      white: colors.white,
      black: colors.black,
      grey: colors.grey,
    },
    text: {
      primary: colors.black,
      secondary: colors.darkblue,
      tertiary: colors.lightblue,
    },
    container: {
      primary: colors.skyblue,
      secondary: colors.darkblue,
    },
  },
  borders: [`1px solid ${colors.darkblue}`, `1px solid ${colors.lightblue}`],
  shadows: [
    `0px 0px 0px 0px ${colors.skyblue}`,
    `0px 0px 0px 0px ${colors.grey}`,
  ],
  scaling: val => val * 8,
};
