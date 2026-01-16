export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  items: FAQItem[];
};

export const faqData: FAQCategory[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is Portrait AI?",
        answer:
          "Portrait AI is a powerful application that helps you preserve and share your precious memories through AI-enhanced portraits and story creation. You can upload photos, add narratives, and create beautiful digital keepsakes.",
      },
      {
        question: "How do I create my first portrait story?",
        answer:
          "To create your first portrait story, navigate to the dashboard and click on the 'Create Portrait' button. Follow the step-by-step guide to upload your photo and add your story.",
      },
      {
        question: "Is there a mobile app available?",
        answer:
          "Currently, Portrait AI is available as a responsive web application that works great on mobile browsers. A dedicated mobile app is in our roadmap.",
      },
    ],
  },
  {
    title: "Account & Privacy",
    items: [
      {
        question: "How do I change my password?",
        answer:
          "You can change your password by going to the Settings page in your account profile. Look for the 'Change Password' section.",
      },
      {
        question: "Who can see my portraits and highlights?",
        answer:
          "By default, your portraits and highlights are private. You can choose to share them with specific family members or friends through our sharing features.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "If you wish to delete your account, please contact our support team or look for the 'Delete Account' option in the Settings page.",
      },
    ],
  },
  {
    title: "Features & Functionality",
    items: [
      {
        question: "What are highlights?",
        answer:
          "Highlights are a collection of your best memories curated into a special format for easy viewing and sharing.",
      },
      {
        question: "Can I add voice recordings to my portrait?",
        answer:
          "Yes, you can attach voice recordings to your portraits to add a personal touch to your stories.",
      },
      {
        question: "How does the Portrait Genie work?",
        answer:
          "The Portrait Genie uses advanced AI to analyze your photos and suggest enhancements or help you craft compelling narratives for your memories.",
      },
    ],
  },
  {
    title: "Storage & Billing",
    items: [
      {
        question: "How much storage do I get?",
        answer:
          "Free accounts come with 5GB of storage. You can upgrade to a Pro plan for more storage.",
      },
      {
        question: "What happens when I run out of storage?",
        answer:
          "When you reach your storage limit, you won't be able to upload new photos until you free up space or upgrade your plan.",
      },
      {
        question: "How do I upgrade to Pro?",
        answer:
          "You can upgrade to Pro at any time from your account settings or by clicking the 'Upgrade' button in the dashboard.",
      },
    ],
  },
  {
    title: "Technical Support",
    items: [
      {
        question: "Why is my upload failing?",
        answer:
          "Upload failures can happen due to poor internet connection or unsupported file formats. Please ensure you are uploading standard image formats (JPG, PNG).",
      },
      {
        question: "The app is running slowly. What should I do?",
        answer:
          "Try clearing your browser cache or switching to a different network. If the issue persists, please contact our support team.",
      },
      {
        question: "I'm not receiving email notifications",
        answer:
          "Check your spam folder. If you still don't see them, please verify your email address in your profile settings.",
      },
    ],
  },
];
