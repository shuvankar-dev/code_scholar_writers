import { useState } from "react";
import SecureDocViewer from "../components/SecureDocViewer";

const SamplesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewingFile, setViewingFile] = useState<{ path: string; name: string } | null>(null);
  const [expandedSamples, setExpandedSamples] = useState<Set<number>>(new Set());

  const samples = [
    {
      category: "Academic Writing",
      title: "BPP Special Samples",
      description: "High-quality academic writing samples from BPP University projects",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      gradient: "from-purple-600 via-purple-500 to-pink-500",
      files: [
        { name: "BPP SAMPLE 1", path: "/Samples/BPP_SPECIAL_SAMPLES/BPP_SAMPLE_1.pdf" },
        { name: "BPP SAMPLE 2", path: "/Samples/BPP_SPECIAL_SAMPLES/BPP_SAMPLE_2.pdf" },
        { name: "BPP SAMPLE 4", path: "/Samples/BPP_SPECIAL_SAMPLES/BPP_SAMPLE_4.pdf" }
      ],
      color: "purple",
      available: true,
    },
    {
      category: "Academic Writing",
      title: "Dissertations Samples",
      description: "Comprehensive dissertation samples covering various disciplines",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
      files: [
        { name: "DISS SAMPLE 2", path: "/Samples/DISSERTATIONS_SAMPLES/DISS_SAMPLE_2.pdf" },
        { name: "DISS SAMPLE 3", path: "/Samples/DISSERTATIONS_SAMPLES/DISS_SAMPLE_3.pdf" },
        { name: "DISS SAMPLE 4", path: "/Samples/DISSERTATIONS_SAMPLES/DISS_SAMPLE_4.pdf" },
        { name: "DISS SAMPLE 6", path: "/Samples/DISSERTATIONS_SAMPLES/DISS_SAMPLE_6.pdf" },
        { name: "DISS SAMPLE 7", path: "/Samples/DISSERTATIONS_SAMPLES/DISS_SAMPLE_7.pdf" },
        { name: "DISSERTATION SAMPLE", path: "/Samples/DISSERTATIONS_SAMPLES/DISSERTATION_SAMPLE.pdf" }
      ],
      color: "blue",
      available: true,
    },
    {
      category: "Academic Writing",
      title: "Finance Samples",
      description: "Financial analysis and accounting project samples",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      gradient: "from-green-600 via-green-500 to-emerald-500",
      files: [
        { name: "FINANCE SAMPLE 2", path: "/Samples/FINANCE_SAMPLES/FINANCE_SAMPLE_2.pdf" },
        { name: "FINANCE SAMPLE DISS 1", path: "/Samples/FINANCE_SAMPLES/FINANCE_SAMPLE_DISS_1.pdf" },
        { name: "N-FINANCE SAMPLE 1", path: "/Samples/FINANCE_SAMPLES/N-FINANCE_SAMPLE_1.pdf" },
        { name: "N-FINANCE SAMPLE 3", path: "/Samples/FINANCE_SAMPLES/N-FINANCE_SAMPLE_3.pdf" }
      ],
      color: "green",
      available: true,
    },
    {
      category: "Academic Writing",
      title: "Management Samples",
      description: "Strategic management and business analysis samples",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      gradient: "from-orange-600 via-orange-500 to-amber-500",
      files: [
        { name: "L MANAGEMENT SAMPLE 1", path: "/Samples/MANAGEMENT_SAMPLES/L_MANAGEMENT_SAMPLE_1.pdf" },
        { name: "L MANAGEMENT SAMPLE 2", path: "/Samples/MANAGEMENT_SAMPLES/L_MANAGEMENT_SAMPLE_2.pdf" },
        { name: "L MANAGEMENT SAMPLE 3", path: "/Samples/MANAGEMENT_SAMPLES/L_MANAGEMENT_SAMPLE_3.pdf" },
        { name: "L MANAGEMENT SAMPLE 4", path: "/Samples/MANAGEMENT_SAMPLES/L_MANAGEMENT_SAMPLE_4.pdf" },
        { name: "L MANAGEMENT SAMPLE 5", path: "/Samples/MANAGEMENT_SAMPLES/L_MANAGEMENT_SAMPLE_5.pdf" },
        { name: "MANAGEMENT SAMPLE 1", path: "/Samples/MANAGEMENT_SAMPLES/MANAGEMENT_SAMPLE_1.pdf" },
        { name: "MANAGEMENT SAMPLE 2", path: "/Samples/MANAGEMENT_SAMPLES/MANAGEMENT_SAMPLE_2.pdf" }
      ],
      color: "orange",
      available: true,
    },
    {
      category: "Programming",
      title: "Machine Learning",
      description: "Advanced ML projects with Python, TensorFlow, and PyTorch",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      gradient: "from-indigo-600 via-indigo-500 to-purple-500",
      files: [],
      color: "indigo",
      available: false,
    },
    {
      category: "Programming",
      title: "Android App Development",
      description: "Full-featured Android applications with modern architecture",
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      gradient: "from-green-600 via-green-500 to-lime-500",
      files: [],
      color: "green",
      available: false,
    },
    {
      category: "Programming",
      title: "Data Analysis",
      description: "Comprehensive data analysis projects with visualizations",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      gradient: "from-cyan-600 via-cyan-500 to-blue-500",
      files: [],
      color: "cyan",
      available: false,
    },
    {
      category: "Programming",
      title: "Academic Website",
      description: "Professional academic and portfolio websites",
      icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
      gradient: "from-rose-600 via-rose-500 to-pink-500",
      files: [],
      color: "rose",
      available: false,
    },
  ];

  const categories = ["All", "Academic Writing", "Programming"];

  const filteredSamples = selectedCategory === "All" 
    ? samples 
    : samples.filter(sample => sample.category === selectedCategory);

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.pdf')) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 384 512">
          <path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"/>
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    );
  };

  const handleViewFile = (filePath: string, fileName: string) => {
    setViewingFile({ path: filePath, name: fileName });
  };

  const handleCloseViewer = () => {
    setViewingFile(null);
  };

  const toggleExpandSample = (index: number) => {
    setExpandedSamples(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getDisplayedFiles = (files: typeof samples[0]['files'], index: number) => {
    const isExpanded = expandedSamples.has(index);
    return isExpanded ? files : files.slice(0, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <span className="px-4 py-1.5 text-sm font-semibold text-white">Premium Quality Samples</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Sample Works</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-6">
            Browse through our collection of high-quality academic and programming samples
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>100% Original</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>View Only</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Samples Grid - 3-4 columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSamples.map((sample, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-transparent transform hover:-translate-y-1"
            >
              {/* Gradient Header - Smaller */}
              <div className={`relative h-24 bg-gradient-to-r ${sample.gradient} p-4 flex items-center justify-between overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>
                <div className="relative flex-1 min-w-0 mr-2">
                  <div className="inline-flex items-center px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-1">
                    {sample.category}
                  </div>
                  <h3 className="text-base font-bold text-white truncate">{sample.title}</h3>
                </div>
                <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={sample.icon} />
                  </svg>
                </div>
              </div>

              {/* Content - Compact */}
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sample.description}</p>

                {/* Files List - Show only 1 initially */}
                <div className="space-y-2 mb-3">
                  {sample.available ? (
                    <>
                      {getDisplayedFiles(sample.files, index).map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg hover:from-gray-100 hover:to-gray-200/50 transition-all duration-300 group/file"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className={`w-8 h-8 bg-gradient-to-r ${sample.gradient} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                              {getFileIcon(file.name)}
                            </div>
                            <span className="text-gray-700 font-medium text-xs truncate">{file.name}</span>
                          </div>
                          <button 
                            onClick={() => handleViewFile(file.path, file.name)}
                            className="ml-2 px-2.5 py-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform group-hover/file:scale-105 flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-purple-600 border border-purple-200 hover:border-purple-400"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                            View
                          </button>
                        </div>
                      ))}
                      {sample.files.length > 1 && (
                        <button
                          onClick={() => toggleExpandSample(index)}
                          className={`w-full py-2.5 bg-gradient-to-r ${sample.gradient} text-white font-semibold text-sm rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2`}
                        >
                          {expandedSamples.has(index) ? (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
                              </svg>
                              Show Less
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                              </svg>
                              View All ({sample.files.length} Files)
                            </>
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <p className="text-gray-500 font-semibold text-sm mb-1">Coming Soon</p>
                      <p className="text-gray-400 text-xs">We will upload samples soon</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Premium Badge - Smaller */}
              <div className="absolute top-2 right-2 z-10">
                <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-white text-xs font-bold shadow-lg flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  PREMIUM
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Compact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>
          <div className="relative text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Need Custom Work?
            </h2>
            <p className="text-base text-gray-200 mb-6 max-w-2xl mx-auto">
              Our expert writers and developers can create custom academic papers and programming projects tailored to your requirements
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="px-6 py-3 bg-white text-purple-900 font-bold text-sm rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Get Started Now
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-bold text-sm rounded-xl border-2 border-white hover:bg-white/20 transition-all duration-300">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Secure Document Viewer Modal */}
      {viewingFile && (
        <SecureDocViewer
          filePath={viewingFile.path}
          fileName={viewingFile.name}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
};

export default SamplesPage;
