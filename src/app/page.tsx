import Image from "next/image";
import Box from './components/Box';
import NamazIMG from './Images/namaz.png';
import QuranIMG from './Images/Quran.png';
import Link from 'next/link';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div className="container mx-auto">
        {/* <Box
          imageSource={NamazIMG}
          imageAlt="Image description"
          text="Prayer"
          href="/prayer"
        /> */}

        <Link href="/quran">
          <Box
            imageSource={QuranIMG}
            imageAlt="Image description"
            text="Q'uran"
          />
        </Link>
      </div>
      </div>
      <SpeedInsights/>
    </main>
  );
}