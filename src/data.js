// Central content store. Keeping copy here (rather than scattered through
// components) makes it trivial to swap in real inventory/pricing later.

export const COMPANY = {
  name: "سینا ارتباط",
  nameEn: "SINA ERTEBAT",
  tagline: "تجهیزات دوربین مداربسته، برق اضطراری و روشنایی",
  phoneDisplay: "08134245651",
  phoneHref: "tel:+8134245651",
  email: "info@sinaertebat.example",
  address:
    "همدان، بلوار علویان، کوچه قصابان، ساختمان سینا ارتباط، کد پستی 6518667199",
};

export const ABOUT_TEXT = [
  "این شرکت در طول فعالیت خود توانسته به طیف وسیعی از مشتریان به خصوص ادارات دولتی و سازمان‌های خصوصی خدمات مناسبی ارائه دهد و به لطف خدا و تلاش و کوشش پرسنل خود توانسته رضایت مشتریان را به طور شایسته جلب نماید.",
  "نیازهای روزافزون کشور به الکترونیک، فناوری اطلاعات و ارتباطات و همچنین توسعه همه‌جانبه آن در سال‌های اخیر و سیاست دولت جمهوری اسلامی ایران مبنی بر واگذاری کار به بخش خصوصی، ما را بر آن داشت تا با استفاده از پرسنل متخصص، مجرب و امکانات فنی مناسب تحت نام شرکت سینا ارتباط فعالیت خود را در امور مخابرات و الکترونیک آغاز نماییم تا با این حرکت، گامی هرچند کوچک در راستای تحقق اهداف دولت جمهوری اسلامی ایران برداریم.",
];

export const TRUST_POINTS = [
  { icon: "shield", label: "همکار ادارات دولتی و سازمان‌های خصوصی" },
  { icon: "tools", label: "نصب، راه‌اندازی و پشتیبانی فنی تخصصی" },
  { icon: "clock", label: "گارانتی معتبر و خدمات پس از فروش" },
];

export const CATEGORIES = [
  {
    id: "cctv",
    label: "دوربین مداربسته",
    labelEn: "CCTV / NVR",
    icon: "camera",
  },
  { id: "ups", label: "یو‌پی‌اس", labelEn: "UPS / BATTERY", icon: "ups" },
  {
    id: "lighting",
    label: "تجهیزات روشنایی",
    labelEn: "LIGHTING",
    icon: "bulb",
  },
];

export const PRODUCTS = [
  {
    id: "cctv-1",
    checked: false,
    category: "cctv",
    name: "دوربین بولت IP دید در شب",
    model: "SB-2MP-IR30",
    specs: ["2MP · 1080P", "برد دید در شب 30 متر", "ضد آب IP66"],
  },
  {
    id: "cctv-2",
    checked: false,
    category: "cctv",
    name: "دوربین دام IP ضدخرابکاری",
    model: "SD-4MP-VF",
    specs: ["4MP", "لنز واریفوکال", "بدنه ضدضربه IK10"],
  },
  {
    id: "cctv-3",
    checked: false,
    category: "cctv",
    name: "دوربین اسپید دام PTZ",
    model: "SPTZ-5MP-20X",
    specs: ["5MP", "زوم نوری 20 برابر", "چرخش 360 درجه"],
  },
  {
    id: "cctv-4",
    checked: false,
    category: "cctv",
    name: "دستگاه ضبط تصاویر NVR 16 کاناله",
    model: "NVR-16CH-4K",
    specs: ["16 کانال", "خروجی 4K", "پشتیبانی از 2 هارددیسک"],
  },
  {
    id: "ups-1",
    checked: false,
    category: "ups",
    name: "یو‌پی‌اس آنلاین (Online)",
    model: "ON-10KVA",
    specs: ["ظرفیت 10KVA", "فرم موج سینوسی خالص", "مناسب اتاق سرور"],
  },
  {
    id: "ups-2",
    checked: false,
    category: "ups",
    name: "یو‌پی‌اس لاین اینتراکتیو",
    model: "LI-1KVA",
    specs: ["ظرفیت 1KVA", "زمان پشتیبان‌گیری تا 15 دقیقه", "نمایشگر LCD"],
  },
  {
    id: "ups-3",
    checked: false,
    category: "ups",
    name: "باتری سیلد اسید 12 ولت",
    model: "BAT-12V-100A",
    specs: ["12V / 100Ah", "عمر مفید بالا", "مناسب یو‌پی‌اس‌های صنعتی"],
  },
  {
    id: "ups-4",
    checked: false,
    category: "ups",
    name: "یو‌پی‌اس رکمونت",
    model: "RM-6KVA",
    specs: [
      "ظرفیت 6KVA",
      "قابلیت نصب در رک استاندارد",
      "مانیتورینگ از راه دور",
    ],
  },
  {
    id: "light-1",
    checked: false,
    category: "lighting",
    name: "چراغ خیابانی LED هوشمند",
    model: "SL-150W",
    specs: ["توان 150 وات", "سنسور روشنایی محیط", "بدنه آلومینیومی"],
  },
  {
    id: "light-2",
    checked: false,
    category: "lighting",
    name: "پروژکتور LED صنعتی",
    model: "FL-200W",
    specs: ["توان 200 وات", "ضد آب IP65", "مناسب فضای باز"],
  },
  {
    id: "light-3",
    checked: false,
    category: "lighting",
    name: "چراغ خطی SMD سقفی",
    model: "LN-SMD-40W",
    specs: ["توان 40 وات", "نور یکنواخت", "مناسب راهرو و پارکینگ"],
  },
  {
    id: "light-4",
    checked: false,
    category: "lighting",
    name: "چراغ اضطراری شارژی",
    model: "EM-LED-12W",
    specs: ["باتری داخلی", "روشنایی خودکار در قطعی برق", "نصب سقفی/دیواری"],
  },
];
