const themeDark = {
  primary: {
    //slate
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#121212",
  },
  secondary: {
    // orange
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
  tertiary: {
    // yellow
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
  },
};

export const themeSettings = () => {
  return {
    palette: {
      primary: {
        ...themeDark.primary,
        main: themeDark.primary[50],
        light: themeDark.primary[300],
      },
      secondary: {
        ...themeDark.secondary,
        main: themeDark.secondary[600],

        light: themeDark.secondary[400],
      },
      tertiary: {
        ...themeDark.tertiary,
        main: themeDark.tertiary[400],

        light: themeDark.tertiary[200],
      },
      background: {
        default: themeDark.primary[950],
        atl: themeDark.primary[600],
      },
    },
  };
};
