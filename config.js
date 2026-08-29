/* ============================================================
   config.js
   ------------------------------------------------------------
   هذا هو الملف الوحيد الذي تحتاج لتعديله لتخصيص الموقع بالكامل.
   لا حاجة للمس أي كود تصميم أو أي ملف آخر.
   فقط غيّر القيم الموجودة هنا.
   ============================================================ */

const CONFIG = {

    /* ---------- المعلومات الأساسية ---------- */
    name: "مرام",                 // اسم الشخص الذي تُهدى له التجربة
    yourName: "من احمد",            // توقيعك أنت في نهاية الموقع
    startDate: "2022-09-11",        // تاريخ بداية القصة (يُستخدم في عداد الذكريات)

    /* ---------- شاشة البداية ---------- */
    openingLine: "لدي شيء صغير أريد أن أهديه لك...",
    openingButton: "ابدئي الحكاية",

    /* ---------- قسم عيد الميلاد / البداية ---------- */
    heroTitle: "كل سنة وأنتِ أجمل شيء حدث لي",
    heroDateLabel: "عيد ميلاد سعيد",
    heroDate: "9/4",
    heroButton: "اضغطي هنا",

    /* ---------- قسم معرض الصور ---------- */
    galleryTitle: "ذكريات صغيرة....",
    photos: [
        {
            src: "https://i.postimg.cc/wjdqkL6H/IMG-20260829-WA0010.jpg",
            caption: ""
        },
        {
            src: "https://i.postimg.cc/4Np7ZJyd/IMG-20260829-WA0016.jpg",
            caption: ""
        },
        {
            src: "https://i.postimg.cc/d3yF2tpf/IMG-20260829-WA0013.jpg",
            caption: ""
        },
        {
            src: "https://i.postimg.cc/K8rZpjj2/IMG-20260829-WA0011.jpg",
            caption: ""
        },
        {
            src: "https://i.postimg.cc/9MNXPkM0/IMG-20260829-WA0008.jpg",
            caption: ""
        },
        {
            src: "https://i.postimg.cc/FHmfH2Jv/IMG-20260829-WA0017.jpg",
            caption: ""
        }
    ],

    /* ---------- قسم الرسائل المتتالية ---------- */
    messagesTitle: "ولسه الحكاية مخلصتش...",
    messages: [
        "أحيانًا لا أعرف كيف أشرح لكِ كم أنتِ مهمة بالنسبة لي...",
        "لكنني أعرف أن وجودك في حياتي غيّر أشياء كثيرة.",
        "وأعرف أن بعض الأشخاص لا يمكن استبدالهم.",
        "وأنتِ، بكل بساطة، واحدة منهم."
    ],
    messagesButton: "هناك شيء آخر",

    /* ---------- القلب التفاعلي ---------- */
    heartPrompt: "اضغطي على القلب",
    heartFirstMessage: "",
    heartSecondMessage: "",
    heartFinalLine: "كنتِ دائمًا السبب في أن هذا القلب ينبض.",

    /* ---------- الرسالة السرية ---------- */
    secretTitle: "رسالة لم أقلها من قبل...",
    secretButton: "افتحي الرسالة",
    secretMessage:
        "لو كان بإمكاني أن أعطيك شيئًا واحدًا في هذه الحياة،\n" +
        "فسأعطيك القدرة على رؤية نفسك بعيني،\n" +
        "حتى تعرفي كم أنتِ جميلة ومميزة بالنسبة لي.\n\n" +
        "شكرًا لأنكِ أنتِ، تمامًا كما أنتِ.",

    /* ---------- عداد الذكريات ---------- */
    counterTitle: "من يوم ما بدأت الحكاية...",
    counterSubtitle: "مرت على حكايتنا",

    /* ---------- الخط الزمني Timeline ---------- */
    timelineTitle: "... خطوة بخطوة",
    timeline: [
        {
            label: "",
            date: "",
            message: "",
            image: "https://i.postimg.cc/PxZhZ5B6/WA-1788004619761.jpg"
        },
        {
            label: "",
            date: "",
            message: "",
            image: "https://i.postimg.cc/MpPWJ47p/WA-1788004567706.jpg"
        },
        {
            label: "",
            date: "",
            message: "",
            image: "https://i.postimg.cc/0NXrZjXq/IMG-20260829-WA0019.jpg"
        },
        {
            label: "",
            date: "",
            message: "",
            image: "https://i.postimg.cc/mDqR1FXH/IMG-20260829-WA0014.jpg"
        },
        {
            label: "",
            date: "",
            message: "",
            image: "https://i.postimg.cc/PqSdh711/IMG-20260829-WA0012.jpg"
        },
        {
            label: "",
            date: "",
            message: "",
            image: "https://i.postimg.cc/yxMVtS04/IMG-20260829-WA0009.jpg"
        },
        {
            label: "والباقي لم يُكتب بعد...",
            date: "قريبًا",
            message: "أجمل الفصول لسه جاية.",
            image: ""
        }
    ],

    /* ---------- المفاجأة النهائية ---------- */
    endingLine1: "وصلنا للنهاية...",
    endingLine2: "أم أنني كذبت؟",
    endingButton: "آخر مفاجأة",
    finalMessage: "كل سنة وأنتِ جنبي،\nوكل سنة والحكاية بيننا أجمل.",
    finalNote: "هذه الهدية بسيطة...\nلكن كل شيء فيها اختارته لكِ .",

    /* ---------- التورطة الكبيرة الأخيرة (صندوق الهدية) ---------- */
    surpriseNextButton: "التالي",
    surpriseHint: "لسه فيه تورطة كبيرة كمان...",
    surpriseBoxPrompt: "افتحي الهدية 🎁",
    surpriseMessage:
        "مكنش المفروض أقولها كده بس خلاص هقولها،\n" +
        "أنا مبسوط جدًا إنك موجودة في حياتي،\n" +
        "وكل يوم بحمد ربنا إنه رزقني بيكِ وعوضتيني عن شعور الاخوه و اجمل اخت\n\n" +
        "دي مش النهاية... دي بس بداية حاجات كتير أجمل جاية.\n" +
        "اجمل اخت ربنا رزقني بيها",
    surpriseAfterButton: "التالي",

    /* ---------- التورطة الثانية (فيديو المفاجأة) ---------- */
    videoSurpriseHint: "لسه فيه تورطة كمان...",
    videoSurprisePrompt: "دوسي هنا 🎉",
    videoSurpriseSrc: "https://videotourl.com/videos/1788006267625-c70e08f8-f176-4470-a8c7-68a86274893b.mp4",

    /* ---------- الموسيقى ---------- */
    musicSrc: "assets/music/romantic.mp3",

    /* ---------- الألوان (تُستخدم كمتغيرات CSS عبر JavaScript) ---------- */
    colors: {
        bgDark: "#0a0a16",
        bgDarker: "#050509",
        red: "#ff3b5c",
        pink: "#ff9db8",
        gold: "#ffd27a",
        white: "#fdfaf6"
    }
};
