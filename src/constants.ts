// UI Options (Arrays for Select/Map)

export const CAMERA_ANGLES = [
    { id: "front", label: "Chính diện" },
    { id: "high", label: "Góc cao" },
    { id: "low", label: "Góc thấp" },
    { id: "birdEye", label: "Nhìn từ trên xuống" },
    { id: "worm", label: "Nhìn từ dưới lên" },
    { id: "back", label: "Từ phía sau" },
    { id: "wide", label: "Góc rộng 16mm" },
    { id: "telephoto", label: "Telephoto 200mm" },
    { id: "ots", label: "Qua vai" },
    { id: "pov", label: "POV" }
];

export const BODY_DIRECTIONS = [
    { id: "frontal", label: "Thẳng" },
    { id: "fortyFive", label: "45 độ" },
    { id: "ninety", label: "90 độ" },
    { id: "back", label: "Quay lưng" }
];

export const SITTING_POSES = [
    { id: "floor", label: "Ngồi sàn" },
    { id: "chair", label: "Ngồi ghế" },
    { id: "object", label: "Ngồi vật thể" },
    { id: "kneeling", label: "Quỳ gối" },
    { id: "prone", label: "Nằm sấp" },
    { id: "supine", label: "Nằm ngửa" },
    { id: "reclining", label: "Tựa lưng" },
    { id: "sideLying", label: "Nằm nghiêng" }
];

export const HEAD_DIRECTIONS = [
    { id: "frontal", label: "Thẳng" },
    { id: "turned", label: "Xoay" },
    { id: "profile", label: "Nghiêng" },
    { id: "tiltedUp", label: "Ngửa" },
    { id: "tiltedDown", label: "Cúi" },
    { id: "lookingBack", label: "Nhìn lại" }
];

export const GAZE_TYPES = [
    { id: "direct", label: "Nhìn thẳng" },
    { id: "away", label: "Nhìn xa" },
    { id: "down", label: "Nhìn xuống" },
    { id: "up", label: "Nhìn lên" },
    { id: "closed", label: "Nhắm mắt" },
    { id: "squint", label: "Nheo mắt" }
];

export const ACTION_DETAILS = [
    { id: "fingers", label: "Chi tiết ngón tay" },
    { id: "oneHand", label: "1 tay" },
    { id: "twoHands", label: "2 tay" },
    { id: "faceAngles", label: "Góc mặt đa dạng" },
    { id: "lowJump", label: "Nhảy nhẹ" },
    { id: "twoLegs", label: "Tập trung chân" },
    { id: "cuteFace", label: "Mặt cute" }
];

export const HAIR_STYLES = [
    { id: "none", label: "Không chọn" },
    { id: "ponytail", label: "Đuôi ngựa" },
    { id: "bun", label: "Búi tóc" },
    { id: "braids", label: "Tết tóc" },
    { id: "loose", label: "Xõa tóc" },
    { id: "half_up", label: "Buộc nửa đầu" },
    { id: "messy", label: "Tóc rối tự nhiên" }
];

export const MAKEUP_STYLES = [
    { id: "none", label: "Không chọn" },
    { id: "natural", label: "Tự nhiên" },
    { id: "glam", label: "Quyến rũ" },
    { id: "bold", label: "Đậm" },
    { id: "soft", label: "Nhẹ nhàng" },
    { id: "editorial", label: "Editorial" }
];

export const HAIR_LENGTH = {
    short: "Ngắn",
    medium: "Trung bình",
    long: "Dài"
};

export const COLOR_PRESETS = [
    { id: "none", label: "Không" },
    { id: "bw", label: "Đen trắng" },
    { id: "fuji_c200", label: "Fuji C200" },
    { id: "kodak_gold", label: "Kodak Gold 200" },
    { id: "kodak_color", label: "Kodak ColorPlus 200" },
    { id: "cinestill_800t", label: "CineStill 800T" },
    { id: "portra_400", label: "Kodak Portra 400" },
    { id: "vision3_500t", label: "Kodak Vision3 500T" },
    { id: "proimage_100", label: "Kodak ProImage 100" },
    { id: "ktung_xanh_bac", label: "K.Tùng Xanh Bạc" },
    { id: "ktung_xanh_ngoc", label: "K.Tùng Xanh Ngọc" }
];

