# Anvesh Chelluboina Portfolio

## Project files
- `index.html` is the portfolio homepage, services, travel gallery, and reviews section.
- `slides.html` is the six-slide profile presentation.
- `flapboard.css` contains the shared responsive styles.
- `flapboard.js` contains the gallery, lightbox, mobile navigation, slides, and review form behavior.
- `assets/photos/` contains the original portfolio and travel photographs.

The site is static and compatible with GitHub Pages. There is no server or review database in this repository. No authentic client testimonials were present in the project files or accessible repository history, so the public reviews section starts empty.

## Preview locally
From the project directory, run:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` for the homepage or `http://localhost:8000/slides.html` for the profile slides. Stop the server with Ctrl+C.

## Review submissions: setup required
The review form is intentionally disabled until a receiving service is configured. A static GitHub Pages site cannot securely receive or centrally store reviews by itself.

1. Create a form with a provider such as Formspree and configure its allowed domain, spam filtering, and any available rate limits.
2. In `index.html`, set the review form's `data-review-endpoint` to the HTTPS endpoint supplied by the provider, for example `https://formspree.io/f/YOUR_FORM_ID`. Replace the example ID with the real form ID. The endpoint is public configuration, not a secret token.
3. Submit a test review and confirm it arrives in the provider's inbox. The provider receives the review name, selected service, review text, optional rating and date, and publication-consent field. Do not request sensitive identity, visa, or academic records through this form.
4. Review submissions manually in the provider inbox. Do not assume that a received review is authentic or verified. Reject spam, private information, or reviews that do not meet your publication policy.
5. Publish only reviews you approve. Add approved review objects to the `approvedReviews` array in `initReviewForm()` in `flapboard.js`, then commit and publish the change. Set `verified: true` only after you have actually verified the client. Reviews are not fetched or published automatically.

If no valid HTTPS Formspree endpoint is configured, the form clearly reports that submissions are unavailable and the submit button remains disabled. A failed request is not presented as a successful submission. The built-in honeypot is only one spam measure; use the provider's server-side protections as well. Review the provider's privacy and retention terms before enabling submissions.

## Publish through GitHub Pages
The site is served from the repository's `main` branch. After reviewing your changes, publish with:

```sh
git add index.html slides.html flapboard.css flapboard.js README.txt
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages deploys from the configured repository source. Check the repository's Pages or Actions status for deployment completion, then verify the live homepage and `slides.html` URL. A successful push alone does not confirm that Pages has finished publishing.