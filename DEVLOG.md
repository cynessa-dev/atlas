# **DEVLOG**

See the journey of me and Houston as we build project Mamplata! This will serve as our journal throughout the journey and I expect to make many mistakes throughout the journey, but this mistakes will be the key for our growth!

---

## Elegant Loading | August 10, 2026 | 15:24

Aaaaaaaanddd... We are back again! Hello, World! It's been quite some time. From August 02 to 10, all I did was a bunch of research and development. For now, let's talk about the current status of the portfolio.

On August 06, I was notified of a new Astro version, `v7.1.6`, and it would be nice to upgrade the astro version. But, of course, I made sure it was safe and stable that it would not introduce any breaking changes. It seemed to be a success. I learned this lesson before, updating critical dependecies, especially the main framework that you are using, should always be done with extreme care. Luckily, I was already using git back then, so my progress was saved every successful changes. Any weird thing that I messed up that I would rather revert that fix is done through git. So, everyone, let's say thank to **Linus Torvalds**.

> Thank you, Mr. Linus!

During that, I took the chance to grab a quick coffee and started development.

On the same day, I did a lot of refinement and standardization. Why? Well, I pity myself! The person who will maintain this thing is me. Though, part of the reason is that I want people to be able to study the code easily.

I can't say that the codebase is tidy, nor will it be in the future. But, I can guarantee that I will do my best to maintain efficiency while keeping readability as priority.

Honestly, I should be placing comments to my code more often. However, GitLab mentioned to prioritize `self-explanatory` code rather than commenting it out.

