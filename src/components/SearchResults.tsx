import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Eye,
  Check,
  RefreshCw,
  Code,
  Briefcase,
  DollarSign,
  Building,
  Edit,
  X,
  Upload,
  Star,
  StarHalf,
  Clock,
  Calendar,
  MapPin,
  SlidersHorizontal,
  BookOpen
} from 'lucide-react';

// Import these components from your own directory structure
// Adjust paths if needed
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import ChatAssistant from '../components/ChatAssistant';
import type { Candidate } from '../types';

// Define filter type
interface SelectFilter {
  name: string;
  type: 'select';
  options: string[];
  value: string;
}

interface MultiselectFilter {
  name: string;
  type: 'multiselect';
  options: string[];
  values: string[];
}

interface RangeFilter {
  name: string;
  type: 'range';
  min: number;
  max: number;
  step: number;
  value: [number, number];
}

type Filter = SelectFilter | MultiselectFilter | RangeFilter;

// Extracted parameters interface
interface ExtractedParameter {
  type: 'skill' | 'experience' | 'salary' | 'company';
  value: string;
  icon: React.ReactNode;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    experience: 5,
    currentCTC: '18 LPA',
    currentLocation: 'Bangalore',
    currentEmployer: 'TCS',
    previousEmployer: 'Infosys',
    education: 'B.Tech in Computer Science',
    preferredLocation: 'Bangalore, Hyderabad',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'Redux', 'Jest'],
    lastActive: '2 days ago',
    phone: '+91 98765 43210',
    email: 'priya.s@email.com',
    resume: '#',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    experience: 7,
    currentCTC: '24 LPA',
    currentLocation: 'Mumbai',
    currentEmployer: 'Wipro',
    previousEmployer: 'Tech Mahindra',
    education: 'M.Tech in Software Engineering',
    preferredLocation: 'Mumbai, Pune',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis', 'MySQL', 'Docker', 'AWS', 'Jenkins', 'JUnit'],
    lastActive: '1 day ago',
    phone: '+91 98765 43211',
    email: 'rahul.v@email.com',
    resume: '#',
  },
  {
    id: '3',
    name: 'Anjali Gupta',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    experience: 4,
    currentCTC: '15 LPA',
    currentLocation: 'Delhi',
    currentEmployer: 'HCL',
    previousEmployer: 'Cognizant',
    education: 'B.Tech in Information Technology',
    preferredLocation: 'Delhi NCR',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'React', 'TypeScript', 'Pytest'],
    lastActive: '3 days ago',
    phone: '+91 98765 43212',
    email: 'anjali.g@email.com',
    resume: '#',
  },
  {
    id: '4',
    name: 'Arjun Reddy',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    experience: 6,
    currentCTC: '22 LPA',
    currentLocation: 'Hyderabad',
    currentEmployer: 'Microsoft',
    previousEmployer: 'Amazon',
    education: 'M.S. in Computer Science',
    preferredLocation: 'Hyderabad, Bangalore',
    skills: ['C#', '.NET Core', 'Azure', 'SQL Server', 'React', 'TypeScript', 'Redis', 'Kubernetes', 'Docker', 'xUnit'],
    lastActive: '5 days ago',
    phone: '+91 98765 43213',
    email: 'arjun.r@email.com',
    resume: '#',
  },
  {
    id: '5',
    name: 'Neha Patel',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    experience: 8,
    currentCTC: '28 LPA',
    currentLocation: 'Pune',
    currentEmployer: 'Google',
    previousEmployer: 'Microsoft',
    education: 'B.Tech from IIT Bombay',
    preferredLocation: 'Pune, Mumbai',
    skills: ['Go', 'Kubernetes', 'Docker', 'AWS', 'gRPC', 'PostgreSQL', 'Redis', 'Prometheus', 'Grafana', 'Terraform'],
    lastActive: '1 day ago',
    phone: '+91 98765 43214',
    email: 'neha.p@email.com',
    resume: '#',
  },
  {
    id: '6',
    name: 'Vikram Singh',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    experience: 6,
    currentCTC: '21 LPA',
    currentLocation: 'Bangalore',
    currentEmployer: 'Flipkart',
    previousEmployer: 'Myntra',
    education: 'B.Tech in Computer Science',
    preferredLocation: 'Bangalore, Pune',
    skills: ['JavaScript', 'React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'AWS', 'Docker', 'Jest'],
    lastActive: '2 days ago',
    phone: '+91 97654 32109',
    email: 'vikram.s@email.com',
    resume: '#',
  },
  {
    id: '7',
    name: 'Deepa Mehta',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    experience: 4,
    currentCTC: '16 LPA',
    currentLocation: 'Delhi',
    currentEmployer: 'Adobe',
    previousEmployer: 'Accenture',
    education: 'Masters in Computer Applications',
    preferredLocation: 'Delhi, Noida',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'HTML', 'CSS', 'JavaScript', 'React', 'Sketch', 'Prototyping', 'User Research'],
    lastActive: '2 days ago',
    phone: '+91 97654 32108',
    email: 'deepa.m@email.com',
    resume: '#',
  },
  {
    id: '8',
    name: 'Karan Malhotra',
    photoUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919',
    experience: 7,
    currentCTC: '25 LPA',
    currentLocation: 'Pune',
    currentEmployer: 'Deloitte',
    previousEmployer: 'Capgemini',
    education: 'MBA in IT Management',
    preferredLocation: 'Pune, Mumbai',
    skills: ['Project Management', 'Agile', 'Scrum', 'JIRA', 'Confluence', 'Risk Management', 'Stakeholder Management', 'Budgeting', 'Resource Planning', 'PMI-ACP'],
    lastActive: '3 days ago',
    phone: '+91 97654 32107',
    email: 'karan.m@email.com',
    resume: '#',
  }
];

