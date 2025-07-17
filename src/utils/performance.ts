import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

/**
 * Performance monitoring utility for tracking Core Web Vitals
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Record<string, number> = {};
  private isDevelopment = process.env.NODE_ENV === 'development';

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    onCLS(this.handleMetric.bind(this, 'CLS'));
    onFCP(this.handleMetric.bind(this, 'FCP'));
    onINP(this.handleMetric.bind(this, 'INP'));
    onLCP(this.handleMetric.bind(this, 'LCP'));
    onTTFB(this.handleMetric.bind(this, 'TTFB'));

    // Track custom metrics
    this.trackNavigationTiming();
    this.trackResourceTiming();
  }

  /**
   * Handle web vital metrics
   */
  private handleMetric(name: string, metric: any) {
    this.metrics[name] = metric.value;
    
    if (this.isDevelopment) {
      console.log(`[Performance] ${name}:`, metric.value);
    }

    // In production, you might want to send to analytics
    this.reportMetric(name, metric.value);
  }

  /**
   * Track navigation timing
   */
  private trackNavigationTiming() {
    if (typeof window === 'undefined' || !window.performance?.getEntriesByType) return;

    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigation) return;

    // Calculate meaningful metrics
    const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
    const loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
    const dnsLookup = navigation.domainLookupEnd - navigation.domainLookupStart;
    const tcpConnection = navigation.connectEnd - navigation.connectStart;

    this.metrics.domContentLoaded = domContentLoaded;
    this.metrics.loadComplete = loadComplete;
    this.metrics.dnsLookup = dnsLookup;
    this.metrics.tcpConnection = tcpConnection;

    if (this.isDevelopment) {
      console.log('[Performance] Navigation Timing:', {
        domContentLoaded,
        loadComplete,
        dnsLookup,
        tcpConnection,
      });
    }
  }

  /**
   * Track resource timing for key assets
   */
  private trackResourceTiming() {
    if (typeof window === 'undefined' || !window.performance?.getEntriesByType) return;

    const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const jsResources = resources.filter(r => r.name.includes('.js'));
    const cssResources = resources.filter(r => r.name.includes('.css'));
    const fontResources = resources.filter(r => r.name.includes('font'));

    if (this.isDevelopment) {
      console.log('[Performance] Resource Timing:', {
        jsCount: jsResources.length,
        cssCount: cssResources.length,
        fontCount: fontResources.length,
      });
    }
  }

  /**
   * Report metric to analytics (placeholder)
   */
  private reportMetric(name: string, value: number) {
    // In a real application, you might send to Google Analytics, DataDog, etc.
    // For now, we'll just store in localStorage for development
    if (this.isDevelopment) {
      const perfData = JSON.parse(localStorage.getItem('performance_metrics') || '{}');
      perfData[name] = value;
      perfData.timestamp = Date.now();
      localStorage.setItem('performance_metrics', JSON.stringify(perfData));
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): Record<string, number> {
    return { ...this.metrics };
  }

  /**
   * Get performance score based on thresholds
   */
  getPerformanceScore(): { score: number; details: Record<string, 'good' | 'needs-improvement' | 'poor'> } {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      INP: { good: 200, poor: 500 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
    };

    const details: Record<string, 'good' | 'needs-improvement' | 'poor'> = {};
    let totalScore = 0;
    let validMetrics = 0;

    Object.entries(thresholds).forEach(([metric, threshold]) => {
      const value = this.metrics[metric];
      if (value !== undefined) {
        validMetrics++;
        if (value <= threshold.good) {
          details[metric] = 'good';
          totalScore += 100;
        } else if (value <= threshold.poor) {
          details[metric] = 'needs-improvement';
          totalScore += 50;
        } else {
          details[metric] = 'poor';
          totalScore += 0;
        }
      }
    });

    const score = validMetrics > 0 ? totalScore / validMetrics : 0;
    return { score, details };
  }
}

// Create singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();