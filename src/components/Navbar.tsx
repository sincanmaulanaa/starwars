import Link from 'next/link';
import MenuImage from './MenuImage';

const navMenus = [
  {
    path: '/movies',
    name: 'Movies',
    image: <MenuImage alt='List of Movies' src='/movie.webp' />,
  },
  {
    path: '/characters',
    name: 'Characters',
    image: <MenuImage alt='List of Characters' src='/character.webp' />,
  },
  {
    path: '/planets',
    name: 'Planets',
    image: <MenuImage alt='List of Planets' src='/planet.webp' />,
  },
];

export default function Navbar() {
  return (
    <nav>
      <ul className='flex justify-center items-center gap-4 mt-10'>
        {navMenus.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <li
              key={index}
              className='bg-black/10 p-5 rounded-full transition-all duration-200 hover:shadow-sm hover:shadow-red-500'
            >
              {menu?.image}
              <span className='text-center block font-semibold mt-2 text-white'>
                {menu.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
