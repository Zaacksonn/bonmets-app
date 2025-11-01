/**
 * Notify search engines about new or updated content
 */

export async function notifySearchEngines(urls = []) {
  const baseUrl = 'https://bakstunden.se';
  
  // Always include sitemap URL
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  
  // Ping Google
  try {
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log('✅ Google notified about sitemap update');
  } catch (error) {
    console.error('❌ Failed to notify Google:', error);
  }
  
  // Ping Bing
  try {
    await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log('✅ Bing notified about sitemap update');
  } catch (error) {
    console.error('❌ Failed to notify Bing:', error);
  }
  
  // For specific URLs, use Google Indexing API (if you have it set up)
  if (urls.length > 0) {
    console.log(`📝 ${urls.length} new URLs detected in sitemap`);
  }
}

/**
 * Check if content has been updated recently
 */
export function shouldNotifySearchEngines(lastBuildTime) {
  const now = new Date();
  const lastBuild = new Date(lastBuildTime);
  const hoursSinceLastBuild = (now - lastBuild) / (1000 * 60 * 60);
  
  // Only notify if it's been more than 1 hour since last notification
  return hoursSinceLastBuild > 1;
}
