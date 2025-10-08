import { Lesson, VocabWord } from "../types/vocab.types";
import { correspondenceWords } from "./words/lesson10-correspondence";
import { jobAdvertisingWords } from "./words/lesson11-jobAdvertisingAndRecruiting";
import { applyingInterviewingWords } from "./words/lesson12-applyingInterviewing";
import { hiringAndTrainingWords } from "./words/lesson13-hiringAndTraining";
import { salariesAndBenefitsWords } from "./words/lesson14-salariesAndBenefits";
import { warrantyWords } from "./words/lesson3-warranties";
import { businessPlanningWords } from "./words/lesson4-businessPlanning";
import { conferencesWords } from "./words/lesson5-conferences";
import { computerWords } from "./words/lesson6-computers";
import { officeTechnologyWords } from "./words/lesson7-officeTechnology";
import { officeProceduresWords } from "./words/lesson8-officeProcedures";
import { electronicWords } from "./words/lesson9-electronic";
import { lesson50Words } from "./words/toppic1-contract";

// --- BASE WORDS (first 50 real TOEIC words from Barron's list) ---
const baseWords: VocabWord[] = [
  {
    id: "w1",
    word: "contract",
    familyWords: ["contractor", "contractual"],
    phonetic: "/ˈkɑːn.trækt/",
    meaning: "a binding agreement enforceable by law",
    vietnameseMeaning: "hợp đồng (một thỏa thuận ràng buộc về pháp lý)",
    example: "We signed a contract for the project.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/contract_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Business contract image
    partOfSpeech: "noun",
    learned: false,
  },
  {
    id: "w2",
    word: "assurance",
    familyWords: ["assure", "reassurance"],
    phonetic: "/əˈʃʊr.əns/",
    meaning: "a binding commitment to do or give or refrain from something",
    vietnameseMeaning: "sự đảm bảo (một cam kết ràng buộc để làm hoặc cho hoặc kiêng làm điều gì đó)",
    example: "The manager gave assurance of success.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/assurance_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Confidence/assurance image
    partOfSpeech: "noun",
    learned: true,
  },
  {
    id: "w3",
    word: "determine",
    familyWords: ["determination", "determinant"],
    phonetic: "/dɪˈtɜːr.mɪn/",
    meaning: "find out or learn with certainty, as by making an inquiry",
    vietnameseMeaning: "xác định (tìm ra hoặc học được một cách chắc chắn, như bằng cách hỏi)",
    example: "We must determine the best approach.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/determine_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Decision-making image
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w4",
    word: "engage",
    familyWords: ["engagement", "engaging"],
    phonetic: "/ɪnˈɡeɪdʒ/",
    meaning: "consume all of one's attention or time",
    vietnameseMeaning: "tham gia (tiêu thụ toàn bộ sự chú ý hoặc thời gian của ai đó)",
    example: "The speaker engaged the audience with his talk.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/engage_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Engagement image
    partOfSpeech: "verb",
    learned: true,
  },
  {
    id: "w5",
    word: "establish",
    familyWords: ["establishment", "established"],
    phonetic: "/ɪˈstæb.lɪʃ/",
    meaning: "set up or found",
    vietnameseMeaning: "thiết lập (xây dựng hoặc thành lập)",
    example: "The company established a new branch.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/establish_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Establishment image
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w6",
    word: "provision",
    familyWords: ["provide", "provisional"],
    phonetic: "/prəˈvɪʒ.ən/",
    meaning: "the activity of supplying something",
    vietnameseMeaning: "sự cung cấp (hoạt động cung cấp cái gì đó)",
    example: "The contract includes provisions for overtime.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/provision_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Provision/supply image
    partOfSpeech: "noun",
    learned: true,
  },
  {
    id: "w7",
    word: "resolve",
    familyWords: ["resolution", "resolvable"],
    phonetic: "/rɪˈzɒlv/",
    meaning: "find a solution or answer",
    vietnameseMeaning: "giải quyết (tìm giải pháp hoặc câu trả lời)",
    example: "We resolved the issue quickly.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/resolve_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Resolution image
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w8",
    word: "specific",
    familyWords: ["specification", "specifically"],
    phonetic: "/spəˈsɪf.ɪk/",
    meaning: "stated explicitly or in detail",
    vietnameseMeaning: "cụ thể (nêu rõ ràng hoặc chi tiết)",
    example: "Please give specific instructions.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/specific_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Specific/target image
    partOfSpeech: "adjective",
    learned: true,
  },
  {
    id: "w9",
    word: "assure",
    familyWords: ["assurance", "reassure"],
    phonetic: "/əˈʃɔːr/",
    meaning: "inform positively and with certainty and confidence",
    vietnameseMeaning: "đảm bảo (thông báo tích cực và chắc chắn)",
    example: "The manager assured us of the deadline.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/assure_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Assurance image
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w10",
    word: "cancel",
    familyWords: ["cancellation", "cancellable"],
    phonetic: "/ˈkæn.səl/",
    meaning: "declare null and void",
    vietnameseMeaning: "hủy bỏ (tuyên bố vô hiệu)",
    example: "The meeting was cancelled due to rain.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/cancel_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Cancel image
    partOfSpeech: "verb",
    learned: true,
  },
  {
    id: "w11",
    word: "obligation",
    familyWords: ["obligatory", "oblige"],
    phonetic: "/ˌɑː.b.ləˈɡeɪ.ʃən/",
    meaning: "the state of being bound to do or pay something",
    vietnameseMeaning: "nghĩa vụ (trạng thái bị ràng buộc phải làm hoặc trả gì đó)",
    example: "It's my obligation to finish the report on time.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/obligation_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Duty image
    partOfSpeech: "noun",
    learned: false,
  },
  {
    id: "w12",
    word: "obligatory",
    familyWords: ["obligation"],
    phonetic: "/əˈblɪɡ.ə.tɔːr.i/",
    meaning: "required by compulsion or convention",
    vietnameseMeaning: "bắt buộc (yêu cầu bởi sự ép buộc hoặc quy ước)",
    example: "Attendance at the meeting is obligatory.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/obligatory_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Required image
    partOfSpeech: "adjective",
    learned: true,
  },
  {
    id: "w13",
    word: "attract",
    familyWords: ["attraction", "attractive"],
    phonetic: "/əˈtrækt/",
    meaning: "draw by appeal",
    vietnameseMeaning: "thu hút (hút theo sức hấp dẫn)",
    example: "The new campaign will attract more customers.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/attract_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Marketing image
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w14",
    word: "compare",
    familyWords: ["comparison", "comparable"],
    phonetic: "/kəmˈper/",
    meaning: "to examine or look for the difference between two or more things",
    vietnameseMeaning: "so sánh (xem xét hoặc tìm sự khác biệt giữa hai hoặc nhiều thứ)",
    example: "Compare the prices before buying.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/compare_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Comparison image
    partOfSpeech: "verb",
    learned: true,
  },
  {
    id: "w15",
    word: "competition",
    familyWords: ["compete", "competitive"],
    phonetic: "/ˌkɑːm.pəˈtɪʃ.ən/",
    meaning: "a contest or struggle",
    vietnameseMeaning: "cạnh tranh (cuộc thi hoặc đấu tranh)",
    example: "The competition is fierce in this market.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/competition_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Competition image
    partOfSpeech: "noun",
    learned: false,
  },
  {
    id: "w16",
    word: "consume",
    familyWords: ["consumer", "consumption"],
    phonetic: "/kənˈsuːm/",
    meaning: "to absorb, to use up",
    vietnameseMeaning: "tiêu thụ (hấp thụ, sử dụng hết)",
    example: "Consumers consume more during holidays.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/consume_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Consumption image
    partOfSpeech: "verb",
    learned: true,
  },
  {
    id: "w17",
    word: "convince",
    familyWords: ["conviction", "convincing"],
    phonetic: "/kənˈvɪns/",
    meaning: "to persuade",
    vietnameseMeaning: "thuyết phục (thuyết phục ai đó)",
    example: "The salesperson convinced me to buy it.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/convince_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Persuasion image
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w18",
    word: "currently",
    familyWords: ["current"],
    phonetic: "/ˈkɝː.ənt.li/",
    meaning: "now",
    vietnameseMeaning: "hiện tại (bây giờ)",
    example: "Currently, we are reviewing the proposal.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/currently_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Now image
    partOfSpeech: "adverb",
    learned: true,
  },
  {
    id: "w19",
    word: "fad",
    familyWords: [],
    phonetic: "/fæd/",
    meaning: "a style, activity or interest which is very popular for a short period of time",
    vietnameseMeaning: "mốt (một phong cách, hoạt động hoặc sở thích phổ biến trong thời gian ngắn)",
    example: "That gadget was just a fad.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/fad_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Trend image
    partOfSpeech: "noun",
    learned: false,
  },
  {
    id: "w20",
    word: "inspiration",
    familyWords: ["inspire"],
    phonetic: "/ˌɪn.spəˈreɪ.ʃən/",
    meaning: "a thing or person that arouses a feeling",
    vietnameseMeaning: "cảm hứng (một thứ hoặc người khơi dậy cảm xúc)",
    example: "The design drew inspiration from nature.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/inspiration_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Inspiration image
    partOfSpeech: "noun",
    learned: true,
  },
  {
    id: "w21",
    word: "market",
    familyWords: ["marketing", "marketer"],
    phonetic: "/ˈmɑːr.kɪt/",
    meaning: "to make goods available to buyers in a planned way which encourages people to buy more of them, for example by advertising",
    vietnameseMeaning: "tiếp thị (làm cho hàng hóa có sẵn cho người mua theo cách có kế hoạch khuyến khích mua nhiều hơn)",
    example: "We need to market the product better.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/market_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Market image
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w22",
    word: "persuasion",
    familyWords: ["persuade"],
    phonetic: "/pɚˈsweɪ.ʒən/",
    meaning: "the power to influence; a deep belief",
    vietnameseMeaning: "sự thuyết phục (quyền lực ảnh hưởng; niềm tin sâu sắc)",
    example: "By persuasion, he got the team to agree.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/persuasion_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Persuasion image
    partOfSpeech: "noun",
    learned: true,
  },
  {
    id: "w23",
    word: "productive",
    familyWords: ["productivity", "produce"],
    phonetic: "/prəˈdʌk.tɪv/",
    meaning: "constructive; high yield",
    vietnameseMeaning: "năng suất (xây dựng; lợi suất cao)",
    example: "The meeting was productive.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/productive_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Productive image
    partOfSpeech: "adjective",
    learned: false,
  },
  {
    id: "w24",
    word: "satisfaction",
    familyWords: ["satisfy", "satisfactory"],
    phonetic: "/ˌsæt̬.ɪsˈfæk.ʃən/",
    meaning: "happiness",
    vietnameseMeaning: "sự hài lòng (hạnh phúc)",
    example: "Customer satisfaction is our priority.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/satisfaction_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Satisfaction image
    partOfSpeech: "noun",
    learned: true,
  },
  ...warrantyWords,
  ...businessPlanningWords,
  ...conferencesWords,
  ...computerWords,
  ...officeTechnologyWords,
  ...officeProceduresWords,
  ...electronicWords, // Adding words from lesson 9
  ...correspondenceWords, // Adding words from lesson 10
  ...jobAdvertisingWords, // Adding words from lesson 11
  ...applyingInterviewingWords, // Adding words from lesson 12
  ...hiringAndTrainingWords, // Adding words from lesson 13
  ...salariesAndBenefitsWords, // Adding words from lesson 14
  ...lesson50Words, // Adding words from lesson 50
  {
    id: "w50",
    word: "salary",
    familyWords: ["salaried"],
    phonetic: "/ˈsæl.ə.ri/",
    meaning: "fixed regular payment for work",
    vietnameseMeaning: "lương (thù lao cố định định kỳ cho công việc)",
    example: "Her salary increased this year.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/salary_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Salary/money image
    partOfSpeech: "noun",
    learned: true,
  },
];

