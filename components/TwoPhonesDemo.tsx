'use client'

import { useState, useEffect, useRef } from 'react'
import AudioWave from './AudioWave'
import PhoneFrame from './PhoneFrame'
import { User, Globe2, Volume2, VolumeX, ChevronDown, ArrowDownRight } from 'lucide-react'
import BridgeIcon from './BridgeIcon'

const englishPhrases = [
  "Hey! What's up?",
  "Not much, just chilling! How was your day?",
  "It was pretty good! Went to the park with my dog.",
  "Aw, that sounds fun! What kind of dog do you have?",
  "He's a golden retriever, super friendly!",
  "Aww, I love golden retrievers! They're so cute.",
  "Yeah, he's the best! What about you, any plans for the weekend?",
  "Just gonna hang out with friends, maybe watch a movie.",
  "Nice! What kind of movies do you like?",
  "I'm into action and comedy, but honestly I'll watch anything!",
  "Same here! Have you seen that new one everyone's talking about?",
  "Oh yeah! I've been meaning to check it out. Is it good?",
  "It's hilarious! You should definitely watch it.",
  "Cool, I'll add it to my list! Thanks for the recommendation."
]

// Response phrases for each language (what the callee responds with)
const languageResponses = {
  ar: [
    "مرحبا! أنا بخير، شكراً!",
    "يومي كان رائع! شفت فيلم جديد.",
    "واو، كلبك يبدو لطيف!",
    "أنا عندي قط، اسمه ميشو.",
    "القطط لطيفة جداً أيضاً!",
    "أيوة، هو رفيقي المفضل.",
    "أنا راح أروح للشاطئ مع أصحابي.",
    "يبدو ممتع! استمتع!",
    "أنا أحب الأفلام الرومانسية والدراما.",
    "ممتاز! في أفلام كتير حلوة.",
    "أيوة، شفته البارحة! حلو جداً.",
    "أنا راح أشوفه اليوم إن شاء الله.",
    "ممتاز! راح يعجبك.",
    "شكراً! راح أشوفه قريب."
  ],
  es: [
    "¡Hola! Estoy bien, ¡gracias!",
    "¡Mi día fue genial! Vi una película nueva.",
    "¡Vaya, tu perro se ve lindo!",
    "Yo tengo un gato, se llama Micho.",
    "¡Los gatos también son muy lindos!",
    "Sí, es mi mejor amigo.",
    "Voy a ir a la playa con mis amigos.",
    "¡Suena divertido! ¡Disfruta!",
    "Me encantan las películas románticas y de drama.",
    "¡Excelente! Hay muchas películas buenas.",
    "¡Sí, la vi anoche! Es muy buena.",
    "Voy a verla hoy, si Dios quiere.",
    "¡Perfecto! Te va a gustar.",
    "¡Gracias! La veré pronto."
  ],
  zh: [
    "你好！我很好，谢谢！",
    "我的一天很棒！我看了一部新电影。",
    "哇，你的狗看起来很可爱！",
    "我有一只猫，叫米修。",
    "猫也很可爱！",
    "是的，它是我最好的朋友。",
    "我要和朋友们去海滩。",
    "听起来很有趣！玩得开心！",
    "我喜欢浪漫和戏剧电影。",
    "太好了！有很多好电影。",
    "是的，我昨晚看了！非常好。",
    "我今天要去看，如果上帝愿意的话。",
    "太好了！你会喜欢的。",
    "谢谢！我很快就会看。"
  ],
  fr: [
    "Salut ! Je vais bien, merci !",
    "Ma journée était géniale ! J'ai vu un nouveau film.",
    "Wow, ton chien a l'air mignon !",
    "J'ai un chat, il s'appelle Micho.",
    "Les chats sont aussi très mignons !",
    "Oui, c'est mon meilleur ami.",
    "Je vais aller à la plage avec mes amis.",
    "Ça a l'air amusant ! Amuse-toi bien !",
    "J'adore les films romantiques et dramatiques.",
    "Excellent ! Il y a beaucoup de bons films.",
    "Oui, je l'ai vu hier soir ! C'est très bien.",
    "Je vais le voir aujourd'hui, si Dieu le veut.",
    "Parfait ! Tu vas l'aimer.",
    "Merci ! Je le verrai bientôt."
  ],
  de: [
    "Hallo! Mir geht's gut, danke!",
    "Mein Tag war großartig! Ich habe einen neuen Film gesehen.",
    "Wow, dein Hund sieht süß aus!",
    "Ich habe eine Katze, sie heißt Micho.",
    "Katzen sind auch sehr süß!",
    "Ja, sie ist mein bester Freund.",
    "Ich gehe mit meinen Freunden zum Strand.",
    "Klingt lustig! Viel Spaß!",
    "Ich liebe romantische und dramatische Filme.",
    "Ausgezeichnet! Es gibt viele gute Filme.",
    "Ja, ich habe ihn gestern Abend gesehen! Sehr gut.",
    "Ich werde ihn heute sehen, so Gott will.",
    "Perfekt! Du wirst ihn lieben.",
    "Danke! Ich werde ihn bald sehen."
  ],
  ja: [
    "こんにちは！元気だよ、ありがとう！",
    "今日は最高だった！新しい映画を見たんだ。",
    "わあ、あなたの犬、可愛いね！",
    "僕は猫を飼ってるんだ、名前はミショ。",
    "猫もすごく可愛いよね！",
    "うん、最高の友達なんだ。",
    "友達とビーチに行く予定なんだ。",
    "楽しそう！楽しんでね！",
    "ロマンチックとドラマの映画が好きなんだ。",
    "素晴らしい！いい映画がたくさんあるよね。",
    "うん、昨夜見たよ！すごくいい。",
    "今日見る予定なんだ、神様が許してくれれば。",
    "完璧！絶対気に入るよ。",
    "ありがとう！すぐに見るね。"
  ]
}

