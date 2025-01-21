import Image from '/image.png';
import Nav from '../NavBar/Nav';
import SearchBar from '../Search/Search';
import Component1 from './Components/Component1';
import Component2 from './Components/Component2';
import Component3 from './Components/Component3';
export default function Page1() {
    return (
        <div className='ss4 bg-gray-100/30'>
            <Nav homelink={""} aboutlink={""} explorelink={""} registerlink={"register-talent"} contactlink={""} />
            <h1 className="text-6xl flex justify-center ss4-dark">Discover the world’s</h1>
            <h2 className="text-6xl flex justify-center ss4-dark">Top Talent</h2>

            <div className='mt-10 '>
                <SearchBar />
            </div>

            <div className='flex space-x-4 justify-center mt-1'>
                <h1 className='flex justify-center space-y-2 text-purple-700 font-semibold mt-1'>Popular Searches : </h1>
                <div className='flex space-x-2 text-neutral-600 '>
                    <h1 className='border-2 px-2 py-1 rounded-full'>Designer</h1>
                    <h1 className='border-2 px-2 py-1 rounded-full'>Web Developer</h1>
                    <h1 className='border-2 px-2 py-1 rounded-full'>Software Engineer</h1>
                </div>
            </div>
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
                <div className="absolute bg-purple-600/5 blur-xl w-96 h-96 rounded-full" style={{ top: '50%', left: '37%' }}></div>
                <div className="absolute bg-purple-600/5 blur-xl w-96 h-96 rounded-full" style={{ top: '0%', right: '3%' }}></div>
                <div className="absolute bg-purple-600/5 blur-xl w-96 h-96 rounded-full" style={{ top: '0%', left: '0%' }}></div>
            </div>

            <div className='flex justify-center relative'>
                <img src={Image} alt="Talent" />
                <div className='absolute right-48 top-20'>
                    <Component1 />
                </div>
                <div className='absolute left-40 bottom-36'>
                    <Component2 />
                </div>
                <div className='absolute right-20 bottom-36'>
                    <Component3 />
                </div>
            </div>
        </div>
    );
}
