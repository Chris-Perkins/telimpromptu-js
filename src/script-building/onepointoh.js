[
    {
      "tags": [
        "INTRODUCTION"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "I'm {@host} {@host_lastname} with Telimpromptu news."
        },
        {
          "speaker": "COHOST",
          "text": "And I'm {@cohost} {@cohostlastname}!"
        },
        {
          "speaker": "HOST",
          "text": "Our leading story tonight {!main_story}. Here's what we know so far: {!main_story_info}"
        },
        {
          "speaker": "COHOST",
          "text": "Thats right {@host}. We are also being told {!main_story_info2}"
        }
      ],
      "prompts": [
        {
          "id": "main_story",
          "description": "The story of the night!"
        },
        {
          "id": "main_story_info",
          "description": "Initial details about the story, {!main_story}"
        },
        {
          "id": "main_story_info2",
          "description": "Details about the story, {!main_story}. We also know {!main_story_info}."
        }
      ]
    },
    {
      "tags": [
        "INTRODUCTION"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "You're watching Telimpromptu News, I'm your host, {@host} {@hostlastname}."
        },
        {
          "speaker": "COHOST",
          "text": "I'm {@cohost} {@cohostlastname}, tonight's story: {!main_story}"
        },
        {
          "speaker": "HOST",
          "text": "{!host_reaction_to_main_story}"
        },
        {
          "speaker": "COHOST",
          "text": "Telimpromptu News has some exclusive footage of the event, let's watch.\n\n{!youtube_video}\n\n"
        },
        {
          "speaker": "HOST",
          "text": "{!host_reaction_to_youtube_video}"
        }
      ],
      "prompts": [
        {
          "id": "main_story",
          "description": "The story of the night!"
        },
        {
          "id": "host_reaction_to_main_story",
          "description": "The host's reaction upon hearing the story for the first time, {!main_story}"
        },
        {
          "id": "youtube_video",
          "description": "Insert a link to a YouTube video that portrays {!main_story}\nLink to a timestamp if necessary"
        },
        {
          "id": "host_reaction_to_youtube_video",
          "description": "Write the host's commentary upon seeing video footage of {!main_story}"
        }
      ]
    },
    {
      "tags": [
        "SEGMENT"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "Joining us now is our guest expert {@guestexpert} {@guestexpertlastname} who has a {!expert-credentials}."
        },
        {
          "speaker": "HOST",
          "text": "Thank you for joining us."
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "Thank you for having me on {@host}."
        },
        {
          "speaker": "HOST",
          "text": "First question, {!expert_question1}?"
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "{!expert_initial_answer1}, {@host}, {!expert_full_answer1}"
        },
        {
          "speaker": "COHOST",
          "text": "Remarkable."
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "Maybe to some, but when you have a {!expert-credentials} like me, you see this kind of thing every day."
        },
        {
          "speaker": "COHOST",
          "text": "Next question, {@guestexpert}, {!expert_question2}?"
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "{!expert_initial_answer2}, {@cohost}, and here I should add a relevant detail to the case: {!guestexpert_detail}, as I will now demonstrate. (Demonstrates)"
        },
        {
          "speaker": "COHOST",
          "text": "Final question, {!expert_question3}?"
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "I'm sorry {@cohost}, I cant answer that question. When I obtained my {!expert-credentials}, I swore a solemn oath.\n(Places hand on heart)\n{!expert_oath}"
        },
        {
          "speaker": "HOST",
          "text": "That's {@guestexpert} {@guestexpertlastname}. Thank you for your time, {@guestexpert}."
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "Thank you."
        }
      ],
      "prompts": [
        {
          "id": "expert-credentials",
          "description": "The credentials that the expert has\ne.g. 'PhD in Rocks'"
        },
        {
          "groupId": "expert_initialanswers",
          "subPrompts": [
            {
              "id": "expert_initial_answer1",
              "description": "The guest expert's first answer to a question that hasn't been written yet\ne.g. 'Yes', 'I can't answer that', 'No'"
            },
            {
              "id": "expert_initial_answer2",
              "description": "The guest expert's second answer to a question that hasn't been written yet"
            }
          ]
        },
        {
          "groupId": "expert_questions",
          "subPrompts": [
            {
              "id": "expert_question1",
              "description": "The first question the host asks to the guest expert. The guest expert's answer starts with '{!expert_initial_answer1}'"
            },
            {
              "id": "expert_question2",
              "description": "The second question the host asks to the guest expert. The guest expert's answer starts with '{!expert_initial_answer2}'"
            },
            {
              "id": "expert_question3",
              "description": "The third question the host asks to the reporter. The guest expert will say they can't answer it."
            }
          ]
        },
        {
          "groupId": "expert_full_answers",
          "subPrompts": [
            {
              "id": "expert_full_answer1",
              "description": "The answer to {!expert_question1} which starts with {!expert_initial_answer1}"
            },
            {
              "id": "guestexpert_detail",
              "description": "Write a detail for the guest expert to present that they will have to demonstrate themself."
            }
          ]
        },
        {
          "id": "expert_oath",
          "description": "Write the oath that the guest expert who has a {!expert-credentials} had to swear upon entering their field."
        }
      ]
    },
    {
      "tags": [
        "SEGMENT"
      ],
      "lines": [
        {
          "speaker": "COHOST",
          "text": "{@guestexpert} {@guestexpertlastname} has agreed to an exclusive interview with Telimpromptu News. He is a distinguished professional and has a {!expert-credentials}. {@guestexpert} {@guestexpertlastname}, thank you for joining us."
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "It's a pleasure to be here."
        },
        {
          "speaker": "COHOST",
          "text": "{@guestexpert}, in your professional opinion, what do you make of this story?"
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "Well, {!phony_expert_answer1}."
        },
        {
          "speaker": "COHOST",
          "text": "(Listening on ear piece) ...I've just received word from our sources that {!cohost_contradiction1}. {@guestexpert}, how do you respond to that?"
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "Well, ..I uh, (clears throat). It's clear that your 'sources' don't have a {!expert-credentials} like me, or they wouldn't even be asking such questions."
        },
        {
          "speaker": "COHOST",
          "text": "(Talking softly into ear piece)\nReally? I don't believe this.\n(Talking to guest expert) I've just gotten word that {!cohost_contradiction2}. {@guestexpert}, what do you have to say for yourself?"
        },
        {
          "speaker": "GUESTEXPERT",
          "text": "Uh....I...{!guest_expert_plea}."
        },
        {
          "speaker": "COHOST",
          "text": "Alright, I'm afraid we'll have to cut our interview short. I'm sorry about that, folks."
        }
      ],
      "prompts": [
        {
          "id": "expert-credentials",
          "description": "The credentials that the expert has. Eg: 'PHD in Rocks', 'Bachelors of Astronomy'"
        },
        {
          "id": "phony_expert_answer1",
          "description": "An expert account of the story for the guest expert, who claims to have a {!expert-credentials}. Make the guest expert's account unbelievable."
        },
        {
          "id": "cohost_contradiction1",
          "description": "The information the cohost receives that contradicts the guest expert's claim that {!phony_expert_answer1}."
        },
        {
          "id": "cohost_contradiction2",
          "description": "A piece of information that reveals that the guest expert does not really have a {!expert-credentials}. E.g. 'The University of Hampburgshire is not a real university'."
        },
        {
          "id": "guest_expert_plea",
          "description": "The guest expert has been found out to be a phony. Write his desperate plea that reveals his real reason for wanting to get on TV."
        }
      ]
    },
    {
      "tags": [
        "SEGMENT"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "We go now to field reporter {@fieldreporter} {@fieldreporterlastname}. {@fieldreporter} thank you for joining us."
        },
        {
          "speaker": "FIELDREPORTER",
          "text": "Thank you, {@host}."
        },
        {
          "speaker": "COHOST",
          "text": "Whats going on at the scene of the incident?"
        },
        {
          "speaker": "FIELDREPORTER",
          "text": "Well, {!fieldreporter_fieldreport1}."
        },
        {
          "speaker": "HOST",
          "text": "Anything else?"
        },
        {
          "speaker": "FIELDREPORTER",
          "text": "Yes, we have a quote from a witness who saw the incident firsthand. Quote, {!fieldreporter_quote}."
        },
        {
          "speaker": "COHOST",
          "text": "{!host_exclamation}!"
        },
        {
          "speaker": "HOST",
          "text": "{!host_exclamation} is right {@cohost}."
        },
        {
          "speaker": "COHOST",
          "text": "One last thing, {@fieldreporter}. Do you have a message for the families at home?"
        },
        {
          "speaker": "FIELDREPORTER",
          "text": "Yes, {!fieldreporter_familyanswer}."
        },
        {
          "speaker": "HOST",
          "text": "That's field reporter {@fieldreporter} {@fieldreporterlastname}. {@fieldreporter}, thank you."
        },
        {
          "speaker": "FIELDREPORTER",
          "text": "Thank you."
        }
      ],
      "prompts": [
        {
          "id": "fieldreporter_fieldreport1",
          "description": "Write 1+ sentences on what the field reporter sees at the scene of the incident."
        },
        {
          "id": "host_exclamation",
          "description": "An exclamation the host says. Eg: 'Wow' 'Holy moly'"
        },
        {
          "id": "fieldreporter_quote",
          "description": "Write a quote for the field reporter to present on something said by a witness who saw the incident firsthand."
        },
        {
          "id": "fieldreporter_familyanswer",
          "description": "Write a message for the field reporter to give to the families at home."
        }
      ]
    },
    {
      "tags": [
        "SEGMENT"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "Turning back now to the scene of the incident where I'm being told reporters have managed to get a few words with a witness who saw the event."
        },
        {
          "speaker": "WITNESS",
          "text": "(In a {!witness_voice} voice.)\n\n{!witness_account1}\n\n{!witness_account2}"
        },
        {
          "speaker": "COHOST",
          "text": "Enlightening."
        }
      ],
      "prompts": [
        {
          "id": "witness_voice",
          "description": "Write a silly voice for the witness to talk in, it should be a voice that the person reading can do. Ex. 'British', 'Mickey Mouse' The prompt will show up as: '(in a your_text_here voice)'"
        },
        {
          "id": "witness_account1",
          "description": "Write the first half of a witness' firsthand account of the scene in as many words as you like. They will be speaking in a {!witness_voice} voice."
        },
        {
          "id": "witness_account2",
          "description": "Write the second half half of a firsthand account of the scene in as many words as you like. It starts with: {!witness_account1}"
        }
      ]
    },
    {
      "tags": [
        "SEGMENT"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "This just in, I'm getting word that we've managed to get an exclusive interview with Detective {@detective} Gumshoe who is live on the scene. Detective, what can you share with us?"
        },
        {
          "speaker": "DETECTIVE",
          "text": "Well, the situation is worse than we thought, my team has just discovered that {!detective_info1}."
        },
        {
          "speaker": "HOST",
          "text": "Horrific."
        },
        {
          "speaker": "DETECTIVE",
          "text": "It gets worse. In all my years as a detective never before have I seen {!detective_info2}."
        },
        {
          "speaker": "HOST",
          "text": "Well detective, do you have any clues as to why this happened?"
        },
        {
          "speaker": "DETECTIVE",
          "text": "Indeed I do. A note was discovered at the scene of the incident, it reads: {!detective_note}."
        },
        {
          "speaker": "HOST",
          "text": "Detective, thank you for your time."
        }
      ],
      "prompts": [
        {
          "id": "detective_info1",
          "description": "Write a discovery for the detective to present. Context: 'Well, the situation is worse than we thought. My team has just discovered that (Your text here)."
        },
        {
          "id": "detective_info2",
          "description": "Write a discovery for the detective to present. Context: 'It gets worse, in all my years as a detective never before have I seen (your text here)"
        },
        {
          "id": "detective_note",
          "description": "The detective will present a note that was discovered at the scene. Write what the note says."
        }
      ]
    },
    {
      "tags": [
        "SEGMENT"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "Tonight we have a special treat for you all. We have {@zookeeper} the zookeeper here from the {!zoo_name}!"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "Thank you for having me on."
        },
        {
          "speaker": "HOST",
          "text": "So {@zookeeper}, what do you have for us tonight?"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "I've got my little buddy {!animal_name} with us. They're a little scared but they'll warm up to you pretty quick. Say hi {!animal_name}!\n\n(Make timid a {!animal_type} noise.)"
        },
        {
          "speaker": "HOST",
          "text": "Oh wow!"
        },
        {
          "speaker": "COHOST",
          "text": "You know, I have a special affinity for {!animal_type_plural}, once while I was on vacation {!cohost_animal_story}."
        },
        {
          "speaker": "HOST",
          "text": "Haha.... it seems like little {!animal_name} has warmed up to us! Arent you a nice little {!animal_type}\n\n(Zookeeper makes a friendly {!animal_type} noise.)"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "You know, {!animal_name} is actually pretty smart for a {!animal_type} and actually has some experience with the topic of tonight's story!"
        },
        {
          "speaker": "COHOST",
          "text": "Well isnt that something!"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "Yup. Go on, {!animal_name}, tell them what you think of tonight's story!\n\n(In an {!animal_type} voice)\n\n{!animal_story}"
        },
        {
          "speaker": "HOST",
          "text": "Well I'll be! A talking {!animal_type} incredible! Thank you for bringing them for us tonight."
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "No problem. Thank you for bringing me on.\n\n(Make an {!animal_type} noise that could maybe be interpreted as goodbye)"
        }
      ],
      "prompts": [
        {
          "id": "zoo_name",
          "description": "The name of a Zoo or somewhere that contains animals."
        },
        {
          "groupId": "animal_info",
          "subPrompts": [
            {
              "id": "animal_type",
              "description": "A type of animal the Zookeeper will bring on."
            },
            {
              "id": "animal_type_plural",
              "description": "That animal type... but plural."
            },
            {
              "id": "animal_name",
              "description": "The name of that animal."
            }
          ]
        },
        {
          "id": "cohost_animal_story",
          "description": "A story the cohost tells where they encountered an {!animal_type} on a vacation."
        },
        {
          "id": "animal_story",
          "description": "A story that a {!animal_type} tells in a {!animal_type} accent, relating to tonight's main story."
        }
      ]
    },
    {
      "tags": [
        "SEGMENT"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "Tonight we have a special treat for you all. We have {@zookeeper} the zookeeper here from the {!zoo_name}!"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "Thank you for having me on."
        },
        {
          "speaker": "HOST",
          "text": "So {@zookeeper}, what do you have for us tonight?"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "I've got my little buddy {!animal_name} with us. They're a little scared but they'll warm up to you pretty quick. Say hi {!animal_name}!\n\n(Make timid a {!animal_type} noise.)"
        },
        {
          "speaker": "HOST",
          "text": "Oh... uhh"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "(Make another {!animal_type} noise.)"
        },
        {
          "speaker": "HOST",
          "text": "You didn't bring an {!animal_type}, did you?"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "(Make an insisting {!animal_type} noise.)"
        },
        {
          "speaker": "COHOST",
          "text": "{!zookeeper_accusation}"
        },
        {
          "speaker": "ZOOKEEPER",
          "text": "{!zookeeper_buytime}"
        },
        {
          "speaker": "HOST",
          "text": "I'm so sorry about that everyone."
        }
      ],
      "prompts": [
        {
          "id": "zoo_name",
          "description": "The name of a Zoo or somewhere that contains animals."
        },
        {
          "groupId": "animal_info",
          "subPrompts": [
            {
              "id": "animal_type",
              "description": "A type of animal the Zookeeper will bring on."
            },
            {
              "id": "animal_type_plural",
              "description": "That animal type... but plural."
            },
            {
              "id": "animal_name",
              "description": "The name of that animal."
            }
          ]
        },
        {
          "id": "zookeeper_accusation",
          "description": "Something the cohost will say after they realize the zookeeper didn't actually bring an animal and is just making animal noises and pretending."
        },
        {
          "id": "zookeeper_buytime",
          "description": "Something the zookeeper says to buy time before they make their escape out of the studio after being discovered as a fraud."
        }
      ]
    },
    {
      "tags": [
        "SEGMENT"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "On the scene is {!religious_title} {@religiousleader} who practices {!religion_name}! {!religious_title} {@religiousleader}, what are you doing here?"
        },
        {
          "speaker": "RELIGIOUSLEADER",
          "text": "As the {!religious_title} of {!religion_name}, we believe in {!religion_description}. That is why I am here."
        },
        {
          "speaker": "HOST",
          "text": "I see. But what are you specifically doing on the scene?"
        },
        {
          "speaker": "RELIGIOUSLEADER",
          "text": "I am here to perform our ritual of {!religion_ritual}, where I will now {!religion_ritual_action}"
        },
        {
          "speaker": "HOST",
          "text": "You {!religious_leader_insult}! That will endanger everyone on scene!"
        },
        {
          "speaker": "RELIGIOUSLEADER",
          "text": "I disagree.\n(To the tune of {!chant_tune}) {!religious_chant_1}\n(Everyone joins in)\n{!religious_chant_2}-"
        },
        {
          "speaker": "HOST",
          "text": "(Make a loud interrupting noise) That's enough of that. Back to the news."
        }
      ],
      "prompts": [
        {
          "id": "religion_name",
          "description": "The name of a made-up religion"
        },
        {
          "groupId": "religion_info",
          "subPrompts": [
            {
              "id": "religious_title",
              "description": "The title for a religious leader who practices {!religion_name}"
            },
            {
              "id": "religion_description",
              "description": "The practices for a follower of {!religion_name}\nContext: \"As the (Religious Title), I must (Your text here)\""
            }
          ]
        },
        {
          "groupId": "ritual_info",
          "subPrompts": [
            {
              "id": "religion_ritual_action",
              "description": "The actions involved in a religious ritual performed by members of the {!religion_name} religion."
            },
            {
              "id": "religion_ritual",
              "description": "The name of that ritual."
            }
          ]
        },
        {
          "id": "religious_leader_insult",
          "description": "An insult for the leader of a religion named {!religion_name}"
        },
        {
          "id": "chant_tune",
          "description": "A song that {@religiousleader} will have to sing to the tune of"
        },
        {
          "id": "religious_chant_1",
          "description": "The first half of a chant for a religion named {!religion_name}\nThe chant will be to the tune of {!chant_tune}"
        },
        {
          "id": "religious_chant_2",
          "description": "The second half of a chant for a religion named {!religion_name}\nTune: {!chant_tune}\nFirst half: {!religious_chant_1}"
        }
      ]
    },
    {
      "tags": [
        "CLOSING"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "Well, there you have it folks. A story like this you only see once in a lifetime. {!host_story_description} {@cohost} its an unbelievable story isn't it?"
        },
        {
          "speaker": "COHOST",
          "text": "Well, it shouldn't be all that surprising given that {!cohost_statistic}."
        },
        {
          "speaker": "HOST",
          "text": "Well folks, that's all the time we have for tonight. Goodbye."
        }
      ],
      "prompts": [
        {
          "id": "host_story_description",
          "description": "A few words for the closing remarks of the story\nContext: \"Well, there you have it folks. A story like this you only see once in a lifetime. (Your text here)\""
        },
        {
          "id": "cohost_statistic",
          "description": "A fake fact or statistic for the CoHost to present\nContext: \"Perhaps this story shouldn't be all that surprising given that (Your text here)\""
        }
      ]
    },
    {
      "tags": [
        "CLOSING"
      ],
      "lines": [
        {
          "speaker": "HOST",
          "text": "Well that's all we have for tonight everyone. Truly something special isnt it, {@cohost}?"
        },
        {
          "speaker": "COHOST",
          "text": "It's like the old {!musical_artist} line, {!cohost_lyric}."
        },
        {
          "speaker": "HOST",
          "text": "You're right about that one. Well folks, that's all we've got for tonight. Telimpromptu news, signing off."
        }
      ],
      "prompts": [
        {
          "groupId": "cohost_music_reference",
          "subPrompts": [
            {
              "id": "cohost_lyric",
              "description": "A quote that the {@cohost} will say that somehow relates to tonight's story e.g. The lyrics to a song"
            },
            {
              "id": "musical_artist",
              "description": "The person who the quote is attributed to."
            }
          ]
        }
      ]
    }
  ]