// --- NEW VOCABULARY FOR LESSON 41: MOVIES (replacing mock words w481-w492) ---
const movieWords: VocabWord[] = [
  {
    id: "w481",
    word: "attain",
    familyWords: ["attainment", "attainable"],
    phonetic: "/əˈteɪn/",
    meaning: "to succeed in achieving something",
    vietnameseMeaning: "đạt được, giành được",
    example: "She finally attained her goal of becoming a film director.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/attain_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1544716278-ca5f311a598e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Empty cinema hall
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w482",
    word: "attainment",
    familyWords: [],
    phonetic: "/əˈteɪnmənt/",
    meaning: "the act of achieving something",
    vietnameseMeaning: "sự đạt được, thành tựu",
    example: "The attainment of success took many years of hard work.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/attainment_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Film reel
    partOfSpeech: "noun",
    learned: false,
  },
  {
    id: "w483",
    word: "attainable",
    familyWords: [],
    phonetic: "/əˈteɪnəbəl/",
    meaning: "able to be achieved",
    vietnameseMeaning: "có thể đạt được, khả thi",
    example: "A reasonable target is one that is attainable.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/attainable_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Clapperboard
    partOfSpeech: "adjective",
    learned: false,
  },
  {
    id: "w484",
    word: "combine",
    familyWords: ["combination", "combined"],
    phonetic: "/kəmˈbaɪn/",
    meaning: "to join together to form a whole",
    vietnameseMeaning: "kết hợp, phối hợp",
    example: "The movie combines drama and comedy in a unique way.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/combine_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1467003909585-2f8d8773a5f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Popcorn
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w485",
    word: "combination",
    familyWords: [],
    phonetic: "/ˌkɒmbɪˈneɪʃən/",
    meaning: "the act of combining or state of being combined",
    vietnameseMeaning: "sự kết hợp",
    example: "The ideal combination of plot and visuals made the film successful.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/combination_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Movie night
    partOfSpeech: "noun",
    learned: false,
  },
  {
    id: "w486",
    word: "continue",
    familyWords: ["continuation", "continual", "continually"],
    phonetic: "/kənˈtɪnjuː/",
    meaning: "to keep happening or existing without stopping",
    vietnameseMeaning: "tiếp tục",
    example: "The series continues next year with a new sequel.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/continue_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1571171638497-2f9c1a5a0e69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Theater
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w487",
    word: "continuation",
    familyWords: [],
    phonetic: "/ˌkɒntɪnjuˈeɪʃən/",
    meaning: "the action of carrying something on over a period of time",
    vietnameseMeaning: "sự tiếp tục",
    example: "The continuation of the story is eagerly awaited by fans.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/continuation_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1489598991563-4d67d7d6b9e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Film strip
    partOfSpeech: "noun",
    learned: false,
  },
  {
    id: "w488",
    word: "continual",
    familyWords: ["continually"],
    phonetic: "/kənˈtɪnjʊəl/",
    meaning: "happening repeatedly",
    vietnameseMeaning: "liên tục, không ngừng",
    example: "They faced continual delays during the filming process.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/continual_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1547658719-da2b848c1a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Red carpet
    partOfSpeech: "adjective",
    learned: false,
  },
  {
    id: "w489",
    word: "descriptive",
    familyWords: ["describe", "description"],
    phonetic: "/dɪˈskrɪptɪv/",
    meaning: "serving or intending to describe something",
    vietnameseMeaning: "miêu tả, mô tả",
    example: "The novel’s descriptive language painted vivid scenes.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/descriptive_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1558618047-3cbed8b89bd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Oscars
    partOfSpeech: "adjective",
    learned: false,
  },
  {
    id: "w490",
    word: "describe",
    familyWords: ["description", "descriptive"],
    phonetic: "/dɪˈskraɪb/",
    meaning: "to give an account of something in words",
    vietnameseMeaning: "mô tả, diễn tả",
    example: "How would you describe the protagonist of the film?",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/describe_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1517457373958-b7bdd4587206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Projector
    partOfSpeech: "verb",
    learned: false,
  },
  {
    id: "w491",
    word: "description",
    familyWords: [],
    phonetic: "/dɪˈskrɪpʃən/",
    meaning: "a spoken or written representation of something",
    vietnameseMeaning: "sự mô tả, lời mô tả",
    example: "The description on the poster intrigued many viewers.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/description_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Cinema seats
    partOfSpeech: "noun",
    learned: false,
  },
  {
    id: "w492",
    word: "disperse",
    familyWords: ["dispersion"],
    phonetic: "/dɪˈspɜːrs/",
    meaning: "to distribute or spread over an area",
    vietnameseMeaning: "phân tán, giải tán",
    example: "After the premiere, the crowd began to disperse.",
    audioSrc: "https://audio.oxforddictionaries.com/en/mp3/disperse_us_1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Stage lights
    partOfSpeech: "verb",
    learned: false,
  },
];

