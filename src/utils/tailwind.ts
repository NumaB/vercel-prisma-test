import config from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig.js";

// Le type demande {theme: extends: colors:{...}}, mais le vrai type est {theme: colors:{...}}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fullConfig = resolveConfig(config) as any;

export const getColor = (colorName: string): string | undefined => {
  return (
    fullConfig?.theme?.colors &&
    ((fullConfig?.theme?.colors as Record<string, string>)[colorName] as
      | string
      | undefined)
  );
};

export default { getColor };
