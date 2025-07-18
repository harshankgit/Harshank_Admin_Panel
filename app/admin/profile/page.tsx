'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';
import { 
  Camera, 
  Mail, 
  MapPin, 
  Calendar, 
  Phone, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter,
  Star,
  Award,
  Code,
  Heart,
  Zap,
  Trophy,
  Target,
  TrendingUp,
  Users,
  Coffee,
  Music,
  Gamepad2,
  Book,
  Palette,
  Sparkles,
  Crown,
  Shield,
  Rocket,
  Brain,
  Edit,
  Save,
  X,
  Settings,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Eye,
  Share2,
  ChevronRight,
  Building,
  Clock,
  CheckCircle,
  Server,
  Database,
  Smartphone,
  Monitor,
  Layers,
  GitBranch,
  Terminal,
  Cpu,
  Workflow
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  
  // Calculate experience dynamically
  const startDate = new Date('2023-01-01'); // Started working in January 2023
  const currentDate = new Date();
  const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
  const years = Math.floor(monthsDiff / 12);
  const months = monthsDiff % 12;
  const experienceText = years > 0 ? `${years}.${months}+ years` : `${months} months`;

  const [profileData, setProfileData] = useState({
    firstName: 'Harshank',
    lastName: 'Kanungo',
    email: 'harshank.kanungo@example.com',
    phone: '8965992035',
    location: 'Indore, India',
    bio: 'Passionate Full-Stack Developer & AI Enthusiast. Creator of innovative web solutions with expertise in MERN stack and modern web technologies. Building the future of admin panels with AI-powered features.',
    website: 'https://harshank-portfolio.com',
    github: 'harshankkanungo',
    linkedin: 'harshank-kanungo',
    twitter: 'harshankdev',
    college: 'Medicaps University',
    degree: 'B.Tech Computer Science',
    graduationYear: '2024',
    cgpa: '8.0',
    experience: experienceText,
    skills: [
      { name: 'React.js', level: 95, category: 'Frontend' },
      { name: 'Node.js', level: 90, category: 'Backend' },
      { name: 'TypeScript', level: 88, category: 'Language' },
      { name: 'MongoDB', level: 87, category: 'Database' },
      { name: 'Express.js', level: 92, category: 'Backend' },
      { name: 'Next.js', level: 89, category: 'Frontend' },
      { name: 'JavaScript', level: 94, category: 'Language' },
      { name: 'Python', level: 82, category: 'Language' },
      { name: 'MySQL', level: 85, category: 'Database' },
      { name: 'AWS', level: 78, category: 'Cloud' },
      { name: 'Docker', level: 75, category: 'DevOps' },
      { name: 'Git', level: 91, category: 'Tools' }
    ],
    projects: [
      {
        id: '1',
        title: 'AI Admin Pro',
        description: 'Revolutionary admin panel with 15+ AI-powered features including voice control, gesture recognition, 3D visualization, blockchain integration, and real-time collaboration.',
        image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind CSS', 'AI/ML'],
        status: 'Live',
        liveUrl: '#',
        githubUrl: '#',
        features: ['AI Voice Control', '3D Data Visualization', 'Real-time Collaboration', 'Blockchain Integration', 'Neural Network Visualizer'],
        category: 'Full-Stack'
      },
      {
        id: '2',
        title: 'Pizza Point',
        description: 'Complete food ordering platform with real-time order tracking, payment integration, admin dashboard, and customer management system.',
        image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'Socket.io'],
        status: 'Live',
        liveUrl: '#',
        githubUrl: '#',
        features: ['Online Ordering', 'Payment Gateway', 'Order Tracking', 'Admin Dashboard', 'User Authentication'],
        category: 'E-commerce'
      },
      {
        id: '3',
        title: 'Echo Scrum',
        description: 'Agile project management tool with sprint planning, task tracking, team collaboration, and advanced reporting features.',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Express', 'WebSocket', 'Chart.js'],
        status: 'Live',
        liveUrl: '#',
        githubUrl: '#',
        features: ['Sprint Planning', 'Task Management', 'Team Collaboration', 'Reporting', 'Time Tracking'],
        category: 'Project Management'
      }
    ],
    achievements: [
      { title: 'AI Admin Pro Creator', description: 'Built revolutionary admin panel with 15+ AI features', icon: Crown, color: 'text-yellow-500' },
      { title: 'Full-Stack Expert', description: `${experienceText} of web development experience`, icon: Code, color: 'text-blue-500' },
      { title: 'MERN Stack Specialist', description: 'Expert in MongoDB, Express, React, Node.js', icon: Server, color: 'text-green-500' },
      { title: 'B.Tech Graduate', description: 'Computer Science from Medicaps University (8.0 CGPA)', icon: GraduationCap, color: 'text-purple-500' }
    ]
  });

  const [stats, setStats] = useState({
    projectsCompleted: 47,
    linesOfCode: 125000,
    coffeeConsumed: 892,
    hoursWorked: 3240
  });

  useEffect(() => {
    // Animate stats on load
    const interval = setInterval(() => {
      setStats(prev => ({
        projectsCompleted: Math.min(47, prev.projectsCompleted + 1),
        linesOfCode: Math.min(125000, prev.linesOfCode + 2500),
        coffeeConsumed: Math.min(892, prev.coffeeConsumed + 18),
        hoursWorked: Math.min(3240, prev.hoursWorked + 65)
      }));
    }, 100);

    setTimeout(() => clearInterval(interval), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    dispatch(addNotification({
      title: 'Profile Updated',
      message: 'Your profile information has been saved successfully',
      type: 'success',
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getSkillColor = (category: string) => {
    const colors = {
      'Frontend': 'bg-blue-500',
      'Backend': 'bg-green-500',
      'Language': 'bg-purple-500',
      'Database': 'bg-yellow-500',
      'Cloud': 'bg-orange-500',
      'DevOps': 'bg-red-500',
      'Tools': 'bg-gray-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-700 border-green-200';
      case 'Development': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Completed': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const skillCategories = ['Frontend', 'Backend', 'Language', 'Database', 'Cloud', 'DevOps', 'Tools'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Developer Profile
            </h1>
            <p className="text-muted-foreground">
              Personal information, portfolio, and professional details
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowPortfolio(!showPortfolio)}
              variant="outline"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
            >
              <Eye className="mr-2 h-4 w-4" />
              {showPortfolio ? 'Hide Portfolio' : 'View Portfolio'}
            </Button>
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-green-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl group-hover:scale-105 transition-all duration-300">
                  <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Harshank Kanungo" />
                  <AvatarFallback className="text-4xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    HK
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-110 transition-all duration-300"
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
                    <Crown className="h-3 w-3 mr-1" />
                    Creator
                  </Badge>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-xl text-muted-foreground mb-2">Full-Stack Developer & AI Innovator</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {profileData.experience} Experience
                  </Badge>
                  <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {profileData.cgpa} CGPA
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-6 max-w-2xl">{profileData.bio}</p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
                    <Mail className="h-3 w-3 mr-1" />
                    {profileData.email}
                  </Badge>
                  <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30">
                    <Phone className="h-3 w-3 mr-1" />
                    +91 {profileData.phone}
                  </Badge>
                  <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30">
                    <MapPin className="h-3 w-3 mr-1" />
                    {profileData.location}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold text-blue-700">{stats.projectsCompleted}</div>
              <p className="text-sm text-blue-600">Projects Completed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold text-green-700">{stats.linesOfCode.toLocaleString()}</div>
              <p className="text-sm text-green-600">Lines of Code</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Coffee className="h-8 w-8 mx-auto mb-2 text-yellow-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold text-yellow-700">{stats.coffeeConsumed}</div>
              <p className="text-sm text-yellow-600">Cups of Coffee</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold text-purple-700">{stats.hoursWorked.toLocaleString()}</div>
              <p className="text-sm text-purple-600">Hours Worked</p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Section */}
        {showPortfolio && (
          <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-indigo-500" />
                Professional Portfolio
                <Badge variant="outline" className="ml-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured Work
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="projects" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {profileData.projects.map((project) => (
                      <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 overflow-hidden">
                        <div className="relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className={getProjectStatusColor(project.status)}>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {project.status}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <Badge variant="outline" className="bg-white/90 text-gray-800">
                              {project.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-sm mb-2">Technologies:</h4>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {project.features.slice(0, 3).map((feature, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <ChevronRight className="h-3 w-3" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Live Demo
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Github className="h-3 w-3 mr-1" />
                                Code
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Code className="h-5 w-5 text-blue-500" />
                          Technical Skills
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {skillCategories.map((category) => {
                            const categorySkills = profileData.skills.filter(skill => skill.category === category);
                            if (categorySkills.length === 0) return null;
                            
                            return (
                              <div key={category} className="space-y-3">
                                <h4 className="font-medium text-sm flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${getSkillColor(category)}`}></div>
                                  {category}
                                </h4>
                                <div className="space-y-3">
                                  {categorySkills.map((skill) => (
                                    <div key={skill.name} className="space-y-2 group">
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">{skill.name}</span>
                                        <span className="text-sm font-bold text-purple-600">{skill.level}%</span>
                                      </div>
                                      <Progress 
                                        value={skill.level} 
                                        className="h-2 group-hover:h-3 transition-all duration-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-yellow-500" />
                          Expertise Areas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Monitor className="h-4 w-4 text-blue-500" />
                              Frontend Development
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              React.js, Next.js, TypeScript, Tailwind CSS, responsive design, modern UI/UX
                            </p>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Server className="h-4 w-4 text-green-500" />
                              Backend Development
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Node.js, Express.js, RESTful APIs, authentication, server architecture
                            </p>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Database className="h-4 w-4 text-yellow-500" />
                              Database Management
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              MongoDB, MySQL, database design, optimization, data modeling
                            </p>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Brain className="h-4 w-4 text-purple-500" />
                              AI Integration
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              AI-powered features, machine learning integration, intelligent automation
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-purple-500" />
                        Educational Background
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <Building className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-1">
                              {profileData.college}
                            </h3>
                            <p className="text-lg font-medium mb-2">{profileData.degree}</p>
                            <div className="flex items-center gap-4 mb-3">
                              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                <Calendar className="h-3 w-3 mr-1" />
                                Graduated {profileData.graduationYear}
                              </Badge>
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                <Star className="h-3 w-3 mr-1" />
                                {profileData.cgpa} CGPA
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">
                              Specialized in software development, data structures, algorithms, and modern web technologies. 
                              Completed projects in full-stack development, AI/ML, and database management.
                            </p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Core Subjects</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {[
                                  'Data Structures & Algorithms',
                                  'Database Management Systems',
                                  'Software Engineering',
                                  'Web Technologies',
                                  'Computer Networks',
                                  'Operating Systems',
                                  'Machine Learning',
                                  'Object-Oriented Programming'
                                ].map((subject, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">{subject}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Academic Highlights</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Trophy className="h-4 w-4 text-green-500" />
                                    <span className="font-medium text-green-700 dark:text-green-300">High Academic Performance</span>
                                  </div>
                                  <p className="text-sm text-green-600 dark:text-green-400">8.0 CGPA throughout the program</p>
                                </div>
                                
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Code className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium text-blue-700 dark:text-blue-300">Project Excellence</span>
                                  </div>
                                  <p className="text-sm text-blue-600 dark:text-blue-400">Multiple full-stack projects with industry standards</p>
                                </div>
                                
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Brain className="h-4 w-4 text-purple-500" />
                                    <span className="font-medium text-purple-700 dark:text-purple-300">Innovation Focus</span>
                                  </div>
                                  <p className="text-sm text-purple-600 dark:text-purple-400">Specialized in AI and modern web technologies</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {profileData.achievements.map((achievement, index) => {
                      const IconComponent = achievement.icon;
                      return (
                        <Card key={index} className="hover:scale-105 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 group-hover:scale-110 transition-all duration-300">
                                <IconComponent className={`h-6 w-6 ${achievement.color}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors duration-300">
                                  {achievement.title}
                                </h3>
                                <p className="text-muted-foreground">{achievement.description}</p>
                                <div className="mt-3">
                                  <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                                    <Trophy className="h-3 w-3 mr-1" />
                                    Achievement
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                        className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                        className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                    Education Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input 
                      id="college" 
                      value={profileData.college}
                      disabled={!isEditing}
                      className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree</Label>
                      <Input 
                        id="degree" 
                        value={profileData.degree}
                        disabled={!isEditing}
                        className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduation-year">Graduation Year</Label>
                      <Input 
                        id="graduation-year" 
                        value={profileData.graduationYear}
                        disabled={!isEditing}
                        className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA</Label>
                    <Input 
                      id="cgpa" 
                      value={profileData.cgpa}
                      disabled={!isEditing}
                      className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input 
                      id="experience" 
                      value={profileData.experience}
                      disabled
                      className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                    />
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Auto-calculated based on start date (updates monthly)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-green-500" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">Current Role</h4>
                  <p className="text-sm text-muted-foreground">
                    Full-Stack Developer specializing in MERN stack with {profileData.experience} of hands-on experience
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {['MERN Stack', 'AI Integration', 'Modern UI/UX', 'Database Design', 'API Development'].map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-white/50">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">Key Accomplishments</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Built AI Admin Pro with 15+ advanced features</li>
                    <li>• Developed multiple full-stack applications</li>
                    <li>• Expertise in modern web technologies</li>
                    <li>• Strong focus on user experience and performance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Social Media & Professional Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={profileData.website}
                    onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    disabled={!isEditing}
                    className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-gray-600" />
                      <Input 
                        id="github" 
                        value={profileData.github}
                        onChange={(e) => setProfileData(prev => ({ ...prev, github: e.target.value }))}
                        disabled={!isEditing}
                        className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      <Input 
                        id="linkedin" 
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                        disabled={!isEditing}
                        className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      <Input 
                        id="twitter" 
                        value={profileData.twitter}
                        onChange={(e) => setProfileData(prev => ({ ...prev, twitter: e.target.value }))}
                        disabled={!isEditing}
                        className={isEditing ? 'border-purple-300 focus:border-purple-500' : ''}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1 hover:bg-gray-50 transition-all duration-300">
                    <Github className="mr-2 h-4 w-4" />
                    View GitHub
                  </Button>
                  <Button variant="outline" className="flex-1 hover:bg-blue-50 transition-all duration-300">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect on LinkedIn
                  </Button>
                  <Button variant="outline" className="flex-1 hover:bg-blue-50 transition-all duration-300">
                    <Twitter className="mr-2 h-4 w-4" />
                    Follow on Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-500" />
                    Account Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your projects
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other developers
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Activity Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Show when you're online and active
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Two-Factor Authentication</span>
                      <Badge variant="default" className="ml-auto">Enabled</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Last Password Change</span>
                      <span className="text-sm text-muted-foreground ml-auto">2 weeks ago</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Last Login Location</span>
                      <span className="text-sm text-muted-foreground ml-auto">India</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Section */}
        <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Thank you for visiting my profile!
              </span>
              <Sparkles className="h-5 w-5 text-pink-500" />
            </div>
            <p className="text-muted-foreground mb-4">
              Built with ❤️ by Harshank Kanungo • Powered by cutting-edge technology and passion for innovation
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                <Rocket className="h-3 w-3 mr-1" />
                {profileData.experience} Experience
              </Badge>
              <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                <Star className="h-3 w-3 mr-1" />
                {profileData.cgpa} CGPA Graduate
              </Badge>
              <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                <Code className="h-3 w-3 mr-1" />
                MERN Stack Expert
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}