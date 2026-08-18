// import React from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { Image, FileText, Video, Star, LogOut } from 'lucide-react';
// import { useAuth } from '../context/AuthContext.jsx';

// const links = [
//   { to: '/portfolio', label: 'Portfolio', icon: Image },
//   { to: '/blogs', label: 'Blogs', icon: FileText },
//   { to: '/testimonials', label: 'Video Testimonials', icon: Video },
//   { to: '/reviews', label: 'Reviews', icon: Star },
// ];

// export default function Sidebar() {
//   const { admin, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex bg-paper">
//       <aside className="w-64 shrink-0 bg-ink text-paper flex flex-col">
//         <div className="p-6 border-b border-paper/10">
//           <p className="font-semibold text-lg tracking-wide">9EX Admin</p>
//           <p className="text-xs text-paper/40 mt-1">{admin?.email}</p>
//         </div>

//         <nav className="flex-1 p-4 space-y-1">
//           {links.map(({ to, label, icon: Icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
//                   isActive
//                     ? 'bg-brass-bright/15 text-brass-bright'
//                     : 'text-paper/70 hover:bg-white/5 hover:text-paper'
//                 }`
//               }
//             >
//               <Icon size={16} />
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-paper/10">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2.5 text-sm text-paper/60 hover:text-paper w-full"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1 p-8 overflow-y-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Image, FileText, Video, Star, LogOut, Menu, X } from 'lucide-react';
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
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-paper">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-ink text-paper px-4 py-3 border-b border-paper/10">
        <p className="font-semibold text-base tracking-wide">9EX Admin</p>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay behind drawer on mobile */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar / drawer */}
      <aside
        className={`
          bg-ink text-paper flex flex-col
          fixed md:static inset-y-0 left-0 z-50
          w-64 shrink-0
          transform transition-transform duration-200 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-paper/10 flex items-center justify-between">
          <div>
            <p className="font-semibold text-lg tracking-wide">9EX Admin</p>
            <p className="text-xs text-paper/40 mt-1">{admin?.email}</p>
          </div>
          <button
            className="md:hidden text-paper/70 hover:text-paper"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
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

      <main className="flex-1 p-4 md:p-8 overflow-y-auto pt-16 md:pt-8">
        <Outlet />
      </main>
    </div>
  );
}
