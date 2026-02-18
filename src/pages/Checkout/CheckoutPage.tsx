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

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
};

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items) as CartItem[];

  
  const clearCart = useCartStore((s) => (s as unknown as { clearCart?: () => void }).clearCart);

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
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.phone.trim() &&
    form.address.trim();

  const handleConfirm = () => {
    setError(null);

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!isValid) {
      setError("Please fill in all required fields.");
      return;
    }

    setSuccess(true);
    clearCart?.();
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Billing & Shipping</h1>

      {success && (
        <SuccessNotice
          title="Your order is successful!"
          description="It’s on the way — you will receive your items soon."
        />
      )}

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <div className={styles.left}>
          <CheckoutForm value={form} onChange={setForm} disabled={success} />
        </div>

        <div className={styles.right}>
          <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
          <PaymentMethod value={payment} onChange={setPayment} disabled={success} />

          <button className={styles.confirmBtn} onClick={handleConfirm} disabled={success}>
            Confirm order
          </button>

         
        </div>
      </div>
    </div>
  );
}
