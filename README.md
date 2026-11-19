# AccessForAll

AccessForAll helps contributors find and fix accessibility barriers on nonprofit websites. Its practice site, Cedar Grove Food Share, is a fictional food pantry. The project aims to offer this work to nonprofits free of charge.

## Two tasks at the pantry

| Visitor task | Pages | What the tests check |
| --- | --- | --- |
| A resident looks up pickup hours | [Original](demo/pickup/original.html) · [Repaired](demo/pickup/repaired.html) | The original location selector has no accessible name. A visible, associated label fixes it. The suite scans both pages before and after a keyboard user switches pickup sites and verifies the new arrival instructions. |
| A volunteer searches for a shift | [Original](demo/index.html) · [Open repair task](https://github.com/openperlied/AccessForAll/issues/1) | The suite reproduces an unnamed textbox and button, finds the Riverside shift using the keyboard, checks the empty state, and restores all shifts. The repaired page is the next contribution. |

## Run the audit

Install Node.js 22 or newer. From a fresh checkout:

```sh
npm ci
npx playwright install chromium
npm test
```

On Linux, use `npx playwright install --with-deps chromium` when the browser's system libraries are missing. To use an existing Google Chrome installation, set `ACCESSFORALL_BROWSER` to `chrome` before running the tests.

Playwright opens the bundled HTML files in a real browser and exercises each journey at 1280 and 390 pixels wide. At each audit checkpoint, axe-core inspects the rendered page. The suite compares rule IDs and selectors against the expected findings. A missing baseline defect, an unexpected violation, or a broken keyboard interaction fails the run.

- `reports/audit.md` is the readable comparison by journey, viewport, and page state. [View a sample run](docs/sample-audit.md).
- `reports/audit.json` records test outcomes, findings, impact, selectors, and errors for further analysis.
- [GitHub Actions](https://github.com/openperlied/AccessForAll/actions/workflows/audit.yml) runs the same suite on pushes and pull requests and attaches the reports to the run.

## Try it with a screen reader

Open either pickup HTML file locally in Chrome. With NVDA on Windows, tab to the location selector. Compare the spoken control name on the original and repaired pages. The repaired control should announce “Pickup location” along with its value. Choose Market Square with the arrow keys, confirm the selection, and listen for Thursday's pickup hours and clock-tower directions. Record the browser, screen reader, and what you heard when reporting a discrepancy. Automated findings alone cannot establish how this interaction sounds.

## Contribute

[Issue #1](https://github.com/openperlied/AccessForAll/issues/1) is ready for Devin or a first contributor. Use the pickup repair as a worked example for volunteer search. The fixture pages are in `demo/`, interaction checks and audit assertions are in `tests/`, and viewport settings are in `playwright.config.js`.

The next step with a participating nonprofit is to agree on one page and one visitor task before auditing or proposing changes. All current fixtures use fictional data. Code is available under the [MIT License](LICENSE).
