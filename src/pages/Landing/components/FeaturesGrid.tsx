import {
  UserGroupIcon,
  PlayIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon as MagnifyingGlassOutline } from "@heroicons/react/24/outline";

const FeaturesGrid = () => {
  const features = [
    {
      icon: UserGroupIcon,
      title: "Connect & Collaborate",
      desc: "Create teams, chat, and discuss topics that matter to you.",
    },
    {
      icon: MagnifyingGlassOutline,
      title: "Discover Your Circle",
      desc: "Follow trending profiles or connect with your favorites.",
    },
    {
      icon: PlayIcon,
      title: "Catch the Moment",
      desc: "View what your friends and followers are sharing right now.",
    },
    {
      icon: StarIcon,
      title: "Today's Top Picks",
      desc: "Explore trending profiles and find your next inspiration.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-gray-200 dark:border-white/10">
      <div className="grid md:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="space-y-3 hover:bg-gray-50 dark:hover:bg-white/5 p-4 rounded-2xl transition-colors cursor-default"
          >
            <feature.icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
