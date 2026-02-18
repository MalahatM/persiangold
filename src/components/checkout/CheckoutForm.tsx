export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

type Props = {
  value: CheckoutFormData;
  onChange: (v: CheckoutFormData) => void;
  disabled?: boolean;
};

export function CheckoutForm({ value, onChange, disabled }: Props) {
  return (
    <section>
      <div style={{ display: "grid", gap: 14 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 14,
          }}
        >
          <label>
            First name *
            <input
              value={value.firstName}
              disabled={disabled}
              onChange={(e) => onChange({ ...value, firstName: e.target.value })}
            />
          </label>

          <label>
            Last name *
            <input
              value={value.lastName}
              disabled={disabled}
              onChange={(e) => onChange({ ...value, lastName: e.target.value })}
            />
          </label>
        </div>

        <label>
          Phone *
          <input
            value={value.phone}
            disabled={disabled}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
          />
        </label>

        <label>
          Address *
          <textarea
            rows={4}
            value={value.address}
            disabled={disabled}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
          />
        </label>
      </div>
    </section>
  );
}
