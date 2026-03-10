'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface User {
    user_id: string;
    email: string;
    name: string;
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const userData = await api.get<User>('/me');
            setUser(userData);
            setName(userData.name || '');
        } catch (err: any) {
            console.error('Failed to fetch user:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const updatedUser = await api.patch<User>('/me', { name });
            setUser(updatedUser);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });

            // Notify layout to re-fetch user info
            window.dispatchEvent(new Event('user-updated'));

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'profile', icon: 'fa-user-circle', label: 'Profile' },
        { id: 'notifications', icon: 'fa-bell', label: 'Notifications' },
        { id: 'appearance', icon: 'fa-palette', label: 'Appearance' },
        { id: 'security', icon: 'fa-shield-alt', label: 'Security' },
    ];

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                    <i className="fas fa-cog text-accent-cyan"></i>
                    Account Settings
                </h2>
                <p className="text-text-secondary text-sm">Update your personal preferences and security settings</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Settings Sidebar */}
                <aside className="w-full md:w-64 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-accent-purple/20 to-accent-cyan/20 text-accent-purple border border-glass-border'
                                : 'text-text-secondary hover:bg-glass-bg hover:text-text-primary'
                                }`}
                        >
                            <i className={`fas ${tab.icon} w-5`}></i>
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Settings Content */}
                <div className="flex-1 bg-charcoal rounded-2xl border border-glass-border overflow-hidden shadow-2xl p-6 md:p-8">
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-success/10 border-success text-success' : 'bg-danger/10 border-danger text-danger'} transition-all flex items-center gap-3`}>
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                            <span className="text-sm font-medium">{message.text}</span>
                        </div>
                    )}

                    {activeTab === 'profile' && user && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-6 pb-6 border-b border-glass-border">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-accent-purple/30">
                                    {user.name?.charAt(0) || user.email?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary mb-1">{user.name || 'User'}</h3>
                                    <p className="text-xs text-text-secondary uppercase tracking-widest leading-loose">Member since {new Date().getFullYear()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider px-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-dark-gray rounded-xl p-3 border border-glass-border text-sm text-text-primary outline-none focus:border-accent-purple transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider px-1">Email Address</label>
                                    <input
                                        type="email"
                                        disabled
                                        value={user.email}
                                        className="w-full bg-dark-gray rounded-xl p-3 border border-glass-border text-sm text-text-secondary outline-none opacity-60 cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider px-1">User ID</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={user.user_id}
                                        className="w-full bg-dark-gray rounded-xl p-3 border border-glass-border text-xs text-text-secondary font-mono outline-none opacity-60 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-glass-border flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-2.5 bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-purple/20 flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSaving ? (
                                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</>
                                    ) : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-text-primary mb-6">Theme Customization</h3>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Color Palette</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Onyx Dark', from: 'obsidian', to: 'charcoal', active: true },
                                        { label: 'Azure Echo', from: 'blue-900', to: 'blue-800', active: false },
                                        { label: 'Violet Void', from: 'purple-950', to: 'purple-900', active: false },
                                        { label: 'Carbon Fiber', from: 'black', to: 'gray-950', active: false },
                                    ].map((theme, i) => (
                                        <div key={i} className={`p-4 rounded-xl bg-${theme.from} border-2 ${theme.active ? 'border-accent-purple' : 'border-glass-border'} cursor-pointer hover:scale-105 transition-all text-center`}>
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan mx-auto mb-2"></div>
                                            <span className="text-[10px] font-bold text-text-primary uppercase tracking-tighter">{theme.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-dark-gray rounded-xl border border-glass-border">
                                <div>
                                    <h4 className="text-sm font-bold text-text-primary mb-1">Glassmorphism Intensity</h4>
                                    <p className="text-xs text-text-secondary">Adjust background blur effects</p>
                                </div>
                                <input type="range" className="w-32 accent-accent-purple" />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-dark-gray rounded-xl border border-glass-border">
                                <div>
                                    <h4 className="text-sm font-bold text-text-primary mb-1">Animation Level</h4>
                                    <p className="text-xs text-text-secondary">Reduce motion for performance</p>
                                </div>
                                <div className="w-12 h-6 bg-accent-purple rounded-full relative p-1 cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'profile' && activeTab !== 'appearance' && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 rounded-full bg-dark-gray border border-glass-border flex items-center justify-center text-text-secondary text-2xl mb-4">
                                <i className="fas fa-hammer"></i>
                            </div>
                            <h3 className="text-text-primary font-bold">Under Construction</h3>
                            <p className="text-sm text-text-secondary max-w-xs mt-2">We're building this section with extra care. Check back soon for advanced {activeTab} settings.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