export const BUSINESS_HAIR_OPTIONS = [
    { id: "short", label: "Tóc ngắn chuyên nghiệp" },
    { id: "medium", label: "Tóc trung bình" },
    { id: "long", label: "Tóc dài chuyên nghiệp" },
    { id: "bob", label: "Tóc bob" },
    { id: "high_bun", label: "Búi cao" },
    { id: "low_bun", label: "Búi thấp" },
    { id: "default", label: "Giữ nguyên như ảnh gốc" }
];

export const BUSINESS_ORIENTATION = {
    frontal: "Trực diện",
    bodyTurn: "Xoay người 45°",
    faceTurn: "Xoay mặt nhẹ"
};

export const BUSINESS_CHAIRS = [
    { id: "armchair", label: "Ghế bành" },
    { id: "sofa", label: "Sofa" },
    { id: "highChair", label: "Ghế cao/Stool" },
    { id: "studioChair", label: "Ghế studio" },
    { id: "woodenChair", label: "Ghế gỗ" },
    { id: "table", label: "Ngồi bàn" }
];

export const BUSINESS_ACCESSORIES = [
    { id: "notebook", label: "Sổ tay cao cấp" },
    { id: "watch", label: "Đồng hồ sang trọng" },
    { id: "pen", label: "Bút cao cấp" },
    { id: "laptop", label: "Macbook" },
    { id: "phone", label: "iPhone" },
    { id: "glasses", label: "Kính mắt" },
    { id: "coffee", label: "Cốc cà phê" },
    { id: "handbag", label: "Túi xách" }
];

export const BUSINESS_OUTFIT = {
    blazer: "Áo vest/Blazer",
    vest: "Áo gi-lê",
    shirt: "Áo sơ mi",
    turtleneck: "Áo cổ lọ"
};

export const FURNITURE_COLORS = [
    { id: "default", label: "Mặc định" },
    { id: "black", label: "Đen" },
    { id: "white", label: "Trắng" },
    { id: "gray", label: "Xám" },
    { id: "brown", label: "Nâu" },
    { id: "navy", label: "Xanh navy" },
    { id: "beige", label: "Be" }
];

export const OUTFIT_COLORS = [
    { id: "black", label: "Đen" },
    { id: "white", label: "Trắng" },
    { id: "gray", label: "Xám" },
    { id: "navy", label: "Xanh Navy" },
    { id: "beige", label: "Be" },
    { id: "brown", label: "Nâu" },
    { id: "red", label: "Đỏ" },
    { id: "blue", label: "Xanh" }
];

export const BUSINESS_TONES = [
    { id: "color", label: "Màu (Color)" },
    { id: "bw", label: "Đen Trắng (B&W)" }
];

export const BACKGROUND_COLORS = [
    { id: "random", label: "Ngẫu nhiên" },
    { id: "white", label: "Trắng" },
    { id: "gray", label: "Xám" },
    { id: "navy", label: "Xanh navy" },
    { id: "beige", label: "Be" },
    { id: "black", label: "Đen" }
];

export const BACKGROUND_TYPES = {
    solid: "Màu đơn",
    gradient: "Gradient"
};

export const SHOT_TYPES = [
    { id: "closeUp", label: "Cận mặt" },
    { id: "midShot", label: "Bán thân" },
    { id: "fullBody", label: "Toàn thân" }
];

export const BUSINESS_SHOT_TYPES = [];

// ==========================================
// 🆕 PORTRAIT MODE CONSTANTS
// ==========================================

