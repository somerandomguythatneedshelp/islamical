import { notFound } from 'next/navigation';
import QuranVerseClient from './QuranVerseClient';
import axios from 'axios';

interface QuranVerseProps {
  params: { id: string };
}

export default async function QuranVersePage({ params }: QuranVerseProps) {
  const { id } = params;
  const surahNumber = parseInt(id, 10);

  // Validate the surah number
  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  try {
    // Fetch the chapters data from the Quran.com API
    const chaptersResponse = await axios.get('https://api.quran.com/api/v4/chapters');
    const chapters = chaptersResponse.data.chapters;

    // Find the chapter (Surah) information based on the surah number
    const surahInfo = chapters.find((chapter) => chapter.id === surahNumber);

    if (!surahInfo) {
      throw new Error(`Surah ${surahNumber} not found`);
    }

    const surahName = {
      english: surahInfo.translated_name.name, // <-- Full English translation of the surah name
    };

    // Fetch all verses for the surah
    const allVerses = [];
    let page = 1;
    let hasMoreVerses = true;

    while (hasMoreVerses) {
      const response = await axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?language=en&words=false&translations=131&page=${page}&per_page=50`);
      const { verses } = response.data;
      allVerses.push(...verses);

      if (verses.length < 50) {
        hasMoreVerses = false;
      } else {
        page++;
      }
    }

    const versesWithText = await Promise.all(
      allVerses.map(async (verse) => {
        const [verseResponse, englishTranslationResponse, urduTranslationResponse, hindiTranslationResponse] = await Promise.all([
          axios.get(`https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${verse.verse_key}`),
          axios.get(`https://api.quran.com/api/v4/quran/translations/131?verse_key=${verse.verse_key}`),
          axios.get(`https://api.quran.com/api/v4/quran/translations/234?verse_key=${verse.verse_key}`),
          axios.get(`https://api.quran.com/api/v4/quran/translations/122?verse_key=${verse.verse_key}`)
        ]);
        return {
          ...verse,
          text: verseResponse.data.verses[0].text_uthmani,
          englishTranslation: englishTranslationResponse.data.translations,
          urduTranslation: urduTranslationResponse.data.translations,
          hindiTranslation: hindiTranslationResponse.data.translations
        };
      })
    );

    const initialLanguage = typeof window !== 'undefined'
      ? window.localStorage.getItem('selectedLanguage') || 'en'
      : 'en';

    return <QuranVerseClient verses={versesWithText} surahNumber={surahNumber} surahName={surahName} initialLanguage={initialLanguage} />;
  } catch (error) {
    console.error('Error fetching Quran verses:', error);
    return <div className="text-white">Could not retrieve Quran Verses :/ No internet connection?</div>;
  }
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ id: (i + 1).toString() }));
}
