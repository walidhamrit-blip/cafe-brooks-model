import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  Coffee, UtensilsCrossed, CakeSlice, MapPin, Clock, Phone, Star, Menu, X,
  ArrowRight, ArrowUpRight, Plus, Minus, CalendarDays, Users, Check, Sparkles,
  Leaf, Sun, Moon, Croissant, Flame, Camera, ChevronLeft, ChevronRight,
  Martini, Milk, ConciergeBell, Music, Wifi, Baby, Car, ChevronDown, Share2
} from "lucide-react";

/* ============================================================
   BROOKS CAFÉ — NABEUL
   Sunlit Mediterranean Luxury • Specialty Coffee & À La Carte
   Trilingual EN / FR / AR • Cinematic Showcase
============================================================ */

type Lang = "en" | "fr" | "ar";

const IMAGES = {
  hero: "/assets/venue/brooks-salon-columns.jpg",
  hero2: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2400&auto=format&fit=crop",
  bar: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2000&auto=format&fit=crop",
  barista: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop",
  latte: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop",
  latteArt: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1600&auto=format&fit=crop",
  salon: "/assets/venue/brooks-salle-rouge.jpg",
  table: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
  terrace: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=2000&auto=format&fit=crop",
  terrace2: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1600&auto=format&fit=crop",
  lounge: "/assets/venue/brooks-salon-lumiere.jpg",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
  chicken: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
  pizza: "/assets/venue/brooks-pizza-fruits-de-mer.jpg",
  pasta: "/assets/menu/pasta-fruits-de-mer.jpg",
  salad: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
  brunch: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1200&auto=format&fit=crop",
  croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop",
  cheesecake: "/assets/menu/cheesecake-lotus.jpg",
  chocolate: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
  mango: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1200&auto=format&fit=crop",
  mojito: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
  milkshake: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200&auto=format&fit=crop",
  iced: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1200&auto=format&fit=crop",
  spread: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop",
  pizzaTable: "/assets/venue/brooks-pizza-table.jpg",
  badge: "/assets/brand/brooks-badge.svg",
  fineplate: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop",
};

/* ---------------- TRANSLATIONS ---------------- */
const T = {
  en: {
    nav_tour: "Virtual Tour", nav_menu: "Menu", nav_story: "Our Story", nav_reviews: "Reviews", nav_contact: "Find Us",
    reserve: "Reserve a Table",
    hero_eyebrow: "Nabeul • Cap Bon • Mediterranean Coast",
    hero_l1: "Sunlit Coffee,",
    hero_l2: "Vibrant À La Carte",
    hero_l3: "on the Cap Bon Coast.",
    hero_sub: "Welcome to BROOKS Café Nabeul — your favourite spot for specialty coffee, golden-hour brunch, à la carte dining & signature desserts. Food • Chill • Good vibes, every day from 7:30 to midnight.",
    hero_cta1: "Explore the Menu", hero_cta2: "Take the Virtual Tour",
    open_daily: "Open Daily 7:30 — 00:00", rating: "4.6 Loved by locals & travellers", location: "AFH2, Av. Habib Bourguiba, Nabeul",
    scroll: "Scroll to savour",
    marquee: ["Single-Origin V60", "Wood-Fired Pizza", "Mango Passion Parfait", "San Sebastián Cheesecake", "Spanish Latte", "Sunday Karaoke", "Golden-Hour Terrace", "Mediterranean Brunch"],
    story_eyebrow: "Our Story in Nabeul",
    story_title: "A sun-drenched house of coffee & gastronomy",
    story_p1: "On the elegant boulevards of Nabeul, BROOKS Café has become the living room of Cap Bon — where warm limestone, olive greenery and the scent of freshly ground arabica welcome you from morning to midnight.",
    story_p2: "From slow V60 pour-overs and silky Spanish lattes to wood-fired pizzas, grilled specials and our famous mango & cheesecake creations — everything is made fresh, vibrant and made to share.",
    story_b1: "Specialty arabica, brewed with craft", story_b2: "Fresh à la carte kitchen, 7/7", story_b3: "Terrace, Grand Salon & VIP Lounge",
    stat1: "Signature Dishes", stat2: "Coffees & Elixirs", stat3: "Google Rating", stat4: "Happy Guests / Month",
    tour_eyebrow: "Visite Guidée • Interactive Walkthrough",
    tour_title: "Step inside BROOKS",
    tour_sub: "Glide through four sunlit universes. Tap the golden + hotspots to taste the story — flavour notes, close-up photos & instant dish selection.",
    tour_hint: "Move your mouse for depth • Click + to discover",
    tour_cta: "Reserve this space", tour_add: "Add to my tasting",
    flavour: "Flavour profile",
    menu_eyebrow: "À La Carte • Nabeul",
    menu_title: "Vibrant plates, golden cups",
    menu_sub: "A short, fresh, sun-kissed menu — grilled, baked and brewed to order. Prices in Tunisian Dinar (DT).",
    tab_mains: "À La Carte Mains", tab_coffee: "Specialty Coffee & Elixirs", tab_dessert: "Signature Desserts",
    ingredients: "Ingredients & notes", add_taste: "Add to tasting",
    exp_eyebrow: "The Brooks Experience",
    exp_title: "More than a café — a ritual",
    rev_eyebrow: "Loved in Nabeul & Beyond",
    rev_title: "22K community, countless golden hours",
    book_title: "Your table in the sun awaits",
    book_sub: "Choose your universe — Grand Salon, Olive Courtyard Terrace or VIP Lounge. Our concierge confirms in minutes on WhatsApp.",
    area: "Dining Area", date: "Date", time: "Time", party: "Guests", name: "Full name", phone: "Phone / WhatsApp", notes: "Wishes (birthday, window table, baby chair...)",
    area_salon: "Grand Salon", area_terrace: "Olive Courtyard Terrace", area_vip: "VIP & Family Lounge",
    confirm: "Confirm Reservation", success_t: "Choukran! Table requested",
    success_p: "Our concierge will confirm shortly on WhatsApp. We can't wait to welcome you to BROOKS Nabeul.",
    done: "Done", tasting_list: "My tasting selection",
    contact_title: "Find us in Nabeul", hours: "Opening Hours", daily: "Every day • 7:30 — 00:00", karaoke: "Karaoke Sundays — booking advised",
    call: "Call / WhatsApp", insta: "Follow @broookscafe",
    footer_tag: "Food • Chill • Good vibes — Ton spot préféré à Nabeul.",
    rights: "© 2026 BROOKS Café Nabeul. Crafted with sun in Cap Bon.",
    selected: "Added to your tasting",
    from: "From",
    wa_label: "Chat with us on WhatsApp",
    wa_msg: "Hello Brooks Café Nabeul! I would like some information.",
    theme_dark: "Dark mode",
    theme_light: "Light mode",
  },
  fr: {
    nav_tour: "Visite Virtuelle", nav_menu: "Carte", nav_story: "Notre Histoire", nav_reviews: "Avis", nav_contact: "Nous Trouver",
    reserve: "Réserver une Table",
    hero_eyebrow: "Nabeul • Cap Bon • Côte Méditerranéenne",
    hero_l1: "Café de Spécialité,",
    hero_l2: "Gastronomie Vibrante",
    hero_l3: "sur la côte du Cap Bon.",
    hero_sub: "Bienvenue au BROOKS Café Nabeul — ton spot préféré pour specialty coffee, brunch doré, cuisine à la carte & desserts signatures. Food • Chill • Good vibes, tous les jours de 7h30 à minuit.",
    hero_cta1: "Découvrir la Carte", hero_cta2: "Visite Virtuelle",
    open_daily: "Ouvert 7j/7 • 7h30 — 00h00", rating: "4.6 Adoré des Nabéliens & voyageurs", location: "AFH2, Av. Habib Bourguiba, Nabeul",
    scroll: "Faites défiler pour savourer",
    marquee: ["V60 Origine Unique", "Pizza au Feu de Bois", "Parfait Mangue Passion", "Cheesecake San Sebastián", "Latte Espagnol", "Karaoké du Dimanche", "Terrasse Golden Hour", "Brunch Méditerranéen"],
    story_eyebrow: "Notre Histoire à Nabeul",
    story_title: "Une maison de café & gastronomie baignée de soleil",
    story_p1: "Sur les boulevards élégants de Nabeul, le BROOKS Café est devenu le salon du Cap Bon — pierre calcaire chaude, verdure d'oliviers et parfum d'arabica fraîchement moulu, du matin à minuit.",
    story_p2: "Du V60 versé lentement aux lattes espagnols soyeux, des pizzas au feu de bois aux grillades et à nos célèbres créations mangue & cheesecake — tout est frais, vibrant et fait pour être partagé.",
    story_b1: "Arabica de spécialité, brassé avec passion", story_b2: "Cuisine à la carte fraîche, 7j/7", story_b3: "Terrasse, Grand Salon & Lounge VIP",
    stat1: "Plats Signatures", stat2: "Cafés & Élixirs", stat3: "Note Google", stat4: "Convives Heureux / Mois",
    tour_eyebrow: "Visite Guidée • Parcours Interactif",
    tour_title: "Entrez chez BROOKS",
    tour_sub: "Glissez à travers quatre univers baignés de soleil. Touchez les pastilles dorées + pour goûter l'histoire — notes de dégustation, photos & sélection instantanée.",
    tour_hint: "Bougez la souris pour la profondeur • Cliquez + pour découvrir",
    tour_cta: "Réserver cet espace", tour_add: "Ajouter à ma dégustation",
    flavour: "Profil gustatif",
    menu_eyebrow: "À La Carte • Nabeul",
    menu_title: "Assiettes vibrantes, tasses dorées",
    menu_sub: "Une carte courte, fraîche et ensoleillée — grillé, cuit et infusé à la commande. Prix en Dinars Tunisiens (DT).",
    tab_mains: "Plats À La Carte", tab_coffee: "Cafés de Spécialité & Élixirs", tab_dessert: "Desserts Signatures",
    ingredients: "Ingrédients & notes", add_taste: "Ajouter à la dégustation",
    exp_eyebrow: "L'Expérience Brooks",
    exp_title: "Plus qu'un café — un rituel",
    rev_eyebrow: "Adoré à Nabeul & Ailleurs",
    rev_title: "22K de communauté, d'innombrables golden hours",
    book_title: "Votre table au soleil vous attend",
    book_sub: "Choisissez votre univers — Grand Salon, Terrasse Cour d'Oliviers ou Lounge VIP. Notre concierge confirme en quelques minutes sur WhatsApp.",
    area: "Espace", date: "Date", time: "Heure", party: "Convives", name: "Nom complet", phone: "Téléphone / WhatsApp", notes: "Envies (anniversaire, table fenêtre, chaise bébé...)",
    area_salon: "Grand Salon", area_terrace: "Terrasse Cour d'Oliviers", area_vip: "Lounge VIP & Famille",
    confirm: "Confirmer la Réservation", success_t: "Choukran ! Table demandée",
    success_p: "Notre concierge confirmera très vite sur WhatsApp. Hâte de vous accueillir chez BROOKS Nabeul.",
    done: "Terminé", tasting_list: "Ma sélection dégustation",
    contact_title: "Retrouvez-nous à Nabeul", hours: "Horaires", daily: "Tous les jours • 7h30 — 00h00", karaoke: "Karaoké du dimanche — réservation conseillée",
    call: "Appeler / WhatsApp", insta: "Suivre @broookscafe",
    footer_tag: "Food • Chill • Good vibes — Ton spot préféré à Nabeul.",
    rights: "© 2026 BROOKS Café Nabeul. Façonné avec soleil au Cap Bon.",
    selected: "Ajouté à votre dégustation",
    from: "Dès",
    wa_label: "Écrivez-nous sur WhatsApp",
    wa_msg: "Bonjour Brooks Café Nabeul ! Je souhaite avoir des informations.",
    theme_dark: "Mode sombre",
    theme_light: "Mode clair",
  },
  ar: {
    nav_tour: "جولة افتراضية", nav_menu: "القائمة", nav_story: "حكايتنا", nav_reviews: "آراء ضيوفنا", nav_contact: "موقعنا",
    reserve: "احجز طاولتك",
    hero_eyebrow: "نابل • الوطن القبلي • ساحل المتوسط",
    hero_l1: "قهوة مختصة مشمسة،",
    hero_l2: "مطبخ عالمي نابض بالحياة",
    hero_l3: "على ساحل الوطن القبلي.",
    hero_sub: "أهلاً وسهلاً بكم في بروكس كافيه نابل — وجهتكم المفضلة للقهوة المختصة، برانش الساعة الذهبية، أطباق à la carte وحلوياتنا الشهيرة. مأكولات • أجواء • طاقة طيبة، كل يوم من 7:30 صباحاً حتى منتصف الليل.",
    hero_cta1: "اكتشف القائمة", hero_cta2: "ابدأ الجولة الافتراضية",
    open_daily: "مفتوح يومياً 7:30 — 00:00", rating: "4.6 محبوب من أهل نابل والزوار", location: "AFH2، شارع الحبيب بورقيبة، نابل",
    scroll: "مرر لتتذوق",
    marquee: ["تقطير V60 فاخر", "بيتزا على الحطب", "بارفيه المانجو", "تشيز كيك سان سيباستيان", "لاتيه إسباني", "كاريوكي الأحد", "تراس الساعة الذهبية", "برانش متوسطي"],
    story_eyebrow: "حكايتنا في نابل",
    story_title: "بيت مشمس للقهوة وفن الطهي",
    story_p1: "على شوارع نابل الأنيقة، أصبح بروكس كافيه صالون الوطن القبلي — حجر جيري دافئ، خضرة الزيتون وعبير البن العربي المطحون طازجاً، من الصباح حتى منتصف الليل.",
    story_p2: "من التقطير البطيء V60 واللاتيه الإسباني الحريري، إلى البيتزا على الحطب والمشاوي وإبداعات المانجو والتشيز كيك الشهيرة — كل شيء طازج، نابض، ومصنوع للمشاركة.",
    story_b1: "بن عربي مختص بتحميص حرفي", story_b2: "مطبخ à la carte طازج 7/7", story_b3: "تراس، صالون كبير وصالة VIP",
    stat1: "طبقاً مميزاً", stat2: "قهوة وإكسير", stat3: "تقييم جوجل", stat4: "ضيف سعيد / شهرياً",
    tour_eyebrow: "جولة افتراضية • زيارة تفاعلية",
    tour_title: "ادخل إلى عالم بروكس",
    tour_sub: "تنقّل بين أربعة عوالم مشمسة. المس النقاط الذهبية + لتتذوق القصة — نكهات، صور مقربة واختيار فوري للأطباق.",
    tour_hint: "حرّك الفأرة للعمق • انقر + للاكتشاف",
    tour_cta: "احجز هذا الفضاء", tour_add: "أضف إلى تذوقي",
    flavour: "البصمة الذوقية",
    menu_eyebrow: "À La Carte • نابل",
    menu_title: "أطباق نابضة وأكواب ذهبية",
    menu_sub: "قائمة قصيرة، طازجة ومشمسة — يُشوى ويُخبز ويُقطّر عند الطلب. الأسعار بالدينار التونسي (د.ت).",
    tab_mains: "الأطباق الرئيسية", tab_coffee: "القهوة المختصة والإكسيرات", tab_dessert: "الحلويات الفاخرة",
    ingredients: "المكونات وملاحظات", add_taste: "أضف إلى التذوق",
    exp_eyebrow: "تجربة بروكس",
    exp_title: "أكثر من مقهى — طقس يومي",
    rev_eyebrow: "محبوب في نابل وخارجها",
    rev_title: "مجتمع 22 ألفاً وساعات ذهبية لا تُحصى",
    book_title: "طاولتك تحت الشمس بانتظارك",
    book_sub: "اختر عالمك — الصالون الكبير، تراس فناء الزيتون أو صالة VIP. الكونسيرج يؤكد خلال دقائق عبر واتساب.",
    area: "الفضاء", date: "التاريخ", time: "الوقت", party: "الضيوف", name: "الاسم الكامل", phone: "الهاتف / واتساب", notes: "رغبات (عيد ميلاد، طاولة نافذة، كرسي أطفال...)",
    area_salon: "الصالون الكبير", area_terrace: "تراس فناء الزيتون", area_vip: "صالة VIP والعائلات",
    confirm: "تأكيد الحجز", success_t: "شكراً! تم طلب الطاولة",
    success_p: "سيؤكد الكونسيرج قريباً عبر واتساب. لا نطيق الانتظار لاستقبالكم في بروكس نابل.",
    done: "تم", tasting_list: "اختيارات التذوق",
    contact_title: "جدونا في نابل", hours: "أوقات العمل", daily: "كل يوم • 7:30 — 00:00", karaoke: "كاريوكي الأحد — يُنصح بالحجز",
    call: "اتصال / واتساب", insta: "تابع @broookscafe",
    footer_tag: "مأكولات • أجواء • طاقة طيبة — وجهتك المفضلة في نابل.",
    rights: "© 2026 بروكس كافيه نابل. صُنع بحب وشمس الوطن القبلي.",
    selected: "أُضيف إلى التذوق",
    from: "ابتداءً من",
    wa_label: "راسلنا على واتساب",
    wa_msg: "مرحباً بروكس كافيه نابل! أود الحصول على معلومات.",
    theme_dark: "الوضع الداكن",
    theme_light: "الوضع الفاتح",
  }
} as const;

