import klarnaLogo from "../../assets/klarna.png";
import visaLogo from "../../assets/visaCart.svg";

export type PaymentType = "card" | "klarna";

type Props = {
  value: PaymentType;
  onChange: (v: PaymentType) => void;
  disabled?: boolean;
};

export function PaymentMethod({ value, onChange, disabled }: Props) {
  return (
    <section style={{ marginTop: 16 }}>
      {/* CARD */}
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #2a2a2a",
          background: value === "card" ? "rgba(255,255,255,0.06)" : "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="radio"
            name="pay"
            checked={value === "card"}
            disabled={disabled}
            onChange={() => onChange("card")}
          />
          <span style={{ fontWeight: 600 }}>Cards</span>
        </span>

        <img
          src={visaLogo}
          alt="Visa"
          style={{ height: 18, opacity: 0.95 }}
        />
      </label>

      {/* KLARNA */}
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #2a2a2a",
          marginTop: 10,
          background: value === "klarna" ? "rgba(255,255,255,0.06)" : "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="radio"
            name="pay"
            checked={value === "klarna"}
            disabled={disabled}
            onChange={() => onChange("klarna")}
          />
          <span style={{ fontWeight: 600 }}>Klarna</span>
        </span>

        <img
          src={klarnaLogo}
          alt="Klarna"
          style={{ height: 18, opacity: 0.95 }}
        />
      </label>

     
    </section>
  );
}