const initialFilters: Filter[] = [
  { 
    name: 'Location',
    type: 'select',
    options: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Noida', 'Gurgaon'],
    value: ''
  },
  {
    name: 'Experience',
    type: 'range',
    min: 0,
    max: 15,
    step: 1,
    value: [0, 15]
  },
  {
    name: 'Current CTC',
    type: 'range',
    min: 5,
    max: 60,
    step: 5,
    value: [5, 60]
  },
  {
    name: 'Skills',
    type: 'multiselect',
    options: ['React', 'Java', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Node.js', 'Angular', 'Vue.js', 'Spring Boot'],
    values: []
  },
  {
    name: 'Company',
    type: 'multiselect',
    options: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM', 'Microsoft', 'Google', 'Amazon', 'Meta', 'Oracle'],
    values: []
  },
  {
    name: 'Education',
    type: 'select',
    options: ['B.Tech', 'M.Tech', 'MCA', 'BCA', 'B.Sc', 'M.Sc', 'MBA'],
    value: ''
  },
  {
    name: 'Notice Period',
    type: 'select',
    options: ['Immediate', '15 Days', '30 Days', '60 Days', '90 Days'],
    value: ''
  },
  {
    name: 'Work Mode',
    type: 'select',
    options: ['Remote', 'Hybrid', 'On-site'],
    value: ''
  },
  {
    name: 'Job Type',
    type: 'select',
    options: ['Full Time', 'Contract', 'Freelance'],
    value: ''
  },
  {
    name: 'Last Active',
    type: 'select',
    options: ['Today', 'Last 3 days', 'Last week', 'Last month'],
    value: ''
  }
];

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || '';
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filter[]>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhone, setShowPhone] = useState<Record<string, boolean>>({});
  const [isEditPromptOpen, setIsEditPromptOpen] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(query);
  const [sortOption, setSortOption] = useState('relevance');
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const candidatesPerPage = 6;

  // Extract parameters from the search query
  const extractedParameters: ExtractedParameter[] = [
    { type: 'skill', value: 'React, TypeScript', icon: <Code size={16} className="text-blue-600" /> },
    { type: 'experience', value: '3-5 years', icon: <Briefcase size={16} className="text-green-600" /> },
    { type: 'salary', value: '15-25 LPA', icon: <DollarSign size={16} className="text-amber-600" /> },
    { type: 'company', value: 'Product-based', icon: <Building size={16} className="text-purple-600" /> },
  ];

  // Sort candidates
  const sortCandidates = (candidates: Candidate[]) => {
    const sorted = [...candidates];
    
    switch(sortOption) {
      case 'relevance':
        // Default order is already by relevance
        return sorted;
      case 'lastActive':
        // Simple sort by the substring of "days ago" (not ideal but works for demo)
        return sorted.sort((a, b) => {
          const daysA = parseInt(a.lastActive.split(' ')[0]);
          const daysB = parseInt(b.lastActive.split(' ')[0]);
          return daysA - daysB;
        });
      case 'expHighToLow':
        return sorted.sort((a, b) => b.experience - a.experience);
      case 'expLowToHigh':
        return sorted.sort((a, b) => a.experience - b.experience);
      case 'ctcHighToLow':
        return sorted.sort((a, b) => {
          const ctcA = parseInt(a.currentCTC.split(' ')[0]);
          const ctcB = parseInt(b.currentCTC.split(' ')[0]);
          return ctcB - ctcA;
        });
      case 'ctcLowToHigh':
        return sorted.sort((a, b) => {
          const ctcA = parseInt(a.currentCTC.split(' ')[0]);
          const ctcB = parseInt(b.currentCTC.split(' ')[0]);
          return ctcA - ctcB;
        });
      default:
        return sorted;
    }
  };

  const sortedCandidates = sortCandidates(mockCandidates);
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = sortedCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(sortedCandidates.length / candidatesPerPage);

  const toggleCandidateSelection = (candidateId: string) => {
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };

  const togglePhoneNumber = (candidateId: string) => {
    setShowPhone((prev) => ({
      ...prev,
      [candidateId]: !prev[candidateId]
    }));
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === currentCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(currentCandidates.map(c => c.id));
    }
  };

  const handleFilterChange = (
    index: number, 
    value: string | string[] | [number, number]
  ) => {
    const newFilters = [...filters];
    const filter = newFilters[index];
    
    if (filter.type === 'select') {
      (filter as SelectFilter).value = value as string;
    } else if (filter.type === 'multiselect') {
      (filter as MultiselectFilter).values = value as string[];
    } else if (filter.type === 'range') {
      (filter as RangeFilter).value = value as [number, number];
    }
    
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Reset to the first page
      setCurrentPage(1);
      setIsMobileFiltersOpen(false);
    }, 1500);
  };

  const handleUpdatePrompt = () => {
    setIsLoading(true);
    // Simulate API call with new search prompt
    setTimeout(() => {
      setIsLoading(false);
      setIsEditPromptOpen(false);
      // Here you would normally update the search results based on the new prompt
    }, 1500);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Check if any filters are active
  const hasActiveFilters = filters.some(filter => {
    if (filter.type === 'select') return filter.value !== '';
    if (filter.type === 'multiselect') return filter.values.length > 0;
    if (filter.type === 'range') {
      return filter.value[0] !== filter.min || filter.value[1] !== filter.max;
    }
    return false;
  });

  const getCandidateMatchScore = (candidate: Candidate) => {
    // This would be a real algorithm based on search params
    // For demo, we'll use a random score between 70-98%
    const baseScore = 70 + Math.floor(Math.random() * 28);
    return `${baseScore}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Search Results</h1>
              <p className="text-gray-600 mb-4">Showing results for: "{query}"</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                icon={Edit}
                onClick={() => setIsEditPromptOpen(true)}
              >
                Edit Search
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                icon={SlidersHorizontal}
                className="md:hidden"
                onClick={() => setIsMobileFiltersOpen(true)}
              >
                Filters
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                icon={ChevronLeft}
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
          
          {/* Extracted Parameters */}
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p className="text-sm text-gray-600 mb-2">We identified these parameters from your search:</p>
            <div className="flex flex-wrap gap-3">
              {extractedParameters.map((param, index) => (
                <div key={index} className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm">
                  <span className="mr-1.5">{param.icon}</span>
                  <span className="font-medium mr-1">{param.type === 'skill' ? 'Skills:' : param.type === 'experience' ? 'Experience:' : param.type === 'salary' ? 'Salary:' : 'Company:'}</span>
                  <span>{param.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">{mockCandidates.length} candidates found</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Filters - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`hidden md:block ${filtersCollapsed ? 'w-12' : 'w-72'} flex-shrink-0 transition-all duration-300`}
          >
            <Card className="sticky top-4">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!filtersCollapsed && <Filter size={20} />}
                  {!filtersCollapsed && <h2 className="font-semibold">Filters</h2>}
                </div>
                <div className="flex items-center gap-2">
                  {!filtersCollapsed && (
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-700"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                  )}
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltersCollapsed(!filtersCollapsed)}
                  >
                    {filtersCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                  </button>
                </div>
              </CardHeader>
              
              {!filtersCollapsed && (
                <CardContent className="space-y-6">
                  {filters.map((filter, index) => (
                    <div key={filter.name}>
                      <h3 className="text-sm font-medium mb-2">{filter.name}</h3>
                      {filter.type === 'select' && (
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={(filter as SelectFilter).value}
                          onChange={(e) => handleFilterChange(index, e.target.value)}
                        >
                          <option value="">Select {filter.name}</option>
                          {filter.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      )}
                      {filter.type === 'multiselect' && (
                        <div className="space-y-2">
                          {filter.options.map((option) => (
                            <label key={option} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300"
                                checked={(filter as MultiselectFilter).values.includes(option)}
                                onChange={(e) => {
                                  const values = [...(filter as MultiselectFilter).values];
                                  if (e.target.checked) {
                                    values.push(option);
                                  } else {
                                    const index = values.indexOf(option);
                                    if (index !== -1) values.splice(index, 1);
                                  }
                                  handleFilterChange(index, values);
                                }}
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {filter.type === 'range' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>{(filter as RangeFilter).value[0]}</span>
                            <span>{(filter as RangeFilter).value[1]}</span>
                          </div>
                          <input
                            type="range"
                            min={filter.min}
                            max={filter.max}
                            step={filter.step}
                            className="w-full accent-blue-600"
                            value={(filter as RangeFilter).value[1]}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              const minValue = (filter as RangeFilter).value[0];
                              handleFilterChange(index, [minValue, value]);
                            }}
                          />
                          <input
                            type="range"
                            min={filter.min}
                            max={filter.max}
                            step={filter.step}
                            className="w-full accent-blue-600"
                            value={(filter as RangeFilter).value[0]}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              const maxValue = (filter as RangeFilter).value[1];
                              handleFilterChange(index, [value, maxValue]);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={handleApplyFilters}
                    disabled={isLoading || !hasActiveFilters}
                    icon={Filter}
                  >
                    Refine Results
                  </Button>
                </CardContent>
              )}
            </Card>
          </motion.div>

          {/* Candidate List */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <select 
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="lastActive">Last Active</option>
                  <option value="expHighToLow">Experience (High to Low)</option>
                  <option value="expLowToHigh">Experience (Low to High)</option>
                  <option value="ctcHighToLow">CTC (High to Low)</option>
                  <option value="ctcLowToHigh">CTC (Low to High)</option>
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="select-all"
                    className="rounded border-gray-300"
                    checked={selectedCandidates.length === currentCandidates.length && currentCandidates.length > 0}
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm">Select All</label>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-between w-full sm:w-auto">
                <div className="flex-grow sm:flex-grow-0">
                  {selectedCandidates.length > 0 && (
                    <Button variant="primary">
                      Send Invite ({selectedCandidates.length})
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {currentCandidates.map((candidate) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative">
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div 
                          className="absolute -top-1 -left-1 w-5 h-5 bg-white rounded-full flex items-center justify-center cursor-pointer border border-gray-200"
                          onClick={() => toggleCandidateSelection(candidate.id)}
                        >
                          {selectedCandidates.includes(candidate.id) ? (
                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                          ) : null}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full px-2 py-0.5">
                          {getCandidateMatchScore(candidate)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div>
                            <h2 className="text-xl font-semibold">{candidate.name}</h2>
                            <p className="text-gray-600">
                              {candidate.experience} years • {candidate.currentCTC}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                            <Button 
                              variant="primary"
                              size="sm"
                              icon={Phone}
                              onClick={() => togglePhoneNumber(candidate.id)}
                            >
                              {showPhone[candidate.id] ? candidate.phone : "View phone number"}
                            </Button>
                            <Button 
                              variant="primary"
                              size="sm"
                              icon={Phone}
                              onClick={() => window.open(`tel:${candidate.phone}`)}
                            >
                              Call candidate
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              icon={Eye}
                              onClick={() => navigate(`/candidate/${candidate.id}`)}
                            >
                              View details
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Building size={14} />
                              Current
                            </p>
                            <p className="font-medium">{candidate.currentEmployer}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Building size={14} />
                              Previous
                            </p>
                            <p className="font-medium">{candidate.previousEmployer}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin size={14} />
                              Location
                            </p>
                            <p className="font-medium">{candidate.currentLocation}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <BookOpen size={14} />
                              Education
                            </p>
                            <p className="font-medium">{candidate.education}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 5).map((skill) => (
                            <span
                              key={skill}
                              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 5 && (
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              +{candidate.skills.length - 5} more
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Last active: {candidate.lastActive}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                              <Star size={14} />
                              <span>Save</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                              <Calendar size={14} />
                              <span>Schedule</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination - Bottom */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = idx + 1;
                    } else if (currentPage <= 3) {
                      pageNum = idx + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + idx;
                    } else {
                      pageNum = currentPage - 2 + idx;
                    }
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'border hover:bg-gray-50 transition-colors'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Filter size={18} />
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 space-y-6">
                {filters.map((filter, index) => (
                  <div key={filter.name}>
                    <h3 className="text-sm font-medium mb-2">{filter.name}</h3>
                    {filter.type === 'select' && (
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={(filter as SelectFilter).value}
                        onChange={(e) => handleFilterChange(index, e.target.value)}
                      >
                        <option value="">Select {filter.name}</option>
                        {filter.options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    {filter.type === 'multiselect' && (
                      <div className="space-y-2">
                        {filter.options.map((option) => (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              checked={(filter as MultiselectFilter).values.includes(option)}
                              onChange={(e) => {
                                const values = [...(filter as MultiselectFilter).values];
                                if (e.target.checked) {
                                  values.push(option);
                                } else {
                                  const index = values.indexOf(option);
                                  if (index !== -1) values.splice(index, 1);
                                }
                                handleFilterChange(index, values);
                              }}
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {filter.type === 'range' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>{(filter as RangeFilter).value[0]}</span>
                          <span>{(filter as RangeFilter).value[1]}</span>
                        </div>
                        <input
                          type="range"
                          min={filter.min}
                          max={filter.max}
                          step={filter.step}
                          className="w-full accent-blue-600"
                          value={(filter as RangeFilter).value[1]}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            const minValue = (filter as RangeFilter).value[0];
                            handleFilterChange(index, [minValue, value]);
                          }}
                        />
                        <input
                          type="range"
                          min={filter.min}
                          max={filter.max}
                          step={filter.step}
                          className="w-full accent-blue-600"
                          value={(filter as RangeFilter).value[0]}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            const maxValue = (filter as RangeFilter).value[1];
                            handleFilterChange(index, [value, maxValue]);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleApplyFilters}
                    disabled={isLoading || !hasActiveFilters}
                    className="flex-1"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Loading Overlay - only shown when isLoading is true */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
            <RefreshCw size={40} className="text-blue-600 animate-spin mb-4" />
            <p className="text-lg font-medium text-gray-800">Refining Results...</p>
            <p className="text-sm text-gray-600">Finding the best matches for you</p>
          </div>
        </div>
      )}
      
      {/* Edit Prompt Popup */}
      {isEditPromptOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 mx-4 relative">
            <button
              onClick={() => setIsEditPromptOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-xl font-semibold mb-4">Edit Your Search</h2>
            
            <div className="mb-4">
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the candidate you're looking for..."
              />
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 mb-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <div className="flex flex-col items-center">
                <Upload size={24} className="text-blue-600 mb-2" />
                <p className="text-gray-700">Drop your job description here</p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsEditPromptOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdatePrompt}
                disabled={!editedPrompt.trim()}
              >
                Update Search
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}