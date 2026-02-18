type Props = { title: string; description: string };

export function SuccessNotice({ title, description }: Props) {
  return (
    <div
      style={{
        border: "1px solid #b7eb8f",
        background: "#f6ffed",
        padding: 12,
        borderRadius: 10,
        marginBottom: 16,
      }}
    >
      <strong>{title}</strong>
      <div style={{ marginTop: 6 }}>{description}</div>
    </div>
  );
}
