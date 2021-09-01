module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: theme => ({
      ...theme('colors'),
      'btnBegin1': '#D988FF',
      'btnEnd1': '#8B5CFF',
      'bg': 'F2F4F7',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      '#8B5CFF': '#8B5CFF',
    }),
    extend: {
      backgroundImage: theme => ({
        // 'top-back': "url('@img/mine/back.jpg')",
        'update-back': "url('@img/mine/updateBack.png')",
        // 'bindNum-left': "url('@img/base/mineBindNum.png')",
        // 'bindNum-right': "url('@img/base/mineBindEmail.png')",
        'vip-bg': "url('@img/mine/myVip/vipbg.png')",
        'mineBindNum-left': "url('@img/mine/mine/mineBindNum2.png')",
        'mineBindEmail-right': "url('@img/mine/mine/mineBindEmail2.png')",
        'mineUnBindNum-left': "url(@img/mine/mine/mineUnBindNum2.png)",
        'mineUnBindEmail-right': "url(@img/mine/mine/mineUnBindEmail2.png)",
        'mineRight-right': "url('@img/mine/mine/mineRight.png')",
        // 'mineService-service': "url('../hilive/src/assets/img/mine/mine/mineKefu.png')",
        'jinbi-bg': "url('@img/mine/mineGold/bg.png')",
        'jinbi-btn': "url('@img/mine/mineGold/RectangleCopy.png')",
        'vip-bg': "url('@img/mine/mineVip/vipbg.png')",
        'vip-top-bg': "url('@img/mine/mine/bg.png')"
      }),
      gradientColorStops: theme => ({
        ...theme('colors'),
        'begin1': '#D988FF',
        'secondary': '#8B5CFF',
        'end1': '#8B5CFF',
        'bg': 'F2F4F7',


      }),

      gradientColorStops: {
        primary: '#8B5CFF',
        secondary: '#D988FF',
      },
      backgroundColor: {
        common: {
          primary: '#8B5CFF',
          secondary: '#D988FF',
          dim: '#ECE5FF',
        },
        black: {
          '1': "#1B1C1D",
          '2': '#101112',
          '3': '#272829',
          '4': '#1f2021',
          '5': '#2B2C2D',
          '6': '#333333'
        },
        grey: {
          '1': '#f3f5f6',
          '2': '#D8D8D8',
          '3': '#999999',
          '4': '#D3D4D5',
          '5': '#F2F3F6',
          '6': '#D4D4D5',
          '7': '#F2F4F7'
        }
      },
      colors: {
        common: {
          primary: '#8B5CFF',
          secondary: '#D988FF',
          grey1: '#554C5F',
          grey2: '#696173',
          grey3: '#8E8895',
          grey4: '#ABAAAB',
          grey5: '#1A1A1A',
        },
        jinbi: {
          hui: '#F2F4F7',
          jiaoyi: 'rgba(0, 0, 0, 0.2)',
          pur: 'rgba(139, 92, 255, 1)',
          yel: "rgba(255, 203, 91, 1)",
          yel2: "rgba(85, 76, 95, 1)",
          C7C4CC: '#c7c4cc',
          EDF0F1: '#EDF0F1',
          666666: '#666666'
        },
        vip: {
          bg: 'F2F4F7',
          FFD38C: '#FFD38C',
          viptext1: '#554C5F',
          viptext2: '#FF9838',
          viptext3: '#F2F4F7'
        }
      },
      fontFamily: {
        common: ['PingFangSC-Semibold, PingFang SC'],
      },
      rotate: {
        '-135': '-135deg',
      },
      fontSize: {
        waterfall: '0.8125rem'
      },
      borderRadius: {
        0.94: "0.94rem",
        1.25: "1.25rem"
      },
      spacing: {


      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
