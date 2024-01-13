---
publish: true
tags:
  - unfinished
date: 2024-01-14
created_date: 2024-01-12
---
![[000 Proof Is All You Need.png]]
Sometimes ago someone in a discord community that I joined asked about the importance in using Github for data role portfolio. In English the above question is:

> Hello all, I'd like to ask data wizards.. (this community) how important is github for data person portfolio?
>
> Do I need it?  
> Any advice what I must put in github?  
> thank you All   

I love answering this kind of questions because it prompts me to think about something that I usually take for granted. And also because [[E - Asking Question Trigger Musing on Related Issue]], so I'll answer this question from my perspective. It may or may not be relevant for You or the OP in this case, but if it turns out to be useful please let me know :) 

If you're pressed for time or just doesn't care about the detail and want to go to the answer, go jump to [[#Recommendation]] directly. Anyway, to answer this question I'd like to break it down to several other questions:

- [[#Why Do I Need Github at All]]
	- [[#Data Role Perspective]]
	- [[#Employer Perpective]]
- [[#Recommendation]]
- [[#What Must I put in it?]]
	- [[#For me]]
	- [[#For Portfolio]]
	- [[#For Others]]
- [[#What's the Alternative]]

## Why Do I Need Github at All
Before asking the question about using Github as portfolio, I'd like to first talk about why do I myself use Github at all. For someone like me that starts as electrical engineer and Interactive Installation Developer using Github doesn't come as a given. I remember the struggle of trying out Github for managing my schematic and making sense of what changes between design. I also learned the hard way about `.gitignore` when working on a Unity 3D Project and mistakenly push all assets to Github.  Even then, the few of things I put in my Github account automatically becomes a place people can see what I'm working for even if only on the level of what code I wrote.

Jump 8 years to the future (writing "8 years" here made my heart skip a beat, I've just realized it's been that long) and my Github repository looks like that old workbench in a corner of a workshop. A corner filled with passion projects that's never really finished, interesting project I forked for personal modification, and some freelance projects that fortunately part of it can be open sourced. But besides that, I found that my Github Profile is full of activities in the last few years. Contribution to a small OSS repo most people probably don't know, a small discussion on obvious bug on another repo, or just me pushing a draft for my blog that never see the light of the day, and many more.

![[006 Proof Is All You Need - GH Activity.png]]

Coming back to the question, do I actually need this? To answer this question I'd like to reflect from two Point of Views that's the most relevant to me now. Me as someone with a Data Role, and also me as someone who might hire other Data Role.
### Data Role Perspective
Personally I haven't tailored my Github to be consumed by other people. One repo that's actually being used is a small wrapper on Airtable private API to extract data in bulk (their Official API doesn't provide bulk download at that time). And I don't think it helps me in landing any jobs (I haven't actually asked my employer if they considered any of my repo when shortlisting me). And most of my previous work actually is inside private repositories, so it's hard for me to show what I've done from Github.

But, does it help in any way? Definitely. My familiarity with git and Github itself somehow become a selling point in its own way. Good practice when working with git, how to create good workflow when creating issues, how to document projects properly, how to work with pull request in a team, how to setup basic CI and CD using Github actions, and many more. All of those come organically as I work both with my own repository or when I'm contributing to shared others' repository. Or so I'd like to argue, if nothing else using Github will help in acclimating you with version control workflow, or more specifically on using Github as a day to day tool. And the neat thing is most of it will transfer over to other provider (I've used Gitlab and Bitbucket so far, and most knowledge were transferable).

Can I do more with my Github? Yup. Looking at others' profile make me realize that I missed quite a lot of opportunity on my Github Profile. Let's discuss it from another point of view where I've seen and skimmed over a lot of other people's profile.
### Employer Perpective
For now I'll only talk in context of how I look and skim through candidate, especially for shortlisting phase, interview, and final decision. This doesn't reflect the whole hiring process in the company I've worked in, but the following is what shaped my opinion when involved in hiring process. There are some topics that I'd like to talk in other time, like [[E - Create Your Luck]], [[E - Hiring is a Process of Matchmaking]], [[E - Be Kind and Respect Each Others Time]] but I'll skip for now. So, with the disclaimer aside, let's get to the meat of matter.

A lot of time there are resume with interesting projects in it. For a fresh graduate it maybe a final project, or class project that went another mile. For an experienced candidate it maybe their personal project. In this case having those projects inside Github (even if it can't be run as is) helped me understand what they did that can't fit into resume, or even led me to discover more of their works. The more I discovered the details, the more I felt like I know the person, and the more likely for me to consider them positively. Also it will helped me in asking a more directed question later in interview phase.

Another case is when there's a lack of information on an interesting resume in the shortlisting phase, I tend to check their Github profile. I did it under the assumption that not all technically capable people can pour their skills into a resume ([[E - Halo Effect is Real Utilize and be Mindful]]).

And another time that I found myself looking through Github profile (or other professional profile in this case, like LinkedIn in general) is for the last phase when deciding over several candidates. Sometimes I found myself wondering how certain candidate works with certain tools that's being used in company. Or how comfortable they are with modifying large codebase and communicating via Issues or PR. And this information can be gathered via their profile.

So where does all of this talks take us?
## Recommendation
I still believe in [[E - Create Your Luck]], that is we need to prepare "nets" to capture our luck. Mine may not be in Github, but yours might be or may not. But keeping a record of what you've done and what you can do is useful, if not for getting employed, at least for the future you. This can be in the form of:
- Github and the like
- Blog
- Tweet with Technical Content
- Paper and Publication
- Instagram Post (i.e. containing analysis or Viz)
- Link to your past result in LinkTree
- etc.

If you in need of a more practical steps, the next sections are for you
## What Must I put in it?
Going around and back into the topic of Github, I'd like to reflect on my own experience and think about what would I do to my Github so that I felt better about it.
### For me 
**Reduce forking repo unnecessarily**. I easily lost track of forked repo that I'm interested in but haven't done anything to it since. I'll do myself a favor and reduce this kind of behavior since it's inconvenient to delete repo in Github in bulk. I'm thinking about using issues in my `banditelol/banditelol` repo to make sure I'm both tracking the repos while not polluting my personal profile.

> Anyway, this cleaning up repo in my profile can be an interesting exercise and project on its own, I may do it later

**Let my project see the finish line**. I had created a lot of project in my Github that stays like this site title, i.e. Unfinished. Not in the state of actually dropped and canceled, but just stand there stale and silent. Finishing, or at least retrospecting those repo can put closure to lots of things while helped me learn on what went wrong.

**Touch up my Profile's Readme.md**. Github has facilitate profile Readme.md for a while to act as a kind of custom homepage for your profile, and help visitor navigate your profile. For now it's really plain :(, I need to at least make it informative to motivate me and help other to know my Github (and in extension, me) better.

**Write proper Makefile and Readme.md first and with template**. For consistency and for my minuscule long term memory who will visit the project and most probably has already forgotten what I did a few weeks ago. In similar vein, leave notes in Issues or `TODO` comment to make sure I can get previous context when continuing a project.
### For Portfolio
Some of the **For me** section will already helped me using Github as a portfolio already. But there are a few things that I'd like to do for this purpose.

**Put External Portfolio in one Place**. Most of my professional works are private, but the results can be shared to a certain degree. Either maintain a separate place for it (static PDF, google docs, or website) so that people expecting to see portfolio can be directed to the correct place.

**Create compelling graphics for my Projects**. Having an eye catching presentation will at least hold the attention of people visiting my profile for a while. And hopefully will spark their curiosity about what on earth does a repo called `airscraper` may be about (Spolier, it's not air quality monitoring project). 

**Focusing on quality over quantity**. I'm too obsessed with repo quantity in the last years, but there's only a handful of repo that someone can be interested in. For someone who are not doing something interesting yet (mostly boring, but useful and bring profits anyway ;)), I'm thinking of just showcasing 2 projects for my main skillset i.e. ML Engineering and Data Science.
### For Others
To be honest I haven't gotten to this point yet :( But from my one repo, there's one learning that I'd like to do in the future.

**Explicitly mention contributing and maintenance status**. This will prevent others from expecting to use your code for their own and expecting update and maintenance. In the near future I may put my default stance to be "unmaintained but feel free to fork and reuse".

## What's the Alternative
As mentioned above in my recommendation, it doesn't need to be Github. It can be:
- Kaggle Profile which shows your pretty notebook and community contribution on technical topics
- Huggingface Profile which shows you can finetune huge model or help other understand an esoteric model better
- Streamlit Profile which contains all your experiment on various UX when deploying ML or AI Model
- Tableau Public which contains all your pretty, clean, and insightful viz
- Index of your Article to show you could explain complex concept succinctly and tell compelling stories
- And other things I couldn't think of yet.

For me, it's my messy [Github Profile](https://github.com/banditelol), and currently [[index|this site]] and my [main blog](https://adityarp.com). If you find this helpful (or you hold opposing view) please let me know and maybe we could discuss, debate or even collaborate. Just hit me up on [Twitter](https://x.com/banditelolRP) :)

