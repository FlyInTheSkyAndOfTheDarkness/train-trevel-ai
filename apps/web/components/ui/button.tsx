import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' };

export function Button({ className, variant = 'default', ...props }: Props) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2',
        variant === 'default' && 'bg-black text-white hover:bg-black/90',
        variant === 'outline' && 'border border-input hover:bg-slate-50',
        className
      )}
      {...props}
    />
  );
}

