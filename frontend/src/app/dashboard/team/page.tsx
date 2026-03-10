// frontend/src/app/dashboard/team/page.tsx
'use client';

export default function TeamPage() {
    const members = [
        { name: 'Alex Rivera', role: 'Product Designer', status: 'Online', tasks: 12, avatar: 'AR', color: 'accent-purple' },
        { name: 'Sarah Chen', role: 'Frontend Lead', status: 'Busy', tasks: 8, avatar: 'SC', color: 'accent-cyan' },
        { name: 'Mike Ross', role: 'Backend Dev', status: 'Offline', tasks: 5, avatar: 'MR', color: 'accent-pink' },
        { name: 'Elena Vance', role: 'QA Engineer', status: 'Online', tasks: 14, avatar: 'EV', color: 'success' },
    ];

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                        <i className="fas fa-users text-accent-cyan"></i>
                        Team Collaboration
                    </h2>
                    <p className="text-text-secondary text-sm">Manage your team members and their assignments</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-purple/20">
                    <i className="fas fa-user-plus mr-2"></i>
                    Invite Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {members.map((member, i) => (
                    <div key={i} className="bg-charcoal rounded-2xl p-6 border border-glass-border hover:border-glass-border/50 transition-all group">
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-${member.color} to-charcoal flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg shadow-${member.color}/20 group-hover:scale-105 transition-transform`}>
                                {member.avatar}
                            </div>
                            <h3 className="text-lg font-bold text-text-primary mb-1">{member.name}</h3>
                            <p className="text-xs text-text-secondary mb-4 uppercase tracking-widest">{member.role}</p>

                            <div className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-wider">
                                <span className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-success' : member.status === 'Busy' ? 'bg-danger' : 'bg-text-secondary'}`}></span>
                                <span className={member.status === 'Online' ? 'text-success' : member.status === 'Busy' ? 'text-danger' : 'text-text-secondary'}>{member.status}</span>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-2">
                                <div className="bg-dark-gray rounded-xl p-3 border border-glass-border">
                                    <div className="text-xl font-bold text-text-primary">{member.tasks}</div>
                                    <div className="text-[10px] text-text-secondary uppercase">Tasks</div>
                                </div>
                                <div className="bg-dark-gray rounded-xl p-3 border border-glass-border">
                                    <div className="text-xl font-bold text-text-primary">48h</div>
                                    <div className="text-[10px] text-text-secondary uppercase">Uptime</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-charcoal rounded-2xl border border-glass-border overflow-hidden">
                <div className="p-6 border-b border-glass-border">
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Active Team Activities</h3>
                </div>
                <div className="p-6 space-y-6">
                    {[
                        { user: 'Sarah Chen', action: 'completed the task', item: 'Auth Module Implementation', time: '2 mins ago', icon: 'fa-check-circle', color: 'success' },
                        { user: 'Alex Rivera', action: 'added a comment to', item: 'Dashboard UI Review', time: '15 mins ago', icon: 'fa-comment', color: 'accent-cyan' },
                        { user: 'Mike Ross', action: 'merged PR', item: 'Backend API Fix', time: '1 hour ago', icon: 'fa-code-merge', color: 'accent-purple' },
                    ].map((activity, i) => (
                        <div key={i} className="flex gap-4">
                            <div className={`w-10 h-10 rounded-full bg-${activity.color}/10 flex items-center justify-center text-${activity.color} flex-shrink-0`}>
                                <i className={`fas ${activity.icon}`}></i>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-text-primary">
                                    <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold text-accent-cyan cursor-pointer hover:underline">{activity.item}</span>
                                </p>
                                <p className="text-xs text-text-secondary mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
