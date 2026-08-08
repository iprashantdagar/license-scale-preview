#!/usr/bin/env python3
"""Build paste-ready GoHighLevel page kits from the frozen static-site copy."""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "GHL-TEMPLATE-SUITE"
SOURCE_COMMIT = "2b475f9433a3d76f33e6737417515c01ab00039c"
ASSET_BASE = (
    "https://cdn.jsdelivr.net/gh/iprashantdagar/"
    f"license-scale-preview@{SOURCE_COMMIT}/assets"
)

PAGES = {
    "home": {
        "source": "index.html",
        "slug": "/",
        "title": "License & Scale — Start an AI agency. Scale it to seven figures.",
        "sections": [
            "Hero and navigation",
            "Case studies",
            "Testimonial and process",
            "Press marquee",
            "Verified outcomes",
            "Community masonry",
            "Playbooks",
            "Careers",
            "FAQ",
            "Survey",
            "Footer",
        ],
    },
    "apply": {
        "source": "apply.html",
        "slug": "/apply",
        "title": "Apply — License & Scale",
        "sections": [
            "Navigation",
            "Application introduction and form",
            "Community masonry",
            "FAQ",
            "Footer",
        ],
    },
    "results": {
        "source": "results.html",
        "slug": "/results",
        "title": "Results — License & Scale",
        "sections": [
            "Results hero and navigation",
            "Headline statistics",
            "Results carousel",
            "Community masonry",
            "Apply call to action",
            "Footer",
        ],
    },
    "careers": {
        "source": "career.html",
        "slug": "/careers",
        "title": "Careers — License & Scale",
        "sections": [
            "Careers hero and navigation",
            "Company introduction",
            "Team values",
            "Open roles",
            "Footer",
        ],
    },
    "thank-you": {
        "source": "thank-you.html",
        "slug": "/thank-you",
        "title": "Thank You — License & Scale",
        "sections": [
            "Navigation",
            "Application timeline",
            "Featured case studies",
            "Verified case-study grid",
            "Playbooks",
            "Footer",
        ],
    },
}

ROUTES = (
    ("index.html#case-studies", "/#case-studies"),
    ("index.html#programs", "/#programs"),
    ("index.html#playbooks", "/#playbooks"),
    ("thank-you.html", "/thank-you"),
    ("results.html", "/results"),
    ("career.html", "/careers"),
    ("apply.html", "/apply"),
    ("index.html", "/"),
)


def extract_body(source: str) -> str:
    start = source.index('<div id="ls-root">')
    script_markers = [
        source.find('<script src="js/', start),
        source.find("<script>\n(function(){", start),
    ]
    script_positions = [position for position in script_markers if position != -1]
    if not script_positions:
        raise ValueError("Could not find the first page script")
    scripts_start = min(script_positions)
    end = source.rfind("</div>", start, scripts_start)
    if end == -1:
        raise ValueError("Could not find the #ls-root closing tag")
    return source[start : end + len("</div>")]


def extract_css(source: str) -> str:
    chunks: list[str] = []
    for href in re.findall(
        r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>', source
    ):
        if href.startswith("css/"):
            chunks.append(f"/* Bundled from {href} */\n{(ROOT / href).read_text()}")
    for inline in re.findall(r"<style>(.*?)</style>", source, re.S):
        chunks.append("/* Page-specific source CSS */\n" + inline.strip())
    if not chunks:
        raise ValueError("No page CSS found")
    return "\n\n".join(chunks)


def extract_scripts(source: str) -> list[str]:
    body_close = source.rfind("</div>")
    scripts: list[str] = []
    for src in re.findall(r'<script[^>]+src="([^"]+)"[^>]*></script>', source[body_close:]):
        if src.startswith("js/"):
            scripts.append(f"/* Bundled from {src} */\n{(ROOT / src).read_text()}")
    for inline in re.findall(r"<script(?:\s[^>]*)?>(.*?)</script>", source[body_close:], re.S):
        if inline.strip():
            scripts.append("/* Page-specific source behavior */\n" + inline.strip())
    return scripts


def rewrite_routes(fragment: str) -> str:
    for old, new in ROUTES:
        fragment = fragment.replace(f'href="{old}"', f'href="{new}"')
        fragment = fragment.replace(f'action="{old}"', f'action="{new}"')
    return fragment


def strip_body_dependencies(fragment: str) -> tuple[str, list[str]]:
    dependencies = re.findall(
        r'\s*<script[^>]+src="(https://fast\.wistia\.com/[^"]+)"[^>]*></script>',
        fragment,
    )
    fragment = re.sub(
        r'\s*<script[^>]+src="https://fast\.wistia\.com/[^"]+"[^>]*></script>',
        "",
        fragment,
    )
    return fragment, dependencies


