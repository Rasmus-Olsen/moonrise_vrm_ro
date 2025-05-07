'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Her kan du tilføje logik til at håndtere nyhedsbrev tilmelding
        console.log('Tilmeldt email:', email);
        setEmail('');
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-900 text-white max-w-7xl mx-auto">
            <div className="flex-1">
                <Image
                    src="/map.png"
                    alt="Moonrise lokation"
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-lg"
                />
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-bold m-0">Moonrise Aps</h2>
                <p className="m-0">Jernholmen 2 2650</p>
                <p className="m-0">Hvidovre Danmark</p>
                <p className="m-0">
                    <a href="tel:+4512345678" className="text-white hover:underline">+45 12 34 56 78</a>
                </p>
                <p className="m-0">
                    <a href="mailto:hello@moonrise.dk" className="text-white hover:underline">hello@moonrise.dk</a>
                </p>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-4">Tilmeld dig nyhedsbrevet</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Din email"
                            required
                            className="flex-1 p-2 rounded-md border-none bg-white text-gray-900"
                        />
                        <button 
                            type="submit"
                            className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors md:w-auto w-full"
                        >
                            Tilmeld mig!
                        </button>
                    </form>
                </div>
                <div className="flex gap-4 mt-4">
                    <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100 transition-opacity">
                        <Image src="/instagram-icon.png" alt="Instagram" width={30} height={30} />
                    </a>
                    <a href="#" aria-label="Facebook" className="opacity-80 hover:opacity-100 transition-opacity">
                        <Image src="/facebook-icon.png" alt="Facebook" width={30} height={30} />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="opacity-80 hover:opacity-100 transition-opacity">
                        <Image src="/linkedin-icon.png" alt="LinkedIn" width={30} height={30} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
