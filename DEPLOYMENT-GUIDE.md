# Video Asset Deployment Guide

## 🎬 Video Asset Management

This guide ensures all videos display correctly after deployment across all devices and browsers.

## 📋 Pre-Deployment Checklist

### 1. Video File Verification
\`\`\`bash
# Verify all video assets exist and are properly formatted
npm run verify-videos

# Test video playback capabilities
npm run test-videos

# Complete deployment check
npm run check-deployment
\`\`\`

### 2. Video Format Requirements
- **Primary Format**: MP4 with H.264 codec
- **Fallback Format**: WebM (optional)
- **Maximum Size**: 50MB per video (recommended)
- **Resolution**: Optimized for web (1080p max recommended)

### 3. File Structure
\`\`\`
public/
├── videos/
│   ├── coconut-water-matcha.mp4
│   ├── strawberry-elderflower-espresso.mp4
│   ├── caffeinated.mp4
│   └── ... (all video files)
└── images/
    ├── coconut-water-matcha-poster.jpg
    └── ... (poster images for fallbacks)
\`\`\`

## 🚀 Deployment Configuration

### 1. Next.js Configuration
The `next.config.mjs` includes:
- Video file handling in webpack
- Proper MIME type headers
- Caching configuration
- Asset optimization

### 2. Server Configuration
Ensure your server supports:
- **MIME Types**: `video/mp4`, `video/webm`
- **Range Requests**: For video seeking and progressive loading
- **Compression**: Gzip/Brotli for better transfer speeds
- **CDN Integration**: For global video delivery

### 3. Environment Variables
\`\`\`bash
# Optional - for enhanced video analytics
NEXT_PUBLIC_BASE_URL=https://your-domain.com
\`\`\`

## 🔧 Troubleshooting Common Issues

### Issue 1: Videos Not Loading
**Symptoms**: Black video player, loading spinner indefinitely
**Solutions**:
1. Check file paths in browser network tab
2. Verify video files are in build output
3. Test video format compatibility
4. Check server MIME type configuration

### Issue 2: Videos Load Slowly
**Symptoms**: Long loading times, poor user experience
**Solutions**:
1. Compress video files (target <50MB)
2. Enable CDN for video delivery
3. Implement progressive loading
4. Add poster images for immediate display

### Issue 3: Videos Don't Play on Mobile
**Symptoms**: Videos work on desktop but fail on mobile
**Solutions**:
1. Ensure `playsInline` attribute is set
2. Check autoplay policies (require muted)
3. Test on actual devices, not just browser dev tools
4. Verify video codec compatibility

### Issue 4: Videos Missing After Deployment
**Symptoms**: 404 errors for video files
**Solutions**:
1. Verify files are in public/videos/ directory
2. Check build process includes video files
3. Ensure deployment platform handles large files
4. Test file paths match exactly

## 📱 Cross-Device Testing

### Desktop Browsers
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Mobile Devices
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Samsung Internet
- ✅ Mobile Firefox

### Testing Commands
\`\`\`bash
# Local testing
npm run dev
# Visit http://localhost:3000 and test all videos

# Production testing
npm run build && npm run start
# Test production build locally

# Deployment testing
# Deploy to staging environment and test
\`\`\`

## 🎯 Performance Optimization

### 1. Video Compression
\`\`\`bash
# Example using FFmpeg for optimal web compression
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
\`\`\`

### 2. Lazy Loading
Videos automatically implement:
- Intersection Observer for viewport detection
- Progressive loading based on user interaction
- Bandwidth-aware loading

### 3. Fallback Strategy
- Poster images for immediate visual feedback
- Static image fallbacks for failed videos
- Graceful degradation for unsupported formats

## 🔍 Monitoring & Analytics

### Development Tools
- **Video Diagnostics Panel**: Real-time video status monitoring
- **Asset Verification Panel**: Comprehensive asset checking
- **Browser DevTools**: Network tab for debugging

### Production Monitoring
\`\`\`javascript
// Example: Track video loading performance
const videoMetrics = {
  loadTime: performance.now(),
  videoKey: 'coconut-water-matcha',
  success: true,
  error: null
}
\`\`\`

## 🚨 Emergency Fallbacks

If videos fail to load in production:

1. **Immediate Fix**: Static images are automatically shown
2. **Quick Recovery**: Videos retry automatically with exponential backoff
3. **User Experience**: Fallback content maintains visual consistency
4. **Monitoring**: Diagnostic tools help identify issues quickly

## ✅ Deployment Verification Steps

1. **Pre-Deploy**:
   \`\`\`bash
   npm run verify-videos
   npm run check-deployment
   \`\`\`

2. **Post-Deploy**:
   - Test homepage video backgrounds
   - Verify experience page video gallery
   - Check about page video playback
   - Test on multiple devices and browsers

3. **Performance Check**:
   - Monitor video loading times
   - Check CDN cache hit rates
   - Verify mobile performance
   - Test on slow connections

## 📞 Support & Debugging

### Debug Information
The video diagnostics panel provides:
- Real-time video status
- Loading performance metrics
- Error details and recommendations
- Deployment verification reports

### Common Error Codes
- **404**: Video file not found
- **403**: Access denied (check permissions)
- **500**: Server error (check MIME types)
- **Timeout**: File too large or slow connection

This comprehensive video asset management system ensures reliable video playback across all deployment scenarios while providing robust fallbacks and monitoring capabilities.