export const PORTRAIT_POSES = {
    closeUp: [
        "Nhìn thẳng", "Nhìn hơi nghiêng 30°", "Nhìn xuống", "Nhìn lên",
        "Mắt khép hờ (10–20%)", "Mắt nhìn sang phải / trái",
        "Che một phần mặt bằng tóc", "Che mặt bằng hoa / vật thể",
        "Tay chạm cằm", "Tay chạm má", "Tay chạm tóc", "Tay nâng tóc",
        "Hai tay framing mặt", "Một tay chỉnh tóc", "Một tay che nắng",
        "Tay đặt cổ / vai", "Tay cầm hoa / quả nho / vật thể",
        "Pose gợi cảm: môi hé nhẹ, đầu nghiêng", "Pose editorial: nâng cằm, mắt hờ",
        "Pose 2000s: nhìn thẳng + flash mạnh", "Pose nhìn qua cửa chớp (blinds)"
    ],
    midShot: [
        "Ngồi dựa tường", "Ngồi bó gối", "Ngồi giữa bụi hoa",
        "Đứng dựa tường Địa Trung Hải", "Đứng ngoài nắng, hair wind-blown",
        "Đứng quay 45°, nhìn về camera", "Đưa hoa lên che mặt một phần",
        "Squat / nửa ngồi", "Xoay đầu 3/4 view",
        "Đứng dưới nắng gắt + shadow lines trên mặt"
    ],
    fullBody: [
        "Đứng giữa nước phản chiếu (ảnh tím)", "Flowing gown high-slit pose",
        "Bước đi nhẹ", "Pose runway lạnh lùng"
    ]
};

export const PORTRAIT_SKIN_TONES = [
    { id: "fair_white", label: "Fair white (trắng sáng)", prompt: "Fair white skin" },
    { id: "fair_sea_rose", label: "Fair SEA rose–pink (hồng đào Á Đông)", prompt: "Fair SEA rose–pink skin" },
    { id: "porcelain", label: "Porcelain skin (trắng sứ)", prompt: "Porcelain skin" },
    { id: "warm_golden", label: "Warm golden tone", prompt: "Warm golden skin tone" },
    { id: "cool_tone", label: "Cool tone (bạc – xanh ngọc – pastel lạnh)", prompt: "Cool tone silver-pink skin" },
    { id: "luminous_dewy", label: "Luminous dewy skin (glowy)", prompt: "Luminous dewy skin" },
    { id: "matte_soft", label: "Matte soft skin (Douyin)", prompt: "Matte soft skin" },
    { id: "tanned", label: "Tanned skin nhẹ", prompt: "Lightly tanned skin" },
    { id: "dark_brown", label: "Dark brown skin (Afro model)", prompt: "Dark brown skin" },
    { id: "warm_glow", label: "Warm golden-hour glow", prompt: "Warm golden-hour glow skin" },
    { id: "silver_rosy", label: "Silver–rosy (Douyin cold-pink)", prompt: "Silver–rosy skin" },
    { id: "soft_peach", label: "Soft peach blush", prompt: "Soft peach blush skin" },
    { id: "freckles", label: "Subtle freckles / faux freckles", prompt: "Skin with subtle faux freckles" },
    { id: "natural_raw", label: "Natural raw skin (visible pores)", prompt: "Natural raw skin with visible pores" }
];

