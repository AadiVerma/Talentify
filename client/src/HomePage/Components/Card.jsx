import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Card({ heading, para, flag, icon }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col bg-[#1c212c] p-5 rounded-3xl text-white ss4">
            {/* Icon Section */}
            <div className="flex justify-center items-center bg-purple-600 w-12 h-12 rounded-full text-white mb-10">
                {icon}
            </div>
            
            {/* Heading and Paragraph */}
            <h1 className="text-xl text-start flex mt-4">{heading}</h1>
            <h1 className="text-md text-gray-400 mt-2">{para}</h1>
            
            {/* Conditional Explore More Button */}
            {flag && (
                <div className="flex justify-start mt-2 text-purple-400 z-20">
                    <button onClick={()=>{
                        navigate("/talents");
                    }}>
                        Explore More
                    </button>
                    <FaLongArrowAltRight className="mt-1 ml-1 text-2xl" />
                </div>
            )}
        </div>
    );
}
