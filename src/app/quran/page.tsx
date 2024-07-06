import Link from 'next/link';

export default function QuranPage() {
  return (
    <div>
      <h1>The Noble Quran</h1>
      <div className='text-white align-center'>
        {Array.from({ length: 114 }, (_, i) => (
          <Link key={i + 1} href={`/quran/${i + 1}`}>
            <div>Surah {i + 1}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