/* ---------------- DATA ---------------- */
type Zone = {
  id: number;
  img: string; thumb: string;
  hx: number; hy: number;
  spotImg: string;
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
  spot: Record<Lang, string>;
  flavor: Record<Lang, string>;
  dish: Record<Lang, string>;
  price: string;
};

const ZONES: Zone[] = [
  {
    id: 0, img: IMAGES.bar, thumb: IMAGES.barista, hx: 62, hy: 42, spotImg: IMAGES.latteArt,
    name: { en: "The Sunlit Specialty Coffee Bar", fr: "Le Bar à Café de Spécialité Ensoleillé", ar: "ركن القهوة المختصة المشمس" },
    desc: { en: "Brushed brass, warm marble & the hiss of steam — our baristas pour single-origin V60, velvety flat whites and golden Spanish lattes with gallery-worthy art.", fr: "Laiton brossé, marbre chaud & chant de la vapeur — nos baristas versent V60 d'origine unique, flat whites veloutés et lattes espagnols dorés à l'art soigné.", ar: "نحاس مصقول ورخام دافئ وهمس البخار — يُحضّر باريستا لدينا تقطير V60 من مصدر واحد، فلات وايت مخملي ولاتيه إسباني ذهبي بفن راقٍ." },
    spot: { en: "Artisanal Latte Art & Single-Origin V60", fr: "Latte Art Artisanal & V60 Origine Unique", ar: "فن اللاتيه الحرفي وتقطير V60 الفاخر" },
    flavor: { en: "Jasmine • Apricot • Honey • Silky crema", fr: "Jasmin • Abricot • Miel • Créma soyeuse", ar: "ياسمين • مشمش • عسل • كريما حريرية" },
    dish: { en: "Signature Spanish Latte", fr: "Latte Espagnol Signature", ar: "لاتيه إسباني مميز" },
    price: "12 DT"
  },
  {
    id: 1, img: IMAGES.salon, thumb: IMAGES.table, hx: 44, hy: 52, spotImg: IMAGES.fineplate,
    name: { en: "The Grand À La Carte Dining Salon", fr: "Le Grand Salon Gastronomique À La Carte", ar: "صالون الطعام الكبير À La Carte" },
    desc: { en: "High ceilings, champagne light & marble table service — grilled Cap Bon specials, wood-fired pizzas and chef signatures served with quiet ceremony.", fr: "Hauts plafonds, lumière champagne & service sur marbre — grillades du Cap Bon, pizzas au feu de bois et signatures du chef servies avec élégance.", ar: "أسقف عالية وإضاءة شامبين وخدمة على الرخام — مشاوي الوطن القبلي وبيتزا الحطب وإبداعات الشيف تُقدَّم باحتفاء راقٍ." },
    spot: { en: "Signature Chef Creations & Marble Service", fr: "Créations Signatures & Service sur Marbre", ar: "إبداعات الشيف والخدمة على الرخام" },
    flavor: { en: "Charred herbs • Olive oil • Citrus • Umami", fr: "Herbes grillées • Huile d'olive • Agrumes • Umami", ar: "أعشاب مشوية • زيت زيتون • حمضيات • أومامي" },
    dish: { en: "Grilled Chicken Supreme", fr: "Suprême de Poulet Grillé", ar: "صدر الدجاج المشوي الفاخر" },
    price: "36 DT"
  },
  {
    id: 2, img: IMAGES.terrace, thumb: IMAGES.terrace2, hx: 58, hy: 58, spotImg: IMAGES.brunch,
    name: { en: "The Botanical Olive Courtyard", fr: "La Cour d'Oliviers Botanique", ar: "فناء الزيتون النباتي" },
    desc: { en: "Our beloved AFH2 terrace — olive shade, sea breeze & golden-hour brunch. Homemade pastries, fresh juices and slow Mediterranean mornings.", fr: "Notre terrasse adorée AFH2 — ombre d'oliviers, brise marine & brunch golden-hour. Viennoiseries maison, jus frais et lentes matinées méditerranéennes.", ar: "تراسنا المحبوب AFH2 — ظل الزيتون ونسيم البحر وبرانش الساعة الذهبية. معجنات منزلية وعصائر طازجة وصباحات متوسطية هادئة." },
    spot: { en: "Fresh Mediterranean Brunch & Pastries", fr: "Brunch Méditerranéen & Viennoiseries", ar: "برانش متوسطي ومعجنات طازجة" },
    flavor: { en: "Brioche • Orange blossom • Fresh figs • Mint", fr: "Brioche • Fleur d'oranger • Figues • Menthe", ar: "بريوش • زهر البرتقال • تين طازج • نعناع" },
    dish: { en: "Brooks Golden Brunch", fr: "Brunch Doré Brooks", ar: "برانش بروكس الذهبي" },
    price: "38 DT"
  },
  {
    id: 3, img: IMAGES.lounge, thumb: IMAGES.spread, hx: 50, hy: 45, spotImg: IMAGES.cheesecake,
    name: { en: "The Private Family & VIP Lounge", fr: "Le Lounge Privé Famille & VIP", ar: "صالة العائلات وكبار الضيوف" },
    desc: { en: "Intimate velvet seating, soft daylight & bespoke hospitality — birthdays, family feasts, Sunday karaoke and long dessert evenings.", fr: "Assises velours intimes, lumière douce & hospitalité sur-mesure — anniversaires, festins de famille, karaoké du dimanche et longues soirées desserts.", ar: "جلسات مخملية حميمة وإضاءة ناعمة وضيافة مخصصة — أعياد ميلاد وولائم عائلية وكاريوكي الأحد وأمسيات حلويات طويلة." },
    spot: { en: "Intimate Luxury & Bespoke Hospitality", fr: "Luxe Intime & Hospitalité Sur-Mesure", ar: "فخامة حميمة وضيافة مخصصة" },
    flavor: { en: "Pistachio • Vanilla bean • Mango • Cocoa", fr: "Pistache • Vanille • Mangue • Cacao", ar: "فستق • فانيليا • مانجو • كاكاو" },
    dish: { en: "San Sebastián Cheesecake", fr: "Cheesecake San Sebastián", ar: "تشيز كيك سان سيباستيان" },
    price: "24 DT"
  },
];

