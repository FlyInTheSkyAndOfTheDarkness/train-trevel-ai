export const messages = {
  ru: {
    // Navigation
    search: 'Поиск',
    profile: 'Профиль',
    find: 'Найти',
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    
    // Search form
    from: 'Откуда',
    to: 'Куда',
    departureDate: 'Дата отправления',
    returnDate: 'Дата возвращения',
    passengers: 'Пассажиры',
    searchTrains: 'Найти поезда',
    
    // Results
    noResults: 'Поезда не найдены',
    sortBy: 'Сортировать по',
    price: 'Цене',
    duration: 'Времени в пути',
    departure: 'Времени отправления',
    
    // Train card
    trainNumber: 'Поезд',
    operator: 'Перевозчик',
    duration: 'В пути',
    from: 'От',
    to: 'До',
    select: 'Выбрать',
    
    // Profile
    mySearches: 'Мои поиски',
    favorites: 'Избранное',
    bookings: 'Бронирования',
    clearHistory: 'Очистить историю',
    
    // AI Assistant
    aiAssistant: 'ИИ-помощник',
    cheapestDates: 'Самые дешёвые даты',
    alternativeStations: 'Альтернативные станции',
    whenToBuy: 'Когда покупать',
    aiTips: 'Советы ИИ',
    
    // Common
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    save: 'Сохранить',
    delete: 'Удалить',
    edit: 'Редактировать',
    close: 'Закрыть'
  },
  kk: {
    // Navigation
    search: 'Іздеу',
    profile: 'Профиль',
    find: 'Іздеу',
    login: 'Кіру',
    register: 'Тіркелу',
    logout: 'Шығу',
    
    // Search form
    from: 'Қайдан',
    to: 'Қайда',
    departureDate: 'Жолға шығу күні',
    returnDate: 'Қайту күні',
    passengers: 'Жолаушылар',
    searchTrains: 'Пойыздарды іздеу',
    
    // Results
    noResults: 'Пойыздар табылмады',
    sortBy: 'Сұрыптау',
    price: 'Бағасы бойынша',
    duration: 'Жол уақыты бойынша',
    departure: 'Жолға шығу уақыты бойынша',
    
    // Train card
    trainNumber: 'Пойыз',
    operator: 'Тасымалдаушы',
    duration: 'Жолда',
    from: 'Бастап',
    to: 'Дейін',
    select: 'Таңдау',
    
    // Profile
    mySearches: 'Менің іздеулерім',
    favorites: 'Таңдаулылар',
    bookings: 'Брондаулар',
    clearHistory: 'Тарихты тазалау',
    
    // AI Assistant
    aiAssistant: 'ИИ-көмекші',
    cheapestDates: 'Ең арзан күндер',
    alternativeStations: 'Альтернативті станциялар',
    whenToBuy: 'Қашан сатып алу',
    aiTips: 'ИИ кеңестері',
    
    // Common
    loading: 'Жүктелуде...',
    error: 'Қате',
    success: 'Сәтті',
    cancel: 'Болдырмау',
    confirm: 'Растау',
    save: 'Сақтау',
    delete: 'Жою',
    edit: 'Өңдеу',
    close: 'Жабу'
  },
  en: {
    // Navigation
    search: 'Search',
    profile: 'Profile',
    find: 'Find',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Search form
    from: 'From',
    to: 'To',
    departureDate: 'Departure date',
    returnDate: 'Return date',
    passengers: 'Passengers',
    searchTrains: 'Search trains',
    
    // Results
    noResults: 'No trains found',
    sortBy: 'Sort by',
    price: 'Price',
    duration: 'Duration',
    departure: 'Departure time',
    
    // Train card
    trainNumber: 'Train',
    operator: 'Operator',
    duration: 'Duration',
    from: 'From',
    to: 'To',
    select: 'Select',
    
    // Profile
    mySearches: 'My searches',
    favorites: 'Favorites',
    bookings: 'Bookings',
    clearHistory: 'Clear history',
    
    // AI Assistant
    aiAssistant: 'AI Assistant',
    cheapestDates: 'Cheapest dates',
    alternativeStations: 'Alternative stations',
    whenToBuy: 'When to buy',
    aiTips: 'AI Tips',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close'
  }
};

export type Locale = keyof typeof messages;
export const defaultLocale: Locale = 'ru';
export const locales: Locale[] = ['ru', 'kk', 'en'];