// English translations for the responses (what the callee said, translated to English)
const responseTranslations = {
  ar: [
    "Hello! I'm fine, thanks!",
    "My day was great! I watched a new movie.",
    "Wow, your dog looks cute!",
    "I have a cat, his name is Micho.",
    "Cats are very cute too!",
    "Yeah, he's my best friend.",
    "I'm going to the beach with my friends.",
    "Sounds fun! Enjoy!",
    "I love romantic and drama movies.",
    "Excellent! There are many good movies.",
    "Yeah, I watched it last night! It's very good.",
    "I'm going to watch it today, God willing.",
    "Perfect! You'll like it.",
    "Thanks! I'll watch it soon."
  ],
  es: [
    "Hello! I'm fine, thanks!",
    "My day was great! I watched a new movie.",
    "Wow, your dog looks cute!",
    "I have a cat, his name is Micho.",
    "Cats are very cute too!",
    "Yeah, he's my best friend.",
    "I'm going to the beach with my friends.",
    "Sounds fun! Enjoy!",
    "I love romantic and drama movies.",
    "Excellent! There are many good movies.",
    "Yeah, I watched it last night! It's very good.",
    "I'm going to watch it today, God willing.",
    "Perfect! You'll like it.",
    "Thanks! I'll watch it soon."
  ],
  zh: [
    "Hello! I'm fine, thanks!",
    "My day was great! I watched a new movie.",
    "Wow, your dog looks cute!",
    "I have a cat, his name is Micho.",
    "Cats are very cute too!",
    "Yeah, he's my best friend.",
    "I'm going to the beach with my friends.",
    "Sounds fun! Enjoy!",
    "I love romantic and drama movies.",
    "Excellent! There are many good movies.",
    "Yeah, I watched it last night! It's very good.",
    "I'm going to watch it today, God willing.",
    "Perfect! You'll like it.",
    "Thanks! I'll watch it soon."
  ],
  fr: [
    "Hello! I'm fine, thanks!",
    "My day was great! I watched a new movie.",
    "Wow, your dog looks cute!",
    "I have a cat, his name is Micho.",
    "Cats are very cute too!",
    "Yeah, he's my best friend.",
    "I'm going to the beach with my friends.",
    "Sounds fun! Enjoy!",
    "I love romantic and drama movies.",
    "Excellent! There are many good movies.",
    "Yeah, I watched it last night! It's very good.",
    "I'm going to watch it today, God willing.",
    "Perfect! You'll like it.",
    "Thanks! I'll watch it soon."
  ],
  de: [
    "Hello! I'm fine, thanks!",
    "My day was great! I watched a new movie.",
    "Wow, your dog looks cute!",
    "I have a cat, his name is Micho.",
    "Cats are very cute too!",
    "Yeah, he's my best friend.",
    "I'm going to the beach with my friends.",
    "Sounds fun! Enjoy!",
    "I love romantic and drama movies.",
    "Excellent! There are many good movies.",
    "Yeah, I watched it last night! It's very good.",
    "I'm going to watch it today, God willing.",
    "Perfect! You'll like it.",
    "Thanks! I'll watch it soon."
  ],
  ja: [
    "Hello! I'm fine, thanks!",
    "My day was great! I watched a new movie.",
    "Wow, your dog looks cute!",
    "I have a cat, his name is Micho.",
    "Cats are very cute too!",
    "Yeah, he's my best friend.",
    "I'm going to the beach with my friends.",
    "Sounds fun! Enjoy!",
    "I love romantic and drama movies.",
    "Excellent! There are many good movies.",
    "Yeah, I watched it last night! It's very good.",
    "I'm going to watch it today, God willing.",
    "Perfect! You'll like it.",
    "Thanks! I'll watch it soon."
  ]
}

