# IPO_PlayWright

Automated end-to-end testing project using [Playwright](https://playwright.dev/).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project leverages Playwright to automate browser testing for IPO-related workflows, ensuring robust and reliable web application quality.

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Headless and headed execution
- Easy test authoring and debugging
- CI/CD integration ready

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/IPO_PlayWright.git
    cd IPO_PlayWright
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## Usage

Run all tests:
```bash
npx playwright test
```

Open Playwright Test Runner UI:
```bash
npx playwright test --ui
```

## Project Structure

```
IPO_PlayWright/
├── tests/           # Test specifications
├── playwright.config.js
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.