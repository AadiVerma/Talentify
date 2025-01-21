import { Link } from 'react-router-dom';
export default function Nav({homelink, explorelink,aboutlink, contactlink, registerlink}) {
    return (
        <div className="flex justify-between p-4 ss4">
            <h1 className='text-3xl font-bold text-purple-800'> Talentify</h1>
            <div className='flex space-x-4'>
                <Link to={`/${homelink}`} className='text-xl text-gray-700 hover:text-purple-600 hover:underline-offset-8 hover:underline'>Home</Link>
                <Link to={`/${explorelink}`} className='text-xl text-gray-700 hover:text-purple-600 hover:underline-offset-8 hover:underline'>Explore</Link>
                <Link to={`/${aboutlink}`} className='text-xl text-gray-700 hover:text-purple-600 hover:underline-offset-8 hover:underline'>About</Link>
                <Link to={`/${registerlink}`} className='text-xl text-gray-700 hover:text-purple-600 hover:underline-offset-8 hover:underline'>Register</Link>
                <Link to={`/${contactlink}`} className='text-xl text-gray-700 hover:text-purple-600 hover:underline-offset-8 hover:underline'>Contact</Link>
            </div>
            <div>
                <button className='text border-2 border-black/75 px-4 py-2 rounded-3xl hover:border-purple-600 hover:text-purple-600'>Get Started</button>
            </div>
        </div>
    );
}
