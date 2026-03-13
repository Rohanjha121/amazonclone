import { useState } from 'react';

const BANK_OFFERS = [
  {
    id: 1,
    type: 'Credit Card',
    bank: 'HDFC Bank',
    iconLabel: 'CC',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    highlight: '10% Instant Discount',
    description:
      'Get 10% instant discount up to Rs. 1,500 on HDFC Bank Credit Card transactions. Minimum purchase Rs. 5,000.',
    code: 'HDFC10'
  },
  {
    id: 2,
    type: 'Credit Card',
    bank: 'SBI Card',
    iconLabel: 'CC',
    color: 'bg-indigo-50 border-indigo-200',
    iconBg: 'bg-indigo-100',
    highlight: '5% Cashback',
    description:
      'Flat 5% unlimited cashback on SBI Credit Card transactions. No minimum order value required.',
    code: 'SBI5CASH'
  },
  {
    id: 3,
    type: 'Debit Card',
    bank: 'ICICI Bank',
    iconLabel: 'DC',
    color: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-orange-100',
    highlight: 'Rs. 200 Off',
    description:
      'Flat Rs. 200 off on ICICI Bank Debit Card EMI transactions. Minimum purchase Rs. 3,000.',
    code: 'ICICI200'
  },
  {
    id: 4,
    type: 'Credit Card',
    bank: 'Axis Bank',
    iconLabel: 'CC',
    color: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-purple-100',
    highlight: 'No Cost EMI',
    description:
      'No Cost EMI available on Axis Bank Credit Cards for 3, 6 and 9 month tenures.',
    code: null
  },
  {
    id: 5,
    type: 'Debit Card',
    bank: 'Kotak Mahindra',
    iconLabel: 'DC',
    color: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-100',
    highlight: '7.5% Discount',
    description:
      'Get 7.5% instant discount up to Rs. 1,250 on Kotak Mahindra Bank Debit Card transactions. Minimum purchase Rs. 4,000.',
    code: 'KOTAK75'
  },
  {
    id: 6,
    type: 'Credit Card',
    bank: 'Amazon Pay ICICI',
    iconLabel: 'CC',
    color: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
    highlight: '5% Back',
    description:
      'Earn 5% back with the Amazon Pay ICICI Bank Credit Card for Prime members and 3% back for non-Prime customers.',
    code: null
  },
  {
    id: 7,
    type: 'Debit Card',
    bank: 'Bank of Baroda',
    iconLabel: 'DC',
    color: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-100',
    highlight: 'Rs. 150 Cashback',
    description:
      'Flat Rs. 150 cashback on Bank of Baroda Debit Card transactions. Minimum purchase Rs. 2,000.',
    code: 'BOB150'
  },
  {
    id: 8,
    type: 'Credit Card',
    bank: 'ICICI Bank',
    iconLabel: 'CC',
    color: 'bg-cyan-50 border-cyan-200',
    iconBg: 'bg-cyan-100',
    highlight: 'Up to 12 Month EMI',
    description:
      'Convert eligible purchases into 3, 6, 9 or 12 month EMI plans on ICICI Bank Credit Cards.',
    code: null
  },
  {
    id: 9,
    type: 'Debit Card',
    bank: 'HDFC Bank',
    iconLabel: 'DC',
    color: 'bg-sky-50 border-sky-200',
    iconBg: 'bg-sky-100',
    highlight: '5% EMI Savings',
    description:
      'Save 5% instantly up to Rs. 1,000 on HDFC Bank Debit Card EMI transactions. Minimum purchase Rs. 7,500.',
    code: 'HDFCDEBIT'
  },
  {
    id: 10,
    type: 'Credit Card',
    bank: 'RBL Bank',
    iconLabel: 'CC',
    color: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100',
    highlight: 'Reward Points Bonus',
    description:
      'Get accelerated reward points on eligible transactions made using RBL Bank Credit Cards.',
    code: null
  }
];

function BankOffers() {
  const [showAll, setShowAll] = useState(false);
  const visibleOffers = showAll ? BANK_OFFERS : BANK_OFFERS.slice(0, 4);
  const creditOffers = BANK_OFFERS.filter((offer) => offer.type === 'Credit Card').length;
  const debitOffers = BANK_OFFERS.filter((offer) => offer.type === 'Debit Card').length;

  return (
    <div className="border-t border-gray-200 pt-3">
      <div className="mb-3">
        <h2 className="font-semibold text-sm text-gray-800">Available Offers</h2>
        <p className="mt-1 text-xs text-gray-600">
          {creditOffers} credit card offers and {debitOffers} debit card offers are available on this product.
        </p>
      </div>

      <div className="space-y-2">
        {visibleOffers.map((offer) => (
          <div
            key={offer.id}
            className={`flex items-start gap-3 rounded-lg border p-3 transition-all duration-200 hover:shadow-md ${offer.color}`}
          >
            <div
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${offer.iconBg}`}
            >
              <span className="text-xs font-bold text-gray-700">{offer.iconLabel}</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {offer.type}
                </span>
                <span className="text-xs font-semibold text-gray-900">{offer.bank}</span>
              </div>

              <p className="mt-0.5 text-xs leading-relaxed text-gray-700">
                <span className="font-bold text-green-700">{offer.highlight}</span>
                {' - '}
                {offer.description}
              </p>

              {offer.code && (
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-500">Use code:</span>
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px] font-bold tracking-wide text-amazon-blue">
                    {offer.code}
                  </code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {BANK_OFFERS.length > 4 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
        >
          {showAll ? 'Show fewer offers' : `Show all ${BANK_OFFERS.length} offers`}
        </button>
      )}
    </div>
  );
}

export default BankOffers;
