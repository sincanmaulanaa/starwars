import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const ALL_PLANETS = gql`
  query AllPlanets {
    allPlanets {
      planets {
        name
        diameter
        gravity
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(ALL_PLANETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <ul>
          {data.allPlanets.planets.map((planet: any) => (
            <li key={planet.name}>
              {planet.name} - Diameter: {planet.diameter}, Gravity:{' '}
              {planet.gravity}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
