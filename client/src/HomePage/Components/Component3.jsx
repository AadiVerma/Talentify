import image1 from '/image2.jpg';
import image2 from '/image3.jpg';
import image3 from '/image4.jpg';

export default function Component2() {
    const users = [
        { id: 1, name: "John Doe", avatar: image1 },
        { id: 2, name: "Jane Smith", avatar: image2 },
        { id: 3, name: "Sam Wilson", avatar: image3 },
    ];

    return (
        <div>
            <div className="flex -space-x-2 justify-center">
                {users.map(user => (
                    <div key={user.id} className="flex flex-col items-center">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="object-cover h-16 w-16 rounded-full border-2 border-black/25"
                        />
                    </div>
                ))}
            </div>
            <h1 className='text-lg font-semibold'>At Talentify, we believe in <span className="text-purple-700">Equality</span></h1>
        </div>
    );
}
