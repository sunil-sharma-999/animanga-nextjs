import Image from 'next/image';
import Link from 'next/link';

const HorizontalScroll = ({ type, id, data }) => {
  data = data.slice(0, 25);
  return (
    <div className="flex max-w-4xl w-full overflow-x-scroll scroll-smooth ">
      {data &&
        data.map((result) => {
          const entry = result.entry;
          return (
            <Link
              key={entry.mal_id}
              href={`/${type}/id/${entry.mal_id}`}
              passHref={true}>
              <a>
                <div className="hover:scale-95 transition-transform ease-in-out w-full h-full relative text-center ml-1 mr-1 rounded-md">
                  <Image
                    layout="fixed"
                    width={150}
                    height={200}
                    src={entry.images.jpg.image_url}
                    alt={entry.title}
                    className="object-cover object-center"
                  />
                  <p className="text-white/80">{entry.title}</p>
                </div>
              </a>
            </Link>
          );
        })}
    </div>
  );
};

export default HorizontalScroll;
