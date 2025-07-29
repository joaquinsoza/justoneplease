import CreateListForm from '@/components/CreateListForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 sm:py-16 max-w-2xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            JustOnePlease
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-2">
            Create and share your gift wish lists with friends and family
          </p>
        </div>
        
        <CreateListForm />
        
        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">How it works</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 text-sm">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="font-semibold mb-2 text-base">Create your list</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Add gifts you&apos;d love to receive</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-semibold mb-2 text-base">Share the link</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Send your list to friends and family</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-semibold mb-2 text-base">Mark as bought</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Others can claim gifts to avoid duplicates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
