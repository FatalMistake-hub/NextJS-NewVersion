import Image from 'next/image';
import * as React from 'react';



function Pin({ size = 20 ,result}:any) {
    return (
        <button className="relative">
            <button className="px-3 py-1 font-bold duration-300 bg-white rounded-full shadow-md cursor-pointer focus:scale-90 peer">
                20
            </button>
            <div className="absolute hidden w-48 p-3 text-left bg-white border border-gray-200 rounded-lg cursor-pointer bottom-9 z-50 peer-focus:block">
                <div className="relative w-full h-24 mb-2">
                    {/* <Image
                        src={`https://airbnb-web-clone.vercel.app/_next${result.img}`}
                        alt={result.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        placeholder="blur"
                        blurDataURL={result.img} */}
                    {/* /> */}
                </div>
                <div>
                    <h2 className="text-sm font-semibold">1212121</h2>
                </div>
            </div>
        </button>
    );
}

export default React.memo(Pin);
