export const segmentTags = {
  introduction: "introduction",
  segment: "segment",
  closing: "closing"
};

// key:
// {!prompt} prompts that the players fill out
// {@name} names of players, pre-filled out
// {#something} other data that is pre-filled and dynamic, like the topic or the headline

export const segments = [
  {
    tag: segmentTags.introduction,
    id: 'intro-1',
    topic: 'any',
    lines: [
      { speaker: 'Host', content: 'You\'re watching Telimpromptu News, I\'m your host, {@host} {@hostlastname}.' },
      { speaker: 'Cohost', content: 'And I\'m {@cohost} {@cohostlastname}, tonight\'s story: {#headline}' },
      { speaker: 'Host', content: '{!host-reaction-to-headline}' },
      { speaker: 'Cohost', content: 'Telimpromptu News has some exclusive footage of the event, let\'s watch.\n\n{!youtube-video}\n\n' },
      { speaker: 'Host', content: '{!host-reaction-to-youtube-video}' }
    ],
    prompts: [
      { id: 'host-reaction-to-main-story', description: 'The host\'s reaction upon hearing the story for the first time, {#headline}' },
      { id: 'youtube-video', description: 'Paste a link to a YouTube video that portrays {#headline}\nLink to a timestamp if necessary' },
      { id: 'host-reaction-to-youtube-video', description: 'Write the host\'s commentary upon seeing video footage of {#headline}' }
    ]
  },
  {
    tag: segmentTags.segment,
    id: 'guest-expert-1',
    topic: 'any',
    lines: [
      { speaker: 'Host', content: 'Joining us now is our guest expert {@guest-expert} {@guest-expertlastname} who has a {!expert-credentials}.' },
      { speaker: 'Host', content: 'Thank you for joining us.' },
      { speaker: 'guest-expert', content: 'Thank you for having me on {@host}.' },
      { speaker: 'Host', content: 'First question, {!expert-question1}?' },
      { speaker: 'guest-expert', content: '{!expert-initial-answer1}, {@host}, {!expert-full-answer1}' },
      { speaker: 'Cohost', content: 'Remarkable.' },
      { speaker: 'guest-expert', content: 'Maybe to some, but when you have a {!expert-credentials} like me, you see this kind of thing every day.' },
      { speaker: 'Cohost', content: 'Next question, {@guest-expert}, {!expert-question2}?' },
      { speaker: 'guest-expert', content: '{!expert-initial-answer2}, {@cohost}, and here I should add a relevant detail to the case: {!guest-expert-detail}, as I will now demonstrate. (Demonstrates)' },
      { speaker: 'Cohost', content: 'Final question, {!expert-question3}?' },
      { speaker: 'guest-expert', content: 'I\'m sorry {@cohost}, I can\'t answer that question. When I obtained my {!expert-credentials}, I swore a solemn oath.\n(Places hand on heart)\n{!expert-oath}' },
      { speaker: 'Host', content: 'That\'s {@guest-expert} {@guest-expertlastname}. Thank you for your time, {@guest-expert}.' },
      { speaker: 'guest-expert', content: 'Thank you.' }
    ],
    prompts: [
      { id: 'expert-credentials', description: 'The credentials that the expert has\ne.g. \'PhD in Rocks\'' },
      { id: 'expert-question1', description: 'The first question the host asks to the guest expert. The guest expert\'s answer starts with {!expert-initial-answer1}' },
      { id: 'expert-question2', description: 'The second question the host asks to the guest expert. The guest expert\'s answer starts with {!expert-initial-answer2}' },
      { id: 'expert-question3', description: 'The third question the host asks to the reporter. The guest expert will say they can\'t answer it.' },
      { id: 'expert-initial-answer1', description: 'The guest expert\'s first answer to a question that hasn\'t been written yet\ne.g. \'Yes\', \'I can\'t answer that\', \'No\'' },
      { id: 'expert-initial-answer2', description: 'The guest expert\'s second answer to a question that hasn\'t been written yet' },
      { id: 'expert-full-answer1', description: 'The answer to {!expert-question1} which starts with {!expert-initial-answer1}' },
      { id: 'guest-expert-detail', description: 'Write a detail for the guest expert to present that they will have to demonstrate themself.' },
      { id: 'expert-oath', description: 'Write the oath that the guest expert who has a {!expert-credentials} had to swear upon entering their field.' }
    ]
  },
  {
    tag: segmentTags.segment,
    id: 'guest-expert-2',
    topic: 'any',
    lines: [
      { speaker: 'Cohost', content: '{@guest-expert} {@guest-expertlastname} has agreed to an exclusive interview with Telimpromptu News. He is a distinguished professional and has a {!expert-credentials}. {@guest-expert} {@guest-expertlastname}, thank you for joining us.' },
      { speaker: 'guest-expert', content: 'It\'s a pleasure to be here.' },
      { speaker: 'Cohost', content: '{@guest-expert}, in your professional opinion, what do you make of this story?' },
      { speaker: 'guest-expert', content: 'Well, {!phony-expert-answer1}.' },
      { speaker: 'Cohost', content: '(Listening on ear piece) ...I\'ve just received word from our sources that {!cohost-contradiction1}. {@guest-expert}, how do you respond to that?' },
      { speaker: 'guest-expert', content: 'Well, ..I uh, (clears throat). It\'s clear that your \'sources\' don\'t have a {!expert-credentials} like me, or they wouldn\'t even be asking such questions.' },
      { speaker: 'Cohost', content: '(Talking softly into ear piece)\nReally? I don\'t believe this.\n(Talking to guest expert) I\'ve just gotten word that {!cohost-contradiction2}. {@guest-expert}, what do you have to say for yourself?' },
      { speaker: 'guest-expert', content: 'Uh....I...{!guest-expert-plea}.' },
      { speaker: 'Cohost', content: 'Alright, I\'m afraid we\'ll have to cut our interview short. I\'m sorry about that, folks.' }
    ],
    prompts: [
      { id: 'expert-credentials', description: 'The credentials that the expert has. Eg: \'PHD in Rocks\', \'Bachelors of Astronomy\'' },
      { id: 'phony-expert-answer1', description: 'An expert account of the story for the guest expert, who claims to have a {!expert-credentials}. Make the guest expert\'s account unbelievable.' },
      { id: 'cohost-contradiction1', description: 'The information the cohost receives that contradicts the guest expert\'s claim that {!phony-expert-answer1}.' },
      { id: 'cohost-contradiction2', description: 'A piece of information that reveals that the guest expert does not really have a {!expert-credentials}. E.g. \'The University of Hampburgshire is not a real university\'.' },
      { id: 'guest-expert-plea', description: 'The guest expert has been found out to be a phony. Write his desperate plea that reveals his real reason for wanting to get on TV.' }
    ]
  },
  {
    tag: segmentTags.segment,
    id: 'field-reporter-1',
    topic: 'any',
    lines: [
      { speaker: 'Host', content: 'We go now to field reporter {@fieldreporter} {@fieldreporterlastname}. {@fieldreporter} thank you for joining us.' },
      { speaker: 'Fieldreporter', content: 'Thank you, {@host}.' },
      { speaker: 'Cohost', content: 'Whats going on at the scene of the incident?' },
      { speaker: 'Fieldreporter', content: 'Well, {!fieldreporter-fieldreport1}.' },
      { speaker: 'Host', content: 'Anything else?' },
      { speaker: 'Fieldreporter', content: 'Yes, we have a quote from a witness who saw the incident firsthand. Quote, {!fieldreporter-quote}.' },
      { speaker: 'Cohost', content: '{!host-exclamation}!' },
      { speaker: 'Host', content: '{!host-exclamation} is right {@cohost}.' },
      { speaker: 'Cohost', content: 'One last thing, {@fieldreporter}. Do you have a message for the families at home?' },
      { speaker: 'Fieldreporter', content: 'Yes, {!fieldreporter-familyanswer}.' },
      { speaker: 'Host', content: 'That\'s field reporter {@fieldreporter} {@fieldreporterlastname}. {@fieldreporter}, thank you.' },
      { speaker: 'Fieldreporter', content: 'Thank you.' }
    ],
    prompts: [
      { id: 'fieldreporter-fieldreport1', description: 'Write 1+ sentences on what the field reporter sees at the scene of the incident.' },
      { id: 'host-exclamation', description: 'An exclamation the host says. Eg: \'Wow\' \'Holy moly\'' },
      { id: 'fieldreporter-quote', description: 'Write a quote for the field reporter to present on something said by a witness who saw the incident firsthand.' },
      { id: 'fieldreporter-familyanswer', description: 'Write a message for the field reporter to give to the families at home.' }
    ]
  },
  // ------------- CRIME ---------------
  {
    tag: segmentTags.segment,
    id: 'crime-1',
    topic: 'crime',
    lines: [
      { speaker: 'Host', content: 'Turning back now to the scene of the incident where I\'m being told reporters have managed to get a few words with a witness who saw the event.' },
      { speaker: 'Witness', content: '(In a {!witness-voice} voice.)\n\n{!witness-account1}\n\n{!witness-account2}' },
      { speaker: 'Cohost', content: 'Enlightening.' }
    ],
    prompts: [
      { id: 'witness-voice', description: 'Write a silly voice for the witness to talk in, it should be a voice that the person reading can do. Ex. \'British\', \'Mickey Mouse\' The prompt will show up as: \'(in a your-text-here voice)\'' },
      { id: 'witness-account1', description: 'Write the first half of a witness\' firsthand account of the scene in as many words as you like. They will be speaking in a {!witness-voice} voice.' },
      { id: 'witness-account2', description: 'Write the second half half of a firsthand account of the scene in as many words as you like. It starts with: {!witness-account1}' }
    ]
  },
  {
    tag: segmentTags.segment,
    id: 'crime-2',
    topic: 'crime',
    lines: [
      { speaker: 'Host', content: 'This just in, I\'m getting word that we\'ve managed to get an exclusive interview with Detective {@detective} Gumshoe who is live on the scene. Detective, what can you share with us?' },
      { speaker: 'Detective', content: 'Well, the situation is worse than we thought, my team has just discovered that {!detective-info1}.' },
      { speaker: 'Host', content: 'Horrific.' },
      { speaker: 'Detective', content: 'It gets worse. In all my years as a detective never before have I seen {!detective-info2}.' },
      { speaker: 'Host', content: 'Well detective, do you have any clues as to why this happened?' },
      { speaker: 'Detective', content: 'Indeed I do. A note was discovered at the scene of the incident, it reads: {!detective-note}.' },
      { speaker: 'Host', content: 'Detective, thank you for your time.' }
    ],
    prompts: [
      { id: 'detective-info1', description: 'Write a discovery for the detective to present. Context: \'Well, the situation is worse than we thought. My team has just discovered that (Your text here).' },
      { id: 'detective-info2', description: 'Write a discovery for the detective to present. Context: \'It gets worse, in all my years as a detective never before have I seen (your text here)\'' },
      { id: 'detective-note', description: 'The detective will present a note that was discovered at the scene. Write what the note says.' }
    ]
  },
  // ------------------ POLITICS ------------------
  {
    tag: segmentTags.segment,
    id: 'campaign-strategist-1',
    topic: 'politics',
    lines: [
      { speaker: 'Host', content: 'Let\'s connect with our campaign strategist, {@campaign-strategist}, at the national convention. How\'s it going?' },
      { speaker: 'Campaign-strategist', content: 'Well, {@host}, it\'s going wildly. We\'ve just unveiled our plan to improve national security. {!national-security-plan}' },
      { speaker: 'Host', content: '{!national-security-plan} ...for national security?' },
      { speaker: 'Campaign-strategist', content: 'Yes, it\'s part of our new initiative we call {!security-initiative-name}' },
      { speaker: 'Host', content: '{!host-exclamation}! Quite the innovative approach. How do you foresee this improving national security?' },
      { speaker: 'Campaign-strategist', content: 'Well that\'s simple, really. {!security-initative-explanation}' },
      { speaker: 'Host', content: 'Thanks for the update, {@campaign-strategist}.' },
      { speaker: 'Campaign-strategist', content: 'Anytime, {@host}.' }
    ],
    prompts: [
      { id: 'national-security-plan', description: '{@campaign-strategist}\'s new plan for national security. Eg: \'Training squirrels\''},
      { id: 'security-initiative-name', description: 'A catchy name for a new national security initiative: {!national-security-plan}.' },
      { id: 'host-exclamation', description: 'An exclamation the host says. Eg: \'Astounding\' \'Holy toledo\'' },
      { id: 'security-initiative-explanation', description: 'An explanation for how {!national-security-plan} will improve national security'}
    ]
  },
  // ----------------- SPORTS -------------------------
  {
    tag: segmentTags.segment,
    id: 'analyst-1',
    topic: 'sports',
    lines: [
      { speaker: 'Host', content: 'We\'re live with our sports analyst, {@analyst}. What\'s the atmosphere like at today\'s game?' },
      { speaker: 'Analyst', content: 'Thanks, {@host}. It\'s electric here! The coach just introduced a new team mascot, {!mascot}, to boost morale!' },
      { speaker: 'Host', content: 'A ... {!mascot}? That\'s a new one.' },
      { speaker: 'Analyst', content: 'Absolutely, and it seems to be working. The players are loving it and even the fans are joining in by {!fan-mascot-action}' },
      { speaker: 'Host', content: '{!host-exclamation}, that sounds like a godo time in the stands!' },
      { speaker: 'Analyst', content: 'Yup, it\'s all about the fun today.' },
      { speaker: 'Cohost', content: 'Keep us in the loop, {@analyst}. Thanks for the update.' },
      { speaker: 'Analyst', content: 'Will do, {@cohost}!' }
    ],
    prompts: [
      { id: 'mascot', description: 'A new mascot for the sports team that the coach is unveiling' },
      { id: 'fan-mascot-action', description: 'A description of what fans are doing in reaction to the unveiling of the team\'s new mascot, {!mascot}' },
      { id: 'host-exclamation', description: 'An exclamation the host says. Eg: \'That\'s spicy\' \'Unbelievable\'' }
    ]
  },
  {
    tag: segmentTags.segment,
    id: 'coach-1',
    topic: 'sports',
    lines: [
      { speaker: 'Host', content: 'We\'re live with Coach {@coach}. How are things shaking up at the stadium today?' },
      { speaker: 'Coach', content: 'Exciting times, {@host}! I\'m happy to unveil a new cheer, {!new-cheer}, to rally the fans!' },
      { speaker: 'Host', content: '{!new-cheer}? What do fans do?' },
      { speaker: 'Coach', content: '{!cheer-description}' },
      { speaker: 'Host', content: '{!host-exclamation}, that must be quite the sight!' },
      { speaker: 'Coach', content: 'Oh, it is.' },
      { speaker: 'Cohost', content: 'Could you give us a demonstration?' },
      { speaker: 'Coach', content: 'I\'d be happy to. *demonstrates*' },
      { speaker: 'Host', content: 'I think I\'ll give it a try! *demonstrates*' },
      { speaker: 'Cohost', content: 'Coach {@coach}, thank you for your time.' },
    ],
    prompts: [
      { id: 'new-cheer-name', description: 'The name of a new cheer that the coach will introduce for the fans to perform at the game.' },
      { id: 'cheer-description', description: 'Describe what a cheer called {!new-cheer-name} involves. E.g. \'Fans beat their chest and chant \'HOOT GROWL HOOT GROWL\'' },
      { id: 'host-exclamation', description: 'An exclamation the host says. Eg: \'Incredible\' \'What a vibe!\'' }
    ]
  },
  {
    tag: segmentTags.closing,
    id: 'closing-1',
    topic: 'any',
    lines: [
      { speaker: 'Host', content: 'Well, there you have it folks. A story like this you only see once in a lifetime. {!host-story-description} {@cohost} its an unbelievable story isn\'t it?' },
      { speaker: 'Cohost', content: 'Well, it shouldn\'t be all that surprising given that {!cohost-statistic}.' },
      { speaker: 'Host', content: 'Well folks, that\'s all the time we have for tonight. Goodbye.' }
    ],
    prompts: [
      { id: 'host-story-description', description: 'A few words for the closing remarks of the story\nContext: "Well, there you have it folks. A story like this you only see once in a lifetime. (Your text here)"' },
      { id: 'cohost-statistic', description: 'A fake fact or statistic for the CoHost to present\nContext: "Perhaps this story shouldn\'t be all that surprising given that (Your text here)"' }
    ]
  },
  {
    tag: segmentTags.closing,
    id: 'closing-2',
    topic: 'any',
    lines: [
      { speaker: 'Host', content: 'Well that\'s all we have for tonight everyone. Truly something special isn\'t it, {@cohost}?' },
      { speaker: 'Cohost', content: 'It\'s like the old {!musical-artist} line, {!cohost-lyric}.' },
      { speaker: 'Host', content: 'You\'re right about that one. Well folks, that\'s all we\'ve got for tonight. Telimpromptu news, signing off.' }
    ],
    prompts: [
      { id: 'cohost-lyric', description: 'A quote that the {@cohost} will say that somehow relates to tonight\'s story e.g. The lyrics to a song' },
      { id: 'musical-artist', description: 'The person who the quote is attributed to.' }
    ]
  }
]