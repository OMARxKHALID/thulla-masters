"use client";

import { Facebook, MessageSquare, Music, Instagram } from "lucide-react";

export default function SocialSection({ settings, setSettings }) {
  const socials = [
    { id: 'facebook', icon: Facebook, color: 'text-blue-500', label: 'Facebook' },
    { id: 'whatsapp', icon: MessageSquare, color: 'text-green-500', label: 'WhatsApp' },
    { id: 'tiktok', icon: Music, color: 'text-zinc-200', label: 'TikTok' },
    { id: 'instagram', icon: Instagram, color: 'text-purple-500', label: 'Instagram' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-3">
        <h3 className="text-zinc-600 text-[13px] font-black uppercase tracking-[0.2em]">Connect Platforms</h3>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socials.map((social) => (
              <div key={social.id} className="space-y-2">
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-600 px-1">{social.label}</label>
                <div className="relative group">
                  <social.icon className={`absolute left-4 top-1/2 -translate-y-1/2 ${social.color} w-4.5 h-4.5 opacity-40 group-focus-within:opacity-100 transition-opacity`} />
                  <input
                    type="text"
                    value={settings.socialLinks[social.id]}
                    onChange={(e) => setSettings({
                      ...settings, 
                      socialLinks: { ...settings.socialLinks, [social.id]: e.target.value } 
                    })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-[14px] font-mono outline-none focus:border-white/20 transition-all text-zinc-400"
                    placeholder={`${social.label} link`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
