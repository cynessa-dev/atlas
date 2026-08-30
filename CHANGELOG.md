# **CHANGELOG**

Version logs where you can see what was changed, fixed, new, etc. In simple words, this is just a history book -_-

---

## v0.8.0

_August 31, 2026_

A couple of changes here and there.

**WHAT'S NEW?**

- Organized files with a clear naming (components and sections)
- Added border to device screen in hero to make it look like a device frame.
- Added ProjectTable component for showcasing project
- Added SectionIntro component for consistent styling across sections.
- Removed `SkillBar` as there is no current use for it.

## v0.7.1

_August 23, 2026 - 19:53_

This maintenance release upgrades Astro and its resolved dependencies to keep the project's framework tooling current.

**WHAT'S NEW?**

- Upgraded Astro from `7.1.6` to `7.2.4`.
- Refreshed the lockfile to match Astro's updated dependency tree.

## v0.7.0

_August 23, 2026 - 19:49_

The Skills section now communicates both technical capability and the thinking behind each tool more clearly, while the project gains a consistent formatting workflow.

**WHAT'S NEW?**

- Added a reusable `SkillBar` component so skills can be rendered dynamically from structured data.
- Expanded each skill with a concise description and refined the section layout for easier scanning.
- Added Prettier and the Astro Prettier plugin, with a shared four-space formatting configuration and `format` script.
- Refined shared spacing utilities, type consistency, and About Me copy to improve clarity across the site.

**LESSON LEARNED**

- Structured content data keeps a growing section easier to maintain while still making the visitor experience feel intentional.

## v0.6.3

_August 09, 2026 - 21:09_

The intro animation now flows elegantly, that gives first visits (sessions) an intentionally designed entrance while keeping page refresh lightweight. It is much cooler now since it does not keep repeating the intro every refresh.

**WHAT'S NEW?**

- Extracted the loading sequence from the Hero into a dedicated `LoadingOverlay` component and animation script.
- Added a boot-up sequence with status messages, a kernel/brand moment, and a streamlined quick-load screen for return visits.
- Added session-based quick-load detection so the full Hero zoom-out intro only plays when appropriate.
- Centralized page startup in `initManager` and moved shared loading and Hero completion events into a reusable events module.
- Added `scrollManager` to coordinate smooth scrolling and prevent scrolling during the Hero introduction.
- Moved the loading overlay into the main layout so it consistently covers the complete page during startup.

**LESSON LEARNED**

- Separate animation ownership from page orchestration: a component should animate its own UI, while a small manager coordinates when each experience begins.

## v0.6.2

_August 06, 2026 - 20:49_

Anddddd... We are back to the ball game! Lots of new UI updates and dev experience improvements.

**WHAT'S NEW?**

- Refined the Hero, Philosophy, and About Me sections with clearer copy and a more consistent content structure.
- Added shared screen padding to keep the Philosophy and About Me sections aligned across the page.
- Standardized `eyebrow` headings with monospaced typography and improved visibility.
- Updated the main font to **Inter** and refined typography for improved readability.
- Expanded the About Me section with a _clearer_ introduction and personal development approach.

**LESSON LEARNED**

- Shipping a smaller version today is better than waiting for a perfect version tomorrow.

## v0.6.1

_August 06, 2026 - 14:00_

**WHAT'S NEW?**

- Updated Astro from `v7.0.3` to `v7.1.6`.
- Refreshed the dependency lockfile to reflect the Astro update.

## v0.6.0

_June 30, 2026 - 13:57_

The Hero is taking a new creative direction, combining clearer storytelling with a more immersive workspace experience.

**WHAT'S NEW?**

- Redesigned the Hero section with presentation ideas inspired by Lama Lama while retaining the portfolio's own identity.
- Established a workspace-inspired storytelling direction for the Hero section.
- Began exploring custom 3D assets using Blender.
- Added Three.js to the planned creative direction for presenting 3D elements throughout the portfolio.

**NOTES:**

- The 3D artwork is currently inspired by Studio Wrong while I learn the fundamentals and develop my own visual style.
- Interactive and 3D elements will enhance the portfolio without hiding important information from recruiters.

## v0.5.1

_June 29, 2026 - 21:32_

I did some major style refactoring after laying out the contents. Additionally, I have upgraded the major framework, Astro, to a newer version at the time of writing this.

**WHAT'S NEW?**

- Astro upgrade from `v6.4.7` to `v7.0.3`!
- New stylized header with menu bar for easy navigation
- New hero look complete with animations!
- Hero now has a sequence of `BIOS Boot up -> Kernel or Brand Display -> Hero Content` to allow the webpage prepare, while keeping the user engage by showing something is happening.
- Overlay is placed to blur the main area except the header to avoid visual clutter.
- Added new fonts `IBM Plex Sans` for all content, and `Sometype Mono` for technical and special contents.

## v0.5.0

_June 17, 2026 - 13:11_

Wanna see me do something cool? Give me a call!

**WHAT'S NEW?**

- Added `Connect` section with my email and github link.
- Officially declare portfolio surface contents in place.

## v0.4.0

_June 17, 2026 - 12:53_

Have a look at my proud works!

\
**WHAT'S NEW?**

- Just the new `Featured Projects` section with initial content that refers to my top 3 projects.

## v0.3.0

_June 17, 2026 - 12:52_

What can I do? Party Tricks?? Yeah, Right?!

\
**WHAT'S NEW?**

- Added `Skills` section with initial content.

**FIX**

- Updated and corrected severe package dependencies that may cause issues for the users.

## v0.2.0

_June 11, 2026 - 15:38_

Who am I?

\
**WHAT'S NEW?**

- Added `Mindset` section for my personal philisophy to help recruiters and clients for goal alignment.
- Added `AboutMe` section for professional details about me/
- Added **Google Font Icons** for a temporary icon set.
- `Borgar Icon` is now replaced with an actual `Menu Icon`.

**NOTES:**

- Do note that I am prioritizing content over style and layout. I'm having a headache right now, but we gotta progress somehow.

## v0.1.0

_June 08, 2026 - 13:55_

The **Hero** has arrived!

\
**WHAT'S NEW?**

- Added `Header` component for branding, availability status, and local PH time to help recruiters and client decide.
- Added `Menu` component as main navigation tool for the portfolio. Contains all sections to navigate to in a directory-style format for theme and aesthetic.
- Initial layout and look for the hero section.

**NOTES:**

- `Borgar Icon` is a temporary placeholder for the menu icon.
- In this stage, we arre priotizing to make it exist first.

## v0.0.1

_June 05, 2026 - 20:56_

Hello, my old friend, Tailwind CSS!

\
**WHAT'S NEW?**

- Configured Astro to invite Tailwind CSS 4 aboard the spacecraft.
- Imported Tailwind CSS in `global.css` and applied in to `Layout.astro` for a cool spacecraft look!

## v0.0.0

_June 05, 2026 - 20:24_

The start of a new journey with Houston, onboard the mighty spaceraft Astro!

\
**WHAT'S NEW?**

- Initiated project Mamplata! Hurray~!!
- Did some look arounds to get a feel with our new spacecraft, Astro!
