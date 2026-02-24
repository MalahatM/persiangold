import { useMemo, useState } from "react";
import styles from "./CheckoutPage.module.css";

import { useCartStore } from "../../store/cartStore";

import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import { OrderSummary } from "../../components/checkout/OrderSummary";
import { PaymentMethod } from "../../components/checkout/PaymentMethod";
import type { PaymentType } from "../../components/checkout/PaymentMethod";
import { SuccessNotice } from "../../components/checkout/SuccessNotice";

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart); 

  const [form, setForm] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const [payment, setPayment] = useState<PaymentType>("card");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = 20;

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.price * it.qty, 0);
  }, [items]);

  const total = subtotal + shipping;

  const isValid =
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.address.trim().length > 0;

  const handleConfirm = () => {
    setError(null);

    if (success) return; 

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!isValid) {
      setError("Please fill in all required fields.");
      return;
    }

    // ✅ موفق
    setSuccess(true);
    setError(null);
    clearCart(); 
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Billing & Shipping</h1>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <div className={styles.left}>
          <CheckoutForm value={form} onChange={setForm} disabled={success} />
        </div>

        <div className={styles.right}>
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />

          <PaymentMethod
            value={payment}
            onChange={setPayment}
            disabled={success}
          />

          <button
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={success}
            type="button"
          >
            Confirm order
          </button>
        </div>
      </div>

      {success && (
        <div style={{ marginTop: 18 }}>
          <SuccessNotice
            title="Thank you for your purchase."
            description="Your order is confirmed and is on the way."
          />
        </div>
      )}
    </div>
  );
}
