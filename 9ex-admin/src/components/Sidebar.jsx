import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Image, FileText, Video, Star, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/portfolio', label: 'Portfolio', icon: Image },
  { to: '/blogs', label: 'Blogs', icon: FileText },
  { to: '/testimonials', label: 'Video Testimonials', icon: Video },
  { to: '/reviews', label: 'Reviews', icon: Star },
];

export default function Sidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-paper">
      <aside className="w-64 shrink-0 bg-ink text-paper flex flex-col">
        <div className="p-6 border-b border-paper/10">
          <p className="font-semibold text-lg tracking-wide">9EX Admin</p>
          <p className="text-xs text-paper/40 mt-1">{admin?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-brass-bright/15 text-brass-bright'
                    : 'text-paper/70 hover:bg-white/5 hover:text-paper'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-paper/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-paper/60 hover:text-paper w-full"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
