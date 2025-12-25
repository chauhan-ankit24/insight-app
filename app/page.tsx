import { ThemeToggle } from "@/app/components/ThemeToggle";

export default function Home() {
  return (
    <div className="text-2xl">
      <ThemeToggle />
      <p>Hello World</p>
      <p className="font-mono">Hello World</p>
      <p className="font-mono">$ 200</p>
    </div>
  );
}