type Dish = {
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
  ing: Record<Lang, string>;
  price: string; img: string; tag: Record<Lang, string>;
};

const MENU: Record<"mains" | "coffee" | "dessert", Dish[]> = {
  mains: [
    { name: { en: "Brooks Signature Burger", fr: "Burger Signature Brooks", ar: "برجر بروكس المميز" }, desc: { en: "Smashed beef, aged cheddar, caramelised onions, house sauce, toasted brioche + golden fries.", fr: "Bœuf smashé, cheddar affiné, oignons caramélisés, sauce maison, brioché toastée + frites dorées.", ar: "لحم مدخن، شيدر معتق، بصل مكرمل، صلصة البيت، بريوش محمص + بطاطس ذهبية." }, ing: { en: "Brioche • Cheddar • Rocket • House sauce", fr: "Brioche • Cheddar • Roquette • Sauce maison", ar: "بريوش • شيدر • جرجير • صلصة البيت" }, price: "32 DT", img: IMAGES.burger, tag: { en: "Most Loved", fr: "Le Plus Aimé", ar: "الأكثر حباً" } },
    { name: { en: "Grilled Chicken Supreme", fr: "Suprême de Poulet Grillé", ar: "صدر الدجاج المشوي" }, desc: { en: "Herb-marinated chicken, Cap Bon olive oil, charred vegetables, jus corsé.", fr: "Poulet mariné aux herbes, huile d'olive du Cap Bon, légumes grillés, jus corsé.", ar: "دجاج متبل بالأعشاب، زيت زيتون الوطن القبلي، خضار مشوية، صلصة مركزة." }, ing: { en: "Free-range • Thyme • Lemon • Olive oil", fr: "Fermier • Thym • Citron • Huile d'olive", ar: "بلدي • زعتر • ليمون • زيت زيتون" }, price: "36 DT", img: IMAGES.chicken, tag: { en: "Chef's Pick", fr: "Choix du Chef", ar: "اختيار الشيف" } },
    { name: { en: "Margherita di Nabeul", fr: "Margherita di Nabeul", ar: "مارغريتا نابل" }, desc: { en: "Wood-fired, San Marzano tomato, fior di latte, basil, cold-pressed olive oil.", fr: "Au feu de bois, tomate San Marzano, fior di latte, basilic, huile d'olive pressée à froid.", ar: "على الحطب، طماطم سان مارزانو، فيور دي لاتيه، حبق، زيت زيتون بكر." }, ing: { en: "Wood fire • Basil • Fior di latte", fr: "Feu de bois • Basilic • Fior di latte", ar: "حطب • حبق • فيور دي لاتيه" }, price: "24 DT", img: IMAGES.pizza, tag: { en: "Wood-Fired", fr: "Feu de Bois", ar: "على الحطب" } },
    { name: { en: "Creamy Garden Linguine", fr: "Linguine Crémeuse du Jardin", ar: "لينغويني كريمية بالخضار" }, desc: { en: "Silky parmesan cream, sun-blushed tomatoes, basil, toasted pine nuts.", fr: "Crème soyeuse au parmesan, tomates confites, basilic, pignons toastés.", ar: "كريمة بارميزان حريرية، طماطم مجففة، حبق، صنوبر محمص." }, ing: { en: "Parmesan • Basil • Pine nuts", fr: "Parmesan • Basilic • Pignons", ar: "بارميزان • حبق • صنوبر" }, price: "29 DT", img: IMAGES.pasta, tag: { en: "Vegetarian", fr: "Végétarien", ar: "نباتي" } },
  ],
  coffee: [
    { name: { en: "Single-Origin V60 Pour-Over", fr: "V60 Origine Unique", ar: "تقطير V60 مصدر واحد" }, desc: { en: "Ethiopia Yirgacheffe, slow bloom, floral & apricot — brewed tableside.", fr: "Éthiopie Yirgacheffe, floraison lente, floral & abricot — versé à table.", ar: "إثيوبيا يرغاشيف، تقطير بطيء، زهري ومشمش — يُحضَّر أمام الطاولة." }, ing: { en: "Yirgacheffe • 92°C • 3:00 min", fr: "Yirgacheffe • 92°C • 3:00 min", ar: "يرغاشيف • 92° • 3:00 د" }, price: "14 DT", img: IMAGES.barista, tag: { en: "Slow Brew", fr: "Slow Brew", ar: "تقطير بطيء" } },
    { name: { en: "Spanish Golden Latte", fr: "Latte Espagnol Doré", ar: "لاتيه إسباني ذهبي" }, desc: { en: "Double ristretto, condensed milk silk, gallery latte art, sun-kissed crema.", fr: "Double ristretto, lait concentré soyeux, latte art galerie, créma dorée.", ar: "ريستريتو مضاعف، حليب مكثف حريري، فن لاتيه راقٍ، كريما ذهبية." }, ing: { en: "Ristretto • Condensed milk • Art", fr: "Ristretto • Lait concentré • Art", ar: "ريستريتو • حليب مكثف • فن" }, price: "12 DT", img: IMAGES.latteArt, tag: { en: "Signature", fr: "Signature", ar: "مميز" } },
    { name: { en: "Iced Caramel Cloud", fr: "Nuage Glacé Caramel", ar: "سحابة الكراميل المثلجة" }, desc: { en: "Cold brew, caramel cloud foam, vanilla mist — the terrace favourite.", fr: "Cold brew, nuage de caramel, voile de vanille — la star de la terrasse.", ar: "كولد برو، رغوة كراميل سحابية، لمسة فانيليا — نجمة التراس." }, ing: { en: "Cold brew • Caramel • Vanilla", fr: "Cold brew • Caramel • Vanille", ar: "كولد برو • كراميل • فانيليا" }, price: "16 DT", img: IMAGES.iced, tag: { en: "Iced Icon", fr: "Icône Glacée", ar: "أيقونة مثلجة" } },
    { name: { en: "Virgin Mojito & Mango Glow", fr: "Mojito Vierge & Éclat Mangue", ar: "موهيتو فيرجن وتوهج المانجو" }, desc: { en: "Hand-pressed mint, lime, mango nectar, sparkling chill.", fr: "Menthe pressée, citron vert, nectar de mangue, pétillance glacée.", ar: "نعناع طازج، ليمون أخضر، رحيق مانجو، انتعاش فوار." }, ing: { en: "Mint • Lime • Mango • Sparkle", fr: "Menthe • Citron • Mangue • Pétillant", ar: "نعناع • ليمون • مانجو • فوار" }, price: "15 DT", img: IMAGES.mojito, tag: { en: "Fresh", fr: "Frais", ar: "طازج" } },
  ],
  dessert: [
    { name: { en: "Mango Passion Parfait", fr: "Parfait Mangue Passion", ar: "بارفيه المانجو والباشن" }, desc: { en: "Our legend — mango mousse, passion coulis, vanilla chantilly, almond crumble.", fr: "Notre légende — mousse mangue, coulis passion, chantilly vanille, crumble amande.", ar: "أسطورتنا — موس مانجو، كولي الباشن، شانتيي فانيليا، كرامبل لوز." }, ing: { en: "Mango • Passion • Chantilly", fr: "Mangue • Passion • Chantilly", ar: "مانجو • باشن • شانتيي" }, price: "22 DT", img: IMAGES.mango, tag: { en: "Legendary", fr: "Légendaire", ar: "أسطوري" } },
    { name: { en: "San Sebastián Cheesecake", fr: "Cheesecake San Sebastián", ar: "تشيز كيك سان سيباستيان" }, desc: { en: "Burnt-top Basque, molten heart, pistachio dust — baked fresh daily.", fr: "Basque caramélisé, cœur fondant, poussière de pistache — cuit chaque jour.", ar: "باسك مكرمل، قلب ذائب، غبار الفستق — يُخبز يومياً." }, ing: { en: "Basque • Pistachio • Vanilla", fr: "Basque • Pistache • Vanille", ar: "باسك • فستق • فانيليا" }, price: "24 DT", img: IMAGES.cheesecake, tag: { en: "Baked Daily", fr: "Cuit du Jour", ar: "يُخبز يومياً" } },
    { name: { en: "Midnight Chocolate Fondant", fr: "Fondant Chocolat Minuit", ar: "فوندان الشوكولاتة" }, desc: { en: "70% dark flow, fleur de sel, vanilla gelato, cocoa-nib snap.", fr: "Cœur 70% noir, fleur de sel, glace vanille, éclats de cacao.", ar: "قلب شوكولاتة 70%، ملح زهرة، آيس كريم فانيليا، كسرات كاكاو." }, ing: { en: "70% dark • Fleur de sel • Gelato", fr: "70% noir • Fleur de sel • Glace", ar: "70% داكنة • ملح • جيلاتو" }, price: "20 DT", img: IMAGES.chocolate, tag: { en: "Decadent", fr: "Décadent", ar: "فاخر" } },
    { name: { en: "Golden Croissant Basket", fr: "Panier Croissants Dorés", ar: "سلة الكرواسون الذهبية" }, desc: { en: "Flaky butter croissants, morning jam trio, honey & soft scrambled pairing.", fr: "Croissants feuilletés au beurre, trio de confitures, miel & œufs brouillés.", ar: "كرواسون زبدة هش، ثلاثية مربى، عسل وبيض مخفوق." }, ing: { en: "Butter • Jam trio • Honey", fr: "Beurre • Trio confitures • Miel", ar: "زبدة • مربى • عسل" }, price: "18 DT", img: IMAGES.croissant, tag: { en: "Morning Ritual", fr: "Rituel Matin", ar: "طقس الصباح" } },
  ]
};

