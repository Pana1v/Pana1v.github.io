import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DATA as INITIAL_DATA, DataStructure, Experience, Education, Project, Blog, OpenSourceContribution } from '../data';
import { Plus, Trash2, Save, Download, LayoutDashboard, Briefcase, FolderCode, BookOpen, X, Check, Wrench, Github, RotateCcw, HardDrive, User } from 'lucide-react';

export function Dashboard({ data, onUpdate, onClose }: { data: DataStructure, onUpdate: (newData: DataStructure) => void, onClose: () => void }) {
  const [localData, setLocalData] = useState(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'education' | 'projects' | 'blogs' | 'skills' | 'openSource'>('profile');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [wroteFile, setWroteFile] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');

  const handleExport = () => {
    const code = `import { DataStructure } from './types';

export const DATA: DataStructure = ${JSON.stringify(localData, null, 2)};`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onUpdate(localData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleWriteFile = async () => {
    setWroteFile('saving');
    try {
      const res = await fetch('/__api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localData),
      });
      if (!res.ok) throw new Error('Failed to write');
      onUpdate(localData);
      setWroteFile('done');
      setTimeout(() => setWroteFile('idle'), 2500);
    } catch {
      setWroteFile('error');
      setTimeout(() => setWroteFile('idle'), 3000);
    }
  };

  const handleReset = () => {
    if (confirm("Reset all changes to initial data? This will clear your local storage.")) {
      setLocalData(INITIAL_DATA);
      onUpdate(INITIAL_DATA);
    }
  };

  const updateProfile = (field: string, value: string) => {
    setLocalData({ ...localData, [field]: value });
  };

  const updateContact = (field: string, value: string) => {
    setLocalData({ ...localData, contact: { ...localData.contact, [field]: value } });
  };

  const addItem = (type: 'experience' | 'education' | 'projects' | 'blogs' | 'skills' | 'openSource') => {
    if (type === 'experience') {
      const newItem: Experience = {
        company: "New Company",
        role: "New Role",
        period: "2024 - Present",
        description: "Describe your responsibilities..."
      };
      setLocalData({ ...localData, experience: [newItem, ...localData.experience] });
    } else if (type === 'education') {
      const newItem: Education = {
        institution: "New Institution",
        degree: "New Degree",
        period: "2024 - Present",
        description: "Describe your studies..."
      };
      setLocalData({ ...localData, education: [newItem, ...localData.education] });
    } else if (type === 'projects') {
      const newItem: Project = {
        id: `project-${Date.now()}`,
        title: "New Project",
        description: "Describe your project...",
        tags: ["React", "TypeScript"],
        image: "https://picsum.photos/seed/new/800/600",
        status: "In Progress"
      };
      setLocalData({ ...localData, projects: [newItem, ...localData.projects] });
    } else if (type === 'blogs') {
      const newItem: Blog = {
        id: `blog-${Date.now()}`,
        title: "New Blog Post",
        date: new Date().toISOString().split('T')[0],
        excerpt: "Brief summary...",
        tags: ["Tech"],
        content: "# New Post\n\nWrite your content here..."
      };
      setLocalData({ ...localData, blogs: [newItem, ...localData.blogs] });
    } else if (type === 'skills') {
      setLocalData({ ...localData, skills: ["New Skill", ...localData.skills] });
    } else if (type === 'openSource') {
      const newItem: OpenSourceContribution = {
        title: "New Contribution",
        description: "Describe your contribution...",
        link: "https://github.com"
      };
      setLocalData({ ...localData, openSource: [newItem, ...localData.openSource] });
    }
  };

  const removeItem = (type: 'experience' | 'education' | 'projects' | 'blogs' | 'skills' | 'openSource', index: number) => {
    const newData = { ...localData };
    if (type === 'skills') {
      newData.skills.splice(index, 1);
    } else {
      (newData[type] as any[]).splice(index, 1);
    }
    setLocalData(newData);
  };

  const updateItem = (type: 'experience' | 'education' | 'projects' | 'blogs' | 'skills' | 'openSource', index: number, field: string, value: any) => {
    const newData = { ...localData };
    if (type === 'skills') {
      newData.skills[index] = value;
    } else {
      (newData[type] as any[])[index][field] = value;
    }
    setLocalData(newData);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden border-2 border-primary bg-card shadow-[16px_16px_0px_0px_rgba(var(--primary-rgb),0.2)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-primary bg-muted/50 px-6 py-4">
          <div className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-widest">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            PORTFOLIO_CMS // CONTENT_MANAGEMENT
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              title="Reset to Initial Data"
              className="flex items-center gap-2 border-2 border-destructive/50 bg-destructive/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-destructive transition-all hover:bg-destructive hover:text-white"
            >
              <RotateCcw className="h-3 w-3" />
              RESET
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 border-2 border-primary bg-primary px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 active:scale-95"
            >
              {saved ? <Check className="h-3 w-3" /> : <Save className="h-3 w-3" />}
              {saved ? 'SAVED_LOCALLY' : 'SAVE_CHANGES'}
            </button>
            <button
              onClick={handleWriteFile}
              disabled={wroteFile === 'saving'}
              className="flex items-center gap-2 border-2 border-accent bg-accent/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            >
              {wroteFile === 'done' ? <Check className="h-3 w-3" /> : <HardDrive className="h-3 w-3" />}
              {wroteFile === 'idle' && 'WRITE_TO_FILE'}
              {wroteFile === 'saving' && 'WRITING...'}
              {wroteFile === 'done' && 'WRITTEN_TO_DATA.TS'}
              {wroteFile === 'error' && 'FAILED_(DEV_ONLY)'}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 border-2 border-primary/50 bg-muted px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              {copied ? <Check className="h-3 w-3" /> : <Download className="h-3 w-3" />}
              {copied ? 'COPIED' : 'EXPORT_CODE'}
            </button>
            <button onClick={onClose} className="text-muted-foreground hover:text-primary">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Sidebar & Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-64 border-r-2 border-primary bg-muted/20 p-4 space-y-2">
            {([
              { key: 'profile', icon: User, label: 'Profile' },
              { key: 'projects', icon: FolderCode, label: 'Projects' },
              { key: 'skills', icon: Wrench, label: 'Skills' },
              { key: 'openSource', icon: Github, label: 'Open Source' },
              { key: 'experience', icon: Briefcase, label: 'Experience' },
              { key: 'education', icon: BookOpen, label: 'Education' },
              { key: 'blogs', icon: BookOpen, label: 'Blogs' },
            ] as const).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex w-full items-center gap-3 border-2 p-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === key ? 'border-primary bg-primary/10 text-primary' : 'border-transparent hover:bg-muted'}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'profile' ? (
              <>
                <div className="mb-8 border-b border-border pb-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Profile & Contact</h2>
                </div>
                <div className="space-y-8">
                  <div className="border-2 border-border bg-muted/30 p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                        <input value={localData.name} onChange={(e) => updateProfile('name', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                        <input value={localData.title} onChange={(e) => updateProfile('title', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bio</label>
                        <textarea value={localData.bio} onChange={(e) => updateProfile('bio', e.target.value)} className="h-24 w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Profile Photo URL</label>
                        <input value={localData.profilePhoto} onChange={(e) => updateProfile('profilePhoto', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-border bg-muted/30 p-6">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                        <input value={localData.contact.email} onChange={(e) => updateContact('email', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</label>
                        <input value={localData.contact.location} onChange={(e) => updateContact('location', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">GitHub (e.g. github.com/user)</label>
                        <input value={localData.contact.github} onChange={(e) => updateContact('github', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">LinkedIn (e.g. linkedin.com/in/user)</label>
                        <input value={localData.contact.linkedin} onChange={(e) => updateContact('linkedin', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Manage {activeTab}</h2>
                  <button
                    onClick={() => addItem(activeTab as any)}
                    className="flex items-center gap-2 border-2 border-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    Add_New_Entry
                  </button>
                </div>

                <div className="space-y-8">
                  {activeTab === 'skills' ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {localData.skills.map((skill, index) => (
                        <div key={index} className="group relative">
                          <input
                            value={skill}
                            onChange={(e) => updateItem('skills', index, '', e.target.value)}
                            className="w-full border-2 border-border bg-background p-2 font-mono text-xs focus:border-primary outline-none"
                          />
                          <button
                            onClick={() => removeItem('skills', index)}
                            className="absolute -right-2 -top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-destructive text-white group-hover:flex"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    (localData[activeTab] as any[]).map((item: any, index: number) => (
                      <div key={index} className="relative border-2 border-border bg-muted/30 p-6">
                        <button
                          onClick={() => removeItem(activeTab as any, index)}
                          className="absolute right-4 top-4 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          {activeTab === 'experience' && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Company</label>
                                <input value={item.company} onChange={(e) => updateItem('experience', index, 'company', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role</label>
                                <input value={item.role} onChange={(e) => updateItem('experience', index, 'role', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Period</label>
                                <input value={item.period} onChange={(e) => updateItem('experience', index, 'period', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                                <textarea value={item.description} onChange={(e) => updateItem('experience', index, 'description', e.target.value)} className="h-24 w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                            </>
                          )}

                          {activeTab === 'education' && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Institution</label>
                                <input value={item.institution} onChange={(e) => updateItem('education', index, 'institution', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Degree</label>
                                <input value={item.degree} onChange={(e) => updateItem('education', index, 'degree', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Period</label>
                                <input value={item.period} onChange={(e) => updateItem('education', index, 'period', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                                <textarea value={item.description} onChange={(e) => updateItem('education', index, 'description', e.target.value)} className="h-24 w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                            </>
                          )}

                          {activeTab === 'projects' && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                                <input value={item.title} onChange={(e) => updateItem('projects', index, 'title', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status (e.g. In Progress, Completed)</label>
                                <input value={item.status || ''} onChange={(e) => updateItem('projects', index, 'status', e.target.value)} placeholder="In Progress" className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Image URL</label>
                                <input value={item.image} onChange={(e) => updateItem('projects', index, 'image', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Source Code URL (Optional)</label>
                                <input value={item.github || ''} onChange={(e) => updateItem('projects', index, 'github', e.target.value)} placeholder="https://github.com/..." className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                                <textarea value={item.description} onChange={(e) => updateItem('projects', index, 'description', e.target.value)} className="h-24 w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Interactive HTML (Optional)</label>
                                <textarea value={item.interactiveHtml || ''} onChange={(e) => updateItem('projects', index, 'interactiveHtml', e.target.value)} placeholder="<div style='...'>...</div>" className="h-24 w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                            </>
                          )}

                          {activeTab === 'openSource' && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                                <input value={item.title} onChange={(e) => updateItem('openSource', index, 'title', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Link</label>
                                <input value={item.link} onChange={(e) => updateItem('openSource', index, 'link', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                                <textarea value={item.description} onChange={(e) => updateItem('openSource', index, 'description', e.target.value)} className="h-24 w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                            </>
                          )}

                          {activeTab === 'blogs' && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                                <input value={item.title} onChange={(e) => updateItem('blogs', index, 'title', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</label>
                                <input type="date" value={item.date} onChange={(e) => updateItem('blogs', index, 'date', e.target.value)} className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Featured Image/GIF URL</label>
                                <input value={item.image || ''} onChange={(e) => updateItem('blogs', index, 'image', e.target.value)} placeholder="https://example.com/image.gif" className="w-full border-2 border-border bg-background p-2 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                              <div className="col-span-2 space-y-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Content (Markdown + LaTeX + HTML)</label>
                                  <div className="text-[9px] text-primary font-bold uppercase tracking-widest">Tip: Use ![alt](url) for GIFs in body</div>
                                </div>
                                <textarea value={item.content} onChange={(e) => updateItem('blogs', index, 'content', e.target.value)} className="h-64 w-full border-2 border-border bg-background p-4 font-mono text-sm focus:border-primary outline-none" />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