Here have a read at [this](https://docs.gitlab.com/development/code_comments/).

Though, they did not meant to say to not put any comment on your code, it's just, use comments sparingly and optimize the code to be self-explanatory.

The same thing is true with lines of code! The developer's job is not to write as many or as few lines as possible. Our job, as developers, is to create high-quality human-readable code. It doesn't matter if it takes a few hundred lines. As long as it is necessary, it is great.

But don't get me wrong, I did not mean to write as many lines as you can, or modularize as much as you can so you can lessen the lines. You just gotta know the concept of `Separation of Concerns` to understand what I am saying.

But, we won't be talking about that in this log, we will be moving on to the next topic, which is design choices!

So, as you can see in my `CHANGELOG.md`, you will notice on `v0.6.2` that I changed the main font to `Inter`. Why?

Well, the previous font was `Instrument Sans`, which I didn't really liked the vibe. It wasn't thick enough to look confident, and not spaced just the way I wanted to look more tight and easy to read.

`Instrument Sans` is a great font, though it's not the right one for my portfolio. So, that's why I switched to `Inter`.

But how did I picked it? Well, it simply just popped into my head since it is the default font in Figma, as of writing this. My professor banned me from using `Inter` because it was _too common_. I thought, well, there's a reason it is used by many. For me, it doesn't really matter if your font is common or rare.

> What use does a font have when it just doesn't fit right?

All that matters is how you use the font. It's not about being generic. It's true that some fonts are designed in such a way that looks unique, but again, it falls into the vibe that you are going for.

For example, if you are making a bank website, why on earth would you use a font that's too playful? I would prefer using like a Serif font to give a vibe of _time-tested_, or sans serif like `Roboto` since users will probably read a lot of stuff.

In any case, always be mindful of your fonts. There's no best font, but there is always a right way to use one.

After the font, I did a lot of layout fixing, especially in the `About Me` section. I wanted it to convey a clear message with few characters a possible. So, I put in my main tagline on the upper part, which is:

**SHIP SMALL, DELIVER BIG**

I believe that it matches my personality much more, and would be the main concept I would be following. I mean, what use is a software waiting to be perfected rather than ship it with as the **Most Viable Product**, and build on top on it.

I learned this from a random guy in the internet once.

**You cannot make your software perfect, but you can make it better**

It finally struck me, I keep on building and building, perfecting my softwares. In the end, barely any of them get deployed. Starting that day, I kept on shipping small, making progress bit by bit, and collecting actual data from the results of that. That allows me to improve my ways, and make it much more better rather than _"perfecting"_ it.

I did that, then an frustrating bug hit me. I thought it was cool to have an intro animation.

I mean, it is still cool, but refreshing the page keeps replaying it. I don't want to remove it fully either as it is part of the User Experience.

So, I thought of a solution, why not let the animation play once per session, then use a light loading animation to let the page breathe while the assets reload for a moment, makes it much more smoother than just a blink or snap.

So I spend the whole day making an alternative loading overlay, and what do you know! I struck a very annoying mistake I made. Making my code messy.

The code was quite messy when the alternative loading was done, and I can't even figure it out myself. That's why committing took 2 days, until I was able to commit.

I made sure the new feature is modular, as well as the other parts. I also made sure to separate things, trying my best to separate concerns, like triggering events, managing initializations, and scrolling behavior.

I needed things separated, so that my brain could focus on 2 scripts, and be able to them apart instead of mixing the 2.

That way, I was much more efficient to compare 2 codes, and relate them. Another stuff that helped me was centralizing scripts.

For example, I got this `initManager.ts`. This script, as the name implies, manages the initialization of different scripts such as the header, hero, overlays, ect. The `initManager.ts` calls the needed initialization whenever it is needed and processes it. Why is this important? So that `Layout.astro` doesn't need to concern itself figuring things which to initialize. It just tells `initManager.ts` to do his stuff, and `initManager.ts` handles it gracefully.

With that, I can say that, the more I code, the more I know that I didn't know. Technology is really fascinating, and it grows really fast. It matched my hunger for curiousity, wanting to learn everyday, and technology manage to keep up with it.

Anyway, that's all for now! Goodbye and see you all soon! Bye!

## I finally came back | August 01, 2026 | 20:31

Hello, World! It's been a while since my last log, apparently, I didn't manage to capture the last update, but, luckily, the commit messages helped a lot for backtracking previous work.

I would like to personally apologize to you for not updating the portfolio for almost a month. Lots of commission came up, and I noticed from those commission that I lack one critical knowledge. That is the **Agile Methodology**. I spent the last half of July learning the Agile Methodology, such as Scrum and Kanban. I believe those skills will allow me to progress even faster and better than before. I made a whole research about it in one of my notes, and I'll post it at a later date.

Anyway, since I have returned to my portfolio, I will need to apply my knowledge from the Agile Methodology to this project. Things like sprints, backlogs, and stuff, as well as using Trello and Obsidian for documentation and progress tracking.

So, all this will be paperworks for now, constructing the proper plan to follow and getting back on track.

That's it for now, and I will be checking out the plans again, and start tomorrow! Bye!

## Massive Hero changes | June 30, 2026 | 13:57

Hi! It's been a while since I last wrote. I got really busy with fixing the Hero section and making the layout nice to look at. Days has passed and still no idea, then a memory struck my head.

> Artists learned by copying others, developers learned by doing the same stuff others did, and I learned that way too!

When that memory came, I realized that I just need some inspiration. So I opened my browser and went to [Awwwards](https://www.awwwards.com/), where I browsed tons of portfolio and other websites. After a few hours of admiring other's work, [Lama Lama's design](https://lamalama.com/) was much more on point to my _taste_. I learned their ways of presentation, the hows and whys, and pretty much studying their works through research and debugging.

    * { outline: 1px solid red; } /* Really did come in handy */

I took a look at other sites, but it wasn't really clicking on me. So my work is currently inspired by **Lama Lama**, so they deserve the credit. **BUT**, of course I did not just blindly copied everything, I mixed some of my own spices to make it more personal, rather than another copy. I spent days and weeks studying and developing the Hero section, and when I was getting a hang on it, development faster than expected.

Now I met another roadblock, to match the idea of story telling where the users see _my workspace_, I needed **3D Models**. Originally, I plan to just make it 2D or 2.5D, but I figured, why not get into 3D. It will look nicer and I really wanna try **Studio Wrong's Design**. Here's a link to their YouTube channel.

[Studio Wrong][https://www.youtube.com/@StudioWrong]

I really love their art style and character designs, it feels so cute and soft! Right now, I am following their [Stella’s Materialism¹²](https://www.youtube.com/playlist?list=PLRywp5XYjMBZmjXh5AQ3w6EGEwIlcEZNX) series.

That's why I decided for this project to try and get into 3D Art using **Blender** and **Three.js**. This is my first time, so I will be doing my art with Studio Wrong's art style just to avoid creating a new one. At some point, I bet my body would naturally develop its own art style, so I wouldn't really have to worry about it now. I'll do some assets for the Hero section, and once I get a hang on it, I'll do more in other sections. That's all for now! Goodbye!

## The Hero has arrived! | June 08, 2026 | 14:00

Hello, again! Today's report is the finished _initial_ layout for the Hero section, along with the Header and Menu bar.

The Header contains a brand name, availability status, and local PH time indicator in 24-hour format. The Header is designed to assist clients and recruiters to understand my current situation, in the professional world, and decide for collaboration. I might take it down at some point, but for now, it stays.

The Menu bar is the navigation bar for the portfolio. It is designed to be similar to a directory or terminal with the `./` prefix or starting characters. Functional, but not expected to work properly as most of the sections are still missing.

The Hero section simply contains a tagline and title, with my name on the brand name. This answers the question `"Who is this?"`. `"What does he do?"`, and `"Why should they care?"` questions that grasp clients and recruiters attention. As long as I managed to pique their interest, my hero section does its job.

That's pretty much the current situation of the portfolio, I'll be back for more updates! See yah! >_</~

## Onboard the Astro Spacecraft | June 05, 2026 | 20:38

_Initialized Project: Mamplata..._
_Spacecraft ready to launch._
_Launching in..._
_4..._
_3..._
_2..._
_1..._
_Astro, Blast off!_

In this journey, I, Christian Mamplata, has decided to join Houston to continue my journey as a developer. Our mission, **to create solutions that ease the life of many.** Together, Houston and I will build a portfolio that will depict our favorite word, **"FUN!**

For now, We'll take a look around Astro and get a feel of the controls. I bet we will have a blast in this project! Until then, I'll tell you more about our journey.

_BYE BYE._
