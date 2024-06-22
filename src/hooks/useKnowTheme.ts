import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const useKnowTheme = () => {
  const { resolvedTheme } = useTheme();
  const [hasDarkColorScheme, setHasDarkColorScheme] = useState(false);

  useEffect(() => {
    setHasDarkColorScheme(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return hasDarkColorScheme;
};

export default useKnowTheme;
