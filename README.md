# Mustack.ai Landing Page

A premium, monochrome landing page built with Next.js 14, Three.js, and Framer Motion. Features AI-powered 3D animations, smooth interactions, and enterprise-grade performance.

## 🚀 Features

- **Premium Monochrome Design**: Pure black (#000000) and white (#FFFFFF) color palette
- **3D Interactive Elements**: Neural grid backgrounds, rotating silicon chip models
- **Smooth Animations**: GSAP and Framer Motion powered interactions
- **Performance Optimized**: Lighthouse score ≥95, lazy loading, reduced motion support
- **Responsive Design**: Mobile-first approach with seamless desktop scaling
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion + GSAP
- **Typography**: Inter (body) + Bitcount Prop Single (headings/display)
- **Language**: TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mustack-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and design system
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Main landing page
├── components/
│   ├── layout/            # Navigation and layout components
│   ├── sections/          # Page sections (Hero, About, Solutions, etc.)
│   ├── three/             # Three.js 3D components
│   └── ui/                # Reusable UI components
└── lib/
    └── utils.ts           # Utility functions and helpers
```

## 🎨 Design System

### Colors
- **Primary**: #000000 (Pure Black)
- **Secondary**: #FFFFFF (Pure White)
- **Opacity variants**: Used for depth and hierarchy

### Typography
- **Display**: Bitcount Prop Single (headings, hero text, buttons) - Digital/pixel aesthetic
- **Body**: Inter (paragraphs, UI text) - Clean readability
- **Sizes**: Responsive clamp() functions for fluid scaling
- **Character**: Distinctive digital/tech branding with pixel-perfect precision

### Animations
- **Duration**: 0.3s (quick), 0.8s (standard), 2s+ (ambient)
- **Easing**: Custom cubic-bezier curves
- **Reduced Motion**: Automatic fallbacks for accessibility

## 🚀 Performance Features

- **Lazy Loading**: Three.js components and heavy assets
- **Code Splitting**: Dynamic imports for optimal bundle size
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Font Optimization**: Variable fonts with display: swap
- **Core Web Vitals**: Optimized for LCP, FID, and CLS

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

## 🎯 Sections Overview

1. **Hero**: Neural grid background, typewriter animation, dual CTAs
2. **About**: 50/50 split with rotating 3D silicon chip
3. **Solutions**: Interactive card grid with hover effects
4. **Case Studies**: Auto-scroll carousel with testimonials
5. **CTA Band**: White inverted section with contact form
6. **Footer**: Two-column layout with circuit pattern

## 🔧 Customization

### Colors
Update the color palette in `tailwind.config.js` and `src/app/globals.css`:

```css
:root {
  --color-black: #000000;
  --color-white: #FFFFFF;
}
```

### Typography
Modify font families in `src/app/layout.tsx`:

```typescript
const inter = Inter({ subsets: ['latin'] })
// Bitcount Prop Single is loaded via CSS import in globals.css
```

### 3D Elements
Customize Three.js components in `src/components/three/`:
- `NeuralGrid.tsx`: Neural network background
- `SiliconChip.tsx`: Rotating chip model
- `ParticleField.tsx`: Particle systems

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## 📊 Performance Targets

- **Lighthouse Score**: ≥95
- **First Contentful Paint**: <1.2s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Three.js**: 3D graphics library
- **Framer Motion**: Animation library
- **Next.js**: React framework
- **Tailwind CSS**: Utility-first CSS framework
