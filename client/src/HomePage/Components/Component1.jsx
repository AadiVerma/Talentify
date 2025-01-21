import image1 from '/image4.jpg';

export default function Component1() {
  return (
    <div className="flex items-center gap-4 bg-white/50 backdrop-blur-lg border border-gray-500 p-2 rounded-lg max-w-max">
      <img src={image1} alt="Talent" className="object-cover h-16 w-16 rounded-full" />
      <div>
        <p className="font-semibold text-black">Customer Success</p>
        <p className="text-xl font-bold text-purple-700">8.50%</p>
      </div>
    </div>
  );
}