export const PORTRAIT_HAIR_STYLES = [
    { id: "wavy", label: "Tóc dài gợn sóng", prompt: "Long wavy hair" },
    { id: "messy_waves", label: "Tóc dài messy soft waves", prompt: "Long messy soft waves" },
    { id: "wind_blown", label: "Tóc rối nhẹ wind-blown", prompt: "Lightly wind-blown messy hair" },
    { id: "sleek_bun", label: "Tóc buộc gọn sleek bun", prompt: "Sleek bun hairstyle" },
    { id: "messy_bun", label: "Tóc búi messy bun", prompt: "Messy bun hairstyle" },
    { id: "bob_straight", label: "Tóc bob thẳng", prompt: "Straight bob hairstyle" },
    { id: "bob_wavy", label: "Tóc bob gợn", prompt: "Wavy bob hairstyle" },
    { id: "pixie", label: "Pixie cut hiện đại", prompt: "Modern pixie cut" },
    { id: "platinum_bob", label: "Platinum blonde bob", prompt: "Platinum blonde bob" },
    { id: "wet_look", label: "Tóc đen hơi ướt", prompt: "Black wet-look hair" },
    { id: "half_up", label: "Half-up half-down", prompt: "Half-up half-down hairstyle" },
    { id: "covering_eyes", label: "Tóc phủ mắt", prompt: "Hair strands covering eyes" },
    { id: "2000s_strands", label: "Tóc 2000s (front messy strands)", prompt: "2000s style hair with front messy strands" },
    { id: "highlight", label: "Tóc highlight nhẹ", prompt: "Hair with subtle highlights" },
    { id: "curtain_bangs", label: "Tóc để mái mỏng / curtain bangs", prompt: "Hair with thin curtain bangs" },
    { id: "low_ponytail", label: "Tóc buộc hờ low ponytail", prompt: "Loose low ponytail" },
    { id: "platinum_wavy", label: "Tóc platinum wavy fantasy", prompt: "Platinum wavy fantasy hair" },
    { id: "long_black_flow", label: "Tóc dài ĐEN + hơi bay tự nhiên", prompt: "Long black natural flowing hair" },
    { id: "layered_messy", label: "Hair layered, messy wind", prompt: "Layered messy wind-blown hair" },
    { id: "braid_crown", label: "Greek-inspired braid crown", prompt: "Greek-inspired braid crown" },
    { id: "braids_ribbon", label: "Braids đôi mảnh đính ribbon", prompt: "Thin double braids with ribbons" }
];

export const PORTRAIT_GAZE = [
    "Looking at camera", "Looking slightly off-camera", "Looking down", "Looking up",
    "Eyes half-closed 10–20%", "Intense gaze", "Soft wistful gaze", "Seductive gaze",
    "Dreamy melancholic gaze", "Deadpan calm", "Strong confident gaze",
    "Alluring + rebellious", "Gentle downward gaze", "Upwards diagonal highlight gaze",
    "Gaze through window blinds", "Gaze through hair gap", "Gaze with only one eye visible"
];

export const PORTRAIT_COLOR_GRADING = {
    warm: [
        { id: "golden_hour", label: "Golden hour warm", prompt: "Golden hour warm tone" },
        { id: "soft_pink", label: "Soft warm pink", prompt: "Soft warm pink tone" },
        { id: "peach_blush", label: "Warm peach blush", prompt: "Warm peach blush tone" },
        { id: "douyin_pink", label: "Douyin warm-pink", prompt: "Douyin warm-pink tone" },
        { id: "mediterranean", label: "Warm Mediterranean white + gold", prompt: "Warm Mediterranean white and gold tone" }
    ],
    cool: [
        { id: "cinematic_cool", label: "Cool cinematic (bạc – xanh ngọc)", prompt: "Cool cinematic silver-teal tone" },
        { id: "muted_cool", label: "Cool #c5a49a / #c7c5c6", prompt: "Muted cool tones #c5a49a #c7c5c6" },
        { id: "pastel_lilac", label: "Soft pastel lilac", prompt: "Soft pastel lilac-white tone" },
        { id: "fantasy_silver", label: "Pastel fantasy – silver pink", prompt: "Pastel fantasy silver-pink tone" },
        { id: "korean_beige", label: "Korean cool-beige tone", prompt: "Korean cool-beige tone" }
    ],
    neutral: [
        { id: "beige", label: "Beige", prompt: "Beige tone" },
        { id: "cream", label: "Cream", prompt: "Cream tone" },
        { id: "soft_brown", label: "Soft brown", prompt: "Soft brown tone" },
        { id: "silver_gray", label: "Silver-gray", prompt: "Silver-gray tone" },
        { id: "muted_taupe", label: "Muted taupe", prompt: "Muted taupe tone" },
        { id: "warm_neutral", label: "Warm-neutral (airbrush natural)", prompt: "Warm-neutral airbrush natural tone" }
    ],
    contrast: [
        { id: "moody_dark", label: "Moody dark feminine", prompt: "Moody dark feminine tone" },
        { id: "gothic_black", label: "Gothic editorial black", prompt: "Gothic editorial black tone" },
        { id: "harsh_sunlight", label: "Harsh sunlight diagonal beam", prompt: "Harsh sunlight diagonal beam tone" },
        { id: "flash_2000s", label: "Flash 2000s overexposed", prompt: "Flash 2000s overexposed tone" },
        { id: "vintage_hk", label: "Vintage film tones (HK 2000s)", prompt: "Vintage Hong Kong 2000s film tone" }
    ]
};

