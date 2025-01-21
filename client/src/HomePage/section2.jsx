import { FaRegCommentDots } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import image5 from "/image5.png";
import image6 from "/image6.png";
import { useNavigate } from "react-router-dom";

export default function Section2() {
    const navigate = useNavigate();
    return (
        <div className="ss4 flex flex-col md:flex-row justify-center min-h-screen bg-gray-100/30 items-center px-6 md:px-16 relative">
            {/* Text Content */}
            <div className="w-full md:w-2/5 text-center md:text-left space-y-6">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                    Register to Showcase Your Talent
                </h1>
                <h2 className="mt-4 text-gray-500 text-sm md:text-base lg:text-lg">
                    A simple registration form for individuals to join and showcase their skills. Admins will review and approve, and clients can hire the best talent.
                </h2>
                <button
                    className="hover:bg-black font-bold bg-gray-800 text-white py-3 px-8 rounded-full mt-4 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => navigate("/register-talent")}
                >
                    Start for free
                </button>
                <hr className="mt-6 border border-gray-200" />
                <div className="flex items-center space-x-4 mt-4 font-bold text-gray-600">
                    <FaRegCommentDots className="text-2xl" />
                    <h1 className="text-base">Easy Communication</h1>
                </div>
                <div className="flex items-center space-x-4 mt-4 font-bold text-gray-600">
                    <TbTargetArrow className="text-2xl" />
                    <h1 className="text-base">Talent Pool</h1>
                </div>
                <div className="flex items-center space-x-4 mt-4 font-bold text-gray-600">
                    <RiAdminFill className="text-2xl" />
                    <h1 className="text-base">Admin Approved</h1>
                </div>
            </div>

            {/* Image Section */}
            <div className="md:block hidden relative w-full max-w-md h-auto md:w-1/2 xl:w-[45%]">
                <img
                    src={image6}
                    alt="Background"
                    className="h-full w-full object-cover absolute inset-0 -z-10"
                />
                <img
                    src={image5}
                    alt="Foreground"
                    className="h-full w-full relative object-contain mx-auto"
                />
            </div>

            {/* Background Blur Elements */}
            <div className="absolute inset-0 -z-20">
                <div
                    className="absolute bg-purple-600/5 blur-xl w-96 h-96 rounded-full"
                    style={{ top: "50%", left: "30%" }}
                ></div>
                <div
                    className="absolute bg-purple-600/5 blur-xl w-96 h-96 rounded-full"
                    style={{ top: "10%", right: "5%" }}
                ></div>
            </div>
        </div>
    );
}
