import Card from "./Components/Card";
import { BiSolidOffer } from "react-icons/bi";
import { LuScaling } from "react-icons/lu";
import { GiUpgrade } from "react-icons/gi";
export default function Section3() {
    return (
        <div className="flex flex-col relative items-center  p-16 min-h-[680px] bg-[#030b1c] text-gray-300 ss4 rounded-3xl">
            <h1 className="md:text-5xl text-4xl">Start Scaling your Hiring</h1>
            <h2 className="md:text-5xl mt-2  text-4xl">Efforts with Ease</h2>
            <h1 className="md:text-xl  mt-2 text-lg">Effortlessly manage your hiring process and quickly connect with top talent to scale your team.</h1>
            <div className="absolute inset-0 z-10 flex justify-center items-center overflow-hidden">
                <div className="absolute bg-red-400/5 blur-xl w-96 h-96 rounded-full" style={{ bottom: '-10%', right: '5%' }}></div>
                <div className="absolute bg-white/5 blur-xl w-96 h-96 rounded-full" style={{ top: '-10%', right: '3%' }}></div>
                <div className="absolute bg-purple-400/5 blur-xl w-96 h-96 rounded-full" style={{ top: '0%', left: '0%' }}></div>
            </div>

            <div className="flex flex-col lg:flex-row justify-center gap-8 mt-20">
                <Card heading={"End Scheduling Conflicts"} para={"Automate interview scheduling and coordination, saving you time and eliminating scheduling headaches."} icon={<LuScaling className="text-2xl text-gray-200" />} />
                <Card heading={"Make an Offer They Can’t Refuse"} para={"Speed up your hiring process and increase offer acceptance rates. Access the best talent faster to meet your hiring needs."} icon={<BiSolidOffer className="text-3xl text-gray-200" />} />
                <Card heading={"Maintain Your Hiring Standards at Scale"} para={"Balance interview schedules, manage interviewer workloads, prevent burnout, and build a healthy recruiting culture as you grow."} flag={true} icon={<GiUpgrade className="text-3xl rotate-45 text-gray-200" />} />
            </div>
        </div>
    )
}