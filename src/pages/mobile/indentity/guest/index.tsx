import { useState } from 'react';
import QRCode from 'qrcode';
const IndentityGuest = () => {
    const [data, setData] = useState<string>();
    const generateQr = () => {
        QRCode.toDataURL('https://www.google.com/sadfasdfasdf').then(setData);
  };
  generateQr()
    return (
        <div className="flex-wrap items-center h-full justify-center md:flex">
            <img className="mx-auto mt-12 h-52 w-52 rounded-lg border p-2 md:mt-0" src={data} alt="step" />
            <div>
                <h1 className="font-laonoto mt-4 text-center text-xl font-bold">NhatQuach</h1>
                <p className="mt-2 text-center font-semibold text-gray-600">YOTHIN BOUBPHA</p>
                <p className="mt-1 text-center font-medium text-red-500">040-12-00-01166166-001</p>
            </div>
        </div>
    );
};

export default IndentityGuest;
IndentityGuest.Layout = 'MobileLayout';
