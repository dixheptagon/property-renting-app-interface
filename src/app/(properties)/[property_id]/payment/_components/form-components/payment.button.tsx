// components/PaymentButton.tsx
"use client";

declare global {
  interface Window {
    snap: any;
  }
}

export default function PaymentButton() {
  const snapToken = "acadc64e-6b01-4aab-a5c1-2aaede0a4962";

  const handlePayment = () => {
    if (window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: function (result: any) {
          console.log("Payment success:", result);
          alert("Pembayaran berhasil!");
          // Redirect ke halaman sukses
        },
        onPending: function (result: any) {
          console.log("Payment pending:", result);
          alert("Menunggu pembayaran...");
        },
        onError: function (result: any) {
          console.log("Payment error:", result);
          alert("Pembayaran gagal.");
        },
        onClose: function () {
          console.log(
            "Customer closed the popup without finishing the payment"
          );
          alert("Popup ditutup.");
        },
      });
    } else {
      console.error("Snap.js belum terload");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="rounded-lg bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
    >
      Bayar dengan Midtrans
    </button>
  );
}
