import { useTheme } from "../../HOCs/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "5px",
        left: "5px",
        padding: "8px 8px",
        borderRadius: "12px",
        fontSize: "14px",
        zIndex: 1000,
      }}
    >
      {theme === "light" ? "темная" : "светлая"} тема
    </button>
  );
}
