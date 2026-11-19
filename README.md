# AccessForAll

AccessForAll is an open-source project that aims to help nonprofits make their websites easier to use, free of charge. The first task focuses on a volunteer looking for a shift. Can someone using a screen reader tell where to enter a neighborhood and which button will show the results?

## Try the demo

[Cedar Grove Food Share](demo/index.html) is a fictional food pantry built for this project. Its volunteer directory runs locally and uses sample shifts. From the repository root, start a server with Python 3:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory demo
```

Open <http://127.0.0.1:8000/>. Enter **Riverside** and activate the arrow button. One shift should remain: **Pack produce boxes**. Clear the field and submit again to see all three shifts. You can also open `demo/index.html` directly in a browser.

## First milestone for Devin

[Issue #1](https://github.com/openperlied/AccessForAll/issues/1) tracks the first deliverable: a repeatable accessibility audit for the volunteer search. The demo intentionally contains two defects:

| Control | What a volunteer encounters | Expected axe-core rule |
| --- | --- | --- |
| Neighborhood field | The visible text “Neighborhood” is separate from the input. A screen reader can reach the field but has no label to announce. | `label` |
| Search button | The arrow is hidden from assistive technology, leaving the button without an accessible name. | `button-name` |

The planned pipeline uses **Playwright** to open the local demo in Chromium and exercise the search with the keyboard. **axe-core** will inspect the rendered page. The test should record each finding's rule ID and element selector, apply the same checks to a repaired version, and produce a Markdown summary and machine-readable results for both versions. Keep the original demo available so another contributor can reproduce the comparison.

The milestone is complete when a contributor can run one documented command after setup, see both findings on the original, and verify that the repaired controls have meaningful names and that keyboard search still returns the expected shift. Automated checks cover part of the experience. The report should also explain how to check the controls with a screen reader.

## Working with nonprofits

After the demo workflow is reproducible, the next step is to invite a nonprofit to choose a page and a task that matters to its visitors. The project will ask for permission before auditing a partner site or proposing changes. This first milestone uses the fictional pantry only.

Contributions are welcome through GitHub issues and pull requests. Code is available under the [MIT License](LICENSE).
