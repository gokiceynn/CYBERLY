'use client'

import { useState, useEffect, useReducer } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { AUTH_CHANGE_EVENT } from '../context/AuthContext'
import UserMenu from './UserMenu'
import { FaShieldAlt, FaBook, FaQuestionCircle, FaInfoCircle, FaNewspaper, FaUserShield, FaGraduationCap } from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'

// Navigasyon linkleri
const NAV_LINKS = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Hakkımızda', path: '/hakkimizda' },
  { name: 'Blog', path: '/blog' },
  { name: 'Siber Tehditler', path: '/siber-tehditler' },
  { name: 'İpuçları', path: '/ipuclari' },
  { name: 'Kaynaklar', path: '/kaynaklar' },
  { name: 'SSS', path: '/sss' },
  { name: 'Haberler', path: '/haberler' },
]

// Kullanıcı giriş yaptıysa görünecek linkler
const USER_LINKS = [
  { name: 'Profil', path: '/profil', icon: <FaUserShield className="inline-block mr-1" /> },
  { name: 'Eğitimlerim', path: '/egitimlerim' },
]

function Navbar() {
  // useAuth hook'u ile user ve diğer fonksiyonları al
  const { user, loading, logout, checkAuth } = useAuth();
  
  // Yerel state'ler
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  // Giriş durumu ve yerel kullanıcı - başlangıçta false olarak ayarla
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  
  // SSR/CSR uyumsuzluğunu engellemek için kullanacağımız bir bayrak
  const [isMounted, setIsMounted] = useState(false);
  
  // Bileşen mount edildikten sonra isLoggedIn durumunu kontrol et
  useEffect(() => {
    setIsMounted(true);
    
    // İstemci tarafında çalıştığımızdan emin olalım
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('cyberly_user');
        console.log('Navbar: localStorage kontrolü', !!storedUser, storedUser ? JSON.parse(storedUser) : null);
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setLocalUser(userData);
          setIsLoggedIn(true);
          console.log('Navbar: Kullanıcı giriş yapmış, isLoggedIn=true');
        } else {
          setIsLoggedIn(false);
          console.log('Navbar: Kullanıcı giriş yapmamış, isLoggedIn=false');
        }
      } catch (error) {
        console.error('Navbar: LocalStorage kontrolü sırasında hata:', error);
      }
    }
  }, []);
  
  // Tarayıcıda localStorage'dan direkt kullanıcı durumunu kontrol et
  const checkLocalStorage = () => {
    if (typeof window === 'undefined') return null;
    
    try {
      const storedUser = localStorage.getItem('cyberly_user');
      const userData = storedUser ? JSON.parse(storedUser) : null;
      return userData;
    } catch (error) {
      console.error('Navbar: LocalStorage kontrol hatası', error);
      return null;
    }
  };
  
  // Özel oturum değişikliği olayını dinle
  useEffect(() => {
    if (!isMounted) return;
    
    const handleAuthChange = (event) => {
      console.log('Navbar: Auth değişiklik olayı alındı', event.detail);
      const { user: authUser, loggedIn } = event.detail;
      
      // State'i güncelle
      if (typeof loggedIn !== 'undefined') {
        setIsLoggedIn(loggedIn);
      } else {
        setIsLoggedIn(!!authUser);
      }
      
      setLocalUser(authUser);
      forceUpdate();
    };
    
    // Event listener'ı ekle
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    
    // Cleanup
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    };
  }, [isMounted]);
  
  // Sayfa yüklendikten sonra bir kez oturumu kontrol et
  useEffect(() => {
    if (!isMounted) return;
    
    let mounted = true;
    
    const verifyOnce = async () => {
      try {
        const isAuth = await checkAuth();
        if (mounted) {
          if (isAuth !== isLoggedIn) {
            console.log('Navbar: checkAuth ile oturum durumu güncellendi:', isAuth);
            setIsLoggedIn(isAuth);
          }
        }
      } catch (error) {
        console.error('Navbar oturum kontrolü hatası:', error);
      }
    };
    
    // Biraz gecikme ile kontrol et
    if (typeof window !== 'undefined') {
      setTimeout(verifyOnce, 500);
    }
    
    return () => {
      mounted = false;
    };
  }, [isLoggedIn, checkAuth, isMounted]);

  // User değişikliklerini izle
  useEffect(() => {
    if (user) {
      console.log('Navbar: useAuth hook kullanıcı değişikliği algılandı', user);
      setIsLoggedIn(true);
      setLocalUser(user);
    }
  }, [user]);

  // Görüntülenecek kullanıcı bilgisi
  const currentUser = user || localUser;

  // Link prefetching için - sayfa yüklendiğinde en sık ziyaret edilen sayfaları önceden yükle
  useEffect(() => {
    // Yaygın sayfaları preload için link elementleri ekle
    const preloadLinks = ['/hakkimizda', '/blog']
    preloadLinks.forEach(path => {
      if (pathname !== path) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'fetch'
        link.href = path
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      }
    })
  }, [pathname])

  const scrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('iletisim')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      setIsLoggedIn(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  }

  const handleMobileNavigation = (path) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.location.href = path;
  };

  return (
    <nav className="relative bg-gray-900/20 text-white shadow-lg border-b border-cyan-700 backdrop-blur-sm z-[3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 mr-2 relative">
                <Image
                  src="/shield-lock.svg"
                  alt="CYBERLY Logo"
                  width={32}
                  height={32}
                  className="text-cyan-500 text-glow"
                  priority
                />
              </div>
              <span className="font-bold text-xl text-cyan-400 text-glow">CYBERLY</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link 
                  key={link.path}
                  href={link.path} 
                  prefetch={true}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors ${
                    isActive ? 'text-cyan-400 bg-gray-800/30' : 'text-white'
                  }`}
                >
                  <span className="flex items-center">
                    {link.name}
                  </span>
                </Link>
              )
            })}
            
            {/* İletişim butonu - her zaman görünür */}
            <a 
              href="#iletisim" 
              onClick={scrollToContact}
              className="px-4 py-2 rounded-md text-sm font-medium bg-cyan-600/60 hover:bg-cyan-700 transition-colors border-glow flex items-center"
            >
              İletişim
            </a>
            
            {/* Kullanıcı giriş linkleri - istemci tarafında (client-side) kontrol edilecek */}
            {isMounted && (
              <>
                {/* Kullanıcı giriş yaptıysa */}
                {isLoggedIn && USER_LINKS.map((link) => {
                  const isActive = pathname === link.path
                  return (
                    <Link 
                      key={link.path}
                      href={link.path} 
                      prefetch={true}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors ${
                        isActive ? 'text-cyan-400 bg-gray-800/30' : 'text-white'
                      }`}
                    >
                      <span className="flex items-center">
                        {link.icon ? link.icon : null}
                        {link.name}
                      </span>
                    </Link>
                  )
                })}
                
                {/* Kullanıcı giriş yapmadıysa giriş/kayıt butonları göster */}
                {!isLoggedIn && (
                  <div className="ml-4 flex items-center space-x-2">
                    <Link 
                      href="/giris" 
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors"
                    >
                      Giriş Yap
                    </Link>
                    <Link 
                      href="/uye-ol" 
                      className="px-4 py-2 rounded-md text-sm font-medium bg-cyan-500/80 hover:bg-cyan-600 transition-colors"
                    >
                      Üye Ol
                    </Link>
                  </div>
                )}
                
                {/* Kullanıcı giriş yaptıysa kullanıcı menüsünü göster */}
                {isMounted && isLoggedIn && (
                  <div className="ml-4">
                    <UserMenu />
                    {console.log('Navbar render: UserMenu gösteriliyor, isLoggedIn=', isLoggedIn, 'currentUser=', currentUser)}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:text-white hover:bg-gray-800/30 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-900/20 backdrop-blur-sm`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path
            return (
              <Link 
                key={link.path}
                href={link.path} 
                prefetch={true}
                className={`flex items-center block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors ${
                  isActive ? 'text-cyan-400 bg-gray-800/30' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center">
                  {link.name}
                </span>
              </Link>
            )
          })}
          
          <a 
            href="#iletisim" 
            onClick={scrollToContact}
            className="block px-3 py-2 rounded-md text-base font-medium bg-cyan-600/60 hover:bg-cyan-700 transition-colors border-glow flex items-center"
          >
            İletişim
          </a>
          
          {/* İstemci tarafındaki kontroller burada */}
          {isMounted && (
            <>
              {/* Kullanıcı giriş yaptıysa gösterilecek menü öğeleri */}
              {isLoggedIn && USER_LINKS.map((link) => {
                const isActive = pathname === link.path
                return (
                  <Link 
                    key={link.path}
                    href={link.path} 
                    prefetch={true}
                    className={`flex items-center block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors ${
                      isActive ? 'text-cyan-400 bg-gray-800/30' : 'text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      {link.icon ? link.icon : null}
                      {link.name}
                    </span>
                  </Link>
                )
              })}
              
              {/* Kullanıcı giriş yapmadıysa giriş/kayıt butonları göster */}
              {!isLoggedIn && (
                <>
                  <Link 
                    href="/giris" 
                    className="block px-3 py-2 mt-2 rounded-md text-base font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                  <Link 
                    href="/uye-ol" 
                    className="block px-3 py-2 mt-2 rounded-md text-base font-medium bg-cyan-500/80 hover:bg-cyan-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Üye Ol
                  </Link>
                </>
              )}
              
              {/* Kullanıcı giriş yaptıysa profil ve çıkış butonları göster */}
              {isLoggedIn && (
                <>
                  <div className="border-t border-gray-700 my-2"></div>
                  <div className="px-3 py-2 text-sm font-medium text-cyan-400">
                    {currentUser?.name || currentUser?.email?.split('@')[0] || 'Kullanıcı'}
                  </div>
                  <button 
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors"
                    onClick={handleMobileNavigation('/profil')}
                  >
                    Profil
                  </button>
                  <button 
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors"
                    onClick={handleMobileNavigation('/ayarlar')}
                  >
                    Ayarlar
                  </button>
                  {currentUser?.role === 'ADMIN' && (
                    <button 
                      className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800/30 hover:text-cyan-400 transition-colors"
                      onClick={handleMobileNavigation('/profil')}
                    >
                      Yönetim Paneli
                    </button>
                  )}
                  <button
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-800/30 transition-colors"
                    onClick={handleLogout}
                  >
                    Çıkış Yap
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 