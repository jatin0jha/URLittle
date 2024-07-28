# URLittle

## Overview

Welcome to the URL Shortener project! This web application allows users to easily shorten long URLs and share them with a simple, unique code. The shortened URL can then be used to redirect to the original URL. This project uses Google Sheets as a backend to store and manage the shortened URLs.

![URL Shortener Screenshot](screenshot.png)

## Features

- **Shorten URLs:** Quickly generate a shortened version of any long URL.
- **Unique Codes:** Each shortened URL is assigned a unique 5-character alphanumeric code.
- **Local Storage:** Users can see and manage their own URLs using local storage.
- **Copy to Clipboard:** Conveniently copy the shortened URL to the clipboard.
- **Domain Name Display:** Display the domain name of the original URL.
- **Google Sheets Integration:** Utilizes Google Sheets to store and retrieve URL data.

## Getting Started

### Prerequisites

To run this project, you need a basic understanding of HTML, CSS, and JavaScript. Additionally, you should have a Google account to set up the Google Sheets integration.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/url-shortener.git
    cd url-shortener
    ```

2. Set up your Google Sheets with the appropriate columns: `URL` and `Code`.

3. Deploy your Google Apps Script to handle form submissions and data retrieval. Use the following script as a reference:

    ```javascript
    // Google Apps Script code
    function doGet() {
      // Your code here
    }

    function doPost(e) {
      // Your code here
    }
    ```

4. Update the form action URL in `index.html` to your deployed Google Apps Script URL.

### Usage

1. Open `index.html` in your preferred web browser.

2. Enter a URL into the input field and click "Send".

3. A shortened URL will be generated and displayed. You can copy it using the "Copy" button.

4. The original domain name will be shown alongside the shortened URL.

## File Structure


Just a URL shortener
