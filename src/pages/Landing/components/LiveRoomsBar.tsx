const LiveRoomsBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-200 dark:border-white/10 py-4 px-6 z-40 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="font-bold text-gray-900 dark:text-white">Live Rooms (6)</span>
          <span className="text-sm text-gray-500 dark:text-gray-500">Tuesday, December 12, 2024</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Room previews could go here */}
        </div>
      </div>
    </div>
  );
};

export default LiveRoomsBar;
