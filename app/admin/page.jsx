"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { Loader2 } from "lucide-react";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import GeneralSection from "@/components/admin/sections/GeneralSection";
import SocialSection from "@/components/admin/sections/SocialSection";
import StorageSection from "@/components/admin/sections/StorageSection";
import AccountSection from "@/components/admin/sections/AccountSection";
import ResetModal from "@/components/admin/modals/ResetModal";

import { ToastContainer } from "@/components/shared/Toast";
import { getCurrentUser, updateProfileAction } from "@/app/actions/auth";
import { resetDownloadsAction, saveSettingsAction } from "@/app/actions/settings";

export default function AdminPage() {
  const router = useRouter();
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toasts, addToastState] = useState([]);

  // Data State
  const [settings, setSettings] = useState({
    apkDownloadUrl: "",
    buySellUrl: "",
    socialLinks: { facebook: "", whatsapp: "", tiktok: "", instagram: "" },
    downloadCount: 0,
    downloadHistory: []
  });

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Storage State
  const [blobs, setBlobs] = useState([]);
  const [loadingBlobs, setLoadingBlobs] = useState(false);
  const [isDeletingBlob, setIsDeletingBlob] = useState(null);
  const [storageQuota, setStorageQuota] = useState({ used: 0, limit: 1, percentage: 0, count: 0 });
  
  // Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Reset Modal State
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  // Toast Helpers
  const addToast = (message, type = "success") => {
    addToastState((prev) => [...prev, { id: Date.now(), message, type }]);
  };
  const removeToast = (id) => {
    addToastState((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions
  const fetchLatestData = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
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
          downloadHistory: data.downloadHistory || []
        });
        addToast("Dashboard data synchronized.");
      }
    } catch (e) {
      addToast("Failed to sync data.", "error");
    } finally {
      setSyncing(false);
    }
  };

  const fetchBlobs = async () => {
    setLoadingBlobs(true);
    try {
      const res = await fetch('/api/admin/blobs');
      const data = await res.json();
      if (data && data.blobs) {
        setBlobs(data.blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)));
        if (data.quota) setStorageQuota(data.quota);
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
        
        // If the deleted blob was the active APK, clear the URL in settings
        if (settings.apkDownloadUrl === url) {
          const newSettings = { ...settings, apkDownloadUrl: "" };
          setSettings(newSettings);
          
          const formData = new FormData();
          formData.append("apkDownloadUrl", "");
          formData.append("buySellUrl", settings.buySellUrl);
          formData.append("facebook", settings.socialLinks.facebook);
          formData.append("whatsapp", settings.socialLinks.whatsapp);
          formData.append("tiktok", settings.socialLinks.tiktok);
          formData.append("instagram", settings.socialLinks.instagram);
          
          await saveSettingsAction(formData);
        }

        addToast("File removed from cloud storage.");
        fetchBlobs(); // Refresh quota
      } else {
        addToast(data.error || "Failed to delete file.", "error");
      }
    } catch (e) {
      addToast("Technical error during deletion.", "error");
    } finally {
      setIsDeletingBlob(null);
    }
  };

  const handleSaveSettings = async () => {
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
        addToast("Settings saved successfully.");
      } else {
        addToast(result.error || "Failed to save settings.", "error");
      }
    } catch (error) {
      addToast("Error saving changes.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    if (e) e.preventDefault();
    if (!userProfile.currentPassword) {
      addToast("Current password required for verification.", "error");
      return;
    }
    if (userProfile.newPassword && userProfile.newPassword !== userProfile.confirmPassword) {
      addToast("Passwords do not match.", "error");
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
      addToast("Profile updated successfully.");
    } else {
      addToast(result.error || "Profile update failed.", "error");
    }
    setSaving(false);
  };

  const handleResetDownloads = async (e) => {
    if (e) e.preventDefault();
    if (!resetPassword) {
      addToast("Password required to reset.", "error");
      return;
    }
    setIsResetting(true);
    const result = await resetDownloadsAction(resetPassword);
    if (result.success) {
      setSettings(prev => ({ ...prev, downloadCount: 0, downloadHistory: [] }));
      addToast("Counter reset successfully.");
      setShowResetModal(false);
      setResetPassword("");
    } else {
      addToast(result.error || "Authentication failed.", "error");
    }
    setIsResetting(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.apk')) {
      addToast("Only .apk files are supported.", "error");
      return;
    }
    if (file.size > 500 * 1024 * 1024) {
      addToast("File exceeds 500MB limit.", "error");
      return;
    }

    setUploading(true);
    try {
      const newBlob = await upload("thulla-masters.apk", file, {
        access: 'public',
        handleUploadUrl: '/api/upload/blob',
        onUploadProgress: (p) => setUploadProgress(p.percentage),
      });

      if (!newBlob?.url) throw new Error("Upload failed.");

      const previousUrl = settings.apkDownloadUrl;
      setSettings({ ...settings, apkDownloadUrl: newBlob.url });
      
      const formData = new FormData();
      formData.append("apkDownloadUrl", newBlob.url);
      formData.append("buySellUrl", settings.buySellUrl);
      formData.append("facebook", settings.socialLinks.facebook);
      formData.append("whatsapp", settings.socialLinks.whatsapp);
      formData.append("tiktok", settings.socialLinks.tiktok);
      formData.append("instagram", settings.socialLinks.instagram);
      
      await saveSettingsAction(formData);

      if (previousUrl && previousUrl.includes('vercel-storage.com') && previousUrl !== newBlob.url) {
        await fetch('/api/admin/blobs', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: previousUrl })
        });
      }
      addToast("APK uploaded and synchronized.");
      fetchBlobs();
    } catch (error) {
      addToast(error.message || "Upload failed.", "error");
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
            downloadHistory: settingsData.downloadHistory || []
          });
        }
        if (user) {
          setUserProfile(prev => ({ ...prev, name: user.name || "", email: user.email || "" }));
        }
      } catch (e) {
        addToast("Initialization failed.", "error");
      } finally {
        setLoading(false);
      }
    };
    init();
    fetchBlobs();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050512] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#050512] text-zinc-300 overflow-hidden font-sans relative">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        logout={logout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeTab={activeTab} 
          saving={saving} 
          onSave={activeTab === 'account' ? handleUpdateProfile : handleSaveSettings} 
          onMenuOpen={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-10 flex justify-center">
          <div className="w-full max-w-6xl">
            {activeTab === "content" && (
              <GeneralSection 
                settings={settings}
                setSettings={setSettings}
                syncing={syncing}
                fetchLatestData={fetchLatestData}
                setShowResetModal={setShowResetModal}
                uploading={uploading}
                uploadProgress={uploadProgress}
                handleFileUpload={handleFileUpload}
                storageQuota={storageQuota}
              />
            )}

            {activeTab === "social" && (
              <SocialSection settings={settings} setSettings={setSettings} />
            )}

            {activeTab === "storage" && (
              <StorageSection 
                blobs={blobs}
                loadingBlobs={loadingBlobs}
                fetchBlobs={fetchBlobs}
                handleDeleteBlob={handleDeleteBlob}
                isDeletingBlob={isDeletingBlob}
                apkDownloadUrl={settings.apkDownloadUrl}
              />
            )}

            {activeTab === "account" && (
              <AccountSection userProfile={userProfile} setUserProfile={setUserProfile} />
            )}
          </div>
        </main>
      </div>

      <ResetModal 
        showResetModal={showResetModal}
        setShowResetModal={setShowResetModal}
        resetPassword={resetPassword}
        setResetPassword={setResetPassword}
        handleResetDownloads={handleResetDownloads}
        isResetting={isResetting}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
