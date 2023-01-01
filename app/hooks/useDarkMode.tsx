import { useEffect } from "react";
import { useSafeLocalStorage } from "./useSafeLocalStorage";
import { usePrefersDarkMode } from "./usePrefersDarkMode";

export function useDarkMode() {
  const prefersDarkMode = usePrefersDarkMode();
  const [isEnabled, setIsEnabled] = useSafeLocalStorage("dark-mode", undefined);

  const enabled = isEnabled === undefined ? prefersDarkMode : isEnabled;

  useEffect(() => {
    if (document === undefined) return;
    const root = document.documentElement;
    root.classList.remove(enabled ? "light" : "dark");
    root.classList.add(enabled ? "dark" : "light");
  }, [enabled]);

  return [enabled, setIsEnabled];
}
