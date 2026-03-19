"use client";

import { Facebook, MessageSquare, Music, Instagram, Globe2 } from "lucide-react";

export default function SocialSection({ settings, setSettings }) {
  const socials = [
    { id: 'facebook', icon: Facebook, color: 'text-blue-500', label: 'Facebook' },
    { id: 'whatsapp', icon: MessageSquare, color: 'text-green-500', label: 'WhatsApp' },
    { id: 'tiktok', icon: Music, color: 'text-white', label: 'TikTok' },
    { id: 'instagram', icon: Instagram, color: 'text-purple-500', label: 'Instagram' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-8">
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-10 space-y-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-400/10 flex items-center justify-center border border-indigo-400/20">
                <Globe2 className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-white text-[13px] font-black uppercase tracking-widest leading-none">Social Integration</h4>
                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Connect your community platforms</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-2">
              {socials.map((social) => (
                <div key={social.id} className="flex flex-col">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1 mb-2.5 flex items-center gap-2">
                    <social.icon className={`w-3.5 h-3.5 ${social.color}`} /> {social.label}
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={settings.socialLinks[social.id]}
                      onChange={(e) => setSettings({
                        ...settings, 
                        socialLinks: { ...settings.socialLinks, [social.id]: e.target.value } 
                      })}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-[13px] font-mono outline-none focus:border-white/20 transition-all text-zinc-300"
                      placeholder={`${social.label} URL…`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
