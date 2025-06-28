import { useState, useEffect } from 'react';

interface ArticlePreviewProps {
  url: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export function ArticlePreview({ url, title: providedTitle, description: providedDescription, imageUrl: providedImageUrl }: ArticlePreviewProps) {
  const [metadata, setMetadata] = useState({
    title: providedTitle || 'Article Link',
    description: providedDescription || 'Click to view the full article',
    imageUrl: providedImageUrl || ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        // In a real app, you would have a backend API that fetches and returns the metadata
        // For now, we'll use a placeholder service as an example
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          setMetadata({
            title: providedTitle || data.data.title || 'Article Link',
            description: providedDescription || data.data.description || 'Click to view the full article',
            imageUrl: providedImageUrl || (data.data.image ? data.data.image.url : '')
          });
        } else {
          throw new Error('Failed to fetch metadata');
        }
      } catch (err) {
        console.error('Error fetching article metadata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url, providedTitle, providedDescription, providedImageUrl]);
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {loading ? (
        <div className="w-full h-32 bg-gray-200 animate-pulse"></div>
      ) : metadata.imageUrl ? (
        <div className="w-full h-32 overflow-hidden">
          <img 
            src={metadata.imageUrl} 
            alt={metadata.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x200/e0f2fe/0369a1?text=Article+Preview';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center text-blue-500">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
      )}
      <div className="p-2 bg-white bg-opacity-90">
        <div className="font-medium text-blue-600 hover:underline truncate">
          {metadata.title}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {metadata.description}
        </p>
        <div className="text-xs text-gray-500 truncate mt-1">
          {url}
        </div>
      </div>
    </a>
  );
}
