import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { 
  Lock, 
  User, 
  Trash2, 
  CheckCircle, 
  FolderKanban, 
  Mail, 
  Plus, 
  FileText, 
  ChevronRight, 
  LogOut, 
  Compass, 
  ShieldCheck, 
  Edit2, 
  LayoutDashboard 
} from 'lucide-react';

export default function Admin() {
  const { user, login, logout, loading: authLoading, error: authError } = useAuth();
  const { 
    getInquiries, updateInquiryStatus, deleteInquiry,
    getProjects, addProject, updateProject, deleteProject 
  } = useFirestore();

  // State Management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, inquiries, projects
  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);

  // Form State for Projects
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjId, setCurrentProjId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    category: 'Residential',
    description: '',
    year: '',
    location: '',
    mainImage: '',
    beforeImage: '',
    afterImage: '',
    area: '',
    structure: '',
    materials: ''
  });

  // Load inquiries and projects
  useEffect(() => {
    if (user) {
      const unsubInq = getInquiries((data) => setInquiries(data));
      const unsubProj = getProjects((data) => setProjects(data));
      return () => {
        unsubInq();
        unsubProj();
      };
    }
  }, [user]);

  // Auth Submit handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Clear credentials
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
    }
  };

  // Inquiry actions
  const handleMarkContacted = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Contacted' ? 'Unread' : 'Contacted';
    await updateInquiryStatus(id, nextStatus);
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      await deleteInquiry(id);
    }
  };

  // Project Actions
  const handleProjectEditClick = (proj) => {
    setIsEditing(true);
    setCurrentProjId(proj.id);
    setProjectForm({
      name: proj.name || '',
      category: proj.category || 'Residential',
      description: proj.description || '',
      year: proj.year || '',
      location: proj.location || '',
      mainImage: proj.mainImage || '',
      beforeImage: proj.beforeImage || '',
      afterImage: proj.afterImage || '',
      area: proj.specifications?.['Total Area'] || proj.specifications?.['Project Area'] || '',
      structure: proj.specifications?.['Structural Type'] || '',
      materials: proj.specifications?.['Primary Materials'] || ''
    });
    setActiveTab('projectForm');
  };

  const handleNewProjectClick = () => {
    setIsEditing(false);
    setCurrentProjId(null);
    setProjectForm({
      name: '',
      category: 'Residential',
      description: '',
      year: new Date().getFullYear().toString(),
      location: '',
      mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      area: '10,000 sq. ft.',
      structure: 'Reinforced Concrete skeleton',
      materials: 'Travertine, structural glass, steel'
    });
    setActiveTab('projectForm');
  };

  const handleProjectFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: projectForm.name,
      category: projectForm.category,
      description: projectForm.description,
      year: projectForm.year,
      location: projectForm.location,
      mainImage: projectForm.mainImage,
      beforeImage: projectForm.beforeImage,
      afterImage: projectForm.afterImage,
      specifications: {
        'Total Area': projectForm.area,
        'Structural Type': projectForm.structure,
        'Primary Materials': projectForm.materials
      }
    };

    try {
      if (isEditing && currentProjId) {
        await updateProject(currentProjId, payload);
        alert('Project updated successfully.');
      } else {
        await addProject(payload);
        alert('New project added successfully.');
      }
      setActiveTab('projects');
    } catch (err) {
      alert('Error saving project: ' + err.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        alert('Project deleted.');
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  // Auth Login Screen
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#080808] px-4 py-16">
        <div className="w-full max-w-md glassmorphism border border-gray-900 rounded-sm shadow-2xl p-8">
          <div className="text-center space-y-3 mb-8">
            <div className="h-12 w-12 mx-auto bg-charcoal-dark border border-gold-accent/25 rounded-full flex items-center justify-center text-gold-accent shadow-inner">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold font-serif uppercase tracking-widest text-white">
              Admin Login
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Secure Infrastructure Control
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6 text-sm text-gray-300">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nasr.infra@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Secret Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent transition-colors"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-red-500 font-semibold">{authError}</p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-gradient-to-r from-gold-hover via-gold-accent to-gold-light text-charcoal-dark font-sans font-bold text-xs uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-gold-accent/10"
            >
              {authLoading ? 'Verifying Credentials...' : 'Authenticate Access'}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-8 pt-4 border-t border-gray-900 text-center">
            <span className="text-[10px] text-gray-600 block uppercase font-bold tracking-widest">
              Demo Credentials:
            </span>
            <span className="text-[11px] text-gold-accent font-semibold block mt-1">
              nasr.infra@gmail.com / sanaullah@2002
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard layout once logged in
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col lg:flex-row text-sm">
      {/* Sidebar Nav */}
      <aside className="w-full lg:w-64 bg-charcoal-dark border-b lg:border-b-0 lg:border-r border-gray-950 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo brand / Admin Title */}
          <div>
            <span className="text-sm font-bold text-white font-serif uppercase tracking-wider block">
              Nasr Studio
            </span>
            <span className="text-[9px] font-bold text-gold-accent tracking-widest uppercase block mt-0.5">
              Control Center
            </span>
            <div className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-accent" />
              <span>Admin: {user.email}</span>
            </div>
          </div>

          {/* Buttons */}
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-sm font-semibold text-xs uppercase tracking-wider flex items-center space-x-3 transition-colors cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-gold-accent text-charcoal-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full text-left px-4 py-3 rounded-sm font-semibold text-xs uppercase tracking-wider flex items-center space-x-3 transition-colors cursor-pointer relative ${
                activeTab === 'inquiries' ? 'bg-gold-accent text-charcoal-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Inquiries</span>
              {inquiries.filter(i => i.status === 'Unread').length > 0 && (
                <span className="absolute right-3 bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                  {inquiries.filter(i => i.status === 'Unread').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-3 rounded-sm font-semibold text-xs uppercase tracking-wider flex items-center space-x-3 transition-colors cursor-pointer ${
                activeTab === 'projects' || activeTab === 'projectForm' ? 'bg-gold-accent text-charcoal-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderKanban className="h-4 w-4" />
              <span>Projects</span>
            </button>
          </nav>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="mt-8 px-4 py-3 border border-gray-900 text-gray-500 hover:text-red-500 hover:border-red-500/25 rounded-sm font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Panel</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 overflow-x-hidden">
        {/* Tab 1: Dashboard Analytics */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <h2 className="text-2xl font-bold font-serif text-white uppercase tracking-wider">
              Control Dashboard
            </h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glassmorphism p-6 rounded-sm border border-gray-900 space-y-2">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Total Client Inquiries
                </span>
                <div className="text-3xl font-bold text-white font-sans">
                  {inquiries.length}
                </div>
                <div className="text-xs text-gold-accent font-semibold">
                  {inquiries.filter(i => i.status === 'Unread').length} Pending review
                </div>
              </div>

              <div className="glassmorphism p-6 rounded-sm border border-gray-900 space-y-2">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Published Projects
                </span>
                <div className="text-3xl font-bold text-white font-sans">
                  {projects.length}
                </div>
                <div className="text-xs text-gray-400">
                  Across 5 architecture divisions
                </div>
              </div>

              <div className="glassmorphism p-6 rounded-sm border border-gray-900 space-y-2">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Database System
                </span>
                <div className="text-lg font-bold text-gold-accent uppercase tracking-widest mt-1">
                  Local Storage Mock
                </div>
                <div className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                  Real-time sync. Deploy Firestore to activate remote databases.
                </div>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-[#0c0c0c] border border-gray-900 rounded-sm p-6 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-serif">
                Recent Client Leads
              </h3>
              
              <div className="divide-y divide-gray-950 space-y-3.5">
                {inquiries.slice(0, 3).map((inq) => (
                  <div key={inq.id} className="pt-3.5 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gold-accent uppercase tracking-widest">
                        {inq.serviceRequired}
                      </span>
                      <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed max-w-2xl">
                        {inq.message}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded-sm ${
                      inq.status === 'Unread' ? 'bg-red-950 text-red-400' : 'bg-green-950 text-green-400'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                ))}
                {inquiries.length === 0 && (
                  <p className="text-xs text-gray-500 font-light py-4 text-center">No inquiry leads received yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inquiries View */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-white uppercase tracking-wider">
              Client Inquiries
            </h2>

            <div className="overflow-x-auto bg-[#0c0c0c] border border-gray-900 rounded-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal-dark/50 border-b border-gray-900 text-xs text-gray-400 uppercase font-semibold">
                    <th className="px-6 py-4.5">Client / Date</th>
                    <th className="px-6 py-4.5">Requested Service</th>
                    <th className="px-6 py-4.5">Inquiry Details</th>
                    <th className="px-6 py-4.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-950 text-xs text-gray-300">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 space-y-1">
                        <span className="font-bold text-white block text-sm">{inq.name}</span>
                        <span className="text-gray-500 block">{inq.phone}</span>
                        <span className="text-gray-500 block">{inq.email}</span>
                        <span className="text-[10px] text-gold-accent font-semibold block pt-0.5">
                          {new Date(inq.timestamp).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gold-accent">
                        {inq.serviceRequired}
                      </td>
                      <td className="px-6 py-4 font-light leading-relaxed max-w-xs sm:max-w-md break-words">
                        {inq.message}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2.5">
                          <button
                            onClick={() => handleMarkContacted(inq.id, inq.status)}
                            className={`p-2 rounded border transition-colors cursor-pointer ${
                              inq.status === 'Contacted' 
                                ? 'border-green-600/30 text-green-400 bg-green-950/20' 
                                : 'border-gray-800 text-gray-400 hover:text-white hover:border-gray-500'
                            }`}
                            title={inq.status === 'Contacted' ? "Mark Unread" : "Mark Contacted"}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-2 border border-gray-800 text-gray-400 hover:text-red-500 hover:border-red-500/25 rounded transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-10 text-gray-500 italic font-light">
                        No client submissions in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Projects CRUD */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-serif text-white uppercase tracking-wider">
                Manage Portfolio
              </h2>
              <button
                onClick={handleNewProjectClick}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-gold-hover to-gold-accent text-charcoal-dark font-sans font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="bg-[#0c0c0c] border border-gray-900 rounded-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal-dark/50 border-b border-gray-900 text-xs text-gray-400 uppercase font-semibold">
                    <th className="px-6 py-4.5">Project Details</th>
                    <th className="px-6 py-4.5">Zoning Category</th>
                    <th className="px-6 py-4.5">Specifications</th>
                    <th className="px-6 py-4.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-950 text-xs text-gray-300">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 flex items-center space-x-4">
                        <img 
                          src={proj.mainImage} 
                          alt={proj.name} 
                          className="h-14 w-20 object-cover rounded border border-gray-800 bg-charcoal-dark shrink-0" 
                        />
                        <div className="space-y-1">
                          <span className="font-bold text-white block text-sm">{proj.name}</span>
                          <span className="text-gray-500 block text-xs">{proj.location} | Year: {proj.year}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gold-accent uppercase text-[10px] tracking-wider">
                        {proj.category}
                      </td>
                      <td className="px-6 py-4 space-y-1 text-[11px] text-gray-400 font-light">
                        <div>Area: {proj.specifications?.['Total Area'] || proj.specifications?.['Project Area'] || 'N/A'}</div>
                        <div>skeletons: {proj.specifications?.['Structural Type'] || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2.5">
                          <button
                            onClick={() => handleProjectEditClick(proj)}
                            className="p-2 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-500 rounded transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 border border-gray-800 text-gray-400 hover:text-red-500 hover:border-red-500/25 rounded transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Project Form (Add/Edit Mode) */}
        {activeTab === 'projectForm' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="text-2xl font-bold font-serif text-white uppercase tracking-wider">
              {isEditing ? 'Modify Legacy Asset' : 'Add Legacy Asset'}
            </h2>

            <form onSubmit={handleProjectFormSubmit} className="bg-[#0c0c0c] border border-gray-900 p-6 sm:p-8 rounded-sm space-y-6 text-sm text-gray-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                    placeholder="e.g. Aurum Premium Villas"
                    className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Portfolio Category *
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent transition-colors"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Urban Development">Urban Development</option>
                    <option value="Elevation Designs">Elevation Designs</option>
                    <option value="Interiors">Interiors</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Physical Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                    placeholder="e.g. Skyline Avenue, CA"
                    className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Completion Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({...projectForm, year: e.target.value})}
                    placeholder="e.g. 2025"
                    className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Structural Description *
                </label>
                <textarea
                  required
                  rows="4"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  placeholder="Outline spatial configurations, solar-deflection factors, thermal comfort..."
                  className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent placeholder-gray-600 transition-colors resize-none"
                />
              </div>

              {/* Technical specs block */}
              <div className="space-y-4 pt-4 border-t border-gray-950">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gold-accent">
                  Technical Specifications (Specs)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1.5">
                      Total Area
                    </label>
                    <input
                      type="text"
                      value={projectForm.area}
                      onChange={(e) => setProjectForm({...projectForm, area: e.target.value})}
                      placeholder="e.g. 14,000 sq. ft."
                      className="w-full px-3 py-2 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1.5">
                      Structure Type
                    </label>
                    <input
                      type="text"
                      value={projectForm.structure}
                      onChange={(e) => setProjectForm({...projectForm, structure: e.target.value})}
                      placeholder="e.g. Composite steel concrete"
                      className="w-full px-3 py-2 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1.5">
                      Primary Materials
                    </label>
                    <input
                      type="text"
                      value={projectForm.materials}
                      onChange={(e) => setProjectForm({...projectForm, materials: e.target.value})}
                      placeholder="e.g. Travertine, Timber, Low-E glass"
                      className="w-full px-3 py-2 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Image Links */}
              <div className="space-y-4 pt-4 border-t border-gray-950">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gold-accent">
                  Image Assets & Before/After Slider Links
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1.5">
                      Primary Showcase Image URL
                    </label>
                    <input
                      type="url"
                      required
                      value={projectForm.mainImage}
                      onChange={(e) => setProjectForm({...projectForm, mainImage: e.target.value})}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2.5 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1.5">
                        Before Construction (Raw Site/Skeleton) Image URL
                      </label>
                      <input
                        type="url"
                        value={projectForm.beforeImage}
                        onChange={(e) => setProjectForm({...projectForm, beforeImage: e.target.value})}
                        className="w-full px-3 py-2.5 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1.5">
                        After Construction (Completed facade) Image URL
                      </label>
                      <input
                        type="url"
                        value={projectForm.afterImage}
                        onChange={(e) => setProjectForm({...projectForm, afterImage: e.target.value})}
                        className="w-full px-3 py-2.5 bg-[#121212] border border-gray-800 rounded-sm text-white focus:outline-none focus:border-gold-accent text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-950">
                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className="px-5 py-2.5 border border-gray-800 hover:border-gray-500 rounded-sm font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-hover to-gold-accent text-charcoal-dark font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all cursor-pointer"
                >
                  {isEditing ? 'Save Edits' : 'Publish Asset'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
