import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './hooks/useToast';
import { CurrencyProvider } from './hooks/useCurrency.tsx';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedBooks from './components/FeaturedBooks';
import Categories from './components/Categories';
import About from './components/About';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Activities from './pages/Activities';
import ProductDetail from './pages/ProductDetail';
import KidsClasses from './pages/KidsClasses';
import CourseDetail from './pages/CourseDetail';
import AboutPage from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import YoungStorytellersOffer from './pages/YoungStorytellersOffer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ToastContainer from './components/ToastContainer';
import BlogPage from './pages/BlogPage';

// Category Pages
import StoryBooks from './pages/category/StoryBooks';
import ColoringBooks from './pages/category/ColoringBooks';
import YoungExplorersGuides from './pages/category/YoungExplorersGuides';
import ActivityBooks from './pages/category/ActivityBooks';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ToastProvider>
      <CurrencyProvider>
        <Router>
          <div className="min-h-screen">
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  {/* Hide Featured Books on mobile (md:block = hidden on screens < 768px, visible on >= 768px) */}
                  <div className="hidden md:block">
                    <FeaturedBooks />
                  </div>
                  <Categories />
                  <About />
                  <Newsletter />
                </>
              } />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:id" element={<ProductDetail />} />
              <Route path="/kids-classes" element={<KidsClasses />} />
              <Route path="/course/:courseId" element={<CourseDetail />} />
              <Route path="/young-storytellers-offer" element={<YoungStorytellersOffer />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/reading-together" element={<BlogPage />} />
              
              {/* Category Routes */}
              <Route path="/category/story-books" element={<StoryBooks />} />
              <Route path="/category/coloring-books" element={<ColoringBooks />} />
              <Route path="/category/young-explorers-guides" element={<YoungExplorersGuides />} />
              <Route path="/category/activity-books" element={<ActivityBooks />} />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </CurrencyProvider>
    </ToastProvider>
  );
}

export default App;