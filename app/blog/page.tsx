import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Blog - CYBERLY',
  description: 'Yazılım geliştirme, web teknolojileri ve dijital dönüşüm hakkında güncel makaleler',
}

export default function BlogPage() {
  // Ana blog kategorileri
  const categories = [
    { name: 'Tümü', count: 24 },
    { name: 'Web Geliştirme', count: 8 },
    { name: 'React & Next.js', count: 6 },
    { name: 'UI/UX Tasarım', count: 5 },
    { name: 'Backend', count: 3 },
    { name: 'Yapay Zeka', count: 2 },
  ]
  
  // Öne çıkan blog yazısı
  const featuredPost = {
    title: 'Next.js 15 ile Gelen Yenilikler ve Performans İyileştirmeleri',
    excerpt: 'Next.js 15 sürümüyle hayatımıza giren yeni özellikler, Server Actions gelişmeleri ve Turbopack iyileştirmeleri hakkında detaylı rehber.',
    date: '25 Mart 2024',
    readTime: '10 dk okuma',
    author: 'Fevziye Nur Kesebir',
    category: 'React & Next.js'
  }
  
  // Blog yazıları
  const blogPosts = [
    {
      title: 'Modern Web Uygulamalarında React Server Components Kullanımı',
      excerpt: 'React Server Components ile daha hızlı yükleme süreleri ve daha iyi SEO nasıl sağlanır? Pratik örneklerle inceliyoruz.',
      date: '12 Mart 2024',
      readTime: '8 dk okuma',
      author: 'Fevziye Nur Kesebir',
      category: 'React & Next.js'
    },
    {
      title: 'Tailwind CSS ile Hızlı ve Responsive Tasarım İpuçları',
      excerpt: 'Tailwind CSS kullanarak mobil uyumlu, hızlı ve bakımı kolay arayüzler nasıl tasarlanır? En iyi pratikler ve ince ayarlar.',
      date: '5 Mart 2024',
      readTime: '7 dk okuma',
      author: 'Nisanur Gökçen Usta',
      category: 'UI/UX Tasarım'
    },
    {
      title: 'API Tasarımında RESTful ve GraphQL Karşılaştırması',
      excerpt: 'Modern web uygulamalarında hangi API yaklaşımı daha uygundur? REST ve GraphQL avantajları ve kullanım senaryoları.',
      date: '18 Şubat 2024',
      readTime: '9 dk okuma',
      author: 'Fevziye Nur Kesebir',
      category: 'Backend'
    },
    {
      title: 'Web Animasyonları için Framer Motion Kullanımı',
      excerpt: 'React projelerinizde etkileyici animasyonlar oluşturmak için Framer Motion kütüphanesinin detaylı kullanım rehberi.',
      date: '22 Ocak 2024',
      readTime: '6 dk okuma',
      author: 'Nisanur Gökçen Usta',
      category: 'UI/UX Tasarım'
    },
    {
      title: 'Zustand ile Modern React State Yönetimi',
      excerpt: 'Redux\'tan daha hafif ve kolay kullanımlı Zustand ile React uygulamalarında state yönetiminin tüm incelikleri.',
      date: '10 Ocak 2024',
      readTime: '9 dk okuma',
      author: 'Fevziye Nur Kesebir',
      category: 'React & Next.js'
    },
    {
      title: 'Yapay Zeka Destekli Web Uygulamaları Geliştirme',
      excerpt: 'OpenAI API ve diğer yapay zeka servislerini web projelerinize nasıl entegre edebilirsiniz? Pratik örneklerle rehber.',
      date: '15 Aralık 2023',
      readTime: '11 dk okuma',
      author: 'Nisanur Gökçen Usta',
      category: 'Yapay Zeka'
    },
  ]

  return (
    <>
      <Navbar />
      
      <main className="bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-900">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -top-1/4 -right-1/4 h-96 w-96 rounded-full bg-cyan-600 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Yazılım Geliştirme</span>
                <span className="block text-cyan-400">Blog ve Rehberler</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Modern web teknolojileri, uygulama geliştirme ve dijital çözümler hakkında uzman içerikleri
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Content */}
        <section className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-8">
                  <h3 className="text-xl font-bold text-white mb-6">Kategoriler</h3>
                  <ul className="space-y-3">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a 
                          href="#" 
                          className={`flex justify-between items-center ${index === 0 ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'} transition-colors`}
                        >
                          <span>{category.name}</span>
                          <span className="rounded-full bg-gray-700 px-3 py-1 text-xs font-medium">
                            {category.count}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-10">
                    <h3 className="text-xl font-bold text-white mb-6">Abone Ol</h3>
                    <p className="text-gray-400 mb-4">
                      En son yazılım geliştirme trendleri ve makalelerini almak için abone olun.
                    </p>
                    <form className="space-y-4">
                      <div>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="E-posta adresiniz"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-4 py-3 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-colors"
                      >
                        Abone Ol
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Featured Post */}
                <div className="mb-12">
                  <div className="flex flex-col rounded-xl shadow-2xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-cyan-700 transition-colors">
                    <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-900 text-cyan-300">
                          {featuredPost.category}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-3">{featuredPost.title}</h2>
                      <p className="text-gray-300 mb-4">{featuredPost.excerpt}</p>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200 font-bold">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">
                            {featuredPost.author}
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-400">
                            <time dateTime="2020-03-16">{featuredPost.date}</time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Blog Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogPosts.map((post, index) => (
                    <div key={index} className="flex flex-col rounded-xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-cyan-700 transition-colors shadow-lg h-full">
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900 text-cyan-300">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                        <p className="text-gray-300 mb-4 flex-grow">{post.excerpt}</p>
                        <div className="flex items-center mt-auto">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200 font-bold text-sm">
                            {post.author.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">
                              {post.author}
                            </p>
                            <div className="flex space-x-1 text-xs text-gray-400">
                              <time>{post.date}</time>
                              <span aria-hidden="true">&middot;</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-1">
                    <a href="#" className="p-2 rounded-md text-gray-400 hover:text-white">
                      <span className="sr-only">Önceki</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="px-3 py-2 rounded-md bg-cyan-800 text-white text-sm font-medium">1</a>
                    <a href="#" className="px-3 py-2 rounded-md text-gray-400 hover:text-white text-sm font-medium">2</a>
                    <a href="#" className="px-3 py-2 rounded-md text-gray-400 hover:text-white text-sm font-medium">3</a>
                    <span className="px-3 py-2 text-gray-400 text-sm">...</span>
                    <a href="#" className="px-3 py-2 rounded-md text-gray-400 hover:text-white text-sm font-medium">8</a>
                    <a href="#" className="p-2 rounded-md text-gray-400 hover:text-white">
                      <span className="sr-only">Sonraki</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 