/* ---------------- SMALL COMPONENTS ---------------- */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function RevealLines({ lines, className = "", serif = true, lang }: { lines: string[]; className?: string; serif?: boolean; lang: Lang }) {
  return (
    <div className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            className={`block ${serif ? (lang === "ar" ? "font-serif-ar" : "font-serif-en") : ""} leading-[0.95]`}
            initial={{ y: "110%" }} animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >{l}</motion.span>
        </span>
      ))}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--c-gold)]" />
      <Sparkles className="h-4 w-4 text-[var(--c-gold)]" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--c-gold)]" />
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, lang, center = true }: { eyebrow: string; title: string; sub?: string; lang: Lang; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}
    >
      <div className={`inline-flex items-center gap-2 rounded-full border border-[var(--c-tan)]/30 bg-[var(--c-card)]/70 backdrop-blur px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--c-olive-ink)] ${lang === "ar" ? "font-sans-ar" : "font-sans-en"}`}>
        <Sun className="h-3.5 w-3.5 text-[var(--c-gold)]" /> {eyebrow}
      </div>
      <h2 className={`${lang === "ar" ? "font-serif-ar" : "font-serif-en"} mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-[var(--c-text)]`}>{title}</h2>
      {sub && <p className={`${lang === "ar" ? "font-sans-ar" : "font-sans-en"} mt-4 text-[15px] md:text-base leading-relaxed text-[var(--c-muted)]`}>{sub}</p>}
      <div className="mt-5"><GoldDivider /></div>
    </motion.div>
  );
}

