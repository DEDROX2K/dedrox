const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const INDEX_FILE = path.join(__dirname, 'posts.json');

/**
 * Extracts the title from a markdown file (first # heading)
 */
function getTitle(content) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1] : 'Untitled Post';
}

/**
 * Syncs the posts directory with posts.json
 */
function syncPosts() {
    console.log('🔍 Scanning posts directory...');

    if (!fs.existsSync(POSTS_DIR)) {
        console.error('❌ Posts directory not found.');
        return;
    }

    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
    let posts = [];

    // Load existing index if it exists
    if (fs.existsSync(INDEX_FILE)) {
        try {
            posts = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
        } catch (e) {
            console.warn('⚠️ Could not parse existing posts.json, starting fresh.');
        }
    }

    const newPosts = [];

    files.forEach(file => {
        const filePath = path.join(POSTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const stats = fs.statSync(filePath);
        
        // Find existing entry
        const existingEntry = posts.find(p => p.file === file);
        
        const title = getTitle(content);
        const date = existingEntry ? existingEntry.date : stats.birthtime.toISOString().split('T')[0];
        const tags = existingEntry ? existingEntry.tags : ["uncategorized"];

        newPosts.push({
            title,
            date,
            file,
            tags
        });
    });

    // Sort by date descending
    newPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(INDEX_FILE, JSON.stringify(newPosts, null, 2), 'utf-8');
    console.log(`✅ Successfully synced ${newPosts.length} posts to posts.json`);
}

syncPosts();
