import { useMemo, useState } from "react";
import styles from "./CheckoutPage.module.css";
import { z } from "zod";

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

const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\u0600-\u06FF\s'-]{2,40}$/;



const phoneRegex = /^\+?\d+$/;

const checkoutSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .refine((v) => nameRegex.test(v), "First name must contain letters only."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .refine((v) => nameRegex.test(v), "Last name must contain letters only."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required.")
    
    .transform((v) => v.replace(/[\s()-]/g, ""))
    .refine((v) => phoneRegex.test(v), "Please write your phone number correctly.")
    .refine((v) => {
      const digits = v.startsWith("+") ? v.slice(1) : v;
      return digits.length >= 7 && digits.length <= 15;
    }, "Phone length is invalid."),
  address: z
    .string()
    .trim()
    .min(1, "Address is required.")
    .min(10, "Address is too short."),
});

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

  const handleConfirm = () => {
    setError(null);

    if (success) return;

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    const parsed = checkoutSchema.safeParse(form);

    if (!parsed.success) {
     
      setError(parsed.error.issues[0].message);
      return;
    }

    
    setForm(parsed.data);

    setSuccess(true);
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