// --- MOCK 550 TOEIC WORDS ---
const mockWords = Array.from({ length: 550 }, (_, i) => ({
  id: `w${50 + i + 1}`,
  word: `toeicWord${i + 1}`,
  familyWords: [`toeicWord${i + 1}er`, `toeic${i + 1}al`],
  phonetic: `/ˈtoʊ.ɪk.wɜːrd${i + 1}/`,
  meaning: `TOEIC definition for word ${i + 1} in business context.`,
  vietnameseMeaning: `Dịch nghĩa tiếng Việt cho từ toeicWord${i + 1} trong ngữ cảnh TOEIC.`,
  example: `Example: Using toeicWord${i + 1} in a sentence.`,
  audioSrc: `https://example.com/audio/toeic${i + 1}.mp3`,
  imageSrc: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80&random=${i}`, // Random Unsplash business image
  partOfSpeech: ["noun", "verb", "adjective", "adverb"][Math.floor(Math.random() * 4)], // Random partOfSpeech for mock
  learned: Math.random() > 0.5,
}));

const allWords = [...baseWords, ...mockWords.slice(0, 430), ...movieWords, ...mockWords.slice(442, 550)];

// --- TOPIC LIST (50 LESSONS, 12 WORDS EACH) ---
// Updated lesson 2 title to match Barron's theme
const topics = [
    "dshasdhakjsdhakjs",
    "Marketing", // Updated from "Business Meetings" to match Lesson 2 words
    "Warranties",
    "Business Planning",
    "Conferences",
    "Computers & Technology",
    "Office Technology",
    "Office Procedures",
  "Electronics", // Lesson 9 - Electronics
  "Correspondence", // Lesson 10 - Correspondence
  "Job Advertising & Recruitment", // Lesson 11 - Job Advertising & Recruitment
  "Applying & Interviewing", // Lesson 12 - Applying & Interviewing
  "Hiring and Training",
  "Salaries and Benefits", // Lesson 14 - Salaries and Benefits
  "Office Technology",
  "Human Resources",
  "Sales",
  "Purchasing",
  "Manufacturing",
  "Shipping",
  "Receiving",
  "Accounts",
  "Import/Export",
  "Insurance",
  "Transportation",
  "Real Estate",
  "Budgeting",
  "Investments",
  "Taxes",
  "Banking",
  "Credit Cards",
  "Entertainment",
  "Sports & Leisure",
  "Hobbies",
  "Weather",
  "Environment",
  "Education",
  "Computers",
  "The Internet",
  "Music",
  "Art",
  "Movies", // Lesson 41 - Movies
  "Literature",
  "Theater",
  "Dance",
  "Photography",
  "Fashion",
  "Food",
  "Gardening",
  "Pets",
  "Holidays",
];

// --- MOCK IMAGE SET (Unsplash or Pexels free images) ---
const lessonImages = [
   "/images/toeicLesson/toeic-lesson-1.png", // Office
  "/images/toeicLesson/toeic-lesson-2.jpg", // Marketing/Meetings
  "/images/toeicLesson/toeic-lesson-3.jpg", // Travel
  "/images/toeicLesson/toeic-lesson-4.jpg", // Hotel
  "/images/toeicLesson/toeic-lesson-5.jpg", // Airline
  "/images/toeicLesson/toeic-lesson-6.jpg", // Car
  "/images/toeicLesson/toeic-lesson-7.jpg", // Restaurant
  "/images/toeicLesson/toeic-lesson-8.jpg", // Shopping
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1e", // Health
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f", // Finance
  // Repeat for 50
  ...Array.from({ length: 40 }, (_, i) => `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?random=${i}`),
];

// --- BUILD LESSON DATA ---
const lessons: Lesson[] = topics.map((title, i) => {
  const startIdx = i * 12;
  return {
    id: `lesson${i + 1}`,
    title,
    words: allWords.slice(startIdx, startIdx + 12),
    progress: Math.random() * 100,
    image: lessonImages[i % lessonImages.length], // ✅ Rotate image set
    category: i < 10 ? "Business" : i < 20 ? "Travel" : i < 30 ? "Finance" : "General", // Example categories
    description: `This lesson covers essential vocabulary related to ${title.toLowerCase()}.`,
    tip: `Tip: Focus on the key terms in ${title.toLowerCase()} for TOEIC success.`,
    totalWords: 12,
    learnedWords: Math.floor(Math.random() * 13), // 0 to 12 learned words
  };
});

export { lessons };