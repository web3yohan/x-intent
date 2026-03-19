document.addEventListener("DOMContentLoaded", () => {
    
    // --- Manual Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('intentTheme') === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.innerText = '🌙';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeToggleBtn.innerText = '🌙';
            localStorage.setItem('intentTheme', 'light');
        } else {
            themeToggleBtn.innerText = '☀️';
            localStorage.setItem('intentTheme', 'dark');
        }
    });

    // --- Modal Logic ---
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

    // --- Tab Switching Logic ---
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.intent-section');
    const finalOutput = document.getElementById('final-output');
    const copyBtn = document.getElementById('main-copy-btn');

    const idRegex = /(?:status\/)(\d+)/;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => {
                s.classList.remove('active');
                s.classList.add('hidden');
            });

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');

            finalOutput.value = '';
            generateUrl();
        });
    });

    // --- Intent Generation Logic ---
    const generateUrl = () => {
        const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-target');
        let generatedUrl = '';

        if (activeTab === 'sec-follow') {
            let user = document.getElementById('in-follow-user').value.trim();
            user = user.replace('@', '');
            if (user) generatedUrl = `https://x.com/intent/follow?screen_name=${user}`;
        } 
        else if (activeTab === 'sec-like') {
            const url = document.getElementById('in-like-url').value.trim();
            const match = url.match(idRegex);
            if (match) generatedUrl = `https://x.com/intent/like?tweet_id=${match[1]}`;
        } 
        else if (activeTab === 'sec-repost') {
            const url = document.getElementById('in-repost-url').value.trim();
            const match = url.match(idRegex);
            if (match) generatedUrl = `https://x.com/intent/retweet?tweet_id=${match[1]}`;
        } 
        else if (activeTab === 'sec-reply') {
            const text = document.getElementById('in-reply-text').value.trim();
            const url = document.getElementById('in-reply-url').value.trim();
            const match = url.match(idRegex);
            
            if (match) {
                generatedUrl = `https://x.com/intent/tweet?in_reply_to=${match[1]}`;
                if (text) generatedUrl += `&text=${encodeURIComponent(text)}`;
            }
        } 
        else if (activeTab === 'sec-quote') {
            const text = document.getElementById('in-quote-text').value.trim();
            const quoteUrl = document.getElementById('in-quote-url').value.trim();
            
            if (text || quoteUrl) {
                generatedUrl = `https://x.com/intent/tweet?`;
                const params = [];
                if (text) params.push(`text=${encodeURIComponent(text)}`);
                if (quoteUrl) params.push(`url=${encodeURIComponent(quoteUrl)}`);
                generatedUrl += params.join('&');
            }
        }

        finalOutput.value = generatedUrl;
    };

    document.querySelectorAll('.terminal-input').forEach(input => {
        input.addEventListener('input', generateUrl);
    });

    // --- Copy Logic ---
    copyBtn.addEventListener('click', () => {
        if (finalOutput.value) {
            navigator.clipboard.writeText(finalOutput.value);
            const originalText = copyBtn.innerText;
            
            copyBtn.innerText = "COPIED!";
            copyBtn.classList.add('success');
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.classList.remove('success');
            }, 1500);
        }
    });
});