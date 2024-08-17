window.addEventListener("load", function () {
    const form = document.getElementById('my-form');
    const output = document.getElementById('output');
    const shortenedLink = document.getElementById('shortened-link');
    const loadingScreen = document.querySelector('.loading-screen');
    const mainShortener = document.querySelector('.main-shortener');

    function showLoadingScreen() {
        loadingScreen.style.display = 'flex';  // Show loading screen
        mainShortener.style.display = 'none';  // Hide main content
    }

    function hideLoadingScreen() {
        loadingScreen.style.display = 'none';  // Hide loading screen
        mainShortener.style.display = 'block'; // Show main content
    }

    function generateUniqueCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    function saveToLocalStorage(url, code) {
        let urls = JSON.parse(localStorage.getItem('urls')) || [];
        urls.push({ url, code });
        localStorage.setItem('urls', JSON.stringify(urls));
    }

    function getDomainName(url) {
        const anchor = document.createElement('a');
        anchor.href = url;
        return anchor.hostname.replace('www.', '');
    }

    function displayUserURLs() {
        const urls = JSON.parse(localStorage.getItem('urls')) || [];
        output.innerHTML = '';
        urls.forEach(({ url, code }) => {
            const shortenedURL = window.location.href.split('#')[0] + "#" + code;
            const row = document.createElement('div');
            const link = document.createElement('a');
            const copyButton = document.createElement('button');
            const originalURL = document.createElement('div');

            link.href = shortenedURL;
            link.textContent = shortenedURL;
            link.target = "_blank";

            copyButton.textContent = "Copy";
            copyButton.onclick = () => {
                navigator.clipboard.writeText(shortenedURL).then(() => {
                    copyButton.textContent = "Copied!";
                    setTimeout(() => copyButton.textContent = "Copy", 2000);
                });
            };

            originalURL.textContent = "Website: " + getDomainName(url);

            row.appendChild(originalURL);
            row.appendChild(link);
            row.appendChild(copyButton);
            output.appendChild(row);
        });
    }

    function redirectToOriginalURL(code) {
        const url = 'https://script.google.com/macros/s/AKfycbxc2luy0Ei5W9KLbx-wQnydsazcZiu64nMgGNYCGPjtD5nhwau51YjihY6zgT-g8raxfQ/exec';
        
        fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json.result === 'success') {
                const data = json.data;
                for (let i = 1; i < data.length; i++) {
                    if (data[i][1] === code) { // Assuming Code is in the second column
                        window.location.href = data[i][0]; // Assuming URL is in the first column
                        break;
                    }
                }
            } else {
                output.textContent = 'Error: ' + json.error;
            }
        })
        .catch(error => {
            output.textContent = 'Error: ' + error;
        });
    }

    // Redirect if there's a code in the URL hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        showLoadingScreen();  // Display the loading screen immediately
        redirectToOriginalURL(hash);  // Handle the redirection
    } else {
        hideLoadingScreen();  // Hide the loading screen if no hash
        displayUserURLs();    // Display the user's URLs on page load
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        const code = generateUniqueCode();
        data.append("Code", code);

        showLoadingScreen();  // Show loading screen while processing

        fetch(action, {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(json => {
            hideLoadingScreen();  // Hide loading screen when done
            if (json.result === 'success') {
                const shortenedURL = window.location.href.split('#')[0] + "#" + code;
                shortenedLink.textContent = "Shortened URL: " + shortenedURL;
                saveToLocalStorage(data.get("URL"), code);
                displayUserURLs();
            } else {
                shortenedLink.textContent = 'Error: ' + json.error;
            }
        })
        .catch(error => {
            hideLoadingScreen();  // Hide loading screen if error occurs
            shortenedLink.textContent = 'Error: ' + error;
        });
    });
});
