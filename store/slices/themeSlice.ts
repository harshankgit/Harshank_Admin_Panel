import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

interface ModuleColors {
  [key: string]: {
    background: string;
    text: string;
    accent: string;
    enabled: boolean;
  };
}

interface ThemeState {
  currentTheme: ColorTheme;
  moduleColors: ModuleColors;
  savedThemes: ColorTheme[];
  isCustomThemeActive: boolean;
}
type ModuleColorKey = "background" | "text" | "accent" | "enabled";

const defaultTheme: ColorTheme = {
  id: "default",
  name: "Default",
  colors: {
    primary: "#8B5CF6",
    secondary: "#EC4899",
    accent: "#06B6D4",
    background: "#FFFFFF",
    surface: "#F8FAFC",
    text: "#1F2937",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
  },
};

const initialState: ThemeState = {
  currentTheme: defaultTheme,
  moduleColors: {},
  savedThemes: [],
  isCustomThemeActive: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setCurrentTheme: (state, action: PayloadAction<ColorTheme>) => {
      state.currentTheme = action.payload;
      state.isCustomThemeActive = action.payload.id !== "default";
    },
    updateThemeColor: (
      state,
      action: PayloadAction<{ colorKey: string; value: string }>
    ) => {
      const { colorKey, value } = action.payload;
      state.currentTheme.colors[
        colorKey as keyof typeof state.currentTheme.colors
      ] = value;
      state.isCustomThemeActive = true;
    },
    setModuleColors: (state, action: PayloadAction<ModuleColors>) => {
      state.moduleColors = action.payload;
    },
    updateModuleColor: (
      state,
      action: PayloadAction<{
        moduleId: string;
        colorType: ModuleColorKey;
        value: string | boolean;
      }>
    ) => {
      const { moduleId, colorType, value } = action.payload;

      if (!state.moduleColors[moduleId]) {
        state.moduleColors[moduleId] = {
          background: "#FFFFFF",
          text: "#000000",
          accent: "#8B5CF6",
          enabled: false,
        };
      }

      // Safely assign
      (state.moduleColors[moduleId][colorType] as typeof value) = value;
    },

    toggleModuleCustomization: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      if (!state.moduleColors[moduleId]) {
        state.moduleColors[moduleId] = {
          background: state.currentTheme.colors.surface,
          text: state.currentTheme.colors.text,
          accent: state.currentTheme.colors.primary,
          enabled: false,
        };
      }
      state.moduleColors[moduleId].enabled =
        !state.moduleColors[moduleId].enabled;
    },
    saveTheme: (state, action: PayloadAction<ColorTheme>) => {
      const newTheme = {
        ...action.payload,
        id: `custom-${Date.now()}`,
      };
      state.savedThemes.push(newTheme);
    },
    deleteTheme: (state, action: PayloadAction<string>) => {
      state.savedThemes = state.savedThemes.filter(
        (theme) => theme.id !== action.payload
      );
    },
    resetToDefault: (state) => {
      state.currentTheme = defaultTheme;
      state.moduleColors = {};
      state.isCustomThemeActive = false;
    },
    applyTheme: (state) => {
      // This will trigger the CSS variable updates in the component
      state.isCustomThemeActive = true;
    },
  },
});

export const {
  setCurrentTheme,
  updateThemeColor,
  setModuleColors,
  updateModuleColor,
  toggleModuleCustomization,
  saveTheme,
  deleteTheme,
  resetToDefault,
  applyTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
