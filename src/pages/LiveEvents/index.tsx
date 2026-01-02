import { VideoCameraIcon, CalendarIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const LiveEvents = () => {
  const liveNow = [
    {
      id: 1,
      title: "Morning Prayer Session",
      host: "Pastor John",
      viewers: 45,
      thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=225&fit=crop",
    },
  ];

  const upcomingEvents = [
    {
      id: 2,
      title: "Evening Worship & Prayer",
      host: "Worship Team",
      date: "Today",
      time: "7:00 PM",
      attendees: 89,
    },
    {
      id: 3,
      title: "Bible Study: Book of James",
      host: "Pastor Sarah",
      date: "Tomorrow",
      time: "10:00 AM",
      attendees: 56,
    },
    {
      id: 4,
      title: "Youth Prayer Meeting",
      host: "Youth Ministry",
      date: "Dec 5",
      time: "6:00 PM",
      attendees: 34,
    },
  ];

  return (
    <div className="p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            Live Events
          </h1>

          {/* Live Now */}
          {liveNow.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Live Now
                </h2>
              </div>
              <div className="space-y-4">
                {liveNow.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-[#e68200] dark:hover:border-[#e68200] transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        LIVE
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/60 text-white text-sm rounded-lg">
                        <UserGroupIcon className="h-4 w-4" />
                        {event.viewers}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Hosted by {event.host}
                      </p>
                      <button className="mt-4 w-full py-2 bg-[#e68200] hover:bg-[#e68200]/90 text-white font-medium rounded-lg transition-colors">
                        Join Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e68200]/10 flex items-center justify-center flex-shrink-0">
                      <VideoCameraIcon className="h-6 w-6 text-[#e68200]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Hosted by {event.host}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <UserGroupIcon className="h-4 w-4" />
                          {event.attendees} attending
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-[#e68200] hover:bg-[#e68200]/10 rounded-lg transition-colors">
                      Remind Me
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {liveNow.length === 0 && upcomingEvents.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <VideoCameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No live events scheduled
              </p>
            </div>
          )}
        </div>
      </div>
  );
};

export default LiveEvents;

