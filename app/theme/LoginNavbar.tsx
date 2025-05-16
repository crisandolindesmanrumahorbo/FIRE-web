import LangToggle from "../components/LangToggle";
import ThemeToggle from "./ThemeToggle";

export default function LoginNavbar() {
  return (
    <header className="dark:bg-[var(--foreground)] bg-[var(--background)] shadow-box-shadow-first sticky top-0 z-10 h-11 w-full">
      <div className="mx-auto flex h-full justify-end items-center p-4 gap-2">
        <ThemeToggle />
        <LangToggle />
      </div>
    </header>
  );
}