def page_readme(name: str, config: dict[str, object]) -> str:
    section_list = "\n".join(f"- {section}" for section in config["sections"])
    return f"""# {name.replace("-", " ").title()} page

GHL slug: `{config["slug"]}`

## Full-fidelity installation

1. Create a blank GHL Website page with the slug above.
2. Set the page background to `#0B0A12`.
3. Paste `01-HEAD.html` into the page's Header Tracking Code.
4. Add one full-width row and remove all row, column, and element padding.
5. Add one Custom Code element and paste `10-BODY.html`.
6. In Footer Tracking Code, paste `98-DEPENDENCIES.html` and then
   `99-SCRIPTS.html`.
7. Save and test the published page, not only the builder canvas.

`preview.html` is the assembled local test document. It is not pasted into GHL.

## Page order

{section_list}

For visual-builder editability, follow the corresponding section in
`../../NATIVE-ASSEMBLY.md`. The full-fidelity body is the verified fallback and
the visual reference while native sections are assembled.
"""


def build_page(name: str, config: dict[str, object]) -> dict[str, object]:
    source = (ROOT / str(config["source"])).read_text()
    css = extract_css(source)
    body, wistia_dependencies = strip_body_dependencies(extract_body(source))
    body = rewrite_routes(body)
    scripts = extract_scripts(source)

    page_dir = OUTPUT / "pages" / name
    page_dir.mkdir(parents=True, exist_ok=True)

    head = f"""<!-- {name} page: paste into GHL Header Tracking Code -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,700&display=swap" rel="stylesheet">
<style>
html{{-webkit-text-size-adjust:100%;text-size-adjust:100%;background:#0B0A12}}
body{{margin:0;overflow-x:clip;background:#0B0A12}}
{css.strip()}
</style>
"""
    dependencies = [
        f"<script>window.LS_ASSET_BASE = {json.dumps(ASSET_BASE)};</script>"
    ]
    if "data-tf-live" in body:
        dependencies.append(
            '<script src="https://embed.typeform.com/next/embed.js" async></script>'
        )
    for dependency in dict.fromkeys(wistia_dependencies):
        module = ' type="module"' if "/embed/" in dependency else ""
        dependencies.append(f'<script src="{dependency}" async{module}></script>')

    script_bundle = "\n\n".join(scripts)
    page_scripts = f"""<!-- {name} page: paste last in GHL Footer Tracking Code -->
<script>
{script_bundle.strip()}
</script>
"""
    body_file = (
        f"<!-- {name} page: paste into one zero-padding GHL Custom Code element -->\n"
        f"{body}\n"
    )

    (page_dir / "01-HEAD.html").write_text(head)
    (page_dir / "10-BODY.html").write_text(body_file)
    (page_dir / "98-DEPENDENCIES.html").write_text(
        f"<!-- {name} page dependencies -->\n" + "\n".join(dependencies) + "\n"
    )
    (page_dir / "99-SCRIPTS.html").write_text(page_scripts)
    (page_dir / "README.md").write_text(page_readme(name, config))
    (page_dir / "preview.html").write_text(
        "<!doctype html>\n"
        '<html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        f"<title>{config['title']}</title>{head}</head><body>"
        f"{body_file}{''.join(dependencies)}{page_scripts}</body></html>\n"
    )

    return {
        "name": name,
        "source": config["source"],
        "slug": config["slug"],
        "title": config["title"],
        "sections": config["sections"],
        "files": {
            "header": f"pages/{name}/01-HEAD.html",
            "body": f"pages/{name}/10-BODY.html",
            "dependencies": f"pages/{name}/98-DEPENDENCIES.html",
            "scripts": f"pages/{name}/99-SCRIPTS.html",
        },
        "integrations": {
            "typeform": "data-tf-live" in body,
            "wistia": bool(wistia_dependencies),
            "youtube": "data-yt=" in body,
            "staticFormFallback": "<form" in body,
        },
    }


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    pages_dir = OUTPUT / "pages"
    if pages_dir.exists():
        shutil.rmtree(pages_dir)
    pages_dir.mkdir()
    manifest = {
        "name": "Cursor License and Scale",
        "format": "GoHighLevel hybrid source suite",
        "sourceCommit": SOURCE_COMMIT,
        "assetBase": ASSET_BASE,
        "pages": [build_page(name, config) for name, config in PAGES.items()],
    }
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Built {len(PAGES)} page kits in {OUTPUT}")


if __name__ == "__main__":
    main()
