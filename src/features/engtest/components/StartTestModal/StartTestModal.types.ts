export interface StartTestModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string; // tên bài thi
  listeningTime: number; // thời gian nghe (minutes)
  readingTime: number;  // thời gian đọc (minutes)
  totalTime: number;    // tổng thời gian
  rules?: string[];     // danh sách quy định
  onStart: () => void;  // khi bấm "Bắt đầu làm bài"
}
