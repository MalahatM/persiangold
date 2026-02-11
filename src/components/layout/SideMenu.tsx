import { useUiStore } from "../../store/uiStore";

type Props = {
  links?: { label: string; href: string }[];
};

export default function SideMenu({ links = [] }: Props) {
  const isOpen = useUiStore((s) => s.isSideMenuOpen);
  const closeMenu = useUiStore((s) => s.closeSideMenu);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)" }}
      onClick={closeMenu}
    >
      <div
        style={{
          width: 280,
          height: "100%",
          background: "#111",
          color: "#fff",
          padding: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={closeMenu} aria-label="Close menu">
          ×
        </button>

        <nav style={{ marginTop: 16, display: "grid", gap: 12 }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{ color: "#fff" }}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}