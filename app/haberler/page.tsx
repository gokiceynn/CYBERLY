'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NewsPage() {
  const news = [
    {
      title: "Yeni Ransomware Saldırısı: Dünya Çapında Etki",
      date: "15 Mart 2024",
      category: "Tehditler",
      excerpt: "Son zamanlarda artan ransomware saldırıları, küresel ölçekte işletmeleri etkiliyor. Uzmanlar, güvenlik önlemlerinin artırılması gerektiğini vurguluyor."
    },
    {
      title: "Yapay Zeka ve Siber Güvenlik: Yeni Dönem",
      date: "12 Mart 2024",
      category: "Teknoloji",
      excerpt: "Yapay zeka teknolojileri, siber güvenlik alanında yeni fırsatlar sunuyor. Otomatik tehdit tespiti ve önleme sistemleri geliştiriliyor."
    },
    {
      title: "Veri Sızıntısı: 1 Milyon Kullanıcı Etkilendi",
      date: "10 Mart 2024",
      category: "Güvenlik",
      excerpt: "Büyük bir veri sızıntısı, kullanıcı bilgilerinin tehlikeye girmesine neden oldu. Şirket, güvenlik açığını kapatmak için çalışmalara başladı."
    },
    {
      title: "Siber Güvenlik Eğitimi: Yeni Programlar",
      date: "8 Mart 2024",
      category: "Eğitim",
      excerpt: "Üniversiteler ve özel kurumlar, siber güvenlik alanında yeni eğitim programları sunuyor. Uzman ihtiyacı artıyor."
    },
    {
      title: "Kripto Para Dolandırıcılığı: Artan Risk",
      date: "5 Mart 2024",
      category: "Tehditler",
      excerpt: "Kripto para dolandırıcılığı vakaları artıyor. Uzmanlar, yatırımcıları dikkatli olmaları konusunda uyarıyor."
    },
    {
      title: "Yeni Güvenlik Duvarı Teknolojisi",
      date: "3 Mart 2024",
      category: "Teknoloji",
      excerpt: "Gelişmiş yapay zeka destekli güvenlik duvarı teknolojisi, tehditleri daha etkili tespit ediyor."
    }
  ]

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

        {/* News Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-cyan-400">{item.category}</span>
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">{item.title}</h2>
                  <p className="text-gray-300">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 