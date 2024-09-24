---
publish: true
tags:
  - unfinished
date: 2024-01-02
created_date: 2024-01-02
---

Originally I'm going to post something about New year and resolution for me this year. After writing the draft and ruminating it for a day, I decided against it since the current content feels too private for me and I decided to just do a proper blogpost later about this current year (well, to be fair I actually thinking of splitting it into quarterly so not really a new year resolution). 

Anyway.. I want to lay out several things related to [[Unsupervised Learning]] that just made sense after a while working as Data (Science|Engineer), and watch several talks especially those of [[Vincent D. Warmerdam]]'s [Keynote on 2023 PyData Amsterdam](https://www.youtube.com/watch?v=C9p7suS-NGk&t=36s). As any of the other (un)finished notes I will not prioritize rigor here, but focus on the idea on my mind. So I'd like to start with a big one for me:

## The Goal of Model is not to (only) Predict

Welp, it maybe obvious to some, but it took a while for me to realize this. Especially since I came from a more academic background, most of the work ended after I benchmarked the model against certain dataset. The rest is the analysis around that.

%% change the following to be more inline with "What I called The rest is actually the real goal (well, not really, but quite close). Because what we want to do is not to only benchmark a model and then let it predict the result, but importantly analyzing and thinking about the domain our model resides is in.", will later change how the rest of paragraph will look like %%

And there's where I'm wrong, especially when I'm creating (ML/DL) model inside a company to solve business problem. What I called **The rest** is **The Goal** (well, not really, but quite close). Since what we want to do is not to only benchmark a model and then let it predict the result. While **it is exactly what the model does**, but doesn't necessarily means that's the goal. We know that continuous improvement and monitoring is important, but personally I focused too much on the improvement of the model. So

> The model's goal is to help us continuously improve our understanding of the problem domain, which will inform us on how to make better decision.

By this definition of the goal, we should not only prioritize the metrics, but also figuring out the why of certain thing fit into a certain model. And this is what makes Unsupervised Learning clicks for me.

## Supervising Unsupervised Learning

Before talking about supervising unsupervised learning, I'd like to talk a bit about a boring stuff, i.e. supervising supervised learning. In supervised learning the model learned while given the correct label, and then will be evaluated by another unseen subset to evaluate the model performance. Supervising supervised learning is a meta concept and may include stuffs like:
1. Monitoring model performance over time
2. Deciding which data to be labeled and given back to the model
3. Creating an "obvious subset" to make sure that the model doesn't do anything to out there
4. Monitoring the dataset changes over time to assess the model relevancy
5. And many more
supervising supervised learning is more of an exercise in understanding problem domain's ties with the learning process. And this bring us to supervising unsupervised learning.

Supervising unsupervised learning means that **we supervise the result of a supervised learning model to improve our understanding of the problem domain's ties with unsupervised learning process**. I used to stop at using unsupervised learning to create a pseudo label to be discussed further with relevant stakeholders. But with supervising unsupervised learning, we're delegating the supervision of the "label" (or understanding of the model's fit) to the modeler and stakeholder. With sufficient knowledge about certain models assumption and constraint, we could formulate hypotheses to increase our understanding of the problem. And supervising it by
1. Monitoring the models behaviour changes by different subset of data
2. Deciding which subset of data used to certain domain problem
3. Creating an "obvious label" to make sure that we could tune our model to create similar fit
4. Monitoring the dataset changes over time to asses the model relevancy
5. And many more that I haven't thought of yet

## Where to Go from here

I focus on the "using model to learn more about problem domain together with stakeholder" aspect here. But by going back to first principle of understanding a problem to better solve it or to decide going after another problem, we could utilize our toolset in a way that may not be obvious but can bring significant impact to our work. 

If you found mistake, disagree with me, has anything to add, or just want to discuss further, you can do so on [my twitter (or X?)](https://twitter.com/banditelolRP). Because one of the reason why I'm writing is to spark a more discussion with people around me :).