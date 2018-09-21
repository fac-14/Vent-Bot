# Say ['Hi!'](https://vent-bot.herokuapp.com/) to VentBot? ![travis build](https://travis-ci.org/fac-14/Vent-Bot.svg?branch=master) [![codecov](https://codecov.io/gh/fac-14/Vent-Bot/branch/master/graph/badge.svg)](https://codecov.io/gh/fac-14/Vent-Bot)

![](https://i.imgur.com/JPIISdQ.gif)

## Who is VentBot?
VentBot is a chatbot always available (and happy) to hear about your problems. Its superpower is guiding you towards letting your problems go.

## Why a VentBot? 
* We wanted to help people stuck in obsessive thought patterns break the cycle and challenge those thoughts that might be negative
* Although the overall idea borrows techniques from Cognitive Behavioural Therapy (CBT), VentBot is **not** a therapist - more like a friend helping you to move on

## How does VentBot work?
* VentBot uses a script of questions inspired by CBT, combined with empathetic interjections that help the user feel listened to
* The empathy is provided by analysing the user's messages with Dialogflow, a natural language processing API that we trained to recognise common 'intents' such as loneliness, conflict and sadness   

## What's next for VentBot?
The dream would be to make VentBot super intuitive and really feel like a trusted best friend listening to your problems and help you leave them in the past. 

---

#### If you've got time, here is the long version...  
 
## Design sprint  
#### We thought we knew what we wanted to do 
* We started the project wanting to help people with their work/life balance, assuming that a separation between the two is needed

#### Then we did [user research](https://hackmd.io/9TG94oQHRQSr_ehF9W2XQQ)...
* Our user research made it clear that thinking about work outside of office hours is not always a bad thing

> _"I work better under pressure and imminent deadlines"_

> _"Most of the time I'm not trying to switch off, I'm not failing at it as I'm not trying. I feel maybe I would struggle if I tried."_

* Only thoughts that get in the way of what you want to do might make you feel stressed or unhappy


#### Defined problem statements and picked a 'How might we...'

> Harriet needs a way to _switch off after work_ so that _she can stop negative work thoughts_ 

> Harriet needs a _way to relieve stressful, distracting thoughts_ so that _she can relax when she'd had a hard day/is bothered by them_

> Harriet needs _a way to clear her mind_ so that _she can achieve a good work/life balance_

#### _How might we: help users let go of stressful, distracting thoughts?_

#### What if it was a chatbot?
* Knowing that one of the aims of CBT is to challenge negative thoughts and break upsetting thought patterns, we discussed getting users to collect their thoughts in a journal 
* We agreed that a chatbot format would be the most engaging way for users to collect this information

![Agreed functionality on post-its](https://i.imgur.com/9VazOQk.jpg)

---

## Build sprint :wrench:

#### Deciding MVP user stories:
- [x] Users want to be introduced to the bot and understand what to do
- [x] Users want to be able to chat with an empatheic bot
- [x] Users want be prompted by bot to set their thoughts free  
- [ ] Users want to be able to log in 
- [ ] Logged in users want to be able to save their conversations in a database
- [ ] Logged in users want to be able to see and analyse thought patterns
- [ ] Logged in users want to log out   

#### Initial software architecture
![](https://i.imgur.com/U8rke5e.jpg)

#### Actual tech stack
- [x] Node.js
- [x] Express.js
- [x] Hanldebars.js
- [x] DialogFlow API

#### Making the chatbot
* To make the bot guide the user through reflective thinking, we have **hardcoded nine questions in JavaScript** that asks the user to:  
  1. Describe an upsetting situation
  2. Share their emotions, thoughts and physical reaction to the situation 
  3. Reflect over the feelings other people involved in the situation may have experienced
* To add off-script personality, **we send the user input to DialogFlow API**:    
   iv. If the API is able to recognise the intent of the message it will match it with an approptiate reply
 
 --- 
 
 > :thinking: **_"But how does the DialogFlow API recognise intent?"_**  
 
 > _"After signing up or signing in to a Google Service Account you will need to create an "Agent" (that will hold all of your programmed intents). If you're using `node.js`, follow the instructions in this [node.js client](googleapis/nodejs-dialogflow). Make an xhr request from your site point to the Agent (although, the code given in the node.js client works when it came to deployment on Heroku we had most [luck not using promises](https://github.com/fac-14/Vent-Bot/blob/master/src/controllers/routes/message.js) as in the given in the example). With our code we only had to add a SESSION_ID and a CLIENT_TOKEN to a `config.env` file to authorise the live site to access the Agent."_

 > :thinking: **_"How did you write your intents for the DialogFlow API?"_**

> _"Once the default 'welcome' intent was giving us friendly greetings, we filled our Agent (usning the DialogFlow interface) with intents named after emotions, fed it lines that users feeling that emotion might type and finally crafted some responses for the bot to feed back."_

---

#### Design challenges
- [x] Wireframing and colour scheme 
- [x] Create a chat experinece with personality that feels intuitive
- [x] Develop an animation that representing letting go of a problem and moving beyond it
- [x] Elevate user experinece by building interface animations 

#### Developing wireframes and selecting colour scheme in Figma
![wireframes](https://i.imgur.com/BnbuDTV.png)

#### Chat animations

#### Let it go animation

#### Interface animation


---

#### Running the app locally for QA :wink:
 1. Clone the repo
 2. Make a `config.env` file using the details shared in the Gitter channel
 3. Run `npm install` to install all dependencies
 4. Run `npm run dev` to start the app
 
---
