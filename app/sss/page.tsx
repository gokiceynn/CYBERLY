'use client'

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Siber güvenlik nedir?",
      answer: "Siber güvenlik, bilgisayar sistemleri, ağlar ve verilerin dijital saldırılardan korunması için uygulanan teknolojiler, süreçler ve uygulamaların bütünüdür."
    },
    {
      question: "Neden siber güvenlik önemlidir?",
      answer: "Günümüzde dijital varlıklarımız ve kişisel bilgilerimiz sürekli tehdit altındadır. Siber güvenlik, bu varlıkları ve bilgileri korumak için kritik öneme sahiptir."
    },
    {
      question: "En yaygın siber tehditler nelerdir?",
      answer: "En yaygın siber tehditler arasında malware, phishing, ransomware, DDoS saldırıları ve sosyal mühendislik saldırıları bulunmaktadır."
    },
    {
      question: "Güçlü bir şifre nasıl oluşturulur?",
      answer: "Güçlü bir şifre en az 12 karakter uzunluğunda olmalı, büyük/küçük harf, rakam ve özel karakterler içermeli ve tahmin edilemez olmalıdır."
    },
    {
      question: "İki faktörlü doğrulama (2FA) nedir?",
      answer: "İki faktörlü doğrulama, hesabınıza giriş yaparken şifrenize ek olarak ikinci bir doğrulama yöntemi (örneğin SMS kodu veya authenticator uygulaması) kullanmanızı sağlayan bir güvenlik önlemidir."
    },
    {
      question: "VPN kullanmak gerekli midir?",
      answer: "VPN kullanmak, özellikle halka açık Wi-Fi ağlarında internet trafiğinizi şifreleyerek güvenliğinizi artırır. Önemli bir güvenlik önlemidir."
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
                <span className="block">Sıkça Sorulan</span>
                <span className="block text-cyan-400">Sorular</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Siber güvenlik hakkında merak ettiğiniz soruların cevapları.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900 rounded-xl border border-gray-700">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="text-lg font-medium text-white">{faq.question}</span>
                    <span className="text-cyan-400">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  )}
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