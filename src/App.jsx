import React, { useState } from 'react';


const discounts =[
  { 
    code: "NEW001",
    isActive: true,
    minOrderAmount: 0,
    name: "New User Discount",
    type: "amount",
    validity: "2025-12-31T23:59:59.000Z",
    value: 600,
    _id: "675ead49bc7a2e5b28ec142a"
  },
  {
    code: "XMAS2024",
    isActive: true,
    minOrderAmount: 2000,
    name: "Christmas Celebration",
    type: "percentage",
    validity: "2024-12-25T23:59:59.000Z",
    value: 30,
    _id: "98774cc79f96b63d0d39c09d"
  },
  {
    code: "SUMMER50",
    isActive: true,
    minOrderAmount: 1500,
    name: "Summer Bonanza",
    type: "percentage",
    validity: "2024-07-31T23:59:59.000Z",
    value: 50,
    _id: "12345abc67890de123f456g7"
  },
  {
    code: "WINTER20",
    isActive: false,
    minOrderAmount: 500,
    name: "Winter Warmers",
    type: "percentage",
    validity: "2023-12-31T23:59:59.000Z",
    value: 20,
    _id: "23456bcd78901ef234g567h8"
  },
  {
    code: "LOYALTY10",
    isActive: true,
    minOrderAmount: 1000,
    name: "Loyalty Reward",
    type: "amount",
    validity: "2026-03-31T23:59:59.000Z",
    value: 100,
    _id: "34567cde89012fg345h678i9"
  },
  {
    code: "FESTIVE15",
    isActive: true,
    minOrderAmount: 800,
    name: "Festive Offer",
    type: "percentage",
    validity: "2024-11-15T23:59:59.000Z",
    value: 15,
    _id: "45678def90123gh456i789j0"
  },
  {
    code: "WELCOME100",
    isActive: true,
    minOrderAmount: 0,
    name: "Welcome Gift",
    type: "amount",
    validity: "2025-01-01T23:59:59.000Z",
    value: 100,
    _id: "56789efg01234hi567j890k1"
  },
  {
    code: "BLACKFRIDAY",
    isActive: true,
    minOrderAmount: 5000,
    name: "Black Friday Deal",
    type: "percentage",
    validity: "2024-11-29T23:59:59.000Z",
    value: 40,
    _id: "67890fgh12345ij678k901l2"
  }
];

const App = () => {
  const [orderAmount, setOrderAmount] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const getValidCoupons = () => {
    const currentDate = new Date();
    return discounts.filter(coupon => 
      coupon.isActive &&
      new Date(coupon.validity) > currentDate &&
      orderAmount >= coupon.minOrderAmount
    );
  };

  const applyCoupon = () => {
    if (!selectedCoupon) return orderAmount;
    if (selectedCoupon.type === 'amount') {
      return Math.max(0, orderAmount - selectedCoupon.value);
    }
    if (selectedCoupon.type === 'percentage') {
      return Math.max(0, orderAmount - (orderAmount * selectedCoupon.value / 100));
    }
  };

  const validCoupons = getValidCoupons();
  const discountedAmount = selectedCoupon ? applyCoupon() : orderAmount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-2xl font-bold text-blue-500 mb-6 sm:3xl">Apply Discount Coupon</h1>
      
      <input 
        type="Number" 
        placeholder="Enter order amount" 
        onChange={(e) => setOrderAmount(Number(e.target.value))} 
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg mb-4"
      />
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-6">
        {validCoupons.length > 0 ? validCoupons.map(coupon => (
          <div 
            key={coupon._id} 
            className="flex justify-between items-center p-2 border-b border-gray-200 last:border-none"
          >
            <p className="text-gray-700">{coupon.name} - <span className="font-mono text-blue-600">{coupon.code}</span></p>
            <button 
              onClick={() => setSelectedCoupon(coupon)} 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Apply 
            </button>
          </div>
        )) : <p className="text-gray-500 text-center">No coupons available for this amount.</p>}
      </div>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h2 className="text-gray-700 text-lg">Original Amount: <span className="font-bold">${orderAmount || 0}</span></h2>
        <h2 className="text-gray-700 text-lg mt-2">Discounted Amount: <span className="font-bold text-green-500">${discountedAmount || 0}</span></h2>
      </div>
    </div>
  );
};

export default App;
