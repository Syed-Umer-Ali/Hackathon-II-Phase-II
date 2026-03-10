// frontend/src/app/dashboard/analytics/page.tsx
'use client';

export default function AnalyticsPage() {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                    <i className="fas fa-chart-line text-accent-purple"></i>
                    Performance Analytics
                </h2>
                <p className="text-text-secondary text-sm">Deep dive into your productivity and task velocity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Avg. Completion Time', value: '4.2h', change: '-12%', icon: 'fa-bolt', color: 'accent-cyan' },
                    { label: 'Success Rate', value: '94.8%', change: '+2.4%', icon: 'fa-bullseye', color: 'success' },
                    { label: 'Focused Hours', value: '32h', change: '+5h', icon: 'fa-brain', color: 'accent-purple' },
                    { label: 'Overdue Tasks', value: '2', change: '-3', icon: 'fa-exclamation-circle', color: 'danger' },
                ].map((stat, i) => (
                    <div key={i} className="bg-charcoal rounded-xl p-5 border border-glass-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center text-${stat.color}`}>
                                <i className={`fas ${stat.icon}`}></i>
                            </div>
                            <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                        <div className="text-xs text-text-secondary uppercase tracking-wider font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Productivity Chart Mock */}
                <div className="bg-charcoal rounded-2xl p-6 border border-glass-border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Productivity Flow</h3>
                        <div className="flex gap-2 text-[10px] font-bold text-text-secondary">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-purple"></span> Tasks</span>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-cyan"></span> Meetings</span>
                        </div>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-3 pt-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col gap-1 items-center group">
                                <div className="w-full bg-accent-cyan/20 rounded-t-sm group-hover:bg-accent-cyan/40 transition-colors" style={{ height: `${Math.random() * 40 + 20}%` }}></div>
                                <div className="w-full bg-accent-purple/40 rounded-t-sm group-hover:bg-accent-purple/60 transition-colors" style={{ height: `${Math.random() * 40 + 10}%` }}></div>
                                <span className="text-[10px] text-text-secondary mt-2">M{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Task Priority Distribution */}
                <div className="bg-charcoal rounded-2xl p-6 border border-glass-border">
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-6">Task Priority Mix</h3>
                    <div className="flex items-center justify-center h-64 relative">
                        {/* Simple SVG Donut Chart Mockup */}
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="20" className="text-dark-gray" />
                            <circle cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="20" strokeDasharray="502" strokeDashoffset="150" className="text-accent-purple" />
                            <circle cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="20" strokeDasharray="502" strokeDashoffset="350" className="text-accent-cyan" />
                            <circle cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="20" strokeDasharray="502" strokeDashoffset="450" className="text-accent-pink" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-bold text-text-primary">84</span>
                            <span className="text-[10px] text-text-secondary uppercase">Total</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-center">
                        <div className="text-accent-purple">High (45%)</div>
                        <div className="text-accent-cyan">Medium (35%)</div>
                        <div className="text-accent-pink">Low (20%)</div>
                    </div>
                </div>
            </div>

            {/* Velocity Table */}
            <div className="bg-charcoal rounded-2xl border border-glass-border overflow-hidden">
                <div className="p-6 border-b border-glass-border">
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Weekly Sprints</h3>
                </div>
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-dark-gray/50 text-text-secondary text-[11px] uppercase tracking-widest">
                            <th className="px-6 py-4 font-bold">Sprint ID</th>
                            <th className="px-6 py-4 font-bold">Velocity</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold">Efficiency</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-glass-border">
                        {[
                            { id: 'S-482', velocity: '92 pts', status: 'Completed', color: 'success', eff: '98%' },
                            { id: 'S-481', velocity: '88 pts', status: 'Completed', color: 'success', eff: '94%' },
                            { id: 'S-480', velocity: '76 pts', status: 'Warning', color: 'danger', eff: '82%' },
                            { id: 'S-479', velocity: '94 pts', status: 'Completed', color: 'success', eff: '99%' },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-glass-bg transition-colors">
                                <td className="px-6 py-4 font-semibold text-text-primary">{row.id}</td>
                                <td className="px-6 py-4 text-text-secondary">{row.velocity}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md bg-${row.color}/10 text-${row.color} text-[10px] font-bold`}>{row.status}</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-accent-cyan">{row.eff}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
