// frontend/src/app/dashboard/calendar/page.tsx
'use client';

import { useState } from 'react';

export default function CalendarPage() {
    const [currentDate] = useState(new Date());

    // Simple calendar grid data
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                        <i className="fas fa-calendar-alt text-accent-cyan"></i>
                        Calendar
                    </h2>
                    <p className="text-text-secondary text-sm">Manage your schedule and deadlines</p>
                </div>
                <div className="flex items-center gap-3 bg-charcoal rounded-xl p-1 border border-glass-border">
                    <button className="px-4 py-2 text-sm font-medium bg-dark-gray text-text-primary rounded-lg border border-glass-border">Month</button>
                    <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Week</button>
                    <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Day</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-2 bg-charcoal rounded-2xl border border-glass-border overflow-hidden">
                    <div className="p-6 border-b border-glass-border flex items-center justify-between">
                        <h3 className="text-lg font-bold text-text-primary">{monthName} {year}</h3>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-lg bg-dark-gray border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-dark-gray border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 border-b border-glass-border">
                        {days.map(day => (
                            <div key={day} className="py-3 text-center text-xs font-bold text-text-secondary uppercase tracking-widest border-r border-glass-border last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7">
                        {Array.from({ length: 35 }).map((_, i) => {
                            const dayNum = i - 2; // Simple mock offset
                            const isToday = dayNum === 10;
                            const isOtherMonth = dayNum <= 0 || dayNum > 31;

                            return (
                                <div key={i} className={`h-32 p-3 border-r border-b border-glass-border last:border-r-0 transition-colors hover:bg-glass-bg cursor-pointer ${isOtherMonth ? 'bg-obsidian/30' : ''}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-sm font-medium ${isToday ? 'w-7 h-7 bg-accent-purple text-white rounded-full flex items-center justify-center shadow-lg shadow-accent-purple/30' : 'text-text-secondary'}`}>
                                            {isOtherMonth ? (dayNum <= 0 ? 30 + dayNum : dayNum - 31) : dayNum}
                                        </span>
                                    </div>

                                    {!isOtherMonth && i % 4 === 0 && (
                                        <div className="mt-2 p-1.5 rounded-lg bg-accent-purple/10 border-l-2 border-accent-purple text-[10px] text-accent-purple font-medium truncate">
                                            Project Meeting
                                        </div>
                                    )}
                                    {!isOtherMonth && i % 7 === 0 && (
                                        <div className="mt-1 p-1.5 rounded-lg bg-accent-cyan/10 border-l-2 border-accent-cyan text-[10px] text-accent-cyan font-medium truncate">
                                            Design Review
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar: Upcoming Events */}
                <div className="space-y-6">
                    <div className="bg-charcoal rounded-2xl p-6 border border-glass-border">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                            <i className="fas fa-clock text-accent-pink"></i>
                            Upcoming Events
                        </h3>
                        <div className="space-y-4">
                            {[
                                { time: '10:00 AM', title: 'Product Sync', type: 'Work', color: 'accent-purple' },
                                { time: '02:00 PM', title: 'Client Call', type: 'Meeting', color: 'accent-cyan' },
                                { time: '04:30 PM', title: 'Design Handover', type: 'Design', color: 'accent-pink' },
                            ].map((event, i) => (
                                <div key={i} className="flex gap-4 group cursor-pointer">
                                    <div className="text-xs text-text-secondary w-16 pt-0.5">{event.time}</div>
                                    <div className={`flex-1 p-3 rounded-xl bg-dark-gray border border-glass-border group-hover:border-${event.color}/50 transition-all`}>
                                        <div className="text-sm font-semibold text-text-primary mb-1">{event.title}</div>
                                        <div className={`text-[10px] font-medium text-text-secondary`}>{event.type}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 rounded-2xl p-6 border border-glass-border">
                        <h3 className="text-base font-bold text-text-primary mb-2">Sync with Google</h3>
                        <p className="text-xs text-text-secondary mb-4 leading-relaxed">Import your existing calendars to manage everything in Onyx Flow.</p>
                        <button className="w-full py-2.5 bg-white text-obsidian font-bold text-sm rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-white/10">
                            Connect Calendar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
