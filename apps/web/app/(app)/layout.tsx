import { ReactNode } from 'react';
import Link from 'next/link';
import { AiAssistant } from '@/components/ai-assistant';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="font-bold">TrainTravel AI</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/search">Поиск</Link>
            <Link href="/profile">Профиль</Link>
          </nav>
        </div>
      </header>
      <div className="container mx-auto p-4">{children}</div>
      <AiAssistant />
    </div>
  );
}

