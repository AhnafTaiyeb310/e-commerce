import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import GuestContactForm from "@/components/checkout/GuestContactForm";
import GuestShippingAddress from "@/components/checkout/GuestShippingAddress";
import ShippingMethodSelection from "@/components/checkout/ShippingMethodSelection";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";

export default function GuestCheckoutPage() {
  const subtotal = 299;
  const shipping = 0;
  const tax = Math.round(299 * 0.08);

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <a href="/cart" className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to cart
          </a>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={1} />

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-start">
          {/* Left: Form */}
          <div>
            <GuestContactForm />
            <GuestShippingAddress />
            <ShippingMethodSelection />
          </div>

          {/* Right: Order Summary */}
          <div>
            <CheckoutOrderSummary subtotal={subtotal} shipping={shipping} tax={tax} buttonLabel="Continue" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
