import CreateListForm from '@/components/CreateListForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            JustOnePlease
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create and share your gift wish lists with friends and family
          </p>
        </div>
        
        <CreateListForm />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="font-medium mb-2">Create your list</h3>
              <p className="text-gray-600 dark:text-gray-400">Add gifts you&apos;d love to receive</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="font-medium mb-2">Share the link</h3>
              <p className="text-gray-600 dark:text-gray-400">Send your list to friends and family</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-medium mb-2">Mark as bought</h3>
              <p className="text-gray-600 dark:text-gray-400">Others can claim gifts to avoid duplicates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
