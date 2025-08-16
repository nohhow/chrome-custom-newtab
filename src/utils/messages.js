// 다국어 지원 메시지 시스템

const messages = {
  ko: {
    encouragements: [
      "좋은 하루",
      "오늘도 화이팅", 
      "새로운 시작",
      "좋은 아침",
      "멋진 하루",
      "편안한 하루",
      "즐거운 하루",
      "행복한 하루",
      "활기찬 하루",
      "평온한 하루",
      "건강한 하루",
      "따뜻한 하루",
      "밝은 하루",
      "신나는 하루",
      "여유로운 하루"
    ],
    widgets: {
      "날씨": "날씨",
      "Git 기여 그래프": "Git 기여 그래프", 
      "D-Day": "D-Day",
      "할 일": "할 일",
      "명언": "명언 한 줄",
      "귀여움 충전": "귀여움 충전",
      "유튜브": "유튜브",
      "자주 방문한 사이트": "자주 방문한 사이트",
      "바로가기": "바로가기",
      "글자수 세기": "글자수 세기",
      "파파고": "파파고"
    },
    common: {
      "widgetSettings": "위젯 설정",
      "settingsDescription": "원하는 위젯을 선택하고 드래그로 순서를 바꿔보세요",
      "reset": "초기화",
      "close": "닫기",
      "save": "저장",
      "cancel": "취소",
      "loading": "로딩중...",
      "selectRegion": "지역을 선택하세요",
      "changeRegion": "지역 변경",
      "addShortcut": "바로가기 추가",
      "websiteUrl": "웹사이트 URL",
      "newQuote": "새로운 명언을 불러오는 중...",
      "good": "좋음",
      "bad": "나쁨",
      "airQuality": "대기질",
      "feelsLike": "체감",
      "humidity": "습도",
      "loadingWeather": "날씨 정보를 불러오는 중...",
      "selectRegionForWeather": "지역을 선택하면 날씨를 확인할 수 있습니다",
      "veryGood": "매우 좋음",
      "moderate": "보통",
      "veryBad": "매우 나쁨",
      "anotherOne": "다른거!",
      "findingCuteFriend": "귀여운 친구를 찾는 중...",
      "cuteAnimal": "귀여운 동물",
      "deleteAll": "전체삭제",
      "addTodo": "할 일 추가",
      "todoPlaceholder": "할 일을 입력하세요...",
      "add": "추가",
      "letterCountPlaceholder": "글자수를 세고 싶은 텍스트를 입력하세요...",
      "withSpaces": "공백 포함",
      "withoutSpaces": "공백 제외"
    }
  },
  en: {
    mainTitle: "Good Day",
    encouragements: [
      "Good day",
      "You got this",
      "Fresh start", 
      "Good morning",
      "Nice day",
      "Peaceful day",
      "Happy day",
      "Wonderful day",
      "Bright day",
      "Calm day",
      "Healthy day",
      "Warm day",
      "Sunny day",
      "Perfect day",
      "Relaxing day"
    ],
    widgets: {
      "날씨": "Weather",
      "Git 기여 그래프": "Git Contribution",
      "D-Day": "D-Day",
      "할 일": "To-Do List", 
      "명언": "Daily Quotes",
      "귀여움 충전": "Cute Moment",
      "유튜브": "YouTube",
      "자주 방문한 사이트": "Top Sites",
      "바로가기": "Shortcuts",
      "글자수 세기": "Letter Counter",
      "파파고": "Translator"
    },
    common: {
      "widgetSettings": "Widget Settings",
      "settingsDescription": "Select widgets and drag to reorder",
      "reset": "Reset",
      "close": "Close",
      "save": "Save",
      "cancel": "Cancel",
      "loading": "Loading...",
      "selectRegion": "Select a region",
      "changeRegion": "Change region",
      "addShortcut": "Add Shortcut",
      "websiteUrl": "Website URL",
      "newQuote": "Loading new quote...",
      "good": "Good",
      "bad": "Bad",
      "airQuality": "Air Quality",
      "feelsLike": "Feels like",
      "humidity": "Humidity",
      "loadingWeather": "Loading weather data...",
      "selectRegionForWeather": "Select a region to view weather",
      "veryGood": "Very Good",
      "moderate": "Moderate",
      "veryBad": "Very Bad",
      "anotherOne": "Another!",
      "findingCuteFriend": "Finding cute friend...",
      "cuteAnimal": "Cute animal",
      "deleteAll": "Delete All",
      "addTodo": "Add Todo",
      "todoPlaceholder": "Enter a todo...",
      "add": "Add",
      "letterCountPlaceholder": "Enter text to count characters...",
      "withSpaces": "With spaces",
      "withoutSpaces": "Without spaces"
    }
  },
  ja: {
    mainTitle: "良い一日",
    encouragements: [
      "良い一日を",
      "今日も頑張って", 
      "新しいスタート",
      "おはよう",
      "素敵な一日",
      "穏やかな一日",
      "楽しい一日",
      "幸せな一日",
      "元気な一日",
      "平和な一日",
      "健康な一日",
      "温かい一日",
      "明るい一日",
      "完璧な一日",
      "リラックス"
    ],
    widgets: {
      "날씨": "天気",
      "Git 기여 그래프": "Git貢献", 
      "D-Day": "Dデー",
      "할 일": "やることリスト",
      "명언": "名言",
      "귀여움 충전": "癒し",
      "유튜브": "YouTube", 
      "자주 방문한 사이트": "よく見るサイト",
      "바로가기": "ショートカット",
      "글자수 세기": "文字数カウント",
      "파파고": "翻訳"
    },
    common: {
      "widgetSettings": "ウィジェット設定",
      "settingsDescription": "ウィジェットを選択してドラッグで並び替え",
      "reset": "リセット",
      "close": "閉じる",
      "save": "保存",
      "cancel": "キャンセル",
      "loading": "読み込み中...",
      "selectRegion": "地域を選択",
      "changeRegion": "地域変更",
      "addShortcut": "ショートカット追加",
      "websiteUrl": "ウェブサイトURL",
      "newQuote": "新しい名言を読み込み中...",
      "good": "良い",
      "bad": "悪い",
      "airQuality": "大気質",
      "feelsLike": "体感",
      "humidity": "湿度",
      "loadingWeather": "天気情報を読み込み中...",
      "selectRegionForWeather": "地域を選択して天気を確認",
      "veryGood": "とても良い",
      "moderate": "普通",
      "veryBad": "とても悪い",
      "anotherOne": "他のを！",
      "findingCuteFriend": "可愛い友達を探し中...",
      "cuteAnimal": "可愛い動物",
      "deleteAll": "全削除",
      "addTodo": "やることを追加",
      "todoPlaceholder": "やることを入力してください...",
      "add": "追加",
      "letterCountPlaceholder": "文字数を数えたいテキストを入力してください...",
      "withSpaces": "スペース含む",
      "withoutSpaces": "スペース除く"
    }
  },
  zh: {
    mainTitle: "美好一天",
    encouragements: [
      "美好一天",
      "加油",
      "新开始", 
      "早上好",
      "好日子",
      "平静一天",
      "愉快一天",
      "开心一天",
      "活力一天",
      "安静一天",
      "健康一天",
      "温暖一天",
      "明亮一天",
      "完美一天",
      "放松一天"
    ],
    widgets: {
      "날씨": "天气",
      "Git 기여 그래프": "Git贡献",
      "D-Day": "倒计时", 
      "할 일": "待办事项",
      "명언": "名言",
      "귀여움 충전": "治愈时光",
      "유튜브": "YouTube",
      "자주 방문한 사이트": "常用网站", 
      "바로가기": "快捷方式",
      "글자수 세기": "字数统计",
      "파파고": "翻译"
    },
    common: {
      "widgetSettings": "小组件设置",
      "settingsDescription": "选择小组件并拖拽排序",
      "reset": "重置",
      "close": "关闭",
      "save": "保存",
      "cancel": "取消",
      "loading": "加载中...",
      "selectRegion": "选择地区",
      "changeRegion": "更改地区",
      "addShortcut": "添加快捷方式",
      "websiteUrl": "网站URL",
      "newQuote": "加载新名言中...",
      "good": "良好",
      "bad": "不良",
      "airQuality": "空气质量",
      "feelsLike": "体感",
      "humidity": "湿度",
      "loadingWeather": "正在加载天气信息...",
      "selectRegionForWeather": "选择地区查看天气",
      "veryGood": "非常好",
      "moderate": "中等",
      "veryBad": "非常差",
      "anotherOne": "换一个！",
      "findingCuteFriend": "正在寻找可爱的朋友...",
      "cuteAnimal": "可爱动物",
      "deleteAll": "全部删除",
      "addTodo": "添加待办",
      "todoPlaceholder": "请输入待办事项...",
      "add": "添加",
      "letterCountPlaceholder": "请输入要计算字数的文本...",
      "withSpaces": "包含空格",
      "withoutSpaces": "不含空格"
    }
  },
  es: {
    mainTitle: "Buen Día",
    encouragements: [
      "Buen día",
      "Tú puedes",
      "Nuevo comienzo",
      "Buenos días", 
      "Día genial",
      "Día tranquilo",
      "Día feliz",
      "Día hermoso",
      "Día brillante",
      "Día calmado",
      "Día saludable",
      "Día cálido",
      "Día soleado",
      "Día perfecto",
      "Día relajante"
    ],
    widgets: {
      "날씨": "Clima",
      "Git 기여 그래프": "Contribución Git",
      "D-Day": "Cuenta Regresiva",
      "할 일": "Tareas",
      "명언": "Citas", 
      "귀여움 충전": "Momento Tierno",
      "유튜브": "YouTube",
      "자주 방문한 사이트": "Sitios Frecuentes",
      "바로가기": "Accesos Directos",
      "글자수 세기": "Contador de Letras",
      "파파고": "Traductor"
    },
    common: {
      "widgetSettings": "Configuración de Widgets",
      "settingsDescription": "Selecciona widgets y arrastra para reordenar",
      "reset": "Restablecer",
      "close": "Cerrar",
      "save": "Guardar",
      "cancel": "Cancelar",
      "loading": "Cargando...",
      "selectRegion": "Seleccionar región",
      "changeRegion": "Cambiar región",
      "addShortcut": "Agregar Acceso Directo",
      "websiteUrl": "URL del Sitio Web",
      "newQuote": "Cargando nueva cita...",
      "good": "Bueno",
      "bad": "Malo",
      "airQuality": "Calidad del Aire",
      "feelsLike": "Sensación térmica",
      "humidity": "Humedad",
      "loadingWeather": "Cargando información del clima...",
      "selectRegionForWeather": "Selecciona una región para ver el clima",
      "veryGood": "Muy Bueno",
      "moderate": "Moderado",
      "veryBad": "Muy Malo",
      "anotherOne": "¡Otro!",
      "findingCuteFriend": "Buscando amigo adorable...",
      "cuteAnimal": "Animal tierno",
      "deleteAll": "Eliminar Todo",
      "addTodo": "Agregar Tarea",
      "todoPlaceholder": "Ingresa una tarea...",
      "add": "Agregar",
      "letterCountPlaceholder": "Ingresa texto para contar caracteres...",
      "withSpaces": "Con espacios",
      "withoutSpaces": "Sin espacios"
    }
  }
};

// 사용자 언어 감지
export const detectLanguage = () => {
  const saved = localStorage.getItem('preferredLanguage');
  if (saved && messages[saved]) return saved;
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang.startsWith('ja')) return 'ja'; 
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('es')) return 'es';
  
  return 'en'; // 기본값
};

// 랜덤 응원 메시지 가져오기
export const getRandomEncouragement = (lang = 'ko') => {
  const encouragements = messages[lang]?.encouragements || messages.ko.encouragements;
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};

// 메시지 가져오기
export const getMessage = (key, lang = 'ko') => {
  return messages[lang]?.[key] || messages.ko[key];
};

// 위젯 이름 번역
export const getWidgetName = (widgetKey, lang = 'ko') => {
  return messages[lang]?.widgets?.[widgetKey] || widgetKey;
};

// 공통 텍스트 가져오기
export const getCommonText = (key, lang = 'ko') => {
  return messages[lang]?.common?.[key] || messages.ko.common?.[key] || key;
};

// 언어 변경
export const setLanguage = (lang) => {
  localStorage.setItem('preferredLanguage', lang);
  window.location.reload(); // 간단한 리로드로 언어 적용
};

// 지원 언어 목록
export const supportedLanguages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export default messages;