import { useState } from 'react';
import { DATA as INITIAL_DATA, DataStructure, Experience, Education, Project, Blog, OpenSourceContribution } from '../data';
import { Plus, Trash2, Save, Download, LayoutDashboard, Briefcase, FolderCode, BookOpen, X, Check, Wrench, Github, RotateCcw, HardDrive, User } from 'lucide-react';

type TabKey = 'profile' | 'experience' | 'education' | 'projects' | 'blogs' | 'skills' | 'contributions';

export function Dashboard({ data, onUpdate, onClose }: { data: DataStructure, onUpdate: (newData: DataStructure) => void, onClose: () => void }) {
  const [localData, setLocalData] = useState(data);
  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [wroteFile, setWroteFile] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');

  const handleExport = () => {
    const code = `import { DataStructure } from './types';\n\nexport const DATA: DataStructure = ${JSON.stringify(localData, null, 2)};`;
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
    if (confirm("Reset all changes to initial data?")) {
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

  const inputClass = "w-full border border-[var(--rule)] bg-[var(--bg)] p-2 font-mono text-sm text-[var(--fg)] focus:border-white outline-none";
  const textareaClass = "h-24 w-full border border-[var(--rule)] bg-[var(--bg)] p-2 font-mono text-sm text-[var(--fg)] focus:border-white outline-none";
  const labelClass = "block mb-1 text-[10px] font-mono uppercase tracking-widest text-[var(--fg-faint)]";

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)', padding: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', width: '100%', maxWidth: 1100, border: '1px solid #ffffff', background: 'var(--bg)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--rule)', padding: '12px 20px', background: 'var(--bg-elev)' }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg)' }}>
            Portfolio CMS
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={handleReset} style={{ background: 'none', border: '1px solid var(--rule)', padding: '4px 10px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--fg-faint)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reset</button>
            <button onClick={handleSave} style={{ background: saved ? '#333' : '#ffffff', color: saved ? '#fff' : '#000', border: 0, padding: '4px 12px', fontFamily: 'var(--mono)', fontSize: 10, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {saved ? '✓ Saved' : 'Save'}
            </button>
            <button onClick={handleWriteFile} style={{ background: 'none', border: '1px solid var(--rule)', padding: '4px 10px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--fg-dim)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {wroteFile === 'done' ? '✓ Written' : 'Write File'}
            </button>
            <button onClick={handleExport} style={{ background: 'none', border: '1px solid var(--rule)', padding: '4px 10px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--fg-dim)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {copied ? '✓ Copied' : 'Export'}
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 0, color: 'var(--fg-faint)', cursor: 'pointer', fontSize: 18, padding: '0 4px' }}>×</button>
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <div style={{ width: 180, borderRight: '1px solid var(--rule)', padding: '12px 8px', overflowY: 'auto' }}>
            {(['profile', 'projects', 'skills', 'contributions', 'experience', 'education', 'blogs'] as TabKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', marginBottom: 2,
                  background: activeTab === key ? 'var(--accent-soft)' : 'transparent',
                  border: activeTab === key ? '1px solid var(--rule)' : '1px solid transparent',
                  color: activeTab === key ? 'var(--fg)' : 'var(--fg-dim)',
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: 'pointer'
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            {activeTab === 'profile' && (
              <div style={{ display: 'grid', gap: 16, maxWidth: 600 }}>
                <div>
                  <label className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>Name</label>
                  <input value={localData.name} onChange={(e) => updateProfile('name', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>Title</label>
                  <input value={localData.title} onChange={(e) => updateProfile('title', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>Short Bio</label>
                  <textarea value={localData.shortBio} onChange={(e) => updateProfile('shortBio', e.target.value)} className={textareaClass} />
                </div>
                <div>
                  <label className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>Bio</label>
                  <textarea value={localData.bio} onChange={(e) => updateProfile('bio', e.target.value)} className={textareaClass} />
                </div>
                <div>
                  <label className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>Email</label>
                  <input value={localData.contact.email} onChange={(e) => updateContact('email', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>GitHub</label>
                  <input value={localData.contact.github} onChange={(e) => updateContact('github', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>LinkedIn</label>
                  <input value={localData.contact.linkedin} onChange={(e) => updateContact('linkedin', e.target.value)} className={inputClass} />
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div style={{ display: 'grid', gap: 24 }}>
                <button
                  onClick={() => setLocalData({
                    ...localData,
                    experience: [{ company: 'New Company', role: 'New Role', period: '2026 — Present', description: '', current: false }, ...localData.experience]
                  })}
                  className="ink-link mono" style={{ fontSize: 12, justifySelf: 'start' }}
                >+ Add experience</button>
                {localData.experience.map((exp, i) => (
                  <div key={i} style={{ padding: 20, border: '1px solid var(--rule)', position: 'relative' }}>
                    <button onClick={() => setLocalData({ ...localData, experience: localData.experience.filter((_, j) => j !== i) })} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 0, color: 'var(--fg-faint)', cursor: 'pointer', fontSize: 14 }}>×</button>
                    <div style={{ display: 'grid', gap: 12 }}>
                      <input value={exp.company} onChange={(e) => { const n = [...localData.experience]; n[i] = { ...n[i], company: e.target.value }; setLocalData({ ...localData, experience: n }); }} placeholder="Company" className={inputClass} />
                      <input value={exp.role} onChange={(e) => { const n = [...localData.experience]; n[i] = { ...n[i], role: e.target.value }; setLocalData({ ...localData, experience: n }); }} placeholder="Role" className={inputClass} />
                      <input value={exp.period} onChange={(e) => { const n = [...localData.experience]; n[i] = { ...n[i], period: e.target.value }; setLocalData({ ...localData, experience: n }); }} placeholder="Period" className={inputClass} />
                      <textarea value={exp.description} onChange={(e) => { const n = [...localData.experience]; n[i] = { ...n[i], description: e.target.value }; setLocalData({ ...localData, experience: n }); }} placeholder="Description" className={textareaClass} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div style={{ display: 'grid', gap: 24 }}>
                <button
                  onClick={() => setLocalData({
                    ...localData,
                    education: [{ institution: 'New Institution', degree: 'New Degree', period: '2024 — 2028', description: '' }, ...localData.education]
                  })}
                  className="ink-link mono" style={{ fontSize: 12, justifySelf: 'start' }}
                >+ Add education</button>
                {localData.education.map((edu, i) => (
                  <div key={i} style={{ padding: 20, border: '1px solid var(--rule)', position: 'relative' }}>
                    <button onClick={() => setLocalData({ ...localData, education: localData.education.filter((_, j) => j !== i) })} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 0, color: 'var(--fg-faint)', cursor: 'pointer', fontSize: 14 }}>×</button>
                    <div style={{ display: 'grid', gap: 12 }}>
                      <input value={edu.institution} onChange={(e) => { const n = [...localData.education]; n[i] = { ...n[i], institution: e.target.value }; setLocalData({ ...localData, education: n }); }} placeholder="Institution" className={inputClass} />
                      <input value={edu.degree} onChange={(e) => { const n = [...localData.education]; n[i] = { ...n[i], degree: e.target.value }; setLocalData({ ...localData, education: n }); }} placeholder="Degree" className={inputClass} />
                      <input value={edu.period} onChange={(e) => { const n = [...localData.education]; n[i] = { ...n[i], period: e.target.value }; setLocalData({ ...localData, education: n }); }} placeholder="Period" className={inputClass} />
                      <textarea value={edu.description} onChange={(e) => { const n = [...localData.education]; n[i] = { ...n[i], description: e.target.value }; setLocalData({ ...localData, education: n }); }} placeholder="Description" className={textareaClass} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div style={{ display: 'grid', gap: 24 }}>
                <button
                  onClick={() => setLocalData({
                    ...localData,
                    projects: [{
                      id: `project-${Date.now()}`, n: String(localData.projects.length + 1).padStart(2, '0'),
                      title: 'New Project', subtitle: 'Subtitle', description: '', year: '2026', tags: [], status: 'Active'
                    }, ...localData.projects]
                  })}
                  className="ink-link mono" style={{ fontSize: 12, justifySelf: 'start' }}
                >+ Add project</button>
                {localData.projects.map((proj, i) => (
                  <div key={i} style={{ padding: 20, border: '1px solid var(--rule)', position: 'relative' }}>
                    <button onClick={() => setLocalData({ ...localData, projects: localData.projects.filter((_, j) => j !== i) })} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 0, color: 'var(--fg-faint)', cursor: 'pointer', fontSize: 14 }}>×</button>
                    <div style={{ display: 'grid', gap: 12 }}>
                      <input value={proj.title} onChange={(e) => { const n = [...localData.projects]; n[i] = { ...n[i], title: e.target.value }; setLocalData({ ...localData, projects: n }); }} placeholder="Title" className={inputClass} />
                      <input value={proj.subtitle} onChange={(e) => { const n = [...localData.projects]; n[i] = { ...n[i], subtitle: e.target.value }; setLocalData({ ...localData, projects: n }); }} placeholder="Subtitle" className={inputClass} />
                      <textarea value={proj.description} onChange={(e) => { const n = [...localData.projects]; n[i] = { ...n[i], description: e.target.value }; setLocalData({ ...localData, projects: n }); }} placeholder="Description" className={textareaClass} />
                      <input value={proj.tags.join(', ')} onChange={(e) => { const n = [...localData.projects]; n[i] = { ...n[i], tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }; setLocalData({ ...localData, projects: n }); }} placeholder="Tags (comma-separated)" className={inputClass} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div style={{ display: 'grid', gap: 24 }}>
                {Object.entries(localData.skills).map(([cat, items]) => (
                  <div key={cat} style={{ padding: 20, border: '1px solid var(--rule)' }}>
                    <div className="eyebrow" style={{ marginBottom: 12 }}>{cat}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {items.map((skill, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--bg-elev)', border: '1px solid var(--rule)', padding: '2px 8px' }}>
                          <span className="mono" style={{ fontSize: 11 }}>{skill}</span>
                          <button
                            onClick={() => {
                              const n = { ...localData.skills };
                              n[cat] = n[cat].filter((_, k) => k !== j);
                              setLocalData({ ...localData, skills: n });
                            }}
                            style={{ background: 'none', border: 0, color: 'var(--fg-faint)', cursor: 'pointer', fontSize: 11 }}
                          >×</button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const n = { ...localData.skills };
                          n[cat] = [...n[cat], 'New Skill'];
                          setLocalData({ ...localData, skills: n });
                        }}
                        style={{ background: 'none', border: '1px dashed var(--rule)', padding: '2px 8px', color: 'var(--fg-faint)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11 }}
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contributions' && (
              <div style={{ display: 'grid', gap: 24 }}>
                <button
                  onClick={() => setLocalData({
                    ...localData,
                    contributions: [{ title: 'New Contribution', description: '', link: 'https://github.com' }, ...localData.contributions]
                  })}
                  className="ink-link mono" style={{ fontSize: 12, justifySelf: 'start' }}
                >+ Add contribution</button>
                {localData.contributions.map((c, i) => (
                  <div key={i} style={{ padding: 20, border: '1px solid var(--rule)', position: 'relative' }}>
                    <button onClick={() => setLocalData({ ...localData, contributions: localData.contributions.filter((_, j) => j !== i) })} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 0, color: 'var(--fg-faint)', cursor: 'pointer', fontSize: 14 }}>×</button>
                    <div style={{ display: 'grid', gap: 12 }}>
                      <input value={c.title} onChange={(e) => { const n = [...localData.contributions]; n[i] = { ...n[i], title: e.target.value }; setLocalData({ ...localData, contributions: n }); }} placeholder="Title" className={inputClass} />
                      <input value={c.link} onChange={(e) => { const n = [...localData.contributions]; n[i] = { ...n[i], link: e.target.value }; setLocalData({ ...localData, contributions: n }); }} placeholder="Link" className={inputClass} />
                      <textarea value={c.description} onChange={(e) => { const n = [...localData.contributions]; n[i] = { ...n[i], description: e.target.value }; setLocalData({ ...localData, contributions: n }); }} placeholder="Description" className={textareaClass} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'blogs' && (
              <div style={{ display: 'grid', gap: 24 }}>
                <button
                  onClick={() => setLocalData({
                    ...localData,
                    blogs: [{
                      id: `blog-${Date.now()}`, n: String.fromCharCode(73 + localData.blogs.length),
                      title: 'New Post', subtitle: 'Subtitle', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                      readTime: '5 min', tags: ['Tech'], excerpt: '', content: '# New Post\n\nWrite here...'
                    }, ...localData.blogs]
                  })}
                  className="ink-link mono" style={{ fontSize: 12, justifySelf: 'start' }}
                >+ Add blog post</button>
                {localData.blogs.map((blog, i) => (
                  <div key={i} style={{ padding: 20, border: '1px solid var(--rule)', position: 'relative' }}>
                    <button onClick={() => setLocalData({ ...localData, blogs: localData.blogs.filter((_, j) => j !== i) })} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 0, color: 'var(--fg-faint)', cursor: 'pointer', fontSize: 14 }}>×</button>
                    <div style={{ display: 'grid', gap: 12 }}>
                      <input value={blog.title} onChange={(e) => { const n = [...localData.blogs]; n[i] = { ...n[i], title: e.target.value }; setLocalData({ ...localData, blogs: n }); }} placeholder="Title" className={inputClass} />
                      <input value={blog.subtitle} onChange={(e) => { const n = [...localData.blogs]; n[i] = { ...n[i], subtitle: e.target.value }; setLocalData({ ...localData, blogs: n }); }} placeholder="Subtitle" className={inputClass} />
                      <textarea value={blog.content} onChange={(e) => { const n = [...localData.blogs]; n[i] = { ...n[i], content: e.target.value }; setLocalData({ ...localData, blogs: n }); }} placeholder="Content (Markdown)" style={{ height: 200 }} className={textareaClass} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
