interface ThemeInterface {
  colors: {
    text: {
      [key: string]: string;
    };
    container: {
      [key: string]: string;
    };
  };
  borders: Array<string>;
  scaling: (val: number) => number;
}

export const theme: ThemeInterface = {
  colors: {
    text: {
      secondary: '#333',
      primary: '#555',
    },
    container: {
      primary: '#dff2d8',
      secondary: '#b4e5b2',
    },
  },
  borders: ['1px solid #a1df9f'],
  scaling: val => val * 8,
};
