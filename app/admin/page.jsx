"use client";

import { useState, useEffect } from "react";
import { 
  Save, Loader2, Package, 
  Facebook, MessageSquare, Instagram, Music, 
  LogOut, ShieldCheck, Upload, AppWindow, Globe2, 
  Menu, X, SquarePlay, User as UserIcon, KeyRound, Mail, BarChart3, RefreshCw, Home,
  ExternalLink, RotateCcw, HardDrive, Trash2, Calendar, Zap, File
} from "lucide-react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { ToastContainer } from "@/components/shared/Toast";
import { getCurrentUser, updateProfileAction } from "@/app/actions/auth";
import { resetDownloadsAction, saveSettingsAction } from "@/app/actions/settings";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [blobs, setBlobs] = useState([]);
  const [loadingBlobs, setLoadingBlobs] = useState(false);
  const [isDeletingBlob, setIsDeletingBlob] = useState(null);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const [settings, setSettings] = useState({
    apkDownloadUrl: "",
    buySellUrl: "",
    socialLinks: {
      facebook: "",
      whatsapp: "",
      tiktok: "",
      instagram: "",
    },
    downloadCount: 0,
  });

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const fetchLatestData = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`/api/settings?t=${Date.now()}`, { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = await res.json();
      if (data) {
        setSettings({
          apkDownloadUrl: data.apkDownloadUrl || "",
          buySellUrl: data.buySellUrl || "",
          socialLinks: {
            facebook: data.socialLinks?.facebook || "",
            whatsapp: data.socialLinks?.whatsapp || "",
            tiktok: data.socialLinks?.tiktok || "",
            instagram: data.socialLinks?.instagram || "",
          },
          downloadCount: data.downloadCount || 0,
        });
        addToast("Dashboard data has been synchronized with the latest server state.");
      }
    } catch (e) {
      addToast("Failed to sync data. Please check your internet connection.", "error");
    } finally {
      setSyncing(false);
    }
  };

  const fetchBlobs = async () => {
    setLoadingBlobs(true);
    try {
      const res = await fetch('/api/admin/blobs');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBlobs(data.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)));
      }
    } catch (e) {
      addToast("Failed to fetch storage data.", "error");
    } finally {
      setLoadingBlobs(false);
    }
  };

  const handleDeleteBlob = async (url) => {
    if (!url) return;
    setIsDeletingBlob(url);
    try {
      const res = await fetch('/api/admin/blobs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.success) {
        setBlobs(prev => prev.filter(b => b.url !== url));
        addToast("File permanently removed from cloud storage.");
      } else {
        addToast(data.error || "Failed to delete file.", "error");
      }
    } catch (e) {
      addToast("A technical error occurred during deletion.", "error");
    } finally {
      setIsDeletingBlob(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [settingsData, user] = await Promise.all([
          fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' }).then(res => res.json()),
          getCurrentUser()
        ]);
        
        if (settingsData) {
          setSettings({
            apkDownloadUrl: settingsData.apkDownloadUrl || "",
            buySellUrl: settingsData.buySellUrl || "",
            socialLinks: {
              facebook: settingsData.socialLinks?.facebook || "",
              whatsapp: settingsData.socialLinks?.whatsapp || "",
              tiktok: settingsData.socialLinks?.tiktok || "",
              instagram: settingsData.socialLinks?.instagram || "",
            },
            downloadCount: settingsData.downloadCount || 0,
          });
        }
        
        if (user) {
          setUserProfile(prev => ({ ...prev, name: user.name || "", email: user.email || "" }));
        }
      } catch (e) {
        console.error("Init failed", e);
        addToast("Failed to initialize dashboard. Some data might be missing.", "error");
      } finally {
        setLoading(false);
      }
    };
    init();
    fetchBlobs();
  }, []);

  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    
    try {
      const formData = new FormData();
      formData.append("apkDownloadUrl", settings.apkDownloadUrl);
      formData.append("buySellUrl", settings.buySellUrl);
      formData.append("facebook", settings.socialLinks.facebook);
      formData.append("whatsapp", settings.socialLinks.whatsapp);
      formData.append("tiktok", settings.socialLinks.tiktok);
      formData.append("instagram", settings.socialLinks.instagram);

      const result = await saveSettingsAction(formData);
      if (result.success) {
        router.refresh();
        addToast("All changes have been successfully saved to the server.");
        setSaving(false);
      } else {
        addToast(result.error || "Failed to save settings. Please check your connection.", "error");
        setSaving(false);
      }
    } catch (error) {
      addToast("A technical error occurred while saving your changes.", "error");
      setSaving(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!userProfile.currentPassword) {
      addToast("Please provide your current password for security verification.", "error");
      return;
    }
    
    if (userProfile.newPassword && userProfile.newPassword !== userProfile.confirmPassword) {
      addToast("The new passwords you entered do not match.", "error");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("name", userProfile.name);
    formData.append("email", userProfile.email);
    formData.append("currentPassword", userProfile.currentPassword);
    if (userProfile.newPassword) formData.append("newPassword", userProfile.newPassword);

    const result = await updateProfileAction(formData);
    if (result.success) {
      setUserProfile(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      addToast("Your administrator profile has been updated successfully.");
    } else {
      addToast(result.error || "Profile update failed.", "error");
    }
    setSaving(false);
  };

  const handleResetDownloads = async (e) => {
    e.preventDefault();
    if (!resetPassword) {
      addToast("Operation failed: Admin password is required to reset counters.", "error");
      return;
    }
    
    setIsResetting(true);
    
    const result = await resetDownloadsAction(resetPassword);
    if (result.success) {
      setSettings(prev => ({ ...prev, downloadCount: 0 }));
      addToast("Download counter has been reset to zero.");
      setShowResetModal(false);
      setResetPassword("");
    } else {
      addToast(result.error || "Authentication failed. Incorrect password.", "error");
    }
    setIsResetting(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.apk')) {
      addToast("Invalid file format. Only .apk files are supported.", "error");
      e.target.value = '';
      return;
    }

    const MAX_SIZE = 500 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      addToast("File too large. Maximum upload size allowed is 500MB.", "error");
      e.target.value = '';
      return;
    }

    setUploading(true);

    try {
      const newBlob = await upload("thulla-masters.apk", file, {
        access: 'public',
        handleUploadUrl: '/api/upload/blob',
        onUploadProgress: (progressEvent) => {
          setUploadProgress(progressEvent.percentage);
        },
      });

      if (!newBlob?.url) {
        throw new Error("Upload succeeded but no URL was returned.");
      }

      setSettings({ ...settings, apkDownloadUrl: newBlob.url });
      addToast("APK uploaded successfully to cloud storage!");
      
      const formData = new FormData();
      formData.append("apkDownloadUrl", newBlob.url);
      formData.append("buySellUrl", settings.buySellUrl);
      formData.append("facebook", settings.socialLinks.facebook);
      formData.append("whatsapp", settings.socialLinks.whatsapp);
      formData.append("tiktok", settings.socialLinks.tiktok);
      formData.append("instagram", settings.socialLinks.instagram);
      
      const previousUrl = settings.apkDownloadUrl;
      
      await saveSettingsAction(formData);

      // Automatically clean up previous blob if it exists and is different
      if (previousUrl && previousUrl.includes('vercel-storage.com') && previousUrl !== newBlob.url) {
        try {
          await fetch('/api/admin/blobs', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: previousUrl })
          });
          console.log("Cleaned up previous APK blob:", previousUrl);
        } catch (e) {
          console.warn("Auto-cleanup failed for previous blob:", e);
        }
      }

      fetchBlobs(); // Refresh the list
    } catch (error) {
      let errorMessage = error.message;
      if (errorMessage.includes("BLOB_READ_WRITE_TOKEN")) {
        errorMessage = "Cloud storage is not connected. Add 'BLOB_READ_WRITE_TOKEN' to Vercel.";
      } else if (errorMessage.includes("401") || errorMessage.includes("logged in")) {
        errorMessage = "Authentication expired. Please log in again.";
      }
      addToast(errorMessage, "error");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      e.target.value = '';
    }
  };

  const logout = async () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050512] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
      </div>
    );
  }

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false);
        setUiError("");
        setUiSuccess("");
      }}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all font-bold text-xs ${
        activeTab === id 
          ? "bg-yellow-400 text-zinc-900 shadow-lg shadow-yellow-400/10" 
          : "text-zinc-500 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-[#050512] text-zinc-300 overflow-hidden font-sans relative">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0a0a1f] border-r border-white/5 flex flex-col p-6 
        transition-transform duration-300 transform lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center border border-yellow-500/50 shadow-lg shadow-yellow-400/20">
              <ShieldCheck className="text-zinc-900 w-5 h-5" />
            </div>
            <div>
              <h1 className="text-white font-black tracking-tight leading-none text-base">THULLA</h1>
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mt-0.5">Control Center</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-black mb-4 px-2">Management</p>
          <NavItem id="content" icon={AppWindow} label="General" />
          <NavItem id="social" icon={Globe2} label="Social Links" />
          <NavItem id="storage" icon={HardDrive} label="Cloud Storage" />
          <NavItem id="account" icon={UserIcon} label="Account Settings" />
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-600 hover:text-red-400 hover:bg-red-400/5 transition-all font-bold text-xs"
          >
            <LogOut className="w-4 h-4" />
            Logout Session
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 lg:h-20 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 lg:px-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white shadow-xl transition-all active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => router.push("/")}
                className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-yellow-400 transition-all group"
                title="View Website"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.0">
                {activeTab === 'content' ? 'Dashboard' : activeTab === 'social' ? 'Social Links' : activeTab === 'storage' ? 'Cloud Storage' : 'Account'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={activeTab === 'account' ? handleUpdateProfile : handleSaveSettings}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-black rounded-lg transition-all active:scale-95 disabled:opacity-50 text-[10px] sm:text-xs shadow-xl shadow-yellow-400/10"
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              {saving ? "SAVING..." : activeTab === 'account' ? "UPDATE PROFILE" : "SAVE CHANGES"}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10 flex justify-center">
          <div className="w-full max-w-2xl">
            {activeTab === "content" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <section className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Marketing Performance</h3>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setShowResetModal(true)}
                        className="flex items-center gap-1.5 text-zinc-500 hover:text-red-400 transition-all"
                        title="Reset Counter"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Reset</span>
                      </button>
                      <button 
                        onClick={fetchLatestData}
                        disabled={syncing}
                        className="flex items-center gap-1.5 text-zinc-500 hover:text-yellow-400 transition-all disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin text-yellow-500' : ''}`} />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                          {syncing ? 'Syncing...' : 'Refresh'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/10 rounded-2xl p-4 sm:p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                      <BarChart3 className="w-24 h-24 text-yellow-400" />
                    </div>
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
                          <BarChart3 className="text-zinc-900 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-black">Total App Downloads</p>
                          <h4 className="text-white text-3xl font-black mt-0.5 tracking-tight">
                            {settings.downloadCount.toLocaleString()}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.2em] mb-4">Distribution Settings</h3>
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 sm:p-6 space-y-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-white flex items-center gap-2 px-1">
                        <Package className="w-3.5 h-3.5 text-yellow-400" /> APK Link
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={settings.apkDownloadUrl}
                          onChange={(e) => setSettings({...settings, apkDownloadUrl: e.target.value})}
                          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-yellow-400/50 transition-all font-mono outline-none"
                          placeholder="e.g. /uploads/app.apk"
                        />
                        <label className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 flex items-center justify-center cursor-pointer transition-all active:scale-95 h-[48px] sm:h-auto whitespace-nowrap">
                          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-400" /> : <Upload className="w-3.5 h-3.5" />}
                          <span className="sm:hidden ml-2 text-[10px] font-bold">UPLOAD APK</span>
                          <input type="file" className="hidden" accept=".apk" onChange={handleFileUpload} />
                        </label>
                      </div>

                      {uploading && (
                        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-md relative overflow-hidden group animate-in zoom-in-95 duration-300">
                          {/* Background Glow Detail */}
                          <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400/5 blur-3xl rounded-full" />
                          
                          <div className="flex items-center gap-5 relative z-10">
                            {/* Circular Progress Ring */}
                            <div className="relative w-14 h-14 flex-shrink-0">
                              <svg className="w-full h-full -rotate-90">
                                <circle
                                  cx="28"
                                  cy="28"
                                  r="24"
                                  fill="transparent"
                                  stroke="currentColor"
                                  strokeWidth="3.5"
                                  className="text-white/5"
                                />
                                <circle
                                  cx="28"
                                  cy="28"
                                  r="24"
                                  fill="transparent"
                                  stroke="currentColor"
                                  strokeWidth="3.5"
                                  strokeDasharray={150.8}
                                  strokeDashoffset={150.8 - (150.8 * uploadProgress) / 100}
                                  strokeLinecap="round"
                                  className="text-yellow-400 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-black text-white">{uploadProgress}%</span>
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Secure Cloud Sync</h4>
                                {uploadProgress < 100 ? (
                                  <span className="text-[8px] font-black text-yellow-400 px-1.5 py-0.5 bg-yellow-400/10 rounded-md border border-yellow-400/20 animate-pulse">
                                    TRANSFERRING
                                  </span>
                                ) : (
                                  <span className="text-[8px] font-black text-green-400 px-1.5 py-0.5 bg-green-400/10 rounded-md border border-green-400/20">
                                    FINALIZING
                                  </span>
                                )}
                              </div>
                              <p className="text-zinc-500 text-[10px] truncate max-w-[180px] font-medium italic">
                                Moving <span className="text-zinc-300 not-italic font-bold">thulla-masters.apk</span> to Vercel Edge...
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-white flex items-center gap-2 px-1">
                        <SquarePlay className="w-3.5 h-3.5 text-red-500" /> Tutorial Link
                      </label>
                      <input
                        type="text"
                        value={settings.buySellUrl}
                        onChange={(e) => setSettings({...settings, buySellUrl: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-yellow-400/50 transition-all font-mono outline-none"
                        placeholder="Paste YouTube URL here..."
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <section className="space-y-3">
                  <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Connect Platforms</h3>
                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-6">
                      {[
                        { id: 'facebook', icon: Facebook, color: 'text-blue-500', label: 'Facebook' },
                        { id: 'whatsapp', icon: MessageSquare, color: 'text-green-500', label: 'WhatsApp' },
                        { id: 'tiktok', icon: Music, color: 'text-zinc-200', label: 'TikTok' },
                        { id: 'instagram', icon: Instagram, color: 'text-purple-500', label: 'Instagram' },
                      ].map((social) => (
                        <div key={social.id} className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">{social.label}</label>
                          <div className="relative group">
                            <social.icon className={`absolute left-4 top-1/2 -translate-y-1/2 ${social.color} w-4 h-4 opacity-50 group-focus-within:opacity-100 transition-opacity`} />
                            <input
                              type="text"
                              value={settings.socialLinks[social.id]}
                              onChange={(e) => setSettings({
                                ...settings, 
                                socialLinks: { ...settings.socialLinks, [social.id]: e.target.value } 
                              })}
                              className="w-full bg-black/50 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-[11px] font-mono outline-none focus:border-white/10 transition-all"
                              placeholder={`Enter ${social.label} link`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "storage" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Storage Management</h3>
                    <button 
                      onClick={fetchBlobs}
                      disabled={loadingBlobs}
                      className="flex items-center gap-1.5 text-zinc-500 hover:text-yellow-400 transition-all disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${loadingBlobs ? 'animate-spin text-yellow-500' : ''}`} />
                      <span className="text-[9px] font-black uppercase tracking-widest">
                        {loadingBlobs ? 'Scanning...' : 'Scan Storage'}
                      </span>
                    </button>
                  </div>

                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden">
                    {loadingBlobs && blobs.length === 0 ? (
                      <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Retrieving assets...</p>
                      </div>
                    ) : blobs.length === 0 ? (
                      <div className="p-20 flex flex-col items-center justify-center gap-4 opacity-40">
                        <HardDrive className="w-12 h-12 text-zinc-600" />
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold text-center">
                          Cloud storage is currently empty<br/>
                          <span className="text-[8px] opacity-60">Upload an APK to start managing assets</span>
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {blobs.map((blob) => (
                          <div key={blob.url} className="p-5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                              settings.apkDownloadUrl === blob.url 
                                ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20" 
                                : "bg-white/5 text-zinc-500 border border-white/5"
                            }`}>
                              <File className="w-6 h-6" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-white text-[11px] font-bold truncate tracking-tight">{blob.pathname}</h4>
                                {settings.apkDownloadUrl === blob.url && (
                                  <span className="text-[8px] font-black bg-yellow-400 text-zinc-900 px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-lg shadow-yellow-400/10">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1">
                                  <Zap className="w-2.5 h-2.5" />
                                  {(blob.size / (1024 * 1024)).toFixed(1)} MB
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-2.5 h-2.5" />
                                  {new Date(blob.uploadedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteBlob(blob.url)}
                              disabled={isDeletingBlob === blob.url}
                              className={`p-2.5 rounded-xl transition-all ${
                                isDeletingBlob === blob.url 
                                  ? "bg-red-500/10 text-red-500" 
                                  : "bg-white/5 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 active:scale-95"
                              }`}
                              title="Delete Permanently"
                            >
                              {isDeletingBlob === blob.url ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-yellow-400/5 border border-yellow-400/10 rounded-2xl">
                    <Info className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] leading-relaxed text-zinc-400">
                      <span className="text-yellow-400 font-bold uppercase tracking-widest mr-1">Cloud Cleanup:</span>
                      Files are automatically synchronized. Uploading a new APK will automatically remove the previous version from storage to optimize space.
                    </p>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <section className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Administrator Profile</h3>
                  </div>

                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">Display Name</label>
                        <div className="relative group">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-yellow-400 transition-colors" />
                          <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                            className="w-full bg-black/50 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-[11px] outline-none focus:border-white/10 transition-all"
                            placeholder="Your Name"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">Admin Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-yellow-400 transition-colors" />
                          <input
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                            className="w-full bg-black/50 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-[11px] outline-none focus:border-white/10 transition-all font-mono"
                            placeholder="admin@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="space-y-4">
                      <h4 className="text-white text-sm font-bold px-1">Security Update</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">Current Password</label>
                          <div className="relative group">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-yellow-400 transition-colors" />
                            <input
                              type="password"
                              value={userProfile.currentPassword}
                              onChange={(e) => setUserProfile({ ...userProfile, currentPassword: e.target.value })}
                              className="w-full bg-black/50 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-[11px] outline-none focus:border-white/10 transition-all"
                              placeholder="Required to verify"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">New Password</label>
                          <div className="relative group">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-yellow-400 transition-colors" />
                            <input
                              type="password"
                              value={userProfile.newPassword}
                              onChange={(e) => setUserProfile({ ...userProfile, newPassword: e.target.value })}
                              className="w-full bg-black/50 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-[11px] outline-none focus:border-white/10 transition-all"
                              placeholder="Set new password"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-1">Confirm Password</label>
                          <div className="relative group">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-yellow-400 transition-colors" />
                            <input
                              type="password"
                              value={userProfile.confirmPassword}
                              onChange={(e) => setUserProfile({ ...userProfile, confirmPassword: e.target.value })}
                              className="w-full bg-black/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-xs outline-none focus:border-white/10 transition-all font-mono"
                              placeholder="Retype password"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>
      {showResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050512]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setShowResetModal(false)} />
          <form 
            onSubmit={handleResetDownloads}
            className="relative w-full max-w-md bg-[#0a0a1f] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-black text-xl flex items-center gap-3">
                <RotateCcw className="text-red-500 w-6 h-6" />
                Reset Counter
              </h3>
              <button type="button" onClick={() => setShowResetModal(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              This will permanently reset the download counter to <span className="text-white font-bold">zero</span>. Please enter your password to confirm.
            </p>
            
            <div className="space-y-4">
              <div className="relative group">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-red-400 transition-colors" />
                <input
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-xs outline-none focus:border-red-500/30 transition-all text-white"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              
              <button
                type="submit"
                disabled={isResetting || !resetPassword}
                className="w-full py-4 bg-red-500 hover:bg-red-400 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-red-500/10 flex items-center justify-center gap-2"
              >
                {isResetting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                {isResetting ? "RESETTING..." : "CONFIRM RESET"}
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
