import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Download, 
  MessageSquare, 
  Building, 
  MapPin, 
  CalendarIcon, 
  Briefcase,
  Send,
  ArrowLeft,
  Bookmark,
  Share,
  Clock,
  BookOpen,
  Award,
  User
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Textarea } from '../components/ui/Input';
import type { Candidate, Comment } from '../types';

const mockCandidate: Candidate = {
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
  skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
  lastActive: '2 days ago',
  phone: '+91 98765 43210',
  email: 'priya.s@email.com',
  resume: '#',
};

const mockComments: Comment[] = [
  {
    id: '1',
    text: 'Excellent communication skills during the initial screening.',
    author: 'Rahul Kumar',
    timestamp: '2024-03-10T10:30:00Z',
  },
  {
    id: '2',
    text: 'Strong technical background, particularly in React ecosystem.',
    author: 'Anjali Desai',
    timestamp: '2024-03-09T15:45:00Z',
  },
];

export default function CandidateDetails() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Add comment logic would go here
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            icon={ArrowLeft}
            onClick={() => navigate(-1)}
          >
            Back to Search Results
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            {/* Header */}
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={mockCandidate.photoUrl}
                      alt={mockCandidate.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-semibold mb-2">{mockCandidate.name}</h1>
                        <p className="text-gray-600 mb-4">
                          {mockCandidate.experience} years of experience • {mockCandidate.currentCTC}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {mockCandidate.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="primary"
                          icon={Phone}
                        >
                          Call
                        </Button>
                        <Button
                          variant="primary"
                          icon={Mail}
                        >
                          Email
                        </Button>
                        <Button
                          variant="outline"
                          icon={Download}
                        >
                          Resume
                        </Button>
                        <Button
                          variant="outline"
                          icon={Bookmark}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          icon={Share}
                        >
                          Share
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                      <div className="flex items-center gap-2">
                        <Building className="text-blue-600" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Current Company</p>
                          <p className="font-medium">{mockCandidate.currentEmployer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-blue-600" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{mockCandidate.currentLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-blue-600" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Last Active</p>
                          <p className="font-medium">{mockCandidate.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card className="mb-8">
              <CardHeader className="flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold">Professional Summary</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Briefcase size={18} className="text-blue-600" />
                    Work Experience
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-2 border-blue-200 pl-4 relative">
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[6.5px] top-1"></div>
                      <p className="font-medium text-lg">{mockCandidate.currentEmployer}</p>
                      <p className="text-gray-700">Senior Software Engineer</p>
                      <p className="text-sm text-gray-500">2020 - Present (3 years)</p>
                      <p className="mt-2 text-gray-700">
                        Led a team of 4 developers in building a React-based dashboard for data visualization.
                        Implemented TypeScript for improved code quality and MongoDB for data storage.
                      </p>
                    </div>
                    <div className="border-l-2 border-blue-200 pl-4 relative">
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[6.5px] top-1"></div>
                      <p className="font-medium text-lg">{mockCandidate.previousEmployer}</p>
                      <p className="text-gray-700">Software Engineer</p>
                      <p className="text-sm text-gray-500">2018 - 2020 (2 years)</p>
                      <p className="mt-2 text-gray-700">
                        Worked on multiple projects using JavaScript frameworks. Contributed to the development
                        of RESTful APIs and improved application performance by 30%.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-600" />
                    Education
                  </h3>
                  <div className="border-l-2 border-blue-200 pl-4 relative">
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[6.5px] top-1"></div>
                    <p className="font-medium text-lg">Delhi Technical University</p>
                    <p className="text-gray-700">{mockCandidate.education}</p>
                    <p className="text-sm text-gray-500">2014 - 2018</p>
                    <p className="mt-2 text-gray-700">
                      Graduated with honors. Specialized in Software Engineering and Data Structures.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Award size={18} className="text-blue-600" />
                    Achievements
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                    <li>Won the "Best Developer" award at company hackathon (2022)</li>
                    <li>Published article on React performance optimization in Medium</li>
                    <li>Open source contributor to popular React libraries</li>
                    <li>Speaker at local JavaScript meetups</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* Additional Information */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold">Additional Information</h2>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Preferred Location</h3>
                  <p className="text-gray-700">{mockCandidate.preferredLocation}</p>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2">Notice Period</h3>
                  <p className="text-gray-700">30 days</p>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2">Work Model</h3>
                  <p className="text-gray-700">Hybrid (Remote + Office)</p>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2">Languages</h3>
                  <p className="text-gray-700">English, Hindi, Tamil</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-96"
          >
            {/* Contact Information */}
            <Card className="mb-6">
              <CardHeader className="flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold">Contact Information</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Phone size={18} className="text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{mockCandidate.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail size={18} className="text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{mockCandidate.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Comments Section */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold">Comments</h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddComment} className="mb-6">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="mb-3 resize-none h-24"
                    fullWidth
                  />
                  <Button 
                    type="submit" 
                    variant="primary"
                    icon={Send}
                    disabled={!newComment.trim()}
                  >
                    Add Comment
                  </Button>
                </form>

                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="border-b pb-4">
                      <p className="text-gray-700 mb-2">{comment.text}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span className="font-medium">{comment.author}</span>
                        <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}