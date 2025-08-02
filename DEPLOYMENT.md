# Deployment Guide for Mustack.ai Landing Page

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📋 Pre-Deployment Checklist

### ✅ Performance
- [ ] Run `npm run build` successfully
- [ ] Test all Three.js animations load properly
- [ ] Verify lazy loading works on slow connections
- [ ] Check Core Web Vitals with Lighthouse
- [ ] Test reduced motion preferences

### ✅ Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] ARIA labels are present on 3D components
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader compatibility tested

### ✅ Responsive Design
- [ ] Mobile (320px+) layout works
- [ ] Tablet (768px+) layout works
- [ ] Desktop (1024px+) layout works
- [ ] Large screens (1440px+) layout works

### ✅ Browser Compatibility
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)

## 🌐 Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel
   ```

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**
   ```
   NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Build Settings**
   - Build command: `npm run build && npm run export`
   - Publish directory: `out`

2. **Add to `next.config.js`**
   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

### AWS Amplify

1. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   COPY --from=deps /app/node_modules ./node_modules
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t mustack-landing .
   docker run -p 3000:3000 mustack-landing
   ```

## ⚡ Performance Optimization

### Bundle Analysis
```bash
npm install --save-dev @next/bundle-analyzer
```

Add to `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

Run analysis:
```bash
ANALYZE=true npm run build
```

### CDN Configuration

For optimal performance, configure your CDN to:
- Cache static assets for 1 year
- Cache HTML for 1 hour
- Enable Brotli compression
- Set proper MIME types for WOFF2 fonts

### Monitoring

Set up monitoring for:
- Core Web Vitals
- Error tracking
- Performance metrics
- User analytics

## 🔧 Troubleshooting

### Common Issues

1. **Three.js SSR Errors**
   - Ensure all Three.js components use `dynamic` imports with `ssr: false`

2. **Font Loading Issues**
   - Verify font preload links in layout.tsx
   - Check font display: swap is set

3. **Build Failures**
   - Clear `.next` folder and rebuild
   - Check TypeScript errors
   - Verify all imports are correct

4. **Performance Issues**
   - Enable lazy loading for heavy components
   - Optimize images and assets
   - Check for memory leaks in animations

### Debug Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build analysis
npm run build && npm run analyze

# Performance audit
npx lighthouse http://localhost:3000 --view
```

## 📊 Post-Deployment Verification

1. **Performance Testing**
   - Run Lighthouse audit
   - Test on slow 3G connection
   - Verify Core Web Vitals

2. **Functionality Testing**
   - Test all navigation links
   - Verify form submissions
   - Check 3D animations load

3. **Cross-Browser Testing**
   - Test on different browsers
   - Verify mobile responsiveness
   - Check accessibility features

## 🔒 Security Considerations

- Enable HTTPS
- Set security headers
- Validate form inputs
- Implement rate limiting for contact form
- Regular dependency updates

## 📈 Analytics Setup

Consider integrating:
- Google Analytics 4
- Vercel Analytics
- Core Web Vitals monitoring
- Error tracking (Sentry)

## 🚀 Go Live!

Once all checks pass:
1. Point your domain to the deployment
2. Set up SSL certificate
3. Configure monitoring
4. Announce your launch! 🎉
