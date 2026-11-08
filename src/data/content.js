// sitedeki tum icerik burada, tasarima dokunmadan buradan guncellenir

export const profile = {
  name: 'Seyit Baltacıoğlu',
  role: 'Mobil uygulama geliştirici',
  location: 'İstanbul',
  // doldurulursa iletisim bolumunde kopyala butonuyla gorunur
  email: '',
  github: 'https://github.com/geniuseyis',
  instagram: 'https://www.instagram.com/babyodaonduty/',
}

export const stats = [
  { value: '136', label: 'birim testi', source: 'Ringify' },
  { value: '113', label: 'birim testi', source: 'Finansım' },
  { value: '120 Hz', label: 'sabit adımlı fizik', source: 'Plumbline' },
  { value: 'AES-256', label: 'şifreli yerel veri', source: 'Plumbline · Finansım' },
]

export const principles = [
  {
    title: 'Veri cihazda kalır',
    text: 'Ringify sesi baştan sona iPhone’da işler, hesap ya da izleme istemez. Plumbline ve Finansım kayıtları AES-256 ile şifreler, anahtar Keychain ya da Keystore’da durur.',
  },
  {
    title: 'Platformun diliyle konuşur',
    text: 'Apple HIG’e göre sekmeler ve yerel diyaloglar, en az 44 pt dokunma alanları, Dynamic Type, VoiceOver etiketleri ve Hareketi Azalt desteği.',
  },
  {
    title: 'Çalıştığı testle görünür',
    text: 'Ürün kuralları arayüzden ayrı katmanda durur ve birim testleriyle korunur. Plumbline’da aynı seed ve aynı bırakma anları hep aynı skoru verir, kayıtlar baştan oynatılıp doğrulanır.',
  },
]

export const projects = [
  {
    id: 'ringify',
    name: 'Ringify',
    kind: 'iOS · ses stüdyosu',
    icon: 'ringify.png',
    poster: 'ringify',
    posterAlt: 'Ringify’ın kırpma, ana sayfa ve kütüphane ekranlarını gösteren üç telefon',
    summary: 'Bir videodan, şarkıdan ya da kendi sesinden 1–29 saniyelik iPhone zil sesleri hazırlayan, çevrimdışı çalışan bir ses stüdyosu.',
    detail: 'Ürün kuralları ayrı bir Swift paketinde duruyor, bu sayede simülatör olmadan derlenip test edilebiliyor. Kesim, EQ, limiter ve kusursuz döngü geçişi tamamen cihazda çalışıyor.',
    metrics: [
      { value: '136', label: 'birim testi ve uçtan uca arayüz akışı' },
      { value: 'Swift 6', label: 'tam katı eşzamanlılık açık' },
      { value: 'TR · EN', label: 'açık ve koyu tema' },
    ],
    status: 'Sırada cihaz testi ve App Store',
    tech: ['Swift 6', 'SwiftUI', 'AVFoundation', 'SwiftData', 'StoreKit 2', 'XCTest'],
    repo: 'https://github.com/geniuseyis/ringify',
  },
  {
    id: 'plumbline',
    name: 'Plumbline',
    kind: 'iOS ve Android · fizik oyunu',
    icon: 'plumbline.png',
    poster: 'plumbline',
    posterAlt: 'Plumbline’ın vinçten sarkan katları ve şehir silüetindeki kuleyi gösteren üç telefon',
    summary: 'Vinçte sallanan katı doğru anda bırakıp kuleni yükselttiğin, gerçek fizikle çalışan bir kule oyunu.',
    detail: 'Fizik motoru React’ten ve çizimden bağımsız, saf TypeScript. Oyun deterministik olduğu için bir kayıt başka cihazda baştan oynatılıp doğrulanabiliyor; Hayalet modu da aynı mekanizmayla rekorunu yanında yeniden oynatıyor.',
    metrics: [
      { value: '120 Hz', label: 'sabit adımlı fizik' },
      { value: '4', label: 'hava durumu, fiziği ve puanı etkiler' },
      { value: 'AES-256', label: 'şifreli kayıtlar, hesap ve sunucu yok' },
    ],
    status: 'Sırada mağaza entegrasyonu',
    tech: ['React Native', 'Expo SDK 58', 'TypeScript', 'Skia', 'Reanimated', 'Vitest'],
    repo: 'https://github.com/geniuseyis/CityStacker',
  },
  {
    id: 'finansim',
    name: 'Finansım',
    kind: 'iOS ve Android · kişisel finans',
    icon: 'finansim.png',
    poster: 'finansim',
    posterAlt: 'Finansım’ın istatistik, ana sayfa ve yapay zeka danışmanı ekranlarını gösteren üç telefon',
    summary: 'Gelir, gider, bütçe ve birikim hedeflerini tek yerde toplayan, verileri cihazda şifreleyen kişisel finans uygulaması.',
    detail: 'Özellik bazlı Clean Architecture ve Riverpod ile yazıldı. Makbuzları cihaz üzerinde okuyor, TCMB kurlarını çekiyor. Yapay zeka anahtarı uygulamaya girmiyor; danışman, sunucu fonksiyonuna işlem ayrıntısı değil yalnızca skorları gönderiyor.',
    metrics: [
      { value: '113', label: 'birim testi, her push’ta CI' },
      { value: '25+', label: 'gerçek veriyle çalışan ekran' },
      { value: 'AES-256', label: 'hesaba özel yerel veri' },
    ],
    status: 'Sırada cihaz testi ve mağazalar',
    tech: ['Flutter', 'Dart', 'Riverpod', 'Firebase', 'Hive', 'ML Kit'],
    repo: 'https://github.com/geniuseyis/finansim',
  },
  {
    id: 'afet',
    name: 'Afet Yardım Sistemi',
    kind: 'iOS ve Android · gerçek zamanlı koordinasyon',
    icon: 'afet.png',
    poster: 'afet',
    posterAlt: 'Afet Yardım’ın SOS, görev takibi ve koordinatör ekranlarını gösteren üç telefon',
    summary: 'Deprem ve sel gibi afetlerde yardım talebini, gönüllüyü ve koordinatörü aynı gerçek zamanlı platformda buluşturan mobil uygulama.',
    detail: 'Afetzede SOS ve yardım talebi gönderiyor, gönüllü yakındaki görevleri üstleniyor, koordinatör operasyonu tek ekrandan yönetiyor.',
    metrics: [
      { value: '3', label: 'rol: afetzede, gönüllü, koordinatör' },
      { value: '22', label: 'güvenlik kuralı testi' },
      { value: 'Sunucuda', label: 'yetki, kota ve yapay zeka anahtarları' },
    ],
    status: 'Sırada cihaz testi ve mağazalar',
    tech: ['React Native', 'Expo SDK 54', 'TypeScript', 'Firestore', 'Cloud Functions'],
    repo: 'https://github.com/geniuseyis/afet-yardim',
  },
]