export const PORTRAIT_BACKGROUNDS = {
    studio: [
        { id: "black_studio", label: "Black studio", prompt: "Black studio background" },
        { id: "white_clean", label: "White clean background", prompt: "White clean background" },
        { id: "gray_charcoal", label: "Gray charcoal minimal", prompt: "Gray charcoal minimal background" },
        { id: "beige_wall", label: "Beige / cream wall", prompt: "Beige cream wall background" },
        { id: "dark_red", label: "Dark red flat background", prompt: "Dark red flat background" },
        { id: "pastel_gradient", label: "Soft pastel: white–lilac gradient", prompt: "Soft pastel white-lilac gradient background" },
        { id: "silver_studio", label: "Silver-cool studio", prompt: "Silver-cool studio background" },
        { id: "dreamy_blur", label: "Dreamy soft blur", prompt: "Dreamy soft blur background" },
        { id: "pure_white", label: "Pure white", prompt: "Pure white background" },
        { id: "textured_green", label: "Textured green-gray (chiaroscuro)", prompt: "Textured green-gray chiaroscuro background" }
    ],
    outdoor: [
        { id: "garden_bokeh", label: "Garden bokeh with greenery", prompt: "Garden bokeh with greenery" },
        { id: "daisies_field", label: "Field of yellow daisies", prompt: "Field of yellow daisies" },
        { id: "med_wall", label: "Mediterranean white wall", prompt: "Mediterranean white wall" },
        { id: "blue_sky", label: "Blue sky", prompt: "Blue sky background" },
        { id: "sunlit_wall", label: "Sunlit wall diagonal shadow", prompt: "Sunlit wall with diagonal shadow" },
        { id: "tropical_blur", label: "Tropical street blur", prompt: "Tropical street blur" },
        { id: "flower_field", label: "Flower field bokeh", prompt: "Flower field bokeh" },
        { id: "blinds_shadow", label: "Soft sunlight shadows from blinds", prompt: "Soft sunlight shadows from blinds" },
        { id: "cinematic_wall", label: "Late-afternoon cinematic light wall", prompt: "Late-afternoon cinematic light wall" }
    ],
    fantasy: [
        { id: "amethyst_liquid", label: "Deep amethyst liquid", prompt: "Deep amethyst liquid background" },
        { id: "pastel_haze", label: "Pastel haze", prompt: "Pastel haze background" },
        { id: "low_key_rim", label: "Low-key dark + rim light", prompt: "Low-key dark background with rim light" },
        { id: "digital_flash", label: "2000s digital flash", prompt: "2000s digital flash background" }
    ]
};

