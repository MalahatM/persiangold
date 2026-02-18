type Props = {
  title: string;
  description: string;
};

export function SuccessNotice({ title, description }: Props) {
  return (
    <div
      role="status"
      style={{
        borderRadius: 18,
        padding: "18px 20px",
        background: "linear-gradient(145deg, #121212, #1a1a1a)",
        border: "1px solid rgba(212, 175, 55, 0.45)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(201,162,39,0.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span
          aria-hidden="true"
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            marginTop: 6,
            background: "linear-gradient(135deg, #E6C76A, #C9A227)",
            boxShadow: "0 0 0 6px rgba(201,162,39,0.15)",
          }}
        />

        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: 0.4,
              color: "#E6C76A",
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 8,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.6,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
