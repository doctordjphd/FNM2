export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">PAYMENT SUCCESSFUL!</h1>
          <p className="text-lg mb-6">Your seat has been reserved for Friday Night Magic at NJComicStop.</p>
          <p className="text-sm text-gray-600 mb-8">
            You will receive a confirmation email shortly. Please arrive 15 minutes early on your event date.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="block w-full bg-black text-white py-3 px-6 font-bold border-2 border-black hover:bg-gray-800 transition-colors"
          >
            BACK TO HOME
          </a>
          <p className="text-xs text-gray-500">Event Time: 8:30 PM - 10:30 PM every Friday</p>
        </div>
      </div>
    </div>
  )
}
