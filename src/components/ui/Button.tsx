import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        {
          // Variant styles
          'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800': variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300': variant === 'secondary',
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100': variant === 'outline',
          'text-gray-700 hover:bg-gray-100 active:bg-gray-200': variant === 'ghost',
          
          // Size styles
          'text-sm px-3 py-2 h-9': size === 'sm',
          'text-base px-4 py-2 h-10': size === 'md',
          'text-lg px-6 py-3 h-12': size === 'lg',
          
          // Width styles
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="mr-2" size={size === 'lg' ? 24 : size === 'md' ? 20 : 16} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="ml-2" size={size === 'lg' ? 24 : size === 'md' ? 20 : 16} />}
    </button>
  );
}