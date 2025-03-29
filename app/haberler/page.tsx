'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface NewsItem {
  title: string
  date: string
  category: string
  excerpt: string
  url: string
  source: string
  imageUrl?: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)

        // RSS feedlerden haberleri çek
        const feeds = [
          {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/',
            source: 'BleepingComputer'
          },
          {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml',
            source: 'Dark Reading'
          },
          {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https://krebsonsecurity.com/feed/',
            source: 'KrebsOnSecurity'
          },
          {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https://thehackernews.com/feed/',
            source: 'The Hacker News'
          }
        ]

        const allNews: NewsItem[] = []

        for (const feed of feeds) {
          try {
            const response = await fetch(feed.url)
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            
            if (data.items) {
              const items = data.items.map((item: any) => ({
                title: item.title || '',
                date: new Date(item.pubDate || '').toLocaleDateString('tr-TR'),
                category: 'Siber Güvenlik',
                excerpt: item.contentSnippet || item.title || '',
                url: item.link || '',
                source: feed.source,
                imageUrl: item.thumbnail || item.enclosure?.link || ''
              }))
              allNews.push(...items)
            }
          } catch (error) {
            console.error(`Error fetching ${feed.source}:`, error)
          }
        }

        if (allNews.length === 0) {
          throw new Error('Hiç haber bulunamadı.')
        }

        // Haberleri tarihe göre sırala
        allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        
        // İlk 5 haberi öne çıkan haberler olarak ayarla
        setFeaturedNews(allNews.slice(0, 5))
        setNews(allNews)
      } catch (error: any) {
        console.error('Error fetching news:', error)
        setError(error.message || 'Haberler yüklenirken bir hata oluştu.')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-900">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -top-1/4 -right-1/4 h-96 w-96 rounded-full bg-cyan-600 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Siber Güvenlik</span>
                <span className="block text-cyan-400">Haberleri</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Güncel siber güvenlik haberleri ve gelişmeleri.
              </p>
            </div>
          </div>
        </section>

        {/* Featured News Slider */}
        {!loading && !error && featuredNews.length > 0 && (
          <section className="py-12 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8">Öne Çıkan Haberler</h2>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="w-full h-[400px]"
              >
                {featuredNews.map((item, index) => (
                  <SwiperSlide key={index}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <div className="relative h-full rounded-xl overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
                          <div className="absolute bottom-0 p-6">
                            <span className="text-sm text-cyan-400">{item.source}</span>
                            <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                            <p className="text-gray-300 mt-2">{item.excerpt}</p>
                            <span className="text-sm text-gray-400 mt-2 block">{item.date}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                <p className="mt-4">Haberler yükleniyor...</p>
              </div>
            ) : error ? (
              <div className="text-center text-white">
                <p className="text-red-400 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
                >
                  Yeniden Dene
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-cyan-400">{item.source}</span>
                      <span className="text-sm text-gray-400">{item.date}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3">{item.title}</h2>
                    <p className="text-gray-300">{item.excerpt}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 