// usedIn: yetenegin uzerine gelince gorunen yer
export const toolkit = [
  {
    group: 'Diller',
    items: [
      { name: 'Swift', usedIn: 'Ringify' },
      { name: 'Dart', usedIn: 'Finansım' },
      { name: 'TypeScript', usedIn: 'Plumbline, Afet Yardım' },
      { name: 'Java', usedIn: 'Spring Boot REST API' },
      { name: 'C#', usedIn: 'BTK Akademi sertifikası' },
      { name: 'SQL', usedIn: 'edX ve Udemy sertifikaları' },
    ],
  },
  {
    group: 'Mobil',
    items: [
      { name: 'SwiftUI', usedIn: 'Ringify' },
      { name: 'Flutter', usedIn: 'Finansım' },
      { name: 'React Native', usedIn: 'Plumbline, Afet Yardım' },
      { name: 'Expo', usedIn: 'Plumbline, Afet Yardım' },
      { name: 'Riverpod', usedIn: 'Finansım' },
      { name: 'Skia', usedIn: 'Plumbline’ın çizim katmanı' },
      { name: 'AVFoundation', usedIn: 'Ringify’ın ses işleme hattı' },
      { name: 'StoreKit 2', usedIn: 'Ringify Pro' },
    ],
  },
  {
    group: 'Sunucu ve veri',
    items: [
      { name: 'Firebase', usedIn: 'Finansım, Afet Yardım' },
      { name: 'Cloud Functions', usedIn: 'Finansım, Afet Yardım' },
      { name: 'Firestore', usedIn: 'Finansım, Afet Yardım' },
      { name: 'SwiftData', usedIn: 'Ringify' },
      { name: 'Hive', usedIn: 'Finansım’ın şifreli verisi' },
      { name: 'MMKV', usedIn: 'Plumbline’ın şifreli kayıtları' },
      { name: 'Spring Boot', usedIn: 'Çalışan takip sistemi' },
      { name: 'SQL Server', usedIn: 'BTK Akademi sertifikası' },
    ],
  },
  {
    group: 'Test ve araçlar',
    items: [
      { name: 'XCTest', usedIn: 'Ringify' },
      { name: 'flutter_test', usedIn: 'Finansım' },
      { name: 'Vitest', usedIn: 'Plumbline, Ringify önizlemesi' },
      { name: 'GitHub Actions', usedIn: 'Ringify, Finansım' },
      { name: 'EAS Build', usedIn: 'Plumbline' },
      { name: 'XcodeGen', usedIn: 'Ringify' },
      { name: 'Git', usedIn: 'Tüm projeler' },
    ],
  },
]

export const certificates = [
  {
    provider: 'BTK Akademi',
    items: [
      'Sıfırdan İleri Seviye Python Programlama', 'JAVA ile Programlamaya Giriş', 'C++ Programlama Giriş',
      'C# Programlama', 'PHP', 'CSS', 'SQL Server', 'Projelerle Arduino Programlama',
      'Unity ile Dijital Oyun Geliştirmeye Giriş', 'Kali Linux', 'Sosyal Mühendislik ve Oltalama',
    ],
  },
  {
    provider: 'edX',
    items: [
      'CS50’s Introduction to Computer Science', 'CS50’s Introduction to Programming with Python',
      'CS50’s Introduction to Cybersecurity', 'Introduction to Computer Science and Programming Using Python',
      'Computer Science 101', 'Learning Python for Data Science', 'Computer Science for Game Development',
      'Computer Science for Databases using SQL',
    ],
  },
  {
    provider: 'Udemy',
    items: [
      'A’dan Z’ye Arduino Dersleri ve Robotik Kodlama Projeleri', 'Etik Hacker Olma Kursu',
      'Etik Hacker Olmak: Web Sızma Testleri ve Bug Bounty', 'Etik Hacker İleri Seviye: Sızma Testleri & Yetki Yükseltme',
      'Veri Bilimi ve Makine Öğrenmesi 2025', 'Sıfırdan SQL Kursu', 'Modern Web Geliştirme Kursu',
    ],
  },
]
