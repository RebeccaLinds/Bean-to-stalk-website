export interface Book {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  category: string;
  age: string;
  dimensions: 'square' | 'tall' | 'standard';
  description: string;
  features: string[];
  previewPages: string[];
  isbn?: string;
  pageCount: number;
  publishDate: string;
  isPreOrder?: boolean;
  releaseDate?: string;
  isComingNext?: boolean;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Whimsical Forest Friends",
    subtitle: "A Magical Coloring Adventure",
    image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QY4pC1bXF9DmtbNXsArH12R8T3wZkySUOzLJa",
    price: "$12.99",
    rating: 5,
    category: "Coloring Book",
    age: "3+",
    dimensions: "square",
    description: "Embark on a magical journey through enchanted forests filled with delightful creatures waiting to be brought to life with color. This beautifully illustrated coloring book features whimsical forest friends in their natural habitats, encouraging creativity and imagination.",
    features: [
      "40+ unique illustrations",
      "High-quality paper perfect for crayons, markers, and colored pencils",
      "Single-sided pages to prevent bleed-through"
    ],
    previewPages: [
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QDmdJRwvvVeLKS6rZHWyJsthBMDqlQPkaNzpc"
    ],
    pageCount: 48,
    publishDate: "2024-12-15"
  },
  {
    id: 2,
    title: "Young Explorer's Guide",
    subtitle: "Wilderness & Outdoor Survival Skills",
    image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QX04mrYDq6LNxoUOFZd9TCWiKzRth0P8jDu4g",
    price: "$24.99",
    rating: 5,
    category: "Educational",
    age: "Ages 8-12",
    dimensions: "tall",
    description: "An essential guide for young adventurers ready to explore the great outdoors. Learn fundamental wilderness skills, safety tips, and survival techniques designed specifically for children, with engaging illustrations and hands-on activities.",
    features: [
      "Comprehensive wilderness safety guide",
      "Step-by-step survival skill instructions", 
      "Interactive activities and challenges",
      "Beautiful illustrations",
      "Parent and educator resources included"
    ],
    previewPages: [
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QyaPpazYowXdrJHpBFgYnuWS5G3T8NLzP1M9O",
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QUfJolYsdUx2HNFVwhIvgPBDLM6ecoGRsCj7z",
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QKXUClY8yiOYgGWJN48dnRt3vrMsV6Tek1Zfx"
    ],
    pageCount: 128,
    publishDate: "2024-11-20",
    isPreOrder: true,
    releaseDate: "December 2025"
  },
  {
    id: 3,
    title: "A Young Explorer's Guide to Mindfulness and Meditation",
    subtitle: "Finding Peace and Balance",
    image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QISITVwLndzwH3mLkWqUTN84yC7tx5A1jgsSD",
    price: "$24.99",
    rating: 5,
    category: "Wellness",
    age: "Ages 5-10",
    dimensions: "tall",
    description: "Introduce children to the wonderful world of mindfulness and meditation with age-appropriate techniques, breathing exercises, and peaceful activities that help develop emotional intelligence and inner calm.",
    features: [
      "Simple meditation techniques for children",
      "Breathing exercises and mindfulness activities",
      "Emotional regulation strategies",
      "Beautiful calming illustrations",
      "Audio companion available"
    ],
    previewPages: [
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QyaPpazYowXdrJHpBFgYnuWS5G3T8NLzP1M9O",
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QUfJolYsdUx2HNFVwhIvgPBDLM6ecoGRsCj7z",
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QKXUClY8yiOYgGWJN48dnRt3vrMsV6Tek1Zfx"
    ],
    pageCount: 96,
    publishDate: "2024-10-10",
    isPreOrder: true,
    releaseDate: "December 2025"
  },
  {
    id: 4,
    title: "The Bear and His Magic",
    subtitle: "A Magical Adventure Story",
    image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QCFQJwGtnzU1oGdab2YqAOQujwNDJpixZgXmf",
    price: "$19.99",
    rating: 5,
    category: "Story Book",
    age: "3+",
    dimensions: "square",
    description: "A curious bear sets off through forests, cities, and starlit skies on a quest to find magic, and finds it in places he never thought to look.",
    features: [
      "Beautifully illustrated story pages",
      "Engaging narrative for young readers",
      "Positive life lessons and values",
      "Perfect for bedtime reading",
      "High-quality printing and binding"
    ],
    previewPages: [
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QhE0EWz76EpMomAu52IzdC0SxGf7BnFs4Ylvg"
    ],
    pageCount: 32,
    publishDate: "2025-03-15"
  },
  {
    id: 7,
    title: "Story Explorer's Sketch Book",
    subtitle: "Drawings and Creative Story sketch ideas",
    image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QtJqojQWVFO8cpWDJTmCLSb4qfEahevZis6Iz",
    price: "$15.99",
    rating: 0, // No rating for coming soon books
    category: "Arts",
    age: "All ages",
    dimensions: "tall", // 8.5x11 inches
    description: "Practice your story drawing and personal creations in the Art Explorer's Sketchbook. draft your iimages for picture books and more!",
    features: [
      "Story-building sketch prompts",
      "Character & setting design pages",
      "Scene layout and comic panels",
      "Brainstorm boxes for ideas & notes",
      "Plenty of space to draw & imagine"
    ],
    previewPages: [
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QtJqojQWVFO8cpWDJTmCLSb4qfEahevZis6Iz",
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QUfJolYsdUx2HNFVwhIvgPBDLM6ecoGRsCj7z"
    ],
    pageCount: 100,
    publishDate: "2024-07-10",
    isComingNext: true,
    releaseDate: "December 2025"
  },
  {
    id: 5,
    title: "A Young Explorer's Guide to Yoga",
    subtitle: "Mind, Body & Spirit Harmony",
    image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QKXn7bdhyiOYgGWJN48dnRt3vrMsV6Tek1Zfx",
    price: "$24.99",
    rating: 5,
    category: "Wellness",
    age: "Ages 6-12",
    dimensions: "tall",
    description: "Introduce children to the ancient practice of yoga with age-appropriate poses, breathing exercises, and mindfulness activities that promote physical health, emotional balance, and inner peace.",
    features: [
      "Kid-friendly yoga poses and sequences",
      "Breathing exercises for calm and focus",
      "Mindfulness activities and games",
      "Beautiful step-by-step illustrations",
      "Safety guidelines for young practitioners"
    ],
    previewPages: [
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QKXn7bdhyiOYgGWJN48dnRt3vrMsV6Tek1Zfx",
      "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QISITVwLndzwH3mLkWqUTN84yC7tx5A1jgsSD"
    ],
    pageCount: 96,
    publishDate: "2024-12-01",
    isPreOrder: true,
    releaseDate: "March 2026"
  }
];

export const getBooksByCategory = (category: string): Book[] => {
  return books.filter(book => book.category.toLowerCase().includes(category.toLowerCase()));
};

export const getBookById = (id: number): Book | undefined => {
  return books.find(book => book.id === id);
};