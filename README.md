
## Running locally

No build step required.

git clone https://github.com/abdibirru/premium-calculator.git
cd premium-calculator
python3 -m http.server 8080
Then open http://localhost:8080.

## Deployment

Deployed via GitHub Pages, serving directly from the main branch root.

## Architecture notes

The calculator logic (CalculatorEngine) is fully decoupled from DOM access (CalculatorUI), so the arithmetic engine could be unit-tested or reused independently of the browser. Theming is handled entirely through CSS custom properties swapped via a data-theme attribute, so no styles are duplicated between light and dark modes.

## License

MIT — see [LICENSE](./LICENSE).

## Author

Abdisa Birru
[GitHub](https://github.com/abdibirru)
