# AI Stylist 🎨✨

**AI Stylist** is a cutting-edge, responsive web application designed to revolutionize personal styling. By leveraging the power of **Google's Gemini AI**, it analyzes user photos to provide personalized hairstyle and fashion recommendations, helping users redefine their look with confidence.

![AI Stylist Hero](https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=80)

## 🚀 Live Demo

[Link to Live Demo if applicable]

## ✨ Features

- **Gender-Specific Flows**: Tailored experiences for **Men** and **Women**.
- **Dual Styling Modes**:
  - **✂️ Hairstyle Transformation**: Upload 3 facial angles (Front, Left, Right) to get AI-driven haircut suggestions based on face shape.
  - **👗 Fashion & Clothing**: Upload a full-body shot to receive curated outfit recommendations based on body type and trends.
- **🤖 AI-Powered Analysis**: Integrated with **Google Gemini API** to analyze features and generate detailed style descriptions.
- **💬 Interactive Editor**: Refine results with natural language prompts (e.g., "Make it shorter", "Add a leather jacket").
- **🛍️ Shop the Look**: (Mockup) Get direct product links to purchase recommended items.
- **📱 Fully Responsive**: A premium, mobile-first design built with **Tailwind CSS** and **Framer Motion**.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI (Gemini)
- **Routing**: Custom State-based Routing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Google Gemini API Key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/GS-Tejas-hub/StyleAI.git
    cd StyleAI
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure API Key**:
    - Open `src/lib/api.js`
    - Replace the placeholder key with your Gemini API key:
      ```javascript
      const API_KEY = "YOUR_GEMINI_API_KEY";
      ```
    - *Note: For production, it is recommended to use environment variables (.env).*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**:
    Visit `http://localhost:5173` in your browser.

## 📂 Project Structure

```
ai-stylist/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components (Header, Footer, etc.)
│   ├── lib/            # Utilities and API configurations
│   ├── views/          # Main page views (Home, Upload, Results, etc.)
│   ├── App.jsx         # Main application entry and routing
│   └── index.css       # Global styles and Tailwind directives
├── package.json        # Dependencies and scripts
└── tailwind.config.js  # Tailwind configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 👤 Created By

**Demon King | G S Tejas**

- [Portfolio](https://gs-tejas-hub.github.io/Demon-s-Portfolio/)
- [GitHub](https://github.com/GS-Tejas-hub)

---

*Note: This project currently uses placeholder images for the visual results as standard LLMs generate text descriptions. Integration with image-generation models (like Stable Diffusion) can be added for photorealistic visual outputs.*
