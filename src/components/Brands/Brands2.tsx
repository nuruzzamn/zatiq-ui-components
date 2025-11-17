import React from 'react';
import sony from '../../assets/image/Brands/sony.png';
import skullcandy from '../../assets/image/Brands/Skullcandy.png';
import bose from '../../assets/image/Brands/Bose.png';
import oppo from '../../assets/image/Brands/oppo.png';
import samsung from '../../assets/image/Brands/samsung.png';
import philips from '../../assets/image/Brands/Philips.png';
import oracle from '../../assets/image/Brands/oracle.png';
import dell from '../../assets/image/Brands/Dell.png';

const brands = [
  {
    name: 'Sony',
    logo: sony,
    description: 'Get your best looking smile now!',
  },
  {
    name: 'Skullcandy',
    logo: skullcandy,
    description: 'DentalCare is most focused in helping you discover your most beautiful smile',
  },
  {
    name: 'Bose',
    logo: bose,
    description: 'Overcame any hurdle or any other problem.',
  },
  {
    name: 'Oppo',
    logo: oppo,
    description: 'Overcame any hurdle or any other problem.',
  },
  {
    name: 'Samsung',
    logo: samsung,
    description: 'Get your best looking smile now!',
  },
  {
    name: 'Philips',
    logo: philips,
    description: 'DentalCare is most focused in helping you discover your most beautiful smile',
  },
  {
    name: 'Oracle',
    logo: oracle,
    description: 'Overcame any hurdle or any other problem.',
  },
  {
    name: 'Dell',
    logo: dell,
    description: 'Overcame any hurdle or any other problem.',
  },
];

const Brands2: React.FC = () => {
  return (
    <div className="w-full bg-white py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-[1050px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-8 lg:gap-x-[30px] gap-y-6 md:gap-y-8">
          {brands.map((brand, index) => (
            <div key={index} className="flex flex-col items-start">
              {/* Brand Logo */}
              <div className="mb-3 md:mb-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 sm:h-10 md:h-10 w-10/12 object-contain"
                />
              </div>
              {/* Brand Description */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {brand.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands2;