/* ============================================================ MAIN APP */
export default function App() {
  const [lang, setLang] = useState<Lang>("fr"); // Nabeul default French, toggle EN/FR/AR
  const t = T[lang];

  /* ---- Mode clair / sombre (le script anti-flash de index.html a déjà posé la classe) ---- */
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("brooks-theme", theme); } catch { /* mode privé */ }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#15110D" : "#FAF6F0");
  }, [theme]);
  const isRtl = lang === "ar";
  const sans = lang === "ar" ? "font-sans-ar" : "font-sans-en";
  const serif = lang === "ar" ? "font-serif-ar" : "font-serif-en";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tourIdx, setTourIdx] = useState(0);
  const [spotOpen, setSpotOpen] = useState(false);
  const [tab, setTab] = useState<"mains" | "coffee" | "dessert">("mains");
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveArea, setReserveArea] = useState(0);
  const [guests, setGuests] = useState(2);
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("19:30");
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resNotes, setResNotes] = useState("");
  const [resDone, setResDone] = useState(false);
  const [tasting, setTasting] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [revIdx, setRevIdx] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // parallax for tour
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }); const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const tourX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const tourY = useTransform(sy, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (toast) { const id = setTimeout(() => setToast(null), 2600); return () => clearTimeout(id); }
  }, [toast]);

  useEffect(() => {
    setSpotOpen(false);
  }, [tourIdx]);

  // auto tour
  useEffect(() => {
    if (spotOpen || reserveOpen) return;
    const id = setInterval(() => setTourIdx((p) => (p + 1) % ZONES.length), 7000);
    return () => clearInterval(id);
  }, [spotOpen, reserveOpen]);

  const todayStr = new Date().toISOString().split("T")[0];
  const zone = ZONES[tourIdx];

  const addTaste = (label: string) => {
    if (!tasting.includes(label)) setTasting([...tasting, label]);
    setToast(t.selected + " — " + label);
  };

  const reviews = [
    { n: "Yasmine B. — Tunis", s: 5, en: "My favourite spot in Nabeul. The mango parfait is unreal and the terrace at sunset is pure Cap Bon magic.", fr: "Mon spot préféré à Nabeul. Le parfait mangue est irréel et la terrasse au coucher du soleil, pure magie du Cap Bon.", ar: "وجهتي المفضلة في نابل. بارفيه المانجو خيالي والتراس وقت الغروب سحر صافٍ." },
    { n: "Marco D. — Italy", s: 5, en: "Excellent friendly staff, lovely ambiance, brilliant varied menu. The capsule coffee and pizza were top.", fr: "Personnel adorable, ambiance charmante, carte variée et brillante. Le café et la pizza au sommet.", ar: "طاقم ودود، أجواء جميلة، قائمة متنوعة ورائعة. القهوة والبيتزا في القمة." },
    { n: "Amine T. — Nabeul", s: 5, en: "Been 4 times this month! Burgers and chicken dishes excellent. Sunday karaoke — you must book.", fr: "4 fois ce mois-ci ! Burgers et poulet excellents. Karaoké du dimanche — il faut réserver.", ar: "زرته 4 مرات هذا الشهر! البرجر وأطباق الدجاج ممتازة. كاريوكي الأحد — يجب الحجز." },
    { n: "Léa M. — Paris", s: 4, en: "Beautifully served virgin mojito and Spanish latte. Stylish, clean, delicious brunch. We came back three times.", fr: "Mojito vierge et latte espagnol magnifiquement servis. Brunch stylé, propre, délicieux. Revenus trois fois.", ar: "موهيتو فيرجن ولاتيه إسباني بتقديم جميل. برانش أنيق ونظيف ولذيذ. عدنا ثلاث مرات." },
  ];

  const times = ["08:00", "09:30", "11:00", "12:30", "14:00", "16:00", "17:30", "19:00", "19:30", "20:30", "21:30", "22:30"];
  const areas = [
    { icon: UtensilsCrossed, label: t.area_salon, img: IMAGES.salon, d: { en: "Marble service • Champagne light", fr: "Service marbre • Lumière champagne", ar: "خدمة رخام • إضاءة شامبين" } },
    { icon: Leaf, label: t.area_terrace, img: IMAGES.terrace, d: { en: "Olive shade • Sea breeze", fr: "Ombre d'oliviers • Brise marine", ar: "ظل زيتون • نسيم البحر" } },
    { icon: Sparkles, label: t.area_vip, img: IMAGES.lounge, d: { en: "Velvet • Family • Karaoke", fr: "Velours • Famille • Karaoké", ar: "مخمل • عائلة • كاريوكي" } },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={`grain relative min-h-screen bg-[var(--c-bg)] text-[var(--c-text)] ${sans} overflow-x-hidden`}>
      {/* golden-hour glows */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,194,107,0.18),transparent_65%)]" />
        <div className="absolute top-[45%] -left-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(245,194,107,0.14),transparent_65%)]" />
        <div className="absolute bottom-0 -right-40 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(200,109,81,0.10),transparent_65%)]" />
      </div>

      {/* ============ FLOATING HEADER ============ */}
      <motion.header
        initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[80] px-3 md:px-6 pt-3 md:pt-4"
      >
        <div className={`mx-auto max-w-7xl rounded-2xl border border-[var(--c-tan)]/25 bg-[var(--c-bg)]/85 backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(31,26,23,0.18)] transition-all ${scrolled ? "py-2" : "py-3"}`}>
          <div className="flex items-center justify-between gap-3 px-3 md:px-5">
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2 md:gap-3 group">
              <img
                src={IMAGES.badge}
                alt="Logo Brooks Café Nabeul"
                width={44}
                height={44}
                className="h-9 w-9 md:h-11 md:w-11 rounded-full shrink-0 drop-shadow-[0_6px_18px_rgba(14,59,43,0.28)] transition-transform duration-500 group-hover:rotate-[8deg]"
              />
              <span className="leading-tight">
                <span className={`block text-[14px] md:text-[17px] font-extrabold tracking-[0.12em] text-[var(--c-text)] ${sans}`}>BROOKS <span className="text-[var(--c-gold)]">CAFÉ</span></span>
                <span className="hidden sm:block text-[10px] font-semibold tracking-[0.28em] uppercase text-[var(--c-muted)]">Nabeul • Cap Bon</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold tracking-wide text-[var(--c-text)]/80">
              {[
                { l: t.nav_story, h: "#story" }, { l: t.nav_tour, h: "#tour" }, { l: t.nav_menu, h: "#menu" }, { l: t.nav_reviews, h: "#reviews" }, { l: t.nav_contact, h: "#contact" },
              ].map((n) => (
                <a key={n.h} href={n.h} className="relative group hover:text-[var(--c-olive-ink)] transition-colors">
                  {n.l}
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-[var(--c-gold)] rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 md:gap-3">
              {/* Theme toggle clair / sombre */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={theme === "dark" ? t.theme_light : t.theme_dark}
                title={theme === "dark" ? t.theme_light : t.theme_dark}
                className="rounded-full border border-[var(--c-tan)]/30 bg-[var(--c-card)]/80 p-2 md:p-2.5 text-[var(--c-text)] hover:bg-[var(--c-gold-light)] hover:text-[var(--c-ink)] transition-all"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 md:h-5 md:w-5" /> : <Moon className="h-4 w-4 md:h-5 md:w-5" />}
              </button>
              {/* Lang toggle */}
              <div className="flex items-center rounded-full border border-[var(--c-tan)]/30 bg-[var(--c-card)]/80 p-1 shadow-inner">
                {(["en", "fr", "ar"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full px-2 md:px-3 py-1.5 text-[11px] font-extrabold tracking-widest uppercase transition-all ${lang === l ? "bg-[var(--c-olive)] text-[var(--c-on-dark)] shadow" : "text-[var(--c-muted)] hover:text-[var(--c-text)]"}`}
                  >{l}</button>
                ))}
              </div>
              <button
                onClick={() => { setReserveOpen(true); setResDone(false); }}
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[var(--c-olive)] px-4 md:px-5 py-2.5 text-[13px] font-bold text-[var(--c-on-dark)] shadow-lg shadow-[var(--c-olive)]/25 hover:bg-[var(--c-olive-deep)] hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <CalendarDays className="h-4 w-4 text-[var(--c-gold-light)]" /> {t.reserve}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden rounded-full border border-[var(--c-tan)]/30 bg-[var(--c-card)]/80 p-2.5">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="flex flex-col gap-1 px-3 pb-3 pt-2">
                  {[
                    { l: t.nav_story, h: "#story" }, { l: t.nav_tour, h: "#tour" }, { l: t.nav_menu, h: "#menu" }, { l: t.nav_reviews, h: "#reviews" }, { l: t.nav_contact, h: "#contact" },
                  ].map((n) => (
                    <a key={n.h} href={n.h} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold bg-[var(--c-card)]/60 border border-[var(--c-tan)]/20 hover:bg-[var(--c-olive)] hover:text-white transition-colors">{n.l}</a>
                  ))}
                  <button onClick={() => { setMobileOpen(false); setReserveOpen(true); setResDone(false); }} className="mt-1 rounded-xl bg-[var(--c-olive)] px-4 py-3 text-sm font-bold text-white">{t.reserve}</button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* ============ HERO ============ */}
      <section id="top" ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="kenburns absolute inset-0">
            <img src={IMAGES.hero} alt="Brooks Café Nabeul sunlit terrace" className="img-sunlit h-full w-full object-cover" />
          </div>
        </motion.div>
        {/* warm vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-bg)]/55 via-transparent to-[var(--c-bg)]" />
        <div className={`absolute inset-0 ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[var(--c-bg)]/85 via-[var(--c-bg)]/35 to-transparent`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,194,107,0.22),transparent_60%)]" />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end md:justify-center px-5 md:px-10 pb-24 md:pb-0 pt-28">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-[var(--c-tan)]/30 bg-[var(--c-card)]/75 backdrop-blur-md px-4 py-2 text-[11px] md:text-xs font-bold tracking-[0.24em] uppercase text-[var(--c-olive-ink)] shadow-lg">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--c-olive)] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--c-olive)]" /></span>
              {t.hero_eyebrow}
            </motion.div>

            <RevealLines lines={[t.hero_l1, t.hero_l2, t.hero_l3]} lang={lang} className={`${serif} mt-5 text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.6rem] font-semibold text-[var(--c-text)]`} />

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="mt-5 max-w-xl text-[15px] md:text-lg leading-relaxed text-[var(--c-body)]">
              {t.hero_sub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#menu" className="group inline-flex items-center gap-2 rounded-full bg-[var(--c-terra)] px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-[var(--c-terra)]/30 hover:bg-[var(--c-terra-deep)] hover:-translate-y-0.5 transition-all">
                <UtensilsCrossed className="h-4 w-4" /> {t.hero_cta1}
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </a>
              <a href="#tour" className="inline-flex items-center gap-2 rounded-full border border-[var(--c-text)]/15 bg-[var(--c-card)]/70 backdrop-blur-md px-7 py-4 text-sm font-extrabold text-[var(--c-text)] shadow-lg hover:bg-[var(--c-card)] hover:-translate-y-0.5 transition-all">
                <Sparkles className="h-4 w-4 text-[var(--c-gold)]" /> {t.hero_cta2}
              </a>
            </motion.div>

            {/* info badges */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }} className="mt-8 flex flex-wrap gap-2.5">
              {[
                { i: Clock, l: t.open_daily }, { i: Star, l: t.rating }, { i: MapPin, l: t.location },
              ].map((b, k) => (
                <span key={k} className="inline-flex items-center gap-2 rounded-full bg-[var(--c-ink)]/85 backdrop-blur px-4 py-2.5 text-[12px] md:text-[13px] font-bold text-[var(--c-on-dark)] shadow-lg">
                  <b.i className="h-4 w-4 text-[var(--c-gold-light)]" /> {b.l}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* floating dish card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-28 right-6 z-10 hidden xl:block float-soft"
        >
          <div className="w-64 overflow-hidden rounded-3xl border border-white/60 bg-[var(--c-card)]/75 backdrop-blur-xl shadow-2xl">
            <div className="relative h-40 overflow-hidden">
              <img src={IMAGES.mango} className="img-sunlit h-full w-full object-cover" alt="Mango parfait" />
              <span className="absolute left-3 top-3 rounded-full bg-[var(--c-terra)] px-3 py-1 text-[11px] font-extrabold text-white shadow">★ Legendary</span>
            </div>
            <div className="p-4">
              <p className={`${serif} text-xl leading-tight`}>{lang === "ar" ? "بارفيه المانجو والباشن" : lang === "fr" ? "Parfait Mangue Passion" : "Mango Passion Parfait"}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-extrabold text-[var(--c-olive-ink)]">22 DT</span>
                <button onClick={() => addTaste("Mango Parfait")} className="rounded-full bg-[var(--c-olive)] p-2 text-white hover:bg-[var(--c-olive-deep)]"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--c-muted)]">{t.scroll}</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[var(--c-tan)]/50 bg-[var(--c-card)]/60 p-1.5 backdrop-blur">
            <span className="h-2 w-1 rounded-full bg-[var(--c-gold)]" />
          </motion.span>
        </div>

        {/* side vertical */}
        <div className={`absolute top-1/2 ${isRtl ? "left-6" : "right-6"} z-10 hidden lg:flex -translate-y-1/2 flex-col items-center gap-4`}>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--c-text)]/50" style={{ writingMode: "vertical-rl" }}>Food • Chill • Good vibes — Nabeul</span>
          <span className="h-20 w-px bg-[var(--c-tan)]/40" />
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="relative z-10 -mt-2 border-y border-[var(--c-tan)]/25 bg-[var(--c-olive)] py-4 overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap px-4">
          {[...t.marquee, ...t.marquee].map((m, i) => (
            <span key={i} className={`flex items-center gap-8 text-sm font-bold tracking-[0.18em] uppercase text-[var(--c-on-dark)]/90 ${sans}`}>
              {m} <Croissant className="h-4 w-4 text-[var(--c-gold-light)]" />
            </span>
          ))}
        </div>
      </div>

      {/* ============ STORY ============ */}
      <section id="story" className="relative z-10 mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <SectionHead eyebrow={t.story_eyebrow} title={t.story_title} lang={lang} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10 items-stretch">
          {/* images collage */}
          <motion.div initial={{ opacity: 0, x: isRtl ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl border border-[var(--c-tan)]/25 shadow-xl col-span-2 h-64 md:h-80">
              <img src={IMAGES.spread} className="img-sunlit h-full w-full object-cover hover:scale-105 transition-transform duration-700" alt="Brooks spread" />
            </div>
            <div className="overflow-hidden rounded-3xl border border-[var(--c-tan)]/25 shadow-xl h-52 md:h-64">
              <img src={IMAGES.latte} className="img-sunlit h-full w-full object-cover hover:scale-105 transition-transform duration-700" alt="Latte" />
            </div>
            <div className="overflow-hidden rounded-3xl border border-[var(--c-tan)]/25 shadow-xl h-52 md:h-64">
              <img src={IMAGES.brunch} className="img-sunlit h-full w-full object-cover hover:scale-105 transition-transform duration-700" alt="Brunch" />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-[var(--c-ink)] px-5 py-3 shadow-2xl whitespace-nowrap">
              <Flame className="h-4 w-4 text-[var(--c-gold-light)]" />
              <span className="text-xs font-extrabold tracking-widest uppercase text-white">AFH2 • Nabeul • 7h30 — 00h00</span>
            </div>
          </motion.div>
          {/* text */}
          <motion.div initial={{ opacity: 0, x: isRtl ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-[2rem] border border-[var(--c-tan)]/25 bg-[var(--c-card)]/80 backdrop-blur p-7 md:p-10 shadow-xl flex flex-col justify-center">
            <p className="text-[15px] md:text-base leading-relaxed text-[var(--c-body)]">{t.story_p1}</p>
            <p className="mt-4 text-[15px] md:text-base leading-relaxed text-[var(--c-muted)]">{t.story_p2}</p>
            <div className="mt-6 space-y-3">
              {[t.story_b1, t.story_b2, t.story_b3].map((b, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-[var(--c-surface)]/70 border border-[var(--c-tan)]/20 px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--c-olive)] text-white shrink-0"><Check className="h-4 w-4" /></span>
                  <span className="text-sm font-bold">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://www.instagram.com/broookscafe/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--c-terra)]/30 bg-[var(--c-terra)]/10 px-5 py-3 text-sm font-extrabold text-[var(--c-terra-ink)] hover:bg-[var(--c-terra)] hover:text-white transition-all">
                <Camera className="h-4 w-4" /> @broookscafe • 22K
              </a>
              <a href="#tour" className="inline-flex items-center gap-2 rounded-full bg-[var(--c-ink)] px-5 py-3 text-sm font-extrabold text-white hover:bg-[var(--c-olive)] transition-all">
                {t.hero_cta2} <ArrowUpRight className="h-4 w-4 text-[var(--c-gold-light)]" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* stats */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: "40+", l: t.stat1, i: UtensilsCrossed }, { v: "25+", l: t.stat2, i: Coffee },
            { v: "4.6", l: t.stat3, i: Star }, { v: "12K", l: t.stat4, i: Users },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="rounded-3xl border border-[var(--c-tan)]/25 bg-gradient-to-b from-[var(--c-card)] to-[var(--c-surface)]/60 p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              <s.i className="mx-auto h-5 w-5 text-[var(--c-gold)]" />
              <p className={`${serif} mt-2 text-4xl md:text-5xl font-semibold text-[var(--c-text)]`}>{s.v}</p>
              <p className="mt-1 text-[12px] font-bold tracking-widest uppercase text-[var(--c-muted)]">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ VIRTUAL TOUR ============ */}
      <section id="tour" className="relative z-10 py-20 md:py-28 bg-gradient-to-b from-[var(--c-surface)]/60 via-[var(--c-card)]/40 to-[var(--c-bg)] border-y border-[var(--c-tan)]/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHead eyebrow={t.tour_eyebrow} title={t.tour_title} sub={t.tour_sub} lang={lang} />
          <p className="mt-3 text-center text-xs font-bold tracking-widest uppercase text-[var(--c-gold)]">{t.tour_hint}</p>

          {/* zone pills */}
          <div className="no-scrollbar mt-8 flex gap-3 overflow-x-auto pb-2 justify-start md:justify-center">
            {ZONES.map((z, i) => (
              <button
                key={z.id}
                onClick={() => setTourIdx(i)}
                className={`flex shrink-0 items-center gap-3 rounded-full border p-1.5 pr-5 transition-all ${tourIdx === i ? "border-[var(--c-gold)] bg-[var(--c-ink)] text-white shadow-xl" : "border-[var(--c-tan)]/30 bg-[var(--c-card)]/80 hover:border-[var(--c-gold)]/60"}`}
              >
                <img src={z.thumb} className="h-10 w-10 rounded-full object-cover border-2 border-[var(--c-gold-light)]/60" alt="" />
                <span className="text-[13px] font-extrabold whitespace-nowrap max-w-[220px] truncate">{z.name[lang]}</span>
                {tourIdx === i && <span className="h-2 w-2 rounded-full bg-[var(--c-gold-light)] animate-pulse" />}
              </button>
            ))}
          </div>

          {/* main stage */}
          <motion.div
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            className="relative mt-6 overflow-hidden rounded-[2rem] border border-[var(--c-tan)]/30 shadow-[0_30px_80px_-20px_rgba(31,26,23,0.35)] h-[600px] md:h-[640px]"
          >
            <AnimatePresence mode="popLayout">
              <motion.div key={zone.id} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0">
                <motion.img
                  src={zone.img} alt={zone.name[lang]}
                  style={{ x: tourX, y: tourY, scale: 1.12 }}
                  className="img-sunlit h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-ink)]/85 via-[var(--c-ink)]/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(245,194,107,0.15))]" />

            {/* arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 inset-x-4 flex justify-between z-20">
              <button onClick={() => setTourIdx((tourIdx - 1 + ZONES.length) % ZONES.length)} className="rounded-full bg-[var(--c-card)]/85 backdrop-blur p-3 shadow-xl hover:bg-[var(--c-card)] hover:scale-105 transition-all"><ChevronLeft className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} /></button>
              <button onClick={() => setTourIdx((tourIdx + 1) % ZONES.length)} className="rounded-full bg-[var(--c-card)]/85 backdrop-blur p-3 shadow-xl hover:bg-[var(--c-card)] hover:scale-105 transition-all"><ChevronRight className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} /></button>
            </div>

            {/* hotspot */}
            <button
              onClick={() => setSpotOpen(true)}
              style={{ left: `${zone.hx}%`, top: `${zone.hy}%` }}
              className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
              aria-label="hotspot"
            >
              <span className="hotspot-ping absolute inset-0 rounded-full bg-[var(--c-gold-light)]" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--c-gold-light)] to-[var(--c-gold)] text-[var(--c-ink)] shadow-[0_0_30px_rgba(245,194,107,0.8)] ring-4 ring-white/70 group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6 font-bold" />
              </span>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--c-card)]/90 backdrop-blur px-3 py-1.5 text-[11px] font-extrabold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">{zone.spot[lang]}</span>
            </button>

            {/* bottom info */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-8 flex flex-col md:flex-row md:items-end gap-4 justify-between">
              <div className="max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.div key={zone.id + lang} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--c-gold-light)] px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-ink)]">0{zone.id + 1} / 04</span>
                    <h3 className={`${serif} mt-3 text-3xl md:text-4xl text-white leading-tight drop-shadow-lg`}>{zone.name[lang]}</h3>
                    <p className="mt-2 text-[13px] md:text-sm leading-relaxed text-white/85 max-w-lg">{zone.desc[lang]}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setSpotOpen(true)} className="rounded-full bg-[var(--c-card)]/90 backdrop-blur px-5 py-3 text-[13px] font-extrabold hover:bg-[var(--c-card)] transition-all inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--c-gold)]" /> {zone.spot[lang].split("&")[0].split("•")[0].slice(0, 26)}…
                </button>
                <button onClick={() => { setReserveArea(zone.id === 2 ? 1 : zone.id === 3 ? 2 : 0); setReserveOpen(true); setResDone(false); }} className="rounded-full bg-[var(--c-olive)] px-5 py-3 text-[13px] font-extrabold text-white hover:bg-[var(--c-olive-deep)] transition-all inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[var(--c-gold-light)]" /> {t.tour_cta}
                </button>
              </div>
            </div>

            {/* progress */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {ZONES.map((_, i) => (
                <button key={i} onClick={() => setTourIdx(i)} className={`h-1.5 rounded-full transition-all ${i === tourIdx ? "w-10 bg-[var(--c-gold-light)]" : "w-5 bg-[white/50] hover:bg-[white/80]"}`} />
              ))}
            </div>

            {/* hotspot card */}
            <AnimatePresence>
              {spotOpen && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex items-center justify-center bg-[var(--c-ink)]/45 backdrop-blur-sm p-4"
                  onClick={() => setSpotOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 16 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/50 bg-[var(--c-cream)]/95 backdrop-blur-xl shadow-2xl"
                  >
                    <div className="relative h-56">
                      <img src={zone.spotImg} className="img-sunlit h-full w-full object-cover" alt={zone.dish[lang]} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-ink)]/60 to-transparent" />
                      <button onClick={() => setSpotOpen(false)} className="absolute right-4 top-4 rounded-full bg-[var(--c-card)]/90 p-2 hover:bg-[var(--c-card)] shadow"><X className="h-4 w-4" /></button>
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                        <div>
                          <p className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-gold-light)]">{zone.spot[lang]}</p>
                          <p className={`${serif} text-2xl text-white leading-tight`}>{zone.dish[lang]}</p>
                        </div>
                        <span className="rounded-full bg-[var(--c-card)] px-3 py-1.5 text-sm font-extrabold text-[var(--c-olive-ink)] shadow">{zone.price}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-gold)]">{t.flavour}</p>
                      <p className="mt-1 text-sm font-bold text-[var(--c-text)]">{zone.flavor[lang]}</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button onClick={() => { addTaste(zone.dish[lang]); setSpotOpen(false); }} className="rounded-full border-2 border-[var(--c-olive-ink)] px-4 py-3 text-[13px] font-extrabold text-[var(--c-olive-ink)] hover:bg-[var(--c-olive)] hover:text-white transition-all">{t.tour_add}</button>
                        <button onClick={() => { setSpotOpen(false); setReserveArea(zone.id === 2 ? 1 : zone.id === 3 ? 2 : 0); setReserveOpen(true); setResDone(false); }} className="rounded-full bg-[var(--c-terra)] px-4 py-3 text-[13px] font-extrabold text-white hover:bg-[var(--c-terra-deep)] transition-all">{t.tour_cta}</button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ============ MENU ============ */}
      <section id="menu" className="relative z-10 mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <SectionHead eyebrow={t.menu_eyebrow} title={t.menu_title} sub={t.menu_sub} lang={lang} />

        {/* tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-[1.5rem] border border-[var(--c-tan)]/25 bg-[var(--c-card)]/80 backdrop-blur p-2 shadow-lg">
            {[
              { k: "mains" as const, l: t.tab_mains, i: UtensilsCrossed },
              { k: "coffee" as const, l: t.tab_coffee, i: Coffee },
              { k: "dessert" as const, l: t.tab_dessert, i: CakeSlice },
            ].map((tb) => (
              <button
                key={tb.k} onClick={() => setTab(tb.k)}
                className={`relative flex items-center gap-2 rounded-full px-5 md:px-7 py-3 text-[13px] md:text-sm font-extrabold transition-all ${tab === tb.k ? "text-white" : "text-[var(--c-muted)] hover:text-[var(--c-text)]"}`}
              >
                {tab === tb.k && <motion.span layoutId="tabpill" className="absolute inset-0 rounded-full bg-[var(--c-olive)] shadow-lg" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                <tb.i className={`relative h-4 w-4 ${tab === tb.k ? "text-[var(--c-gold-light)]" : ""}`} />
                <span className="relative whitespace-nowrap">{tb.l}</span>
              </button>
            ))}
          </div>
        </div>

        {/* grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab + lang}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {MENU[tab].map((d, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.55 }}
                className="group overflow-hidden rounded-[1.75rem] border border-[var(--c-tan)]/25 bg-[var(--c-card)] shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={d.img} alt={d.name[lang]} className="img-sunlit h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-ink)]/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--c-bg)]/95 backdrop-blur px-3 py-1.5 text-[11px] font-extrabold text-[var(--c-olive-ink)] shadow flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-[var(--c-gold)]" /> {d.tag[lang]}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-[var(--c-ink)]/90 backdrop-blur px-3 py-1.5 text-[13px] font-extrabold text-[var(--c-gold-light)] shadow">{d.price}</span>
                </div>
                <div className="p-5">
                  <h3 className={`${serif} text-[22px] leading-tight text-[var(--c-text)]`}>{d.name[lang]}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--c-muted)] min-h-[60px]">{d.desc[lang]}</p>
                  <p className="mt-3 border-t border-dashed border-[var(--c-tan)]/30 pt-3 text-[11px] font-bold tracking-wide text-[var(--c-muted)]/90">
                    <span className="text-[var(--c-gold)] uppercase tracking-widest text-[10px] font-extrabold">{t.ingredients} — </span>{d.ing[lang]}
                  </p>
                  <button onClick={() => addTaste(d.name[lang])} className="mt-4 w-full rounded-full bg-[var(--c-surface)] border border-[var(--c-tan)]/25 px-4 py-3 text-[13px] font-extrabold text-[var(--c-text)] hover:bg-[var(--c-olive)] hover:text-white hover:border-[var(--c-olive)] transition-all flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" /> {t.add_taste}
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* tasting bar */}
        <AnimatePresence>
          {tasting.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="sticky bottom-4 z-40 mt-10 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[var(--c-gold)]/40 bg-[var(--c-ink)]/95 backdrop-blur-xl px-5 py-4 shadow-2xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c-gold-light)] text-[var(--c-ink)] font-extrabold">{tasting.length}</span>
                <div>
                  <p className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-gold-light)]">{t.tasting_list}</p>
                  <p className="text-[13px] font-bold text-white/90 max-w-md truncate">{tasting.join(" • ")}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setTasting([])} className="rounded-full border border-white/25 px-4 py-2.5 text-xs font-bold text-white/80 hover:bg-[white/10]"><X className="h-4 w-4" /></button>
                <button onClick={() => { setResNotes(tasting.join(", ")); setReserveOpen(true); setResDone(false); }} className="rounded-full bg-[var(--c-terra)] px-6 py-2.5 text-[13px] font-extrabold text-white hover:bg-[var(--c-terra-deep)] transition-all inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> {t.reserve}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="relative z-10 border-y border-[var(--c-tan)]/20 bg-[var(--c-olive)] py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]"><img src={IMAGES.terrace2} className="h-full w-full object-cover" alt="" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-olive)]/60 via-transparent to-[var(--c-olive-deep)]/80" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--c-gold-light)]/40 bg-[var(--c-card)]/10 backdrop-blur px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--c-gold-light)]"><ConciergeBell className="h-3.5 w-3.5" /> {t.exp_eyebrow}</span>
            <h2 className={`${serif} mt-4 text-4xl md:text-5xl text-[var(--c-on-dark)]`}>{t.exp_title}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Croissant, h: { en: "Golden-Hour Brunch", fr: "Brunch Golden-Hour", ar: "برانش الساعة الذهبية" }, p: { en: "Slow mornings, brioche & fresh juices on the olive terrace.", fr: "Matinées douces, brioches & jus frais sur la terrasse.", ar: "صباحات هادئة وبريوش وعصائر طازجة على التراس." } },
              { i: Music, h: { en: "Sunday Karaoke Nights", fr: "Karaoké du Dimanche", ar: "كاريوكي ليالي الأحد" }, p: { en: "Nabeul sings together — festive, family, unforgettable.", fr: "Nabeul chante ensemble — festif, familial, inoubliable.", ar: "نابل تغني معاً — أجواء عائلية لا تُنسى." } },
              { i: CakeSlice, h: { en: "Celebrations & Birthdays", fr: "Fêtes & Anniversaires", ar: "احتفالات وأعياد ميلاد" }, p: { en: "Custom cakes, VIP lounge & candle-lit surprises.", fr: "Gâteaux sur-mesure, lounge VIP & surprises aux bougies.", ar: "كيك مخصص وصالة VIP ومفاجآت على ضوء الشموع." } },
              { i: Wifi, h: { en: "Chill, Work & Sea Breeze", fr: "Chill, Work & Brise Marine", ar: "استرخاء وعمل ونسيم البحر" }, p: { en: "Fast wifi, plug points & endless Spanish lattes.", fr: "Wifi rapide, prises & lattes espagnols sans fin.", ar: "واي فاي سريع ومقابس ولاتيه إسباني بلا نهاية." } },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-3xl border border-white/15 bg-[white/[0.07]] backdrop-blur-md p-6 hover:bg-[white/[0.12]] hover:-translate-y-1 transition-all">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--c-gold-light)] text-[var(--c-olive-deep)] shadow-lg"><c.i className="h-6 w-6" /></span>
                <h3 className={`${serif} mt-4 text-2xl text-white`}>{c.h[lang]}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/75">{c.p[lang]}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-[12px] font-bold text-white/70">
            {[Baby, Car, Milk, Leaf].map((I, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[white/5] px-4 py-2"><I className="h-4 w-4 text-[var(--c-gold-light)]" />{["Family friendly", "Easy parking AFH2", "Fresh & halal", "Veggie options"][i]}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section id="reviews" className="relative z-10 mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
        <SectionHead eyebrow={t.rev_eyebrow} title={t.rev_title} lang={lang} />
        <div className="relative mt-12">
          <div className="overflow-hidden rounded-[2rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={revIdx + lang}
                initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.5 }}
                className="grid md:grid-cols-[1.1fr_1fr] border border-[var(--c-tan)]/25 bg-[var(--c-card)] shadow-xl rounded-[2rem] overflow-hidden"
              >
                <div className="relative h-64 md:h-auto min-h-[320px]">
                  <img src={[IMAGES.terrace, IMAGES.table, IMAGES.lounge, IMAGES.bar][revIdx]} className="img-sunlit absolute inset-0 h-full w-full object-cover" alt="review" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-ink)]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < reviews[revIdx].s ? "fill-[var(--c-gold-light)] text-[var(--c-gold-light)]" : "text-white/50"}`} />
                    ))}
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-[var(--c-card)] to-[var(--c-surface)]/50">
                  <span className={`${serif} text-6xl text-[var(--c-gold)]/40 leading-none`}>“</span>
                  <p className={`${serif} -mt-4 text-2xl md:text-[1.7rem] leading-snug text-[var(--c-text)] italic`}>{reviews[revIdx][lang]}</p>
                  <p className="mt-5 text-sm font-extrabold text-[var(--c-olive-ink)]">{reviews[revIdx].n}</p>
                  <p className="text-xs font-bold text-[var(--c-muted)]">Google • TripAdvisor • Restaurant Guru</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button onClick={() => setRevIdx((revIdx - 1 + reviews.length) % reviews.length)} className="rounded-full border border-[var(--c-tan)]/30 bg-[var(--c-card)] p-3 shadow hover:bg-[var(--c-olive)] hover:text-white transition-all"><ChevronLeft className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} /></button>
            <div className="flex gap-2">{reviews.map((_, i) => <button key={i} onClick={() => setRevIdx(i)} className={`h-2 rounded-full transition-all ${i === revIdx ? "w-8 bg-[var(--c-gold)]" : "w-2 bg-[var(--c-tan)]/40"}`} />)}</div>
            <button onClick={() => setRevIdx((revIdx + 1) % reviews.length)} className="rounded-full border border-[var(--c-tan)]/30 bg-[var(--c-card)] p-3 shadow hover:bg-[var(--c-olive)] hover:text-white transition-all"><ChevronRight className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} /></button>
          </div>
        </div>
      </section>

      {/* ============ RESERVATION / CONTACT ============ */}
      <section id="contact" className="relative z-10 border-t border-[var(--c-tan)]/20 bg-gradient-to-b from-[var(--c-surface)]/70 to-[var(--c-bg)] py-20 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* booking teaser */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative overflow-hidden rounded-[2rem] border border-[var(--c-tan)]/25 shadow-2xl">
              <img src={IMAGES.hero2} className="img-sunlit absolute inset-0 h-full w-full object-cover" alt="Reserve" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-ink)]/92 via-[var(--c-ink)]/55 to-[var(--c-ink)]/15" />
              <div className="relative p-8 md:p-10 flex h-full min-h-[520px] flex-col justify-end">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--c-gold-light)] px-4 py-1.5 text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-ink)]"><ConciergeBell className="h-3.5 w-3.5" /> Nabeul Concierge</span>
                <h2 className={`${serif} mt-4 text-4xl md:text-5xl text-white leading-tight`}>{t.book_title}</h2>
                <p className="mt-3 text-sm md:text-[15px] text-white/85 leading-relaxed max-w-md">{t.book_sub}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {areas.map((a, i) => (
                    <button key={i} onClick={() => { setReserveArea(i); setReserveOpen(true); setResDone(false); }} className="group flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 backdrop-blur px-4 py-3 hover:bg-white hover:text-[#1F1A17] text-white transition-all">
                      <a.icon className="h-4 w-4 text-[var(--c-gold-light)] group-hover:text-[var(--c-gold)]" />
                      <span className="text-[13px] font-extrabold">{a.label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => { setReserveOpen(true); setResDone(false); }} className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--c-gold-light)] px-8 py-4 text-sm font-extrabold text-[var(--c-ink)] shadow-xl hover:bg-[#FFE3B0] hover:-translate-y-0.5 transition-all">
                  <CalendarDays className="h-4 w-4" /> {t.reserve}
                </button>
              </div>
            </motion.div>

            {/* contact card */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-[2rem] border border-[var(--c-tan)]/25 bg-[var(--c-card)]/90 backdrop-blur p-8 md:p-10 shadow-xl flex flex-col">
              <h3 className={`${serif} text-4xl text-[var(--c-text)]`}>{t.contact_title}</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl bg-[var(--c-surface)]/70 border border-[var(--c-tan)]/20 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--c-olive)] text-white"><MapPin className="h-5 w-5" /></span>
                  <div><p className="text-sm font-extrabold">BROOKS Café — AFH2</p><p className="text-[13px] text-[var(--c-muted)] font-semibold">Av. Habib Bourguiba, Nabeul 8000, Tunisia</p></div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl bg-[var(--c-surface)]/70 border border-[var(--c-tan)]/20 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--c-terra)] text-white"><Clock className="h-5 w-5" /></span>
                  <div><p className="text-sm font-extrabold">{t.hours} — {t.daily}</p><p className="text-[13px] text-[var(--c-muted)] font-semibold flex items-center gap-1"><Music className="h-3.5 w-3.5 text-[var(--c-gold)]" /> {t.karaoke}</p></div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl bg-[var(--c-surface)]/70 border border-[var(--c-tan)]/20 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--c-gold)] text-white"><Phone className="h-5 w-5" /></span>
                  <div><p className="text-sm font-extrabold" dir="ltr">+216 93 301 771</p><p className="text-[13px] text-[var(--c-muted)] font-semibold">{t.call}</p></div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a href="tel:+21693301771" className="rounded-2xl bg-[var(--c-olive)] px-4 py-4 text-center text-[13px] font-extrabold text-white hover:bg-[var(--c-olive-deep)] transition-all flex items-center justify-center gap-2"><Phone className="h-4 w-4 text-[var(--c-gold-light)]" /> 93 301 771</a>
                <a href="https://www.instagram.com/broookscafe/" target="_blank" rel="noreferrer" className="rounded-2xl bg-gradient-to-br from-[var(--c-terra)] to-[var(--c-terra-deep)] px-4 py-4 text-center text-[13px] font-extrabold text-white hover:opacity-95 transition-all flex items-center justify-center gap-2"><Camera className="h-4 w-4" /> Instagram</a>
              </div>
              {/* mini map */}
              <div className="relative mt-4 flex-1 min-h-[160px] overflow-hidden rounded-2xl border border-[var(--c-tan)]/25">
                <img src={IMAGES.terrace2} className="img-sunlit absolute inset-0 h-full w-full object-cover" alt="map" />
                <div className="absolute inset-0 bg-[var(--c-bg)]/45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href="https://www.google.com/maps/search/Brooks+Cafe+Nabeul+AFH2" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[var(--c-ink)] px-6 py-3 text-[13px] font-extrabold text-white shadow-2xl hover:bg-[var(--c-olive)] transition-all">
                    <MapPin className="h-4 w-4 text-[var(--c-gold-light)]" /> Google Maps — Nabeul AFH2 <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 bg-[var(--c-ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,194,107,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10 py-14">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <img src={IMAGES.badge} alt="Logo Brooks Café Nabeul" width={52} height={52} className="rounded-full" style={{ height: 52, width: 52 }} />
                <span><span className="block text-lg font-extrabold tracking-[0.12em]">BROOKS <span className="text-[var(--c-gold-light)]">CAFÉ</span></span><span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">Nabeul • Cap Bon</span></span>
              </div>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">{t.footer_tag}</p>
              <div className="mt-4 flex gap-2">
                <a href="https://www.instagram.com/broookscafe/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 p-3 hover:bg-[var(--c-gold-light)] hover:text-[var(--c-ink)] hover:border-[var(--c-gold-light)] transition-all"><Camera className="h-4 w-4" /></a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 p-3 hover:bg-[var(--c-gold-light)] hover:text-[var(--c-ink)] hover:border-[var(--c-gold-light)] transition-all"><Share2 className="h-4 w-4" /></a>
                <a href="tel:+21693301771" className="rounded-full border border-white/20 p-3 hover:bg-[var(--c-gold-light)] hover:text-[var(--c-ink)] hover:border-[var(--c-gold-light)] transition-all"><Phone className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div><p className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-gold-light)]">Explore</p><div className="mt-3 space-y-2 font-semibold text-white/75"><a href="#story" className="block hover:text-white">{t.nav_story}</a><a href="#tour" className="block hover:text-white">{t.nav_tour}</a><a href="#menu" className="block hover:text-white">{t.nav_menu}</a></div></div>
              <div><p className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-gold-light)]">Visit</p><div className="mt-3 space-y-2 font-semibold text-white/75"><p>AFH2, Nabeul 8000</p><p dir="ltr">+216 93 301 771</p><p>7h30 — 00h00 • 7/7</p></div></div>
              <div><p className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-gold-light)]">Signature</p><div className="mt-3 space-y-2 font-semibold text-white/75"><p>Mango Parfait</p><p>Spanish Latte</p><p>Sunday Karaoke</p></div></div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-white/50">
            <p>{t.rights}</p>
            <p className="flex items-center gap-1"><Sun className="h-3.5 w-3.5 text-[var(--c-gold-light)]" /> 36.4528° N, 10.7357° E — Cap Bon, Tunisia</p>
          </div>
        </div>
      </footer>

      {/* ============ RESERVATION MODAL ============ */}
      <AnimatePresence>
        {reserveOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-[var(--c-ink)]/55 backdrop-blur-md p-0 md:p-6" onClick={() => setReserveOpen(false)}>
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-[2rem] md:rounded-[2rem] bg-[var(--c-cream)] shadow-2xl"
            >
              {!resDone ? (
                <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[220px] md:min-h-full">
                    <img src={areas[reserveArea].img} className="img-sunlit absolute inset-0 h-full w-full object-cover" alt="area" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-ink)]/85 via-[var(--c-ink)]/25 to-transparent" />
                    <div className="absolute bottom-0 p-6">
                      <span className="rounded-full bg-[var(--c-gold-light)] px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase">Brooks Concierge</span>
                      <p className={`${serif} mt-2 text-3xl text-white leading-tight`}>{areas[reserveArea].label}</p>
                      <p className="text-[13px] font-bold text-white/80">{areas[reserveArea].d[lang]}</p>
                      <p className="mt-2 text-[12px] font-bold text-[var(--c-gold-light)]">AFH2 • Nabeul • 7h30 — 00h00</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between">
                      <div><h3 className={`${serif} text-3xl`}>{t.reserve}</h3><p className="text-[13px] text-[var(--c-muted)] font-semibold mt-1">{t.book_sub}</p></div>
                      <button onClick={() => setReserveOpen(false)} className="rounded-full bg-[var(--c-surface)] p-2 hover:bg-[var(--c-ink)] hover:text-white transition-all"><X className="h-5 w-5" /></button>
                    </div>

                    <p className="mt-5 text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-gold)]">{t.area}</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {areas.map((a, i) => (
                        <button key={i} onClick={() => setReserveArea(i)} className={`rounded-2xl border-2 p-3 text-center transition-all ${reserveArea === i ? "border-[var(--c-olive)] bg-[var(--c-olive)] text-white shadow-lg" : "border-[var(--c-tan)]/25 bg-[var(--c-card)] hover:border-[var(--c-gold)]"}`}>
                          <a.icon className={`mx-auto h-5 w-5 ${reserveArea === i ? "text-[var(--c-gold-light)]" : "text-[var(--c-gold)]"}`} />
                          <span className="mt-1 block text-[11px] font-extrabold leading-tight">{a.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <label className="block"><span className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-muted)]">{t.date}</span>
                        <input type="date" min={todayStr} value={resDate} onChange={(e) => setResDate(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-[var(--c-tan)]/30 bg-[var(--c-card)] px-4 py-3 text-sm font-bold outline-none focus:border-[var(--c-gold)] focus:ring-2 focus:ring-[var(--c-gold)]/20" />
                      </label>
                      <div><span className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-muted)]">{t.party}</span>
                        <div className="mt-1.5 flex items-center justify-between rounded-2xl border border-[var(--c-tan)]/30 bg-[var(--c-card)] px-2 py-1.5">
                          <button onClick={() => setGuests(Math.max(1, guests - 1))} className="rounded-full bg-[var(--c-surface)] p-2 hover:bg-[var(--c-olive)] hover:text-white"><Minus className="h-4 w-4" /></button>
                          <span className="flex items-center gap-1 text-sm font-extrabold"><Users className="h-4 w-4 text-[var(--c-gold)]" /> {guests}</span>
                          <button onClick={() => setGuests(Math.min(20, guests + 1))} className="rounded-full bg-[var(--c-surface)] p-2 hover:bg-[var(--c-olive)] hover:text-white"><Plus className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-muted)]">{t.time}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {times.map((tm) => (
                        <button key={tm} onClick={() => setResTime(tm)} className={`rounded-full px-3.5 py-2 text-[12px] font-extrabold border transition-all ${resTime === tm ? "bg-[var(--c-ink)] text-[var(--c-gold-light)] border-[var(--c-text)]" : "border-[var(--c-tan)]/30 bg-[var(--c-card)] hover:border-[var(--c-gold)]"}`}>{tm}</button>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block"><span className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-muted)]">{t.name}</span>
                        <input value={resName} onChange={(e) => setResName(e.target.value)} placeholder="Amine Trabelsi" className="mt-1.5 w-full rounded-2xl border border-[var(--c-tan)]/30 bg-[var(--c-card)] px-4 py-3 text-sm font-bold outline-none focus:border-[var(--c-gold)] focus:ring-2 focus:ring-[var(--c-gold)]/20 placeholder:text-[var(--c-muted)]/50 placeholder:font-semibold" />
                      </label>
                      <label className="block"><span className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-muted)]">{t.phone}</span>
                        <input value={resPhone} onChange={(e) => setResPhone(e.target.value)} placeholder="+216 ..." className="mt-1.5 w-full rounded-2xl border border-[var(--c-tan)]/30 bg-[var(--c-card)] px-4 py-3 text-sm font-bold outline-none focus:border-[var(--c-gold)] focus:ring-2 focus:ring-[var(--c-gold)]/20 placeholder:text-[var(--c-muted)]/50" />
                      </label>
                    </div>
                    <label className="mt-3 block"><span className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--c-muted)]">{t.notes}</span>
                      <textarea value={resNotes} onChange={(e) => setResNotes(e.target.value)} rows={2} className="mt-1.5 w-full rounded-2xl border border-[var(--c-tan)]/30 bg-[var(--c-card)] px-4 py-3 text-sm font-semibold outline-none focus:border-[var(--c-gold)] focus:ring-2 focus:ring-[var(--c-gold)]/20 placeholder:text-[var(--c-muted)]/50" placeholder="Window table, birthday cake..." />
                    </label>

                    {/* concierge tips */}
                    <div className="mt-4 rounded-2xl border border-[var(--c-gold)]/30 bg-[var(--c-gold-light)]/10 p-4 flex gap-3">
                      <Martini className="h-5 w-5 shrink-0 text-[var(--c-gold)]" />
                      <p className="text-[12px] leading-relaxed font-semibold text-[var(--c-muted)]">
                        {lang === "ar" ? "نصيحة الكونسيرج: التراس عند الغروب هو الأجمل — اطلب لاتيه إسباني وبارفيه مانجو. أيام الأحد: كاريوكي، يُنصح بالحجز المسبق." : lang === "fr" ? "Astuce concierge : la terrasse au coucher du soleil est magique — latte espagnol + parfait mangue. Dimanche : karaoké, réservez tôt." : "Concierge tip: the terrace at sunset is pure magic — Spanish latte + mango parfait. Sundays: karaoke, book early."}
                      </p>
                    </div>

                    <button
                      onClick={() => setResDone(true)}
                      disabled={!resName || !resDate}
                      className="mt-5 w-full rounded-full bg-[var(--c-olive)] px-6 py-4 text-sm font-extrabold text-white shadow-xl hover:bg-[var(--c-olive-deep)] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="h-4 w-4 text-[var(--c-gold-light)]" /> {t.confirm} — {areas[reserveArea].label} • {guests} • {resTime}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 md:p-12 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--c-olive)] shadow-2xl">
                    <Check className="h-10 w-10 text-[var(--c-gold-light)]" />
                  </motion.div>
                  <h3 className={`${serif} mt-5 text-4xl`}>{t.success_t}</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--c-muted)] font-semibold">{t.success_p}</p>
                  <div className="mx-auto mt-6 max-w-md rounded-3xl border border-[var(--c-tan)]/30 bg-[var(--c-surface)]/60 p-5 text-left space-y-2 text-sm font-bold">
                    <p className="flex justify-between"><span className="text-[var(--c-muted)]">{t.name}</span><span>{resName || "—"}</span></p>
                    <p className="flex justify-between"><span className="text-[var(--c-muted)]">{t.area}</span><span>{areas[reserveArea].label}</span></p>
                    <p className="flex justify-between"><span className="text-[var(--c-muted)]">{t.date}</span><span>{resDate || "—"} • {resTime}</span></p>
                    <p className="flex justify-between"><span className="text-[var(--c-muted)]">{t.party}</span><span>{guests}</span></p>
                    {tasting.length > 0 && <p className="flex justify-between gap-4"><span className="text-[var(--c-muted)] shrink-0">{t.tasting_list}</span><span className="text-right">{tasting.join(", ")}</span></p>}
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={`https://wa.me/21693301771?text=${encodeURIComponent(`Bonjour BROOKS Nabeul! Reservation: ${resName}, ${areas[reserveArea].label}, ${resDate} ${resTime}, ${guests} guests. ${tasting.join(", ")}`)}`}
                      target="_blank" rel="noreferrer"
                      className="rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg hover:brightness-95 inline-flex items-center justify-center gap-2"
                    ><Phone className="h-4 w-4" /> WhatsApp Concierge</a>
                    <button onClick={() => { setReserveOpen(false); setTasting([]); }} className="rounded-full bg-[var(--c-ink)] px-7 py-3.5 text-sm font-extrabold text-white hover:bg-[var(--c-olive)]">{t.done}</button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 flex items-center gap-2 rounded-full bg-[var(--c-ink)] px-5 py-3 shadow-2xl max-w-[90vw]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--c-gold-light)] shrink-0"><Check className="h-4 w-4 text-[var(--c-ink)]" /></span>
            <span className="text-[13px] font-bold text-white truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating actions */}
      <div className="fixed bottom-5 right-5 z-[70] flex flex-col gap-2">
        {/* Bouton WhatsApp flottant — contact direct */}
        <a
          href={`https://wa.me/21693301771?text=${encodeURIComponent(t.wa_msg)}`}
          target="_blank" rel="noreferrer"
          aria-label={t.wa_label}
          className="wa-float group relative flex items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-[0_14px_34px_rgba(37,211,102,0.42)]"
        >
          <span className="wa-pulse pointer-events-none absolute inset-0 rounded-full bg-[#25D366]" />
          <WhatsAppIcon className="relative h-6 w-6" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[var(--c-ink)] px-4 py-2 text-[12px] font-bold text-white opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100 sm:block">{t.wa_label}</span>
        </a>
        <a href="https://www.instagram.com/broookscafe/" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-[var(--c-card)]/90 backdrop-blur border border-[var(--c-tan)]/30 p-3.5 shadow-xl hover:bg-[var(--c-terra)] hover:text-white transition-all"><Camera className="h-5 w-5" /></a>
        <a href="tel:+21693301771" aria-label={t.call} className="rounded-full bg-[var(--c-olive)] p-3.5 shadow-xl text-white hover:bg-[var(--c-olive-deep)] transition-all"><Phone className="h-5 w-5" /></a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="↑" className={`rounded-full bg-[var(--c-gold-light)] p-3.5 shadow-xl text-[var(--c-ink)] hover:bg-[#FFE3B0] transition-all ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}><ChevronDown className="h-5 w-5 rotate-180" /></button>
      </div>
    </div>
  );
}
