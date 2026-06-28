const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-slate-600 border-t-blue-500`} />
      {text && <p className="mt-3 text-sm text-slate-400">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
