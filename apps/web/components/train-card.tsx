type Props = {
  id: string;
  trainNumber: string;
  originName: string;
  destinationName: string;
  durationMinutes: number;
};

export function TrainCard({ id, trainNumber, originName, destinationName, durationMinutes }: Props) {
  return (
    <div className="border rounded p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Поезд {trainNumber}</div>
          <div className="text-sm text-slate-600">{originName} → {destinationName}</div>
          <div className="text-xs text-slate-500">{Math.round(durationMinutes/60)} ч</div>
        </div>
        <a className="underline" href={`/trip/${id}`}>Детали</a>
      </div>
    </div>
  );
}