export const PORTRAIT_MAKEUP = {
    eyes: [
        { id: "peach_shimmer", label: "Peach / coral shimmer" },
        { id: "beige_shimmer", label: "Beige–white shimmer" },
        { id: "metallic_bronze", label: "Metallic bronze" },
        { id: "mauve", label: "Mauve" },
        { id: "silver_pink", label: "Silver-pink Douyin" },
        { id: "soft_brown", label: "Soft brown eyeshadow" },
        { id: "thin_liner", label: "Thin eyeliner" },
        { id: "sharp_liner", label: "Sharp eyeliner" },
        { id: "heavy_glam", label: "Heavy-lined glamour" },
        { id: "no_liner", label: "No eyeliner (natural)" },
        { id: "voluminous_lashes", label: "Voluminous lashes" },
        { id: "feathery_lashes", label: "Feathery lashes" },
        { id: "natural_lashes", label: "Natural curled lashes" },
        { id: "hazel_lens", label: "Hazel / brown contact lens" },
        { id: "no_lens", label: "No lens (natural)" }
    ],
    face: [
        { id: "dewy", label: "Dewy skin" },
        { id: "satin", label: "Satin finish" },
        { id: "matte_peach", label: "Matte Douyin peach" },
        { id: "strong_contour", label: "Strong contour (gothic)" },
        { id: "soft_contour", label: "Soft contour" },
        { id: "gradient_blush", label: "Pink-peach gradient blush" },
        { id: "drunk_blush", label: "Sunburn/drunk blush" },
        { id: "highlight_silver", label: "Highlight cool silver" },
        { id: "highlight_gold", label: "Highlight warm gold" },
        { id: "faux_freckles", label: "Faux freckles" },
        { id: "natural_freckles", label: "Natural freckles" }
    ],
    lips: [
        { id: "glossy_peach", label: "Glossy peach-pink" },
        { id: "metallic_bronze", label: "Metallic bronze" },
        { id: "brown_gloss", label: "Brown lip gloss" },
        { id: "berry_pink", label: "Berry-pink" },
        { id: "plum", label: "Plum" },
        { id: "nude_peach", label: "Nude peach" },
        { id: "soft_rose", label: "Soft rose" },
        { id: "dewy_natural", label: "Dewy natural lip" },
        { id: "red_lipstick", label: "Red lipstick (HK 2000s)" }
    ]
};

export const GLOBAL_COLOR_RULES = {
    dark: "tone cinematic moody, high contrast",
    white: "tone airy, cool-white, bright glowy",
    beige: "tone warm, soft, natural editorial",
    pastel: "tone pastel soft fantasy",
    green: "tone warm skin + green contrast",
    blue_sky: "tone airy bright, low contrast",
    red: "tone warm, dramatic, Hong Kong film",
    black: "tone gothic, dramatic, high-fashion",
    purple: "tone cold fantasy, violet highlights"
};

// Prompts
export const REALISM_PROMPT = "High-fidelity, true-to-source facial replication. The subject’s face MUST remain 100% identical to the provided reference photo — same bone structure, proportions, eyes, nose, lips, jawline, skin tone, natural asymmetry, and all micro-details. Do NOT alter, enhance, stylize, beautify, smooth, or reinterpret the face in any way. Do NOT change facial identity, proportions, or expression foundation. Keep the original face exactly the same as in the reference image. Rendering style requirements: Hyper-realistic photography, High-resolution detail, True, natural skin texture with visible pores, Zero cartoonification, zero digital painting style, No artificial smoothing or beautification, Natural lighting, realistic photographic rendering. Edit my photo while preserving the exact face features and identity — no alterations, no modifications, perfect one-to-one facial fidelity.";

export const NEGATIVE_PROMPT = "no anime, no cartoon, no illustration look, no CGI, no 3D, no plastic skin, no smoothing or airbrushing, no fantasy armor or costume changes, no heavy contrast or neon colors";

export const CUTE_FACE_INSTRUCTIONS = [
    "Slight head tilt with soft smile",
    "Eyes slightly squinted with genuine smile",
    "One hand near face, gentle touch",
    "Playful expression with natural joy"
];

export const MASTER_POSE_CONTEXT = `
Reference Pose Library (for inspiration):
- Relaxed standing with hands by sides
- Confident arms crossed
- One hand in pocket, casual lean
- Sitting with crossed legs
- Leaning forward with hands on surface
- Side profile with contemplative gaze
- Dynamic walking pose
- Hands gently touching face
- Professional handshake position
- Thoughtful chin rest
`;

