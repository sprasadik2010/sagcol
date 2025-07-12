export default function SAGProduct(props) {
    return (
        <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden shadow-2xl transform -rotate-x-1 -rotate-y-1 scale-105 transition-all duration-300">
            <img
                key={props.index}
                src={props.src}
                alt={`product-${props.index}`}
                className="w-full h-full object-cover"
            />
            <button className="absolute bottom-2 right-2 bg-pink-600 text-white text-sm px-3 py-1 rounded-md shadow-md">
                Buy Now
            </button>
        </div>
    );
}
