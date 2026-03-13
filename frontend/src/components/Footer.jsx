import { ChevronUp, Globe, MapPin } from 'lucide-react';

const footerColumns = [
  {
    title: 'Get to Know Us',
    links: ['About Amazon', 'Careers', 'Press Releases', 'Amazon Science']
  },
  {
    title: 'Connect with Us',
    links: ['Facebook', 'Twitter', 'Instagram']
  },
  {
    title: 'Make Money with Us',
    links: [
      'Sell on Amazon',
      'Sell under Amazon Accelerator',
      'Protect and Build Your Brand',
      'Amazon Global Selling',
      'Supply to Amazon',
      'Become an Affiliate',
      'Fulfilment by Amazon',
      'Advertise Your Products',
      'Amazon Pay on Merchants'
    ]
  },
  {
    title: 'Let Us Help You',
    links: [
      'Your Account',
      'Returns Centre',
      'Recalls and Product Safety Alerts',
      '100% Purchase Protection',
      'Amazon App Download',
      'Help'
    ]
  }
];

const footerServices = [
  {
    title: 'AbeBooks',
    description: 'Books, art & collectibles'
  },
  {
    title: 'Amazon Web Services',
    description: 'Scalable Cloud Computing Services'
  },
  {
    title: 'Audible',
    description: 'Download Audio Books'
  },
  {
    title: 'IMDb',
    description: 'Movies, TV & Celebrities'
  },
  {
    title: 'Shopbop',
    description: 'Designer Fashion Brands'
  },
  {
    title: 'Amazon Business',
    description: 'Everything For Your Business'
  },
  {
    title: 'Amazon Prime Music',
    description: '100 million songs, ad-free, over 15 million podcast episodes'
  }
];

function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-10 bg-[#131a22] text-white">
      <button
        type="button"
        onClick={handleBackToTop}
        className="flex w-full items-center justify-center gap-2 bg-[#37475a] px-4 py-4 text-sm font-semibold transition-colors hover:bg-[#41556d]"
      >
        <ChevronUp size={16} />
        <span>Back to top</span>
      </button>

      <div className="bg-[#232f3e]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 max-w-[180px] text-[1.05rem] font-bold leading-6">
                {column.title}
              </h2>
              <ul className="space-y-3 text-[0.95rem] text-gray-200">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="leading-5 hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 px-6 py-8 md:flex-row md:gap-8">
            <div className="flex items-end gap-1 text-4xl font-bold tracking-tight">
              <span className="text-white">amazon</span>
              <span className="mb-1 text-xl text-amazon-yellow">.in</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-200">
              <button
                type="button"
                className="flex items-center gap-2 rounded border border-white/30 px-4 py-2 hover:border-white/60"
              >
                <Globe size={16} />
                <span>English</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded border border-white/30 px-4 py-2 hover:border-white/60"
              >
                <MapPin size={16} />
                <span>India</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#131a22]">
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-8 px-6 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {footerServices.map((service) => (
            <a key={service.title} href="#" className="max-w-[220px] leading-5 text-gray-300 hover:text-white">
              <div className="font-semibold text-white">{service.title}</div>
              <div>{service.description}</div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
