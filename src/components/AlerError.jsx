export default function AlerError({ message, onClose }) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <div className="flex items-center justify-between">
                <div>
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline ml-2">{message}</span>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-red-700 hover:text-red-900 ml-4"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    )
}