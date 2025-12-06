export default function Loading() {
    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
