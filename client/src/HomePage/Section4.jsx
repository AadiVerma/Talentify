import { useState } from 'react';
import BackgroundImage from '/image7.png'
export default function Section4() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ firstName, lastName, email, phone, message });
    };

    return (
        <div className="relative flex flex-col items-center p-8 ss4 bg-cover bg-center bg-black/5 rounded-3xl m-10" >
        <h1 className="text-5xl font-bold">Contact Our Team</h1>
            <h2 className="mt-4 text-gray-500 flex w-[60%] text-center">
                Have questions about Talentify or need help getting started? Our team is here to assist you. Whether you're looking to showcase your skills or hire the best talent, we’re ready to support you every step of the way.
            </h2>
            <div className='flex gap-20'>
            <div className='hidden md:block'>
                <img src={BackgroundImage} alt="Contact Us" className="w-96 h-full object-cover " />
            </div>
            <div className="mt-8 w-full max-w-lg">
                <form className="space-y-6 border-2 p-6 border-gray-400 rounded-2xl" onSubmit={handleSubmit}>
                    <div className="flex space-x-6">
                        <div className="flex-1">
                            <label htmlFor="firstName" className="text-gray-700 font-bold">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="mt-2 p-3 border border-gray-400 rounded-lg w-full"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor="lastName" className="text-gray-700 font-bold">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="mt-2 p-3 border border-gray-400 rounded-lg w-full"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 font-bold">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="mt-2 p-3 border border-gray-400 rounded-lg"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-gray-700 font-bold">Phone Number</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="mt-2 p-3 border border-gray-400 rounded-lg"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="message" className="text-gray-700 font-bold">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="mt-2 p-3 border border-gray-400 rounded-lg"
                            placeholder="Enter your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mt-4 w-full py-4 bg-black/75 text-white rounded-lg font-bold hover:bg-black"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}

