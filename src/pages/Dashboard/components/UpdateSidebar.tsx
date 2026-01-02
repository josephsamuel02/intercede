const UpdateSidebar = () => {
  return (
    <aside className="w-80 hidden lg:block p-4 bg-white dark:bg-gray-950">
      <div className="sticky top-4 space-y-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-50">Trending</h3>
          <div className="space-y-3">
            <a href="#" className="block px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <p className="text-sm text-gray-500 dark:text-gray-400">Trending in Technology</p>
              <p className="font-bold text-gray-900 dark:text-gray-50">#Intercede</p>
            </a>
            <a href="#" className="block px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <p className="text-sm text-gray-500 dark:text-gray-400">Trending in Community</p>
              <p className="font-bold text-gray-900 dark:text-gray-50">#IntersectionTeam</p>
            </a>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-50">Quick Updates</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>John Doe liked your post.</p>
            <p>Local Intersection Team mentioned you.</p>
            <p>New update available from Intersection Team.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UpdateSidebar;


