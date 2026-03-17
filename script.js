document.addEventListener("DOMContentLoaded", () => {
    // --- 1. First-Time Pop-up Logic ---
    const modal = document.getElementById('maker-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const followBtn = document.getElementById('modal-follow-btn');

    if (!localStorage.getItem('intentGenVisited')) {
        modal.classList.remove('hidden');
    }

    const closeModal = () => {
        modal.classList.add('hidden');
        localStorage.setItem('intentGenVisited', 'true');
    };

    closeBtn.addEventListener('click', closeModal);
    followBtn.addEventListener('click', closeModal);

    // --- 2. Regex & Intent Generation Logic ---
    const urlInput = document.getElementById('url-input');
    const resultsContainer = document.getElementById('results-container');
    
    // Rows
    const rowFollow = document.getElementById('row-follow');
    const rowLike = document.getElementById('row-like');
    const rowReply = document.getElementById('row-reply');
    const rowRetweet = document.getElementById('row-retweet');
    const rowQuote = document.getElementById('row-quote');

    // Outputs
    const outFollow = document.getElementById('out-follow');
    const outLike = document.getElementById('out-like');
    const outReply = document.getElementById('out-reply');
    const outRetweet = document.getElementById('out-retweet');
    const outQuote = document.getElementById('out-quote');

    // Regex to match x.com or twitter.com, extracting username [1] and post ID [2]
    const xRegex = /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)(?:\/status\/(\d+))?/;

    urlInput.addEventListener('input', (e) => {
        const url = e.target.value.trim();
        const match = url.match(xRegex);

        // Reset UI
        [rowFollow, rowLike, rowReply, rowRetweet, rowQuote].forEach(row => row.classList.remove('active'));
        
        if (!url) {
            resultsContainer.classList.add('hidden');
            return;
        }

        if (match) {
            resultsContainer.classList.remove('hidden');
            
            const username = match[1];
            const postId = match[2];

            // 1. Follow (Always active if a username exists)
            if (username) {
                outFollow.value = `https://x.com/intent/follow?screen_name=${username}`;
                rowFollow.classList.add('active');
            }

            // 2. Post/Quote (Always active if it's a full URL, maps to original URL)
            if (url.includes('status/')) {
                // Ensure we use a clean URL for quoting without query parameters
                const cleanUrl = `https://x.com/${username}/status/${postId}`;
                outQuote.value = `https://x.com/intent/tweet?url=${encodeURIComponent(cleanUrl)}`;
                rowQuote.classList.add('active');
            }

            // 3. Like, Reply, Retweet (Require Post ID)
            if (postId) {
                outLike.value = `https://x.com/intent/like?tweet_id=${postId}`;
                rowLike.classList.add('active');

                outReply.value = `https://x.com/intent/tweet?in_reply_to=${postId}`;
                rowReply.classList.add('active');

                outRetweet.value = `https://x.com/intent/retweet?tweet_id=${postId}`;
                rowRetweet.classList.add('active');
            }
        } else {
            resultsContainer.classList.add('hidden');
        }
    });

    // --- 3. Copy to Clipboard Logic ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const inputEl = document.getElementById(targetId);
            const rowEl = inputEl.closest('.intent-row');
            
            if (inputEl.value) {
                navigator.clipboard.writeText(inputEl.value);
                
                // Visual feedback
                const originalText = e.target.innerText;
                e.target.innerText = "COPIED";
                rowEl.classList.add('copied');

                setTimeout(() => {
                    e.target.innerText = originalText;
                    rowEl.classList.remove('copied');
                }, 1000);
            }
        });
    });
});