// Language configurations
const languages = {
  ar: {
    name: 'العربية',
    nativeName: 'العربية',
    code: 'ar-SA',
    phrases: [
      "مرحبا! كيفك؟",
      "والله مافي شي، قاعدة أسترخي! كيف كان يومك؟",
      "كان حلو! رحت للمنتزه مع كلبي.",
      "واو، يبدو ممتع! إيش نوع الكلب عندك؟",
      "هو جولدن ريتريفر، لطيف جداً!",
      "أوه، أحب الجولدن ريتريفر! لطيفين جداً.",
      "أيوة، هو الأفضل! وأنت، في خطط للويكند؟",
      "بس راح أتسكع مع أصحابي، يمكن نشوف فيلم.",
      "حلو! إيش نوع الأفلام اللي تحبها؟",
      "أحب الأكشن والكوميديا، بس بصراحة أشوف أي شي!",
      "نفس الشي! شفت الفيلم الجديد اللي الكل يتكلم عنه؟",
      "أيوة! كنت ناوي أشوفه. هو حلو؟",
      "مضحك جداً! لازم تشوفه.",
      "كوول، راح أضيفه للقائمة! شكراً على التوصية."
    ],
    rtl: true
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es-ES',
    phrases: [
      "¡Hola! ¿Qué tal?",
      "Nada mucho, solo relajándome! ¿Cómo estuvo tu día?",
      "¡Estuvo bastante bien! Fui al parque con mi perro.",
      "¡Ay, suena divertido! ¿Qué tipo de perro tienes?",
      "¡Es un golden retriever, súper amigable!",
      "¡Ay, me encantan los golden retrievers! Son tan lindos.",
      "¡Sí, es el mejor! ¿Y tú, tienes planes para el fin de semana?",
      "Solo voy a pasar el rato con amigos, tal vez ver una película.",
      "¡Genial! ¿Qué tipo de películas te gustan?",
      "Me gustan las de acción y comedia, pero honestamente veré cualquier cosa!",
      "¡Igual aquí! ¿Has visto esa nueva de la que todos hablan?",
      "¡Oh sí! He estado queriendo verla. ¿Está buena?",
      "¡Es hilarante! Definitivamente deberías verla.",
      "¡Genial, la agregaré a mi lista! Gracias por la recomendación."
    ],
    rtl: false
  },
  zh: {
    name: 'Chinese',
    nativeName: '中文',
    code: 'zh-CN',
    phrases: [
      "嘿！怎么样？",
      "没什么，就是放松一下！你今天过得怎么样？",
      "挺好的！我带我的狗去公园了。",
      "哇，听起来很有趣！你养的是什么狗？",
      "是金毛猎犬，超级友好！",
      "哦，我喜欢金毛猎犬！它们太可爱了。",
      "是的，它是最好的！你呢，周末有什么计划吗？",
      "就是和朋友一起玩，也许看个电影。",
      "不错！你喜欢什么类型的电影？",
      "我喜欢动作片和喜剧，但说实话我什么都看！",
      "我也是！你看过大家都在谈论的那部新片吗？",
      "哦是的！我一直想看看。好看吗？",
      "太搞笑了！你一定要看看。",
      "好的，我会把它加到我的列表里！谢谢推荐。"
    ],
    rtl: false
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    code: 'fr-FR',
    phrases: [
      "Salut ! Ça va ?",
      "Pas grand-chose, je me détends ! Comment s'est passé ta journée ?",
      "C'était plutôt bien ! Je suis allé au parc avec mon chien.",
      "Oh, ça a l'air amusant ! Quel genre de chien as-tu ?",
      "C'est un golden retriever, super amical !",
      "Oh, j'adore les golden retrievers ! Ils sont si mignons.",
      "Oui, c'est le meilleur ! Et toi, tu as des projets pour le week-end ?",
      "Je vais juste traîner avec des amis, peut-être regarder un film.",
      "Sympa ! Quel genre de films tu aimes ?",
      "J'aime l'action et la comédie, mais honnêtement je regarderai n'importe quoi !",
      "Pareil ici ! Tu as vu ce nouveau dont tout le monde parle ?",
      "Oh oui ! Je voulais le regarder. C'est bien ?",
      "C'est hilarant ! Tu devrais vraiment le regarder.",
      "Cool, je vais l'ajouter à ma liste ! Merci pour la recommandation."
    ],
    rtl: false
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de-DE',
    phrases: [
      "Hey! Wie geht's?",
      "Nicht viel, nur entspannen! Wie war dein Tag?",
      "Es war ziemlich gut! Ich war mit meinem Hund im Park.",
      "Oh, das klingt lustig! Was für einen Hund hast du?",
      "Er ist ein Golden Retriever, super freundlich!",
      "Oh, ich liebe Golden Retriever! Sie sind so süß.",
      "Ja, er ist der Beste! Und du, hast du Pläne fürs Wochenende?",
      "Ich werde nur mit Freunden abhängen, vielleicht einen Film schauen.",
      "Schön! Welche Art von Filmen magst du?",
      "Ich mag Action und Komödie, aber ehrlich gesagt schaue ich alles!",
      "Gleich hier! Hast du diesen neuen gesehen, über den alle reden?",
      "Oh ja! Ich wollte ihn mir ansehen. Ist er gut?",
      "Es ist urkomisch! Du solltest ihn definitiv ansehen.",
      "Cool, ich werde ihn zu meiner Liste hinzufügen! Danke für die Empfehlung."
    ],
    rtl: false
  },
  ja: {
    name: 'Japanese',
    nativeName: '日本語',
    code: 'ja-JP',
    phrases: [
      "やあ！元気？",
      "別に、ただリラックスしてるだけ！今日はどうだった？",
      "かなり良かったよ！犬と公園に行ったんだ。",
      "ああ、楽しそう！どんな犬を飼ってるの？",
      "ゴールデンレトリバーで、すごくフレンドリーなんだ！",
      "ああ、ゴールデンレトリバー大好き！すごく可愛いよね。",
      "うん、最高なんだ！君は？週末の予定ある？",
      "友達と遊ぶだけかな、たぶん映画を見るかも。",
      "いいね！どんな映画が好き？",
      "アクションとコメディが好きだけど、正直何でも見るよ！",
      "同じだね！みんなが話してるあの新しいの見た？",
      "ああ、そう！見ようと思ってたんだ。面白い？",
      "超面白いよ！絶対見た方がいい。",
      "いいね、リストに追加するよ！おすすめありがとう。"
    ],
    rtl: false
  }
}

