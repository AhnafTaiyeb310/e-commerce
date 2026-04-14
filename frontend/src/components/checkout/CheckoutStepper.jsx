import React from "react";

export default function CheckoutStepper({ currentStep = 1 }) {
  const steps = [
    { id: 1, name: "Checkout" },
    { id: 2, name: "Review and Pay" },
    { id: 3, name: "Order confirmation" }
  ];

  return (
    <div className="flex flex-col gap-y-2 mb-8 sm:mb-12">
      <div className="flex items-center gap-x-2">
         {steps.map((step, index) => (
           <React.Fragment key={step.id}>
             <div className="flex items-center gap-x-2">
               <span className={`flex justify-center items-center size-6 rounded-full text-[10px] font-semibold border ${
                 currentStep >= step.id 
                 ? "bg-blue-600 text-white border-blue-600" 
                 : "bg-white text-gray-800 border-gray-200 dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
               }`}>
                 {step.id}
               </span>
               <span className={`text-xs font-medium ${
                 currentStep >= step.id ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-neutral-500"
               }`}>
                 {step.name}
               </span>
             </div>
             {index < steps.length - 1 && (
               <div className="flex-1 border-t-2 border-gray-200 dark:border-neutral-700 mx-1 min-w-[30px]"></div>
             )}
           </React.Fragment>
         ))}
      </div>
    </div>
  );
}
