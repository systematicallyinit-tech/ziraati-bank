import Image from 'next/image';
import React from 'react';

const LoadingScreen = ({tab}) => {
  return (
    <div className="w-full h-full fixed z-50 top-0 bottom-0 left-0 right-0">
      <div className="fixed inset-0 bg-white flex text-black items-center justify-center">
        <div className="flex items-center gap-6">
          <Image
            src="/icons/logo-en.png"
            alt="Ziraat_logo"
            className="w-auto h-12"
            width={50}
            height={0}
            loading="eager"
          />
        </div>
        <div className="flex w-full fixed bottom-4 items-center justify-center text-base space-x-2">
          <div className="loader border-t-[#e30613] dark:border-t-[#e30613]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

//animate-[pulse_2.5s_ease-in-out_infinite]