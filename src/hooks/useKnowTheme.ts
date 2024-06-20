import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const useKnowTheme = () => {
  const { theme, resolvedTheme } = useTheme();
  const [hasDarkColorScheme, setHasDarkColorScheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const styleAttribute = htmlElement.getAttribute("style");
      const isDark = styleAttribute?.includes("color-scheme: dark;");
      setHasDarkColorScheme(!!isDark);
    };

    checkTheme(); // Check theme on mount
    // Check theme whenever `theme` or `resolvedTheme` changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [theme, resolvedTheme]);

  return hasDarkColorScheme;
};

export default useKnowTheme;
