import { PlusCircle, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Skill Sharing</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search tutorials..."
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            <PlusCircle className="w-5 h-5" />
            Start Writing
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;