export default function TwoPhonesDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Default muted
  const [isEnglishSpeaking, setIsEnglishSpeaking] = useState(false)
  const [isTargetSpeaking, setIsTargetSpeaking] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false) // Control when translation appears
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof languages>('ar')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const englishSynthRef = useRef<SpeechSynthesis | null>(null)
  const targetSynthRef = useRef<SpeechSynthesis | null>(null)
  const englishVoiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const targetVoiceRef = useRef<SpeechSynthesisVoice | null>(null)

  // Get the best available voice for a language
  const getBestVoice = (lang: string, gender: 'female' | 'male' = 'female'): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null
    
    const voices = window.speechSynthesis.getVoices()
    if (!voices.length) return null

    // Normalize language code (e.g., 'en' from 'en-US')
    const langPrefix = lang.toLowerCase().split('-')[0]

    // Prefer neural/enhanced/premium voices (best quality)
    const neural = voices.find(voice => {
      const voiceLang = voice.lang.toLowerCase().split('-')[0]
      const voiceName = voice.name.toLowerCase()
      return voiceLang === langPrefix && 
        (voiceName.includes('neural') || 
         voiceName.includes('enhanced') ||
         voiceName.includes('premium') ||
         voiceName.includes('natural'))
    })

    if (neural) return neural

    // Prefer female voices (more natural for conversational tone)
    const female = voices.find(voice => {
      const voiceLang = voice.lang.toLowerCase().split('-')[0]
      const voiceName = voice.name.toLowerCase()
      return voiceLang === langPrefix && 
        (voiceName.includes('female') || 
         voiceName.includes('woman') ||
         voiceName.includes('samantha') ||
         voiceName.includes('karen') ||
         voiceName.includes('zira') ||
         voiceName.includes('susan'))
    })

    if (female) return female

    // Look for local voices (usually better quality than cloud)
    const local = voices.find(voice => {
      const voiceLang = voice.lang.toLowerCase().split('-')[0]
      return voiceLang === langPrefix && voice.localService
    })

    if (local) return local

    // Fallback to any matching language
    const fallback = voices.find(voice => {
      const voiceLang = voice.lang.toLowerCase().split('-')[0]
      return voiceLang === langPrefix
    })

    return fallback || null
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis
      englishSynthRef.current = synth
      targetSynthRef.current = synth

      // Load voices (may need to wait for voices to be loaded)
      const loadVoices = () => {
        // Force voice list refresh
        const voices = synth.getVoices()
        if (voices.length > 0) {
          englishVoiceRef.current = getBestVoice('en', 'female')
          targetVoiceRef.current = getBestVoice(selectedLang.code.split('-')[0], 'female')
        }
      }

      // Try loading immediately
      loadVoices()
      
      // Some browsers load voices asynchronously
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices
      }

      // Also try after a short delay (some browsers need this)
      setTimeout(loadVoices, 100)
      setTimeout(loadVoices, 500)
    }
  }, [selectedLanguage])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.language-selector')) {
        setIsLanguageOpen(false)
      }
    }

    if (isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLanguageOpen])

  const selectedLang = languages[selectedLanguage]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setShowTranslation(false) // Hide translation when new phrase starts
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % englishPhrases.length)
        setIsAnimating(false)
      }, 500)
    }, 8000) // Interval for English + Translation only

    return () => clearInterval(interval)
  }, [selectedLanguage])

  useEffect(() => {
    // Update target voice when language changes
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      targetVoiceRef.current = getBestVoice(selectedLang.code.split('-')[0], 'female')
    }
  }, [selectedLanguage, selectedLang])

  useEffect(() => {
    // Only speak if not muted
    if (!isMuted && !isAnimating && currentIndex >= 0 && englishSynthRef.current && targetSynthRef.current) {
      const timer = setTimeout(() => {
        // Cancel any ongoing speech
        englishSynthRef.current?.cancel()
        targetSynthRef.current?.cancel()

        // Small delay to ensure previous speech is fully stopped
        setTimeout(() => {
          // Speak English first with natural settings
          setIsEnglishSpeaking(true)
          setShowTranslation(false) // Hide translation when English starts
          const englishUtterance = new SpeechSynthesisUtterance(englishPhrases[currentIndex])
          englishUtterance.lang = 'en-US'
          englishUtterance.rate = 0.88  // Slightly slower to prevent cutting off
          englishUtterance.pitch = 1.08  // Slightly higher pitch for more natural female voice
          englishUtterance.volume = 0.9
          
          // Use best available voice (refresh if needed)
          if (!englishVoiceRef.current) {
            englishVoiceRef.current = getBestVoice('en', 'female')
          }
          if (englishVoiceRef.current) {
            englishUtterance.voice = englishVoiceRef.current
          }

          englishUtterance.onstart = () => {
            setIsEnglishSpeaking(true)
          }

          englishUtterance.onend = () => {
            setIsEnglishSpeaking(false)
            // After English finishes, show translation and then speak
            setTimeout(() => {
              // Show the translation text
              setShowTranslation(true)
              
              // Small delay before starting TTS
              setTimeout(() => {
                // Refresh target voice before speaking
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  const voices = window.speechSynthesis.getVoices()
                  if (voices.length > 0) {
                    targetVoiceRef.current = getBestVoice(selectedLang.code.split('-')[0], 'female')
                  }
                }

                setIsTargetSpeaking(true)
                const targetUtterance = new SpeechSynthesisUtterance(selectedLang.phrases[currentIndex])
                targetUtterance.lang = selectedLang.code
                targetUtterance.rate = 0.88  // Slightly slower to prevent cutting off
                targetUtterance.pitch = 1.08  // Slightly higher for natural female voice
                targetUtterance.volume = 0.9
                
                // Use best available voice for target language
                if (targetVoiceRef.current) {
                  targetUtterance.voice = targetVoiceRef.current
                }

                targetUtterance.onstart = () => {
                  setIsTargetSpeaking(true)
                }

                targetUtterance.onerror = (error) => {
                  console.log('TTS Error:', error)
                  setIsTargetSpeaking(false)
                  setShowTranslation(false)
                }

                targetUtterance.onend = () => {
                  setIsTargetSpeaking(false)
                  // Translation TTS finished - keep translation visible
                }

                // Ensure we're using the same speechSynthesis instance
                if (targetSynthRef.current) {
                  targetSynthRef.current.speak(targetUtterance)
                } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.speak(targetUtterance)
                }
              }, 300) // Small delay after showing text
            }, 500) // Pause after English finishes
          }

          englishUtterance.onerror = (error) => {
            console.log('English TTS Error:', error)
            setIsEnglishSpeaking(false)
          }

          if (englishSynthRef.current) {
            englishSynthRef.current.speak(englishUtterance)
          } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.speak(englishUtterance)
          }
        }, 200) // Delay to ensure clean start
      }, 600)

      return () => {
        clearTimeout(timer)
        englishSynthRef.current?.cancel()
        targetSynthRef.current?.cancel()
        setShowTranslation(false)
      }
    }
  }, [currentIndex, isAnimating, isMuted, selectedLanguage, selectedLang])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // Cancel any ongoing speech when muting
    if (!isMuted) {
      englishSynthRef.current?.cancel()
      targetSynthRef.current?.cancel()
      setIsEnglishSpeaking(false)
      setIsTargetSpeaking(false)
    }
  }

  const handleLanguageChange = (langKey: keyof typeof languages) => {
    setSelectedLanguage(langKey)
    setIsLanguageOpen(false)
    // Reset to first phrase when language changes
    setCurrentIndex(0)
    setShowTranslation(false)
    // Cancel any ongoing speech
    englishSynthRef.current?.cancel()
    targetSynthRef.current?.cancel()
    setIsEnglishSpeaking(false)
    setIsTargetSpeaking(false)
  }

  return (
    <div className="two-phones-demo">
      {/* Controls */}
      <div className="demo-controls">
        {/* Language Selector */}
        <div className="language-selector">
          <button 
            className="language-selector-button"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            aria-label="Select language"
          >
            <Globe2 size={20} />
            <span>{selectedLang.name}</span>
            <ChevronDown size={16} className={isLanguageOpen ? 'rotate' : ''} />
          </button>
          {isLanguageOpen && (
            <div className="language-dropdown">
              {Object.entries(languages).map(([key, lang]) => (
                <button
                  key={key}
                  className={`language-option ${selectedLanguage === key ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(key as keyof typeof languages)}
                >
                  <span className="language-native">{lang.nativeName}</span>
                  <span className="language-english">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mute/Unmute Button */}
        <button 
          className="mute-button" 
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX size={24} />
          ) : (
            <Volume2 size={24} />
          )}
          <span>{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>
      </div>

      <div className="phones-container">
        {/* English Phone - Outgoing */}
        <div className="phone-wrapper phone-outgoing">
          <PhoneFrame>
            <div className="phone-content">
              <div className="phone-header">
                <div className="phone-app-badge">
                  <BridgeIcon size={16} />
                  <span className="phone-app-name">lingway</span>
                </div>
                <div className="phone-language-group">
                  <Globe2 className="phone-icon" size={18} />
                  <span className="phone-language">English</span>
                </div>
              </div>
              <div className="phone-speaker-card phone-outgoing-card">
                <div className="phone-avatar phone-outgoing-avatar">
                  <User size={28} />
                </div>
                <div className="phone-text">
                  <div className="caller-message-wrapper">
                    <div className="message-label caller-label">You</div>
                    <p className={isAnimating ? 'fade-out' : 'fade-in'}>
                      {englishPhrases[currentIndex]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="phone-audio-wave phone-outgoing-wave">
                <AudioWave direction="right" color="#FF6B6B" isActive={!isMuted && isEnglishSpeaking} />
              </div>
            </div>
          </PhoneFrame>
        </div>

        {/* Connection Animation */}
        <div className="phones-connection">
          <div className="connection-pulse"></div>
          <div className="connection-icon-wrapper">
            <BridgeIcon className="connection-icon" size={28} />
          </div>
          <div className="connection-pulse"></div>
        </div>

        {/* Target Language Phone - Incoming */}
        <div className="phone-wrapper phone-incoming">
          <PhoneFrame>
            <div className="phone-content">
              <div className="phone-header">
                <div className="phone-app-badge">
                  <BridgeIcon size={16} />
                  <span className="phone-app-name">lingway</span>
                </div>
                <div className="phone-language-group">
                  <Globe2 className="phone-icon" size={18} />
                  <span className="phone-language">{selectedLang.nativeName}</span>
                </div>
              </div>
              <div className="phone-audio-wave phone-incoming-wave">
                <AudioWave direction="left" color="#4A90E2" isActive={!isMuted && isTargetSpeaking} />
              </div>
              <div className="phone-speaker-card phone-incoming-card">
                <div className="phone-avatar phone-incoming-avatar">
                  <User size={28} />
                </div>
                <div className="phone-text">
                  {showTranslation && (
                    <div className="phone-message-card phone-translated-card">
                      <div className="message-arrow message-arrow-outgoing">
                        <ArrowDownRight size={16} />
                      </div>
                      <div className="message-label">Translation</div>
                      <p 
                        className={`phone-translated-text ${isAnimating ? 'fade-out' : 'fade-in'}`}
                        dir={selectedLang.rtl ? 'rtl' : 'ltr'}
                      >
                        {selectedLang.phrases[currentIndex]}
                      </p>
                      <p className="phone-translation phone-translated-translation">
                        {englishPhrases[currentIndex]}
                      </p>
                    </div>
                  )}
                  {!showTranslation && (
                    <p className="phone-waiting" dir={selectedLang.rtl ? 'rtl' : 'ltr'}>
                      Listening...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}

