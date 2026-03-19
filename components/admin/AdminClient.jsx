"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import GeneralSection from "@/components/admin/sections/GeneralSection";
import SocialSection from "@/components/admin/sections/SocialSection";
import AccountSection from "@/components/admin/sections/AccountSection";
import InsightsSection from "@/components/admin/sections/InsightsSection";
import TrafficSection from "@/components/admin/sections/TrafficSection";
import ResetModal from "@/components/admin/modals/ResetModal";
import { ToastContainer } from "@/components/shared/Toast";
import { updateProfileAction } from "@/app/actions/auth";
import { resetDownloadsAction, saveSettingsAction } from "@/app/actions/settings";

export default function AdminClient({ initialSettings, user }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState("insights");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toasts, addToastState] = useState([]);

  const [settings, setSettings] = useState(initialSettings);
  const [userProfile, setUserProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const addToast = (message, type = "success") => {
    addToastState((prev) => [...prev, { id: Date.now(), message, type }]);
  };
  const removeToast = (id) => {
    addToastState((prev) => prev.filter((t) => t.id !== id));
  };

  const syncData = useCallback(async (silent = false) => {
    if (activeTab === "content" || activeTab === "social" || activeTab === "account") return;
    
    if (!silent) setSyncing(true);
    try {
      const res = await fetch(`/api/settings?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data) {
        setSettings((prev) => ({
          ...prev,
          apkDownloadUrl: data.apkDownloadUrl || "",
          buySellUrl: data.buySellUrl || "",
          redirectUrl: data.redirectUrl || "",
          socialLinks: {
            facebook: data.socialLinks?.facebook || "",
            whatsapp: data.socialLinks?.whatsapp || "",
            tiktok: data.socialLinks?.tiktok || "",
            instagram: data.socialLinks?.instagram || "",
          },
          downloadCount: data.downloadCount || 0,
          visitorCount: data.visitorCount || 0,
          downloadHistory: data.downloadHistory || [],
          visitorHistory: data.visitorHistory || [],
        }));
        if (!silent) addToast("Dashboard data synchronized.");
      }
    } catch {
      if (!silent) addToast("Failed to sync data.", "error");
    } finally {
      if (!silent) setSyncing(false);
    }
  }, [activeTab]);

  useEffect(() => {
    let eventSource;

    const connectSSE = () => {
      if (activeTab === "content" || activeTab === "social" || activeTab === "account") return;
      
      eventSource = new EventSource("/api/settings/sync");
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          setSettings((prev) => ({
            ...prev,
            ...data,
            socialLinks: {
              facebook: data.socialLinks?.facebook || "",
              whatsapp: data.socialLinks?.whatsapp || "",
              tiktok: data.socialLinks?.tiktok || "",
              instagram: data.socialLinks?.instagram || "",
            },
          }));
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        setTimeout(connectSSE, 5000); // Reconnect after 5s
      };
    };

    connectSSE();

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [activeTab]);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("apkDownloadUrl", settings.apkDownloadUrl);
      formData.append("buySellUrl", settings.buySellUrl);
      formData.append("redirectUrl", settings.redirectUrl);
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
    } catch {
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
      setUserProfile((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
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
      setSettings((prev) => ({ 
        ...prev, 
        downloadCount: 0, 
        visitorCount: 0, 
        downloadHistory: [], 
        visitorHistory: [] 
      }));
      addToast("Counter reset successfully.");
      setShowResetModal(false);
      setResetPassword("");
    } else {
      addToast(result.error || "Authentication failed.", "error");
    }
    setIsResetting(false);
  };

  const logout = async () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

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
          onSave={activeTab === "account" ? handleUpdateProfile : handleSaveSettings}
          onMenuOpen={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-10 flex justify-center">
          <div className="w-full max-w-6xl">
            {activeTab === "insights" && (
              <InsightsSection 
                settings={settings} 
                syncing={syncing} 
                fetchLatestData={() => syncData(false)} 
                setShowResetModal={setShowResetModal} 
              />
            )}
            {activeTab === "traffic" && (
              <TrafficSection 
                settings={settings} 
                syncing={syncing} 
                fetchLatestData={() => syncData(false)} 
              />
            )}
            {activeTab === "content" && (
              <GeneralSection settings={settings} setSettings={setSettings} />
            )}
            {activeTab === "social" && (
              <SocialSection settings={settings} setSettings={setSettings} />
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
