import React from 'react';
import { useRouter } from 'next/navigation';


interface BookmarkModalProps {
  bookmarkedVerses: string[];
  onClose: () => void;
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({ bookmarkedVerses, onClose }) => {
  const router = useRouter();

  const handleGoToBookmarkedSurah = () => {
    if (bookmarkedVerses.length > 0) {
      const firstBookmarkedVerseId = bookmarkedVerses[0];
  
      if (typeof firstBookmarkedVerseId === 'string') {
        const [surahNumber, verseNumber] = firstBookmarkedVerseId.split(':');
        const parsedSurahNumber = parseInt(surahNumber, 10);
        const parsedVerseNumber = parseInt(verseNumber, 10);
  
        if (
          !isNaN(parsedSurahNumber) &&
          !isNaN(parsedVerseNumber) &&
          parsedSurahNumber > 0 &&
          parsedSurahNumber <= 114 &&
          parsedVerseNumber > 0
        ) {
          router.push(`/quran/${parsedSurahNumber}#verse-${parsedVerseNumber}`);
          onClose();
        } else {
          console.error('Invalid verse ID format');
        }
      } else {
        console.error('Invalid verse ID format');
      }
    } else {
      console.error('No bookmarked verses found');
    }
  };
  
  
  
  
  
  
  
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Bookmarked Verses</h2>
        <p className="mb-4">You have bookmarked verses from the Quran.</p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleGoToBookmarkedSurah}
          >
            Go to Bookmarked Verse
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkModal;
