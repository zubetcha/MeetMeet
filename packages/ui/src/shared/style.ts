export const colors: any = {
  
};

export const fonts: any = {
  header1: "40px",
  header2: "32px",
  header3: "24px",
  header4: "20px",
  header5: "18px",

  body1: "16px",
  body2: "14px",
  body3: "12px",

  caption1: "11px",
  caption2: "9px",
};

export const texts: any = {
  size: {
    header1: "40px",
    header2: "32px",
    header3: "24px",
    header4: "20px",
    header5: "18px",

    body1: "16px",
    body2: "14px",
    body3: "12px",

    caption1: "12px",
    caption2: "10px",
  },

  lineHeight: {
    header1: "42px",
    header2: "34px",
    header3: "26px",
    header4: "22px",
    header5: "20px",

    body1: "24px",
    body2: "21px",
    body3: "18px",

    caption1: "12px",
    caption2: "10px", 
  }
}

export const buttons: any = {
  // TODO: 버튼 사이즈로 분류
  fontSize: {
    large: fonts.body1,
    medium: fonts.body2,
    small: fonts.caption1,
  },
  lineHeight: {
    large: texts.lineHeight.body1,
    medium: texts.lineHeight.body2,
    small: texts.lineHeight.caption1,   
  },
  height: {
    large: "40px",
    medium: "32px",
    small: "24px",  
  },
  // TODO: 버튼 style로 분류
  text: {
    // TODO: 버튼 state로 분류
    default: {
      // TODO: 버튼 color로 분류
      color: colors.darkMedium,
      backgroundColor: "transparent",
      border: "none",
      textDecoration: "none",
      cursor: "pointer",
    },
    hover: {
      color: colors.darkHigh,
      backgroundColor: "transparent",
      border: "none",
      textDecoration: "none",
      cursor: "pointer",
    },
    focused: {
      color: colors.primary500,
      backgroundColor: "transparent",
      border: "none",
      textDecoration: "none",
      cursor: "default",
    },
    disable: {
      color: colors.gray300,
      backgroundColor: "transparent",
      border: "none",
      textDecoration: "none",
      cursor: "default",
    },
    padding: {
      large: "8px 2px",
      medium: "7.25px 1.75px",
      small: "5.33px 1.33px",
    },
  },
  textGray : {
    // TODO: 버튼 state로 분류
    default : {
        // TODO: 버튼 color로 분류
        color: colors.darkMedium,
        backgroundColor: 'transparent',
        border: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    hover : {
        color: colors.darkHigh,
        backgroundColor: 'transparent',
        border : 'none',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    focused : {
        color: colors.primary500,
        backgroundColor:'transparent',
        border : 'none',
        textDecoration: 'none',
        cursor: 'default',
    },
    disable : {
        color: colors.gray300,
        backgroundColor: 'transparent',
        border : 'none',
        textDecoration: 'none',
        cursor: 'default'
    },
    padding : {
        large : "8px 0px",
        medium : "7.25px 1.75px", 
        small : "5.33px 1.33px"
    },
},
  textPrimary : {
      // TODO: 버튼 state로 분류
      default : {
          // TODO: 버튼 color로 분류
          color: colors.primary500,
          backgroundColor: 'transparent',
          border: 'none',
          textDecoration: 'none',
          cursor: 'pointer',
      },
      hover : {
          color: colors.primary400,
          backgroundColor: 'transparent',
          border : 'none',
          textDecoration: 'none',
          cursor: 'pointer',
      },
      focused : {
          color: colors.primary700,
          backgroundColor:'transparent',
          border : 'none',
          textDecoration: 'none',
          cursor: 'default',
      },
      disable : {
          color: colors.darkLow,
          backgroundColor: 'transparent',
          border : 'none',
          textDecoration: 'none',
          cursor: 'default'
      },
      padding : {
          large : "8px 2px",
          medium : "7.25px 1.75px",
          small : "5.33px 1.33px"
      },
  },
  textWhite: {
    // TODO: 버튼 state로 분류
    default: {
      // TODO: 버튼 color로 분류
      color: colors.brightMedium,
      backgroundColor: "transparent",
      border: "none",
      textDecoration: "none",
      cursor: "pointer",
    },
    hover: {
      color: colors.brightHigh,
      backgroundColor: "transparent",
      border: "none",
      textDecoration: "none",
      cursor: "pointer",
    },
    focused: {
      color: colors.gray000,
      backgroundColor: "transparent",
      border: "none",
      textDecoration: "none",
      cursor: "default",
    },
    disable: {
      color: colors.brightLow,
      backgroundColor: "transparent",
      border: "none",
      textDecoration: "none",
      cursor: "default",
    },
    padding: {
      large: "8px 2px",
      medium: "7.25px 1.75px",
      small: "5.33px 1.33px",
    },
  },
  line: {
    default: {
      color: colors.primary500,
      backgroundColor: colors.gray000,
      border: `1px solid ${colors.primary300}`,
      textDecoration: "none",
      cursor: "pointer",
    },
    hover: {
      color: colors.primary500,
      backgroundColor: colors.primary050,
      border: `1px solid ${colors.primary300}`,
      textDecoration: "none",
      cursor: "pointer",
    },
    focused: {
      color: colors.primary500,
      backgroundColor: colors.primary100,
      border: `1px solid ${colors.primary300}`,
      textDecoration: "none",
      cursor: "default",
    },
    disable: {
      color: colors.gray300,
      backgroundColor: "white",
      border: `1px solid ${colors.gray300}`,
      textDecoration: "none",
      cursor: "default",
    },
    padding: {
      large: "8px 16px",
      medium: "5.5px 16px",
      small: "5.33px 9.33px",
    },
  },
  solid: {
    default: {
      color: colors.brightHigh,
      backgroundColor: colors.primary500,
      border: `1px solid ${colors.primary500}`,
      textDecoration: "none",
      cursor: "pointer",
    },
    hover: {
      color: colors.brightHigh,
      backgroundColor: colors.primary400,
      border: `1px solid ${colors.primary400}`,
      textDecoration: "none",
      cursor: "pointer",
    },
    focused: {
      color: colors.secondary200,
      backgroundColor: colors.primary600,
      border: `1px solid ${colors.primary600}`,
      textDecoration: "none",
      cursor: "default",
    },
    disable: {
      color: colors.brightHigh,
      backgroundColor: colors.gray300,
      border: `1px solid ${colors.gray300}`,
      textDecoration: "none",
      cursor: "default",
    },
    padding: {
      large: "0px 16px",
      medium: "4.5px 16px",
      small: "0px 9.33px",
    },
  },
  input: {
    default: {
      color: colors.darkMedium,
      backgroundColor: colors.darkLowest,
      border: "none",
      textDecoration: "none",
      cursor: "pointer",
    },
    hover: {
      color: colors.darkMedium,
      border: "none",
      textDecoration: "none",
      cursor: "pointer",
      boxShadow: "inset 0 50px rgba(0, 0, 0, 0.03) !important"
    },
    disable: {
      color: colors.darkLow,
      backgroundColor: "#fff",
      border: `1px solid ${colors.gray300}`,
      textDecoration: "none",
      cursor: "default",
    },
    danger: {
      color: colors.darkHigh,
      textDecoration: "none",
      cursor: "cursor",
      backgroundColor: colors.dangerLight_light,
      border: `1px solid ${colors.dangerMedium}`
    },
    padding: {
      large: "8px 16px",
      medium: "5.5px 16px",
      small: "5.33px 9.33px",
    },
  },
};

export const inputs: any = {
  size: {
    medium: {
      height: {
        label: "13.5px",
        input: "32px",
        helperText: "13.5px",
      },
      fontSize: {
        labelText: fonts.body3,
        mainText: fonts.body2,
        helperText: fonts.body3,
      },
      padding: "5.5px 8px",
      margin: "4px auto",
    },
    large: {
      height: {
        label: "13.5px",
        input: "40px",
        helperText: "13.5px",
      },
      fontSize: {
        labelText: fonts.body3,
        mainText: fonts.body1,
        helperText: fonts.body3,
      },
      padding: "8px 16px",
      margin: "4px auto",
    },
  },
  fontWeight: {
    bold: "700",
    regular: "400",
  },
  default: {
    default: {
      color: {
        white: colors.gray000,
        gray: colors.darkHigh,
        default: colors.darkMedium,
        nice: colors.primary500,
        danger: colors.dangerMedium,
      },
      outline: "none",
      backgroundColor: colors.gray100,
      cursor: "text",
    },
    focused: {
      color: {
        white: colors.gray000,
        gray: colors.darkHigh,
        default: colors.darkMedium,
        nice: colors.primary500,
        danger: colors.dangerMedium,
      },
      outline: `1px solid ${colors.darkMedium}`,
      backgroundColor: colors.gray100,
      cursor: "text",
    },
  },
  nice: {
    default: {
        color: {
            white: colors.gray000,
            gray: colors.darkHigh,
            default: colors.darkMedium,
            nice: colors.primary500,
            danger: colors.dangerMedium,
        },
        outline: "none",
        backgroundColor: colors.gray100,
        cursor: "text",
    },
    focused: {
      color: {
        white: colors.gray000,
        gray: colors.darkHigh,
        default: colors.darkMedium,
        nice: colors.primary500,
        danger: colors.dangerMedium,
      },
      outline: `1px solid ${colors.primary500}`,
      backgroundColor: colors.niceLight_light,
      cursor: "text",
    },
  },
  danger: {
    default: {
      color: {
        white: colors.gray000,
        gray: colors.darkHigh,
        default: colors.darkMedium,
        nice: colors.primary500,
        danger: colors.dangerMedium,
      },
      outline: "none",
      backgroundColor: colors.dangerLight_light,
      cursor: "text",
    },
    focused: {
      color: {
        white: colors.gray000,
        gray: colors.darkHigh,
        default: colors.darkMedium,
        nice: colors.primary500,
        danger: colors.dangerMedium,
      },
      outline: `1px solid ${colors.dangerMedium}`,
      backgroundColor: colors.dangerLight_light,
      cursor: "text",
    },
  },
  disable: {
    default: {
      color: {
        white: colors.darkLow,
        gray: colors.darkLow,
        default: colors.darkLow,
        nice: colors.darkLow,
        danger: colors.darkLow,
      },
      outline: `1px solid ${colors.darkLow}`,
      backgroundColor: "#fff",
      cursor: "default",
    },
    focused: {
      color: {
        white: colors.darkLow,
        gray: colors.darkLow,
        default: colors.darkLow,
        nice: colors.darkLow,
        danger: colors.darkLow,
      },
      outline: `1px solid ${colors.darkLow}`,
      backgroundColor: "#fff",
      cursor: "default",
    },
  },
  fixed: {
    default: {
      color: {
        white: colors.darkHigh,
        gray: colors.darkHigh,
        default: colors.darkMedium,
        nice: colors.darkHigh,
        danger: colors.darkHigh,
      },
      outline: "transparent",
      backgroundColor: "#fff",
      cursor: "default",
    },
    focused: {
      color: {
        white: colors.darkHigh,
        gray: colors.darkHigh,
        default: colors.darkMedium,
        nice: colors.darkHigh,
        danger: colors.darkHigh,
      },
      outline: "transparent",
      backgroundColor: "#fff",
      cursor: "default",
    },
  }
};
