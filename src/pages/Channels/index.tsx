import { GlobeAltIcon, PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const Channels = () => {
  const channels = [
    {
      id: 1,
      name: "General Prayer",
      description: "A place for general prayer requests and support",
      members: 156,
      isJoined: true,
    },
    {
      id: 2,
      name: "Youth Ministry",
      description: "Prayer and fellowship for young believers",
      members: 89,
      isJoined: true,
    },
    {
      id: 3,
      name: "Healing & Recovery",
      description: "Prayers for physical and emotional healing",
      members: 234,
      isJoined: false,
    },
    {
      id: 4,
      name: "Family & Relationships",
      description: "Support for family matters and relationships",
      members: 178,
      isJoined: false,
    },
    {
      id: 5,
      name: "Career & Purpose",
      description: "Guidance for career decisions and finding purpose",
      members: 112,
      isJoined: true,
    },
  ];

  return (
    <div className="p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Channels
            </h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#e68200] hover:bg-[#e68200]/90 text-white font-medium rounded-lg transition-colors">
              <PlusIcon className="h-5 w-5" />
              <span>Create Channel</span>
            </button>
          </div>

          {/* Joined Channels */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
              Your Channels
            </h2>
            <div className="space-y-4">
              {channels
                .filter((c) => c.isJoined)
                .map((channel) => (
                  <div
                    key={channel.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-[#e68200] dark:hover:border-[#e68200] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#e68200]/10 flex items-center justify-center">
                        <GlobeAltIcon className="h-6 w-6 text-[#e68200]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {channel.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {channel.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <UserGroupIcon className="h-4 w-4" />
                          <span>{channel.members} members</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Discover Channels */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
              Discover Channels
            </h2>
            <div className="space-y-4">
              {channels
                .filter((c) => !c.isJoined)
                .map((channel) => (
                  <div
                    key={channel.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <GlobeAltIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {channel.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {channel.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <UserGroupIcon className="h-4 w-4" />
                          <span>{channel.members} members</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-[#e68200] hover:bg-[#e68200]/10 rounded-lg transition-colors">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Channels;

