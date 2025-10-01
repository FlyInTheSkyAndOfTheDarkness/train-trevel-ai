import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto p-6">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">TrainTravel AI</h1>
        <p className="text-muted-foreground mb-8">Поиск ЖД билетов с умными подсказками</p>
        <Link className="inline-block rounded-md bg-black text-white px-6 py-3" href="/search">
          Начать поиск
        </Link>
      </section>
    </main>
  );
}

