/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/js/swipetoplay/*.jsx',
    './resources/js/swipetoplay/**/*.jsx',
  ],
  theme: {
    extend: {
      spacing: {
        '3xs': 2,
        '2xs': 4,
        'xs': 8,
        's': 12,
        'm': 16,
        'l': 24,
        'xl': 32,
        '2xl': 40,
        '3xl': 48,
        '4xl': 64,
        '5xl': 80,
        '6xl': 96,
        '7xl': 160,
      },

      borderWidth:{
       's': 1,
       'm': 2,
       'l': 3
      },

      borderRadius:{
        's': 8,
        'm': 12,
        'l': 16,
        'xl': 20,
        custom: '12px',
      },

      colors: {
        primary: '#212121',
        highlight: '#ff0000',
        customGray: '#5f5f5f',
        customRedLight: '#ff4444',
        'Acquamarine':{
          10: '#EFF7F6',
          20: '#DDEEEC',
          30: '#CDE6E3',
          40: '#BBDDD9',
          50: '#AAD4CF',
          60: '#9ACCC6',
          70: '#89C4BD',
          80: '#78BBB3',
          90: '#67B3AA',
          100: '#ECF7F6',
          200: '#CEE8E5',
          300: '#B0D8D4',
          400: '#92C9C2',
          500: '#74B9B1',
          600: '#56AAA0',
          700: '#448880',
          800: '#336660',
          900: '#214440',
        },

        'Yellow':{
          10: 'rgba(247, 206, 74, 0.1)',
          20: 'rgba(247, 206, 74, 0.2)',
          30: 'rgba(247, 206, 74, 0.3)',
          40: 'rgba(247, 206, 74, 0.4)',
          50: 'rgba(247, 206, 74, 0.5)',
          60: 'rgba(247, 206, 74, 0.6)',
          70: 'rgba(247, 206, 74, 0.7)',
          80: 'rgba(247, 206, 74, 0.8)',
          90: 'rgba(247, 206, 74, 0.9)',
          100: '#FEFAEA',
          200: '#FDF1CA',
          300: '#FBE8AA',
          400: '#FAE08A',
          500: '#F8D76A',
          600: '#F7CE4A',
          700: '#C6A53A',
          800: '#947C2B',
          900: '#63531B',
        },

        'Avocado':{
          10: 'rgba(51, 117, 79, 0.1)',
          20: 'rgba(51, 117, 79, 0.2)',
          30: 'rgba(51, 117, 79, 0.3)',
          40: 'rgba(51, 117, 79, 0.4)',
          50: 'rgba(51, 117, 79, 0.5)',
          60: 'rgba(51, 117, 79, 0.6)',
          70: 'rgba(51, 117, 79, 0.7)',
          80: 'rgba(51, 117, 79, 0.8)',
          90: 'rgba(51, 117, 79, 0.9)',
          100: '#E8F1ED',
          200: '#C4D8CD',
          300: '#A0BFAE',
          400: '#7BA78E',
          500: '#578E6F',
          600: '#33754F',
          700: '#285E3F',
          800: '#1C462F',
          900: '#112F1F',
        },

        'Blueberry':{
          10: 'rgba(33, 54, 107, 0.1)',
          20: 'rgba(33, 54, 107, 0.2)',
          30: 'rgba(33, 54, 107, 0.3)',
          40: 'rgba(33, 54, 107, 0.4)',
          50: 'rgba(33, 54, 107, 0.5)',
          60: 'rgba(33, 54, 107, 0.6)',
          70: 'rgba(33, 54, 107, 0.7)',
          80: 'rgba(33, 54, 107, 0.8)',
          90: 'rgba(33, 54, 107, 0.9)',
          100: '#EDEDFB',
          200: '#CDCDF4',
          300: '#AEADED',
          400: '#8E8DE5',
          500: '#6F6DDE',
          600: '#4F4DD7',
          700: '#3F3EAC',
          800: '#302E81',
          900: '#201F56',
        },

        'Brown':{
          10: 'rgba(175, 96, 75, 0.1)',
          20: 'rgba(175, 96, 75, 0.2)',
          30: 'rgba(175, 96, 75, 0.3)',
          40: 'rgba(175, 96, 75, 0.4)',
          50: 'rgba(175, 96, 75, 0.5)',
          60: 'rgba(175, 96, 75, 0.6)',
          70: 'rgba(175, 96, 75, 0.7)',
          80: 'rgba(175, 96, 75, 0.8)',
          90: 'rgba(175, 96, 75, 0.9)',
          100: '#F6EFEC',
          200: '#E8D2CC',
          300: '#DAB6AC',
          400: '#CB998B',
          500: '#BD7D6B',
          600: '#AF604B',
          700: '#8C4D3C',
          800: '#69392D',
          900: '#46261E',
        },

        'Cacao':{
          10: 'rgba(101, 32, 31, 0.1)',
          20: 'rgba(101, 32, 31, 0.2)',
          30: 'rgba(101, 32, 31, 0.3)',
          40: 'rgba(101, 32, 31, 0.4)',
          50: 'rgba(101, 32, 31, 0.5)',
          60: 'rgba(101, 32, 31, 0.6)',
          70: 'rgba(101, 32, 31, 0.7)',
          80: 'rgba(101, 32, 31, 0.8)',
          90: 'rgba(101, 32, 31, 0.9)',
          100: '#EFE8E8',
          200: '#D3C0C0',
          300: '#B89898',
          400: '#9C706F',
          500: '#814847',
          600: '#65201F',
          700: '#511919',
          800: '#3C1312',
          900: '#280C0C',
        },

        'Green':{
          10: 'rgba(105, 222, 79, 0.1)',
          20: 'rgba(105, 222, 79, 0.2)',
          30: 'rgba(105, 222, 79, 0.3)',
          40: 'rgba(105, 222, 79, 0.4)',
          50: 'rgba(105, 222, 79, 0.5)',
          60: 'rgba(105, 222, 79, 0.6)',
          70: 'rgba(105, 222, 79, 0.7)',
          80: 'rgba(105, 222, 79, 0.8)',
          90: 'rgba(105, 222, 79, 0.9)',
          100: '#ECFBEB',
          200: '#D2F5CC',
          300: '#B8EFAD',
          400: '#9DEA8D',
          500: '#83E46E',
          600: '#69DE4F',
          700: '#53B23F',
          800: '#3D852E',
          900: '#27591E',
        },

        'Lime':{
          10: 'rgba(189, 236, 74, 0.1)',
          20: 'rgba(189, 236, 74, 0.2)',
          30: 'rgba(189, 236, 74, 0.3)',
          40: 'rgba(189, 236, 74, 0.4)',
          50: 'rgba(189, 236, 74, 0.5)',
          60: 'rgba(189, 236, 74, 0.6)',
          70: 'rgba(189, 236, 74, 0.7)',
          80: 'rgba(189, 236, 74, 0.8)',
          90: 'rgba(189, 236, 74, 0.9)',
          100: '#F8FDE8',
          200: '#ECFAC8',
          300: '#E0F6A9',
          400: '#D5F389',
          500: '#C9EF6A',
          600: '#BDEC4A',
          700: '#92B737',
          800: '#688225',
          900: '#3D4D12',
        },

        'Magenta':{
          10: 'rgba(185, 43, 99, 0.1)',
          20: 'rgba(185, 43, 99, 0.2)',
          30: 'rgba(185, 43, 99, 0.3)',
          40: 'rgba(185, 43, 99, 0.4)',
          50: 'rgba(185, 43, 99, 0.5)',
          60: 'rgba(185, 43, 99, 0.6)',
          70: 'rgba(185, 43, 99, 0.7)',
          80: 'rgba(185, 43, 99, 0.8)',
          90: 'rgba(185, 43, 99, 0.9)',
          100: '#F7E8EF',
          200: '#EBC2D3',
          300: '#DE9CB7',
          400: '#D2779B',
          500: '#C5517F',
          600: '#B92B63',
          700: '#94214F',
          800: '#6F183C',
          900: '#4A0E28',
        },

        'Pink':{
          10: 'rgba(234, 51, 143, 0.1)',
          20: 'rgba(234, 51, 143, 0.2)',
          30: 'rgba(234, 51, 143, 0.3)',
          40: 'rgba(234, 51, 143, 0.4)',
          50: 'rgba(234, 51, 143, 0.5)',
          60: 'rgba(234, 51, 143, 0.6)',
          70: 'rgba(234, 51, 143, 0.7)',
          80: 'rgba(234, 51, 143, 0.8)',
          90: 'rgba(234, 51, 143, 0.9)',
          100: '#FBE7F3',
          200: '#F8C3DF',
          300: '#F49FCB',
          400: '#F17BB7',
          500: '#ED57A3',
          600: '#EA338F',
          700: '#BB2772',
          800: '#8C1A56',
          900: '#5D0E39',
        },

        'Purple':{
          10: 'rgba(144, 44, 245, 0.1)',
          20: 'rgba(144, 44, 245, 0.2)',
          30: 'rgba(144, 44, 245, 0.3)',
          40: 'rgba(144, 44, 245, 0.4)',
          50: 'rgba(144, 44, 245, 0.5)',
          60: 'rgba(144, 44, 245, 0.6)',
          70: 'rgba(144, 44, 245, 0.7)',
          80: 'rgba(144, 44, 245, 0.8)',
          90: 'rgba(144, 44, 245, 0.9)',
          100: '#F3E9FD',
          200: '#DFC3FB',
          300: '#CB9DFA',
          400: '#B878F8',
          500: '#A452F7',
          600: '#902CF5',
          700: '#7323C4',
          800: '#561A93',
          900: '#391162',
        },

        'Red':{
          10: 'rgba(234, 67, 56, 0.1)',
          20: 'rgba(234, 67, 56, 0.2)',
          30: 'rgba(234, 67, 56, 0.3)',
          40: 'rgba(234, 67, 56, 0.4)',
          50: 'rgba(234, 67, 56, 0.5)',
          60: 'rgba(234, 67, 56, 0.6)',
          70: 'rgba(234, 67, 56, 0.7)',
          80: 'rgba(234, 67, 56, 0.8)',
          90: 'rgba(234, 67, 56, 0.9)',
          100: '#FBEBEA',
          200: '#F8C9C6',
          300: '#F4A8A3',
          400: '#F1867F',
          500: '#ED655C',
          600: '#EA4338',
          700: '#BB352D',
          800: '#8C2721',
          900: '#5D1916',
        },

        'Teal':{
          10: '#EEF8F2',
          20: '#DBEFE4',
          30: '#CAE8D7',
          40: '#B7E0C8',
          50: '#A5D7BA',
          60: '#93D0AD',
          70: '#82C8A0',
          80: '#70C092',
          90: '#5EB985',
          100: '#F5FFFB',
          200: '#D3EFE0',
          300: '#B1DFC6',
          400: '#90D0AB',
          500: '#6EC091',
          600: '#4CB076',
          700: '#3E9363',
          800: '#2F774F',
          900: '#215A3C',
        },

        'Turquoise':{
          10: 'rgba(53, 192, 203, 0.1)',
          20: 'rgba(53, 192, 203, 0.2)',
          30: 'rgba(53, 192, 203, 0.3)',
          40: 'rgba(53, 192, 203, 0.4)',
          50: 'rgba(53, 192, 203, 0.5)',
          60: 'rgba(53, 192, 203, 0.6)',
          70: 'rgba(53, 192, 203, 0.7)',
          80: 'rgba(53, 192, 203, 0.8)',
          90: 'rgba(53, 192, 203, 0.9)',
          100: '#EBF9FA',
          200: '#C7EEF1',
          300: '#A2E2E7',
          400: '#7ED7DE',
          500: '#59CBD4',
          600: '#35C0CB',
          700: '#2A9AA2',
          800: '#20737A',
          900: '#154D51',
        },

        'Violet':{
          10: 'rgba(127, 93, 246, 0.1)',
          20: 'rgba(127, 93, 246, 0.2)',
          30: 'rgba(127, 93, 246, 0.3)',
          40: 'rgba(127, 93, 246, 0.4)',
          50: 'rgba(127, 93, 246, 0.5)',
          60: 'rgba(127, 93, 246, 0.6)',
          70: 'rgba(127, 93, 246, 0.7)',
          80: 'rgba(127, 93, 246, 0.8)',
          90: 'rgba(127, 93, 246, 0.9)',
          100: '#F2EFFE',
          200: '#DBD2FC',
          300: '#C4B5FB',
          400: '#AD97F9',
          500: '#967AF8',
          600: '#7F5DF6',
          700: '#654AC5',
          800: '#4C3893',
          900: '#322562',
        },

        'Disabled':{
          10: 'rgba(112, 112, 112, 0.1)',
          20: 'rgba(112, 112, 112, 0.2)',
          30: 'rgba(112, 112, 112, 0.3)',
          40: 'rgba(112, 112, 112, 0.4)',
          50: 'rgba(112, 112, 112, 0.5)',
          60: 'rgba(112, 112, 112, 0.6)',
          70: 'rgba(112, 112, 112, 0.7)',
          80: 'rgba(112, 112, 112, 0.8)',
          90: 'rgba(112, 112, 112, 0.9)',
          100: '#F7F7F7',
          200: '#DCDCDC',
          300: '#C1C1C1',
          400: '#A6A6A6',
          500: '#8B8B8B',
          600: '#707070',
          700: '#555555',
          800: '#3A3A3A',
          900: '#1F1F1F',
        },

        'Error':{
          10: 'rgba(198, 47, 56, 0.1)',
          20: 'rgba(198, 47, 56, 0.2)',
          30: 'rgba(198, 47, 56, 0.3)',
          40: 'rgba(198, 47, 56, 0.4)',
          50: 'rgba(198, 47, 56, 0.5)',
          60: 'rgba(198, 47, 56, 0.6)',
          70: 'rgba(198, 47, 56, 0.7)',
          80: 'rgba(198, 47, 56, 0.8)',
          90: 'rgba(198, 47, 56, 0.9)',
          100: '#F8E8EA',
          200: '#EEC3C6',
          300: '#E49EA3',
          400: '#DA797F',
          500: '#D0545C',
          600: '#C62F38',
          700: '#9E252C',
          800: '#761A21',
          900: '#4E1015',
        },

        'Information':{
          10: 'rgba(57, 129, 247, 0.1)',
          20: 'rgba(57, 129, 247, 0.2)',
          30: 'rgba(57, 129, 247, 0.3)',
          40: 'rgba(57, 129, 247, 0.4)',
          50: 'rgba(57, 129, 247, 0.5)',
          60: 'rgba(57, 129, 247, 0.6)',
          70: 'rgba(57, 129, 247, 0.7)',
          80: 'rgba(57, 129, 247, 0.8)',
          90: 'rgba(57, 129, 247, 0.9)',
          100: '#E8F3FE',
          200: '#C5DCFD',
          300: '#A2C5FB',
          400: '#7FAFFA',
          500: '#5C98F8',
          600: '#3981F7',
          700: '#2C67C5',
          800: '#1F4D94',
          900: '#123362',
        },

        'Success':{
          10: 'rgba(76, 176, 118, 0.1)',
          20: 'rgba(76, 176, 118, 0.2)',
          30: 'rgba(76, 176, 118, 0.3)',
          40: 'rgba(76, 176, 118, 0.4)',
          50: 'rgba(76, 176, 118, 0.5)',
          60: 'rgba(76, 176, 118, 0.6)',
          70: 'rgba(76, 176, 118, 0.7)',
          80: 'rgba(76, 176, 118, 0.8)',
          90: 'rgba(76, 176, 118, 0.9)',
          100: '#F5FFFB',
          200: '#D3EFE0',
          300: '#B1DFC6',
          400: '#90D0AB',
          500: '#6EC091',
          600: '#4CB076',
          700: '#3E9363',
          800: '#2F774F',
          900: '#215A3C',
        },

        'Warning':{
          10: 'rgba(237, 170, 59, 0.1)',
          20: 'rgba(237, 170, 59, 0.2)',
          30: 'rgba(237, 170, 59, 0.3)',
          40: 'rgba(237, 170, 59, 0.4)',
          50: 'rgba(237, 170, 59, 0.5)',
          60: 'rgba(237, 170, 59, 0.6)',
          70: 'rgba(237, 170, 59, 0.7)',
          80: 'rgba(237, 170, 59, 0.8)',
          90: 'rgba(237, 170, 59, 0.9)',
          100: '#FDF6E8',
          200: '#FAE7C5',
          300: '#F7D8A3',
          400: '#F3C880',
          500: '#F0B95E',
          600: '#EDAA3B',
          700: '#BE882E',
          800: '#8E6520',
          900: '#5F4313',
        },

        'Blue':{
          10: 'rgba(33, 54, 107, 0.1)',
          20: 'rgba(33, 54, 107, 0.2)',
          30: 'rgba(33, 54, 107, 0.3)',
          40: 'rgba(33, 54, 107, 0.4)',
          50: 'rgba(33, 54, 107, 0.5)',
          60: 'rgba(33, 54, 107, 0.6)',
          70: 'rgba(33, 54, 107, 0.7)',
          80: 'rgba(33, 54, 107, 0.8)',
          90: 'rgba(33, 54, 107, 0.9)',
          100: '#E9EBF0',
          200: '#D3D7E1',
          300: '#A6AFC4',
          400: '#7A86A6',
          500: '#4D5E89',
          600: '#21366B',
          700: '#1A2B56',
          800: '#142040',
          900: '#0D162B',
        },
      },
      fontFamily: {
        'Swipe': ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        'sofia-pro': ['Sofia Pro', 'sans-serif'],
      },
      boxShadow: {
        'custom-red': '5px 5px 25px 5px rgba(255, 0, 0, 0.6)',
        'custom-blue': '5px 5px 25px 5px rgba(0, 0, 255, 0.6)',
        'custom-circle': '0 0px 25px rgba(112, 163, 255, 0.78)',
        custom: '6px 6px 14px 1px rgba(0, 0, 0, 0.16)',
      },
      fontWeight: {
        'audienseBold': 'bold',
        'audienseSemiBold': '600',
      },
      
      flex: {
        '1/6': '0 0 16.67%',
      },
      maxWidth: {
        '1/6': '16.67%',
      },
      padding: {
        '3.5': '15px',
      },
      margin: {
        '3.5': '15px',
      },
      fontSize:{
        'size-xs': '10px',
        'size-s': '12px',
        'size-m': '14px',
        'size-l': '16px',
        'size-ml': '18px',
        'size-xl': '20px',
        'size-2xl': '24px',
        'size-3xl': '32px',
        'size-4xl': '46px',
        'heading-super': '75px',
        'heading': '38px',
        'custom-sm': '16px',
      },

      lineHeight: {
        'xs': '14px',
        's': '16px',
        'm': '18px',
        'l': '20px',
        'xl': '24px',
        '2xl': '28px',
        '3xl': '36px',
        '4xl': '50px',
        'heading-super': '76px',
        'custom': '24px',
      },

    },
  },
  plugins: [],
};
