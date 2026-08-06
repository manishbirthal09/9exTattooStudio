import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogEditor from './pages/BlogEditor.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Reviews from './pages/Reviews.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/new" element={<BlogEditor />} />
        <Route path="/blogs/edit/:id" element={<BlogEditor />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/reviews" element={<Reviews />} />
      </Route>

      <Route path="*" element={<Navigate to="/portfolio" replace />} />
    </Routes>
  );
}
