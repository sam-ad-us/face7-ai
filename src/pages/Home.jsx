import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

function Home({ credits, onGenerateImage }) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || credits === 0) return

    setIsLoading(true)
    onGenerateImage()

    // Simulate API call with timeout
    setTimeout(() => {
      const newImage = {
        id: Date.now(),
        url: `https://picsum.photos/400/400?random=${Date.now()}`,
        prompt: prompt
      }
      setGeneratedImages(prev => [newImage, ...prev])
      setIsLoading(false)
      setPrompt('')
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Transform Your Ideas into Art
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Enter a prompt and let our AI create stunning artwork for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            disabled={credits === 0}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || credits === 0 || isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>

      {credits === 0 && (
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-md mb-8">
          <p className="text-yellow-800 dark:text-yellow-200">
            Out of credits! Please contact us to buy more.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generatedImages.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm">{image.prompt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {generatedImages.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No images generated yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start by entering a prompt above
          </p>
        </div>
      )}
    </div>
  )
}

export default Home 