// ==========================================
// 🆕 NEW POSE CATEGORIES (UNIFIED SYSTEM)
// ==========================================

export const POSE_CATEGORIES = {
    // 1️⃣ FULL-BODY POSES
    fullBody: {
        name: "Toàn thân",
        poses: [
            "Đứng thẳng – hai tay buông",
            "Đứng thẳng – hai tay để cạnh người",
            "Đứng thẳng – hai tay đút túi",
            "Đứng giang chân + khoanh tay",
            "Một chân đưa nhẹ ra trước + tay buông",
            "Một chân đưa nhẹ ra trước + tay chống eo",
            "Bắt chéo chân + cười mím",
            "Chéo chân nhẹ – nụ cười tự nhiên",
            "Hai tay để trước người (soft clasp)",
            "Một tay nắm cổ tay tay kia trước bụng",
            "Hai tay đưa ra sau lưng",
            "Đứng nghiêng 3/4 + tay buông",
            "Ngồi trên ghế xếp – chân bắt chéo – hơi ngả ra sau",
            "Ngồi studio – side angle – cầm kính",
            "Tựa lưng vào bàn làm việc – khoanh tay",
            "Bước đi dứt khoát – cầm áo vest trên vai",
            "Ngồi ghế cao – một chân chống – một chân duỗi",
            "Ngồi sofa – chân co nhẹ lên ghế",
            "Bước đi tự tin – túi xách cầm tay",
            "Tựa lưng vào tường – một chân co nhẹ"
        ]
    },

    // 2️⃣ MID-SHOT POSES
    midShot: {
        name: "Bán thân",
        poses: [
            "Hai tay khoanh",
            "Một tay đút túi – một tay thả",
            "Một tay chống hông",
            "Một tay chỉnh vạt áo / cổ áo",
            "Hai tay đặt trước ngực chồng nhẹ",
            "Hai tay chạm nhau ngang ngực",
            "Flower pose – tay dưới cằm",
            "Một tay đưa chạm tóc / tay kia đặt eo",
            "Cầm laptop/sổ",
            "Tay chạm đồng hồ/cufflink",
            "Leaning forward – chống 2 tay lên mặt phẳng",
            "Tựa ghế – 1 tay đặt lên tựa",
            "Hai tay đan vào nhau đặt trên bàn",
            "Cầm bút – mắt nhìn vào tài liệu",
            "Một tay cầm điện thoại – một tay bỏ túi",
            "Một tay đặt hông – một tay đút túi",
            "Một tay nâng nhẹ mái tóc",
            "Cầm tách cà phê – nhìn ra ngoài",
            "Giữ vạt áo blazer",
            "Hai tay ôm nhẹ túi xách"
        ]
    },

    // 3️⃣ CLOSE-UP POSES
    closeUp: {
        name: "Cận mặt",
        poses: [
            "Nhìn thẳng – cười mím",
            "Nhìn thẳng – không cười",
            "Cười tươi – mắt sáng",
            "Nghiêng 5°",
            "Nghiêng 15°",
            "Tay chống cằm",
            "Tay chạm má",
            "Tay gần cổ áo",
            "Tay gần mặt (không che)",
            "Tay nâng tóc bằng 2 ngón",
            "Vuốt tóc",
            "Leaning forward close-up — nhìn thẳng mạnh",
            "Mặt cúi xuống – mắt nhìn xuống",
            "Mắt nhắm – vibe thư giãn",
            "Hơi nghiêng đầu 5° (empathetic listener)",
            "Đặt một tay dưới cằm (strategic thinker)",
            "Đưa tay chạm nhẹ má (soft and human)",
            "Nâng nhẹ tóc bằng 2 ngón tay (refined)",
            "Mặt cúi xuống – mắt nhìn xuống (introspective)",
            "Ngoái lại nhìn qua vai (allure)"
        ]
    },

    // 4️⃣ HAND POSES
    handPoses: {
        name: "Pose tay",
        poses: [
            // A. Tay đặt lên cơ thể
            "Đặt lên đùi",
            "Đặt lên eo",
            "Đặt lên hông",
            "Chồng nhẹ lên nhau",
            "Nắm nhẹ cổ tay tay còn lại",
            "Khoanh tay",
            "Tay để trước ngực",
            "Tay đút túi",
            "Tay đặt lên cổ",
            // B. Tay chạm mặt
            "Chống cằm",
            "Chạm má",
            "Chạm môi",
            "Chạm cổ áo",
            "Vuốt tóc",
            "Nâng tóc bằng 2 ngón",
            "Tay gần mặt nhưng không che",
            // C. Tay tương tác
            "Giữ vạt áo",
            "Giữ mép blazer",
            "Điều chỉnh đồng hồ",
            "Điều chỉnh cufflink",
            "Cầm kính đen",
            "Cầm tách coffee",
            "Chống lên bề mặt",
            "Cầm bút / dùng laptop"
        ]
    },

    // 5️⃣ INTERACTION POSES
    interaction: {
        name: "Tương tác",
        poses: [
            // A. Với ghế
            "Ngồi thẳng – tay trên đùi",
            "Ngồi dựa nhẹ – tay đặt lên tựa",
            "Ngồi chân bắt chéo",
            "Ngả lưng ra sau",
            "Tựa khuỷu tay lên ghế",
            "Ngồi dạng nhẹ – tay giữa hai chân",
            "Leaning forward trên ghế studio",
            // B. Với bàn / mặt phẳng
            "Chống 2 tay lên mặt phẳng tối",
            "Tay đặt lên bàn họp",
            "Tay cầm micro",
            "Tay gõ laptop",
            "Tay cầm bút ghi chú",
            // C. Với props
            "Cầm kính đen",
            "Cầm tách cà phê",
            "Giữ album/record",
            "Giữ tờ giấy / tạp chí",
            "Chạm vòng cổ / khuyên tai"
        ]
    },

    // 6️⃣ HEAD ANGLES
    headAngles: {
        name: "Góc mặt",
        poses: [
            "Chính diện",
            "3/4 view",
            "Side-profile 45°",
            "Nghiêng 5°",
            "Nghiêng 15°",
            "Nghiêng 30°",
            "Cúi nhẹ – nhìn xuống",
            "Ngửa nhẹ – cằm hếch",
            "Mắt nhìn lên",
            "Mắt nhìn xuống",
            "Nhắm mắt / thư giãn"
        ]
    },

    // 7️⃣ CAMERA ANGLES
    cameraAngles: {
        name: "Góc máy",
        poses: [
            "Eye-level",
            "Slight high angle",
            "Slight low angle",
            "Upward-facing",
            "3/4 low angle",
            "Tight cinematic close-up",
            "Lifestyle eye-level",
            "Studio side-angle"
        ]
    },

    // 8️⃣ MOODY / DARK-FEMININE
    moodyDark: {
        name: "Moody / Dark Feminine",
        poses: [
            "Leaning forward, chống tay, mắt nhìn thẳng mạnh",
            "Tóc đổ về trước ngực",
            "Tay nhiều nhẫn tạo texture",
            "Ánh sáng low-key",
            "Hơi cúi mặt, mắt nhìn xuống",
            "Cầm kính – nửa mặt trong bóng tối",
            "Ngồi trên ghế xếp – chân bắt chéo – ngả lưng",
            "Studio đen trắng – one-hand-on-chair"
        ]
    },

    // 9️⃣ LIFESTYLE / EVERYDAY
    lifestyle: {
        name: "Lifestyle / Everyday",
        poses: [
            "Ngồi dựa ghế sofa",
            "Tay nâng ly coffee",
            "Tay còn lại ôm nhẹ cánh tay",
            "Mặt cúi xuống, ánh mắt lơ đãng",
            "Tóc buộc hờ / kẹp sau đầu",
            "Mặt nghiêng – ánh sáng tự nhiên",
            "Vibe: bình yên, thư giãn, nhẹ nhàng"
        ]
    }
};