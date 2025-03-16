import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div 
      className={clsx(
        'bg-white rounded-xl shadow-md border border-gray-100',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div 
      className={clsx(
        'p-6 border-b border-gray-100',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div 
      className={clsx(
        'p-6',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div 
      className={clsx(
        'p-6 border-t border-gray-100',
        className
      )}
    >
      {children}
    </div>
  );
}