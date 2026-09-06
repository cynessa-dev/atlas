# MAMPLATA | Personal Portfolio

## Foreword

Thank you for viewing the repository of my portfolio! Whether you are a fellow developer, recruiter, client, or just a curious user, I hope you gain some **insights** regarding me and the project!

You can read the [DEVLOG.md here!](https://github.com/cynessa-dev/mamplata/blob/48f982423a5e99dfa4a13f583565707805e2d6e6/DEVLOG.md)
The versions are found in [CHANGELOG.md](https://github.com/cynessa-dev/mamplata/blob/48f982423a5e99dfa4a13f583565707805e2d6e6/CHANGELOG.md).

## Architecture

```
|
|_____src/
|     |
|     |_____assets/     # Icons, SVGs, Images, and Videos (if there are any)
|     |
|     |_____components/ # Elements that are isolated into their own files
|     |     |
|     |     |_____sections/ # Elements that build up the app
|     |     |
|     |     |_____ui/       # Re-usable components that can be used anywhere
|     |
|     |_____constants/  # Constants that are being shared by components (ex.: events)
|     |
|     |_____layouts/    # Contains files on how pages and components should be structured
|     |
|     |_____pages/      # Currently contains the root page, but can be divided to allow for new pages
|     |
|     |_____scripts/    # Contains scripts that enables dynamic component
|     |
|     |_____styles/     # Contains the colors and look of the page/s
|
|
```
### ASSETS

Let's start with the `assets/` then going down. The `assets/` contains media that needs to be optimized before serving to the users. This allows for faster loads and better experience. It can be any images, videos, audios, anything that needs optimization. Any media that needs to be served _"as is"_ should be placed in the `public/` where it is not optimized.

You may notice that there are `.astro` files in there, those are Icons I made with inline SVGs. I made those SVGs to have a dynamic and customized media for the portfolio. In this case, I have placed it in the `assets/` instead of the `public/`, this is because those pages are `.astro` files that are being accessed by scripts. It allows for easy access for scripts and components, and bundles it with the build files for serving.

### COMPONENTS

The `components/` is currently divided into 2 that serves clear purpose. `sections/` and `ui/`. The `sections/` contains major elements that builds up a page. For example, the `index.astro` is currently composed of several sections, and those can be found in the `sections/`.

Elements that are shared or small can be found in the `ui/`. This elements or components are shared in different components and can be re-used throughout development.

### CONSTANTS

The `constants/` contains constants that are shared by elements. Currently, this contains events and triggers that allows a centralized point of knowing each events.

### LAYOUTS

The `layouts/` currently tells the application what kind of structure should a page have. Currently, it has `Layout.astro` which belongs to `index.astro`, the root page. There's not much plans of expanding this, however if I were to expand, I would organize it into sub-folders clearly defining layout belongs to which sections or elements.

### PAGES

The `pages/` contains the main elements that the user are accessing. Currently, the only file inside it is `index.astro`. However, there are plans to expand that folder to accommodate new features.

### SCRIPTS

The `scripts/` contains the logic and animations for the application. This allows the application to be immersive and dynamic, allowing users to get the best experience they can have. In this folder, there are plans of expanding this to create a much more better architecture, as the current one mixes purpose of each file.

### STYLES

The `styles/` contains the `.css` files that defines how the page should look like. This can be expanded to contain files that has clear purpose.

### OVERALL

Currently, the architecture supports the application. However, maintaining it would cause issues due to the mixing of files and purposes. This suggest a renovation to properly organize files.

## Tech Stack

I used the following technologies to build this portflolio:

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/)
- [Vercel](https://vercel.com/)

I used this opportunity to learn some new frameworks and tools to aid me in the future, that's pretty much the reason why I chose `Astro` and `GSAP`, other than being perfetcly fit for my system requirments and styling choice.
