function Loader() {
  return (
    <div className="flex min-h-[300px] items-center justify-center bg-black">
      <div className="flex flex-col items-center">

        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>

        <p className="mt-4 text-sm text-gray-400">
          Loading...
        </p>

      </div>
    </div>
  );
}

export default Loader;