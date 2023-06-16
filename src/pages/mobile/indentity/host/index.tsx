//scan.js

import React, { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';

function IndentityHost() {
    const [data, setData] = useState('No result');

    return (
        <div>
            <div className="rounded-md drop-shadow-sm">
                <QrReader
                    onResult={(result: any, error) => {
                        if (!!result) {
                            setData(result?.text);
                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                    //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
                    // open the front camera
                    constraints={{ facingMode: 'environment' }}
                    // style={{ width: '100%' }}
                    className="w-full h-full  p-4 rounded-md drop-shadow-sm"
                />
                <p>{data}</p>
            </div>
        </div>
    );
}

export default IndentityHost;
IndentityHost.Layout = 'MobileLayout';
