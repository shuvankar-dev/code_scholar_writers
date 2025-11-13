import { useEffect, useRef } from 'react';

interface SecureDocViewerProps {
  filePath: string;
  fileName: string;
  onClose: () => void;
}

const SecureDocViewer = ({ filePath, fileName, onClose }: SecureDocViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 384 512">
                <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{fileName}</h3>
              <p className="text-white/80 text-sm">View Only - No Download</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
          <div className="flex items-center gap-2 text-yellow-800">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <p className="text-sm font-semibold">
              Protected Content: This is a view-only sample. Download is not available.
            </p>
          </div>
        </div>

        {/* Viewer Container */}
        <div
          ref={viewerRef}
          className="w-full h-[calc(100%-8rem)] relative bg-gray-100"
        >
          {/* Watermark Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-around">
              {[...Array(5)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-around">
                  {[...Array(3)].map((_, colIndex) => (
                    <div
                      key={colIndex}
                      className="text-gray-400/10 font-bold text-2xl transform rotate-[-45deg] whitespace-nowrap"
                      style={{ textShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                    >
                      CODESCHOLAR SAMPLE
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* PDF Viewer */}
          <iframe
            src={`${filePath}#toolbar=0`}
            className="w-full h-full border-0"
            title={fileName}
          />
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            <span className="font-semibold">View-Only Mode</span>
          </div>
          <div className="text-sm text-gray-500">
            Need this file? <a href="/contact" className="text-purple-600 hover:text-purple-700 font-semibold underline">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureDocViewer;
