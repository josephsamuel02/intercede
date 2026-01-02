import { BellIcon } from "@heroicons/react/24/outline";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "John Doe",
      message: "liked your prayer request",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      user: "Jane Smith",
      message: "commented on your post",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "follow",
      user: "Mike Johnson",
      message: "started following you",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "mention",
      user: "Sarah Williams",
      message: "mentioned you in a prayer group",
      time: "Yesterday",
      read: true,
    },
  ];

  return (
    <div className="p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Notifications
            </h1>
            <button className="text-sm text-[#e68200] hover:text-[#e68200]/80 font-medium">
              Mark all as read
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No notifications yet
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                      !notification.read ? "bg-[#e68200]/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#e68200] flex items-center justify-center text-white font-bold flex-shrink-0">
                        {notification.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-gray-100">
                          <span className="font-semibold">{notification.user}</span>{" "}
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-[#e68200] flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
  );
};

export default Notifications;

