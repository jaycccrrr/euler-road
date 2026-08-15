'use client';

import Header from '@/components/layout/Header';
import { ChallengeBackground } from '@/components/challenge/ChallengeBackground';
import { DailyChallenge } from '@/components/challenge/DailyChallenge';

export default function DailyPage() {
  return (
    <div className="relative min-h-screen">
      <ChallengeBackground />
      <div className="relative z-10">
        <Header />
        <main className="mx-auto w-full max-w-[1600px] px-4 pb-16 pt-24 sm:px-6">
          <DailyChallenge />
        </main>
      </div>
    </div>
  );
}
