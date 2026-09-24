import React from 'react';
import { User } from 'firebase/auth';

interface GoogleSignInButtonProps {
  onSignIn: () => Promise<void>;
  isLoading?: boolean;
  currentUser?: User | null;
  onSignOut?: () => Promise<void>;
  className?: string;
  size?: 'sm' | 'md';
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSignIn,
  isLoading = false,
  currentUser,
  onSignOut,
  className = '',
  size = 'md'
}) => {
  if (currentUser) {
    return (
      <div className={`flex items-center space-x-2 text-xs ${className}`}>
        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-1.5 rounded-xl shadow-2xs">
          {currentUser.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt={currentUser.displayName || 'Google User'} 
              className="w-5 h-5 rounded-full border border-emerald-300"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
              {currentUser.email?.charAt(0).toUpperCase() || 'G'}
            </div>
          )}
          <div className="text-left">
            <div className="text-[11px] font-bold leading-tight truncate max-w-[140px] sm:max-w-[200px]">
              {currentUser.email}
            </div>
            <div className="text-[9px] text-emerald-700 font-medium">
              Google Sheets Terhubung ✓
            </div>
          </div>
        </div>

        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            className="px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-[11px] font-semibold border border-slate-200 transition-colors cursor-pointer"
            title="Keluar Google"
          >
            Ganti Akun
          </button>
        )}
      </div>
    );
  }

  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={onSignIn}
      disabled={isLoading}
      className={`gsi-material-button relative inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
        isSmall ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-xs sm:text-sm'
      } ${className}`}
    >
      <div className="flex items-center space-x-2.5">
        <svg 
          className={isSmall ? 'w-4 h-4' : 'w-4.5 h-4.5'} 
          viewBox="0 0 48 48"
        >
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
        <span>{isLoading ? 'Menghubungkan...' : 'Hubungkan Akun Google'}</span>
      </div>
    </button>
  );
};
