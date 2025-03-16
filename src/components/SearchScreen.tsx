import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Upload, Clock, ArrowRight, TrendingUp, Briefcase, MapPin, Sparkles, Lightbulb, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/Button';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Textarea } from './ui/Input';
import type { SearchHistory } from '../types';

interface SmartRole {
  id: string;
  title: string;
  experience: string;
  salary: string;
  skills: string[];
  basedOn: string;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      // Handle file upload logic here
      console.log(acceptedFiles);
    }
  });

  // Define recentSearches data
  const recentSearches: SearchHistory[] = [
    { id: '1', query: 'React developers in Bangalore with 5+ years experience', timestamp: '2024-03-10', resultCount: 156 },
    { id: '2', query: 'Java developers in Mumbai', timestamp: '2024-03-09', resultCount: 234 },
    { id: '3', query: 'Product managers in Delhi NCR', timestamp: '2024-03-08', resultCount: 89 },
  ];

  // Define smartRoles data
  const smartRoles: SmartRole[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      experience: '5-8 years',
      salary: '25-35 LPA',
      skills: ['React', 'TypeScript', 'Redux', 'Webpack', 'Jest'],
      basedOn: 'React developers with 5+ years of experience in Bangalore'
    },
    {
      id: '2',
      title: 'Full Stack Java Developer',
      experience: '3-6 years',
      salary: '18-28 LPA',
      skills: ['Java', 'Spring Boot', 'Microservices', 'React', 'AWS'],
      basedOn: 'Java developers with cloud experience in Delhi NCR'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search-results', { state: { query: searchQuery } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-7xl mx-auto pt-16 px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Search candidates with Naukri AI
          </h1>
          <p className="text-lg text-gray-700">
            Search through millions of verified Indian professionals
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Search Candidates and Quick Searches */}
          <div className="w-full md:w-7/12 flex flex-col gap-8">
            {/* Search Candidates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              
              <Card className="overflow-hidden border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
                  <h2 className="text-2xl font-semibold text-blue-800">Search Candidates</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSearch}>
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your ideal candidate:</label>
                      <Textarea
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Describe the candidate you're looking for... (e.g., 'Senior React Developer with 5+ years of experience in Bangalore')"
                        className="w-full h-32 resize-none text-base border-2 focus:border-blue-500 focus:ring-blue-500"
                        fullWidth
                      />
                    </div>

                    <div className="mb-6">
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                          isDragActive 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center">
                          <Upload size={32} className="text-blue-600 mb-2" />
                          <p className="font-medium text-gray-700">
                            Drag & drop your Job Description or requirements
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Supports PDF and Word documents
                          </p>
                          <Button 
                            variant="outline" 
                            type="button"
                            className="mt-4"
                          >
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={Search}
                      fullWidth
                      disabled={!searchQuery.trim()}
                      className="bg-blue-700 hover:bg-blue-800 py-3 text-lg shadow-md"
                    >
                      Search Candidates
                    </Button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Sparkles size={14} className="text-blue-500" />
                      <span>Powered by AI to find the best talent match</span>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Searches by Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Quick Searches by Category</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg text-left transition-colors group">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-700 group-hover:bg-blue-200 transition-colors">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <p className="font-medium">Tech & Engineering</p>
                        <p className="text-sm text-gray-500">1.2M+ profiles</p>
                      </div>
                    </button>
                    
                    <button className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg text-left transition-colors group">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-700 group-hover:bg-blue-200 transition-colors">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="font-medium">Remote Workers</p>
                        <p className="text-sm text-gray-500">450K+ profiles</p>
                      </div>
                    </button>
                    
                    <button className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg text-left transition-colors group">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-700 group-hover:bg-blue-200 transition-colors">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <p className="font-medium">MBA Graduates</p>
                        <p className="text-sm text-gray-500">320K+ profiles</p>
                      </div>
                    </button>

                    <button className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg text-left transition-colors group">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-700 group-hover:bg-blue-200 transition-colors">
                        <DollarSign size={24} />
                      </div>
                      <div>
                        <p className="font-medium">Finance & Banking</p>
                        <p className="text-sm text-gray-500">280K+ profiles</p>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right column - Recent Searches and Smart Roles */}
          <div className="w-full md:w-5/12 flex flex-col gap-8">
            {/* Recent Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <Clock size={20} className="text-blue-600" />
                  <h2 className="text-xl font-semibold">Recent Searches</h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentSearches.map((search) => (
                    <div
                      key={search.id}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors"
                      onClick={() => navigate('/search-results', { state: { query: search.query } })}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 font-medium">{search.query}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Clock size={14} />
                            <span>{search.timestamp}</span>
                            <span>•</span>
                            <span>{search.resultCount} candidates</span>
                          </div>
                        </div>
                        <ArrowRight
                          size={18}
                          className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Smart Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader className="flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-600" />
                  <div>
                    <h2 className="text-xl font-semibold">Smart Roles</h2>
                    <p className="text-sm text-gray-500 mt-1">Intelligently created roles based on your activity</p>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {smartRoles.map((role, index) => (
                    <div
                      key={role.id}
                      className={`p-5 ${index === 0 ? '' : 'border-t border-gray-100'} hover:bg-gray-50 transition-colors`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <h3 className="font-semibold text-lg">{role.title}</h3>
                          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                            <Sparkles size={12} />
                            AI-generated
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-1.5">
                            <Briefcase size={16} className="text-gray-500" />
                            <span className="text-gray-700 text-sm">{role.experience}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign size={16} className="text-gray-500" />
                            <span className="text-gray-700 text-sm">{role.salary}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {role.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                            {role.skills.length > 3 && (
                              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs">
                                +{role.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 mb-4 text-gray-600 text-xs">
                          <Lightbulb size={12} />
                          <span>Based on: "{role.basedOn}"</span>
                        </div>

                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            icon={Sparkles}
                            size="sm"
                            className="flex-1"
                          >
                            AI recommendations
                          </Button>
                          <Button 
                            variant="primary" 
                            icon={Search}
                            size="sm"
                            className="flex-1"
                            onClick={() => navigate('/search-results', { state: { query: role.title } })}
                          >
                            Fill this role
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}