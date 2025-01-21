import { FaRegCommentDots } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import image5 from '/image5.png'
import image6  from "/image6.png";
import {useNavigate} from 'react-router-dom'
export default function Section2() {
    const navigate = useNavigate()
    return (
        <div className="ss4 flex justify-center min-h-screen bg-gray-100/30 place-items-center pl-[10%] relative">
            <div className="max-w-[40%]">
                <h1 className="text-6xl font-bold text-gray-800">Register to Showcase Your Talent</h1>
                <h2 className="mt-4 text-gray-500">A simple registration form for individuals to join and showcase their skills. Admins will review and approve, and clients can hire the best talent.</h2>
                <button className="hover:bg-black font-bold bg-gray-800 text-white py-2 px-4 rounded-full mt-4" onClick={()=>{
                    navigate("/register-talent")
                }}>Start for free</button>
                <hr className="mt-4 border border-gray-200"></hr>
                <div className="flex space-x-4 mt-4 font-bold text-gray-600">
                <FaRegCommentDots className="text-2xl mt-1"/><h1>Easy Communication</h1>
                </div>
                <div className="flex space-x-4 mt-4 font-bold text-gray-600">
                <TbTargetArrow className="text-2xl mt-1"/><h1>Talent Pool</h1>
                </div>
                <div className="flex space-x-4 mt-4 font-bold text-gray-600">
                <RiAdminFill className="text-2xl mt-1"/><h1>Admin Approved</h1>
                </div>
            </div>
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
                <div className="absolute bg-purple-600/5 blur-xl w-96 h-96 rounded-full" style={{ top: '50%', left: '37%' }}></div>
                <div className="absolute bg-purple-600/5 blur-xl w-96 h-96 rounded-full" style={{ top: '0%', right: '3%' }}></div>
                <div className="absolute bg-purple-600/5 blur-xl w-96 h-96 rounded-full" style={{ top: '0%', left: '0%' }}></div>
            </div>
            <div className="flex relative gap-4 justify-end w-[48%]">
                <img src={image6} className="h-full left-0 absolute -z-10"/>
                <img src={image5} className="h-[80%] w-[80%]"/>
            </div>
        </div>
    );
}