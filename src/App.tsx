import { Particles } from "./site/Particles";
import { TopBar } from "./site/TopBar";
import { Rail } from "./site/Rail";
import { Hero } from "./site/Hero";
import { Work } from "./site/Work";
import { About, Now, FieldWork, Contact } from "./site/Chapters";
import { Library, Watch, Listening } from "./site/Culture";
import { chapters } from "./site/nav";
import { useActiveSection, useReducedMotion, useRevealAll, useTheme } from "./site/hooks";

const ids = chapters.map((c) => c.id);

export default function App() {
  const { theme, toggle } = useTheme();
  const reduced = useReducedMotion();
  const active = useActiveSection(ids);
  useRevealAll();

  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">Skip to work</a>
      <Particles theme={theme} reduced={reduced} />
      <div className="grain" aria-hidden />
      <TopBar theme={theme} toggle={toggle} active={active} />
      <Rail active={active} />
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <Work />
        <Now />
        <FieldWork />
        <Library />
        <Watch />
        <Listening />
        <Contact />
      </main>
    </>
  );
}
