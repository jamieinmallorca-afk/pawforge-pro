import { useState } from "react";

const BREED_DB = {
  "german shepherd": { energy: "very_high", protection: true, notes: "Highly intelligent, excels at all training types. Needs mental stimulation daily." },
  "belgian malinois": { energy: "very_high", protection: true, notes: "Extreme drive and energy. Professional handler recommended for protection work." },
  "dutch shepherd": { energy: "very_high", protection: true, notes: "Similar to Malinois. Needs a job to do or becomes destructive." },
  "rottweiler": { energy: "high", protection: true, notes: "Powerful and loyal. Needs firm, consistent training from an early age." },
  "dobermann": { energy: "high", protection: true, notes: "Alert and intelligent. Responds well to positive reinforcement." },
  "doberman pinscher": { energy: "high", protection: true, notes: "Alert and intelligent. Responds well to positive reinforcement." },
  "cane corso": { energy: "high", protection: true, notes: "Powerful guardian breed. Early socialisation is critical." },
  "boerboel": { energy: "high", protection: true, notes: "South African mastiff. Strong guardian instincts, needs experienced handler." },
  "giant schnauzer": { energy: "very_high", protection: true, notes: "Working breed with high drive. Excellent at IPO/protection work." },
  "border collie": { energy: "very_high", protection: false, notes: "Most intelligent breed. Needs constant mental challenge or develops anxiety." },
  "australian shepherd": { energy: "very_high", protection: false, notes: "High herding drive. Excellent at detection and agility." },
  "siberian husky": { energy: "very_high", protection: false, notes: "Stubborn and independent. Short sessions with high reward value work best." },
  "labrador retriever": { energy: "high", protection: false, notes: "Highly food motivated. Excellent for detection work and obedience." },
  "labrador": { energy: "high", protection: false, notes: "Highly food motivated. Excellent for detection work and obedience." },
  "golden retriever": { energy: "high", protection: false, notes: "Eager to please. Responds brilliantly to positive training." },
  "springer spaniel": { energy: "very_high", protection: false, notes: "Excellent nose. Natural detection dog. High stamina." },
  "cocker spaniel": { energy: "high", protection: false, notes: "Good nose work candidate. Can be sensitive - keep sessions positive." },
  "vizsla": { energy: "very_high", protection: false, notes: "Velcro dog - needs handler focus. Great for scent work." },
  "weimaraner": { energy: "very_high", protection: false, notes: "High energy, needs lots of exercise alongside training." },
  "belgian tervuren": { energy: "very_high", protection: true, notes: "Similar to Malinois. Herding breed with high work drive." },
  "boxer": { energy: "high", protection: true, notes: "Playful and energetic. Responds well to fun training methods." },
  "standard poodle": { energy: "high", protection: false, notes: "Very intelligent. Excels at obedience and detection." },
  "poodle": { energy: "high", protection: false, notes: "Very intelligent. Excels at obedience and detection." },
  "airedale terrier": { energy: "high", protection: true, notes: "King of terriers. Stubborn but capable of protection work." },
  "american pitbull": { energy: "high", protection: true, notes: "Strong and loyal. Needs consistent, experienced handling." },
  "staffordshire bull": { energy: "high", protection: false, notes: "People-oriented. Great for obedience, not suited for protection." },
  "flat coated retriever": { energy: "high", protection: false, notes: "Enthusiastic and cheerful. Great for detection and obedience." },
  "portuguese water dog": { energy: "high", protection: false, notes: "Athletic and smart. Loves water-based reward games." },
  "bulldog": { energy: "low", protection: false, notes: "Low energy. Keep sessions very short (5-10 mins). Overheats easily." },
  "french bulldog": { energy: "low", protection: false, notes: "Brachycephalic - short nose. Avoid exercise in heat. 5-10 min sessions max." },
  "pug": { energy: "low", protection: false, notes: "Brachycephalic breed. Very short sessions only. Mental games preferred." },
  "shih tzu": { energy: "low", protection: false, notes: "Companion breed. Short, fun sessions with lots of praise." },
  "cavalier king charles": { energy: "medium", protection: false, notes: "Gentle and eager to please. Good for basic obedience." },
  "dachshund": { energy: "medium", protection: false, notes: "Stubborn but smart. Short sessions - protect the back from jumping." },
  "chihuahua": { energy: "medium", protection: false, notes: "Small but feisty. Good for basic commands. Watch for small dog syndrome." },
  "maltese": { energy: "low", protection: false, notes: "Companion breed. Responds to gentle positive training." },
  "bichon frise": { energy: "medium", protection: false, notes: "Cheerful and trainable. Good for obedience and basic commands." },
  "whippet": { energy: "medium", protection: false, notes: "Sensitive breed. Positive only training. Short sharp sessions." },
  "greyhound": { energy: "medium", protection: false, notes: "Lazy indoors, fast outdoors. Good recall training essential." },
  "great dane": { energy: "medium", protection: false, notes: "Gentle giant. Joint care important - avoid hard surfaces for puppies." },
  "saint bernard": { energy: "low", protection: false, notes: "Slow learner but willing. Keep cool - overheats easily." },
  "basset hound": { energy: "low", protection: false, notes: "Stubborn scent hound. Food motivation essential." },
  "beagle": { energy: "high", protection: false, notes: "Excellent nose. Natural detection candidate. Prone to following scent." },
  "mixed breed": { energy: "medium", protection: false, notes: "Mixed breeds vary widely. Adjust intensity based on observed energy level." },
  "crossbreed": { energy: "medium", protection: false, notes: "Adjust session length based on the dog's actual energy and focus." },
};

function getBreedInfo(breed) {
  const key = breed.toLowerCase().trim();
  if (BREED_DB[key]) return BREED_DB[key];
  for (const dbKey of Object.keys(BREED_DB)) {
    if (dbKey.includes(key) || key.includes(dbKey)) return BREED_DB[dbKey];
  }
  return { energy: "medium", protection: false, notes: "Breed not in database. Using medium energy defaults. Adjust based on your dog's actual energy level." };
}

const EXERCISE_GUIDES = {
  "Sit": {
    steps: ["Stand in front of your dog with a treat pinched between your fingers.", "Hold the treat just above their nose, then slowly move it back over their head - their bottom should naturally lower to the ground.", "The instant their bottom touches the ground, say 'Sit' clearly and give the treat immediately.", "Repeat 10-15 times. Once consistent, start asking 'Sit' before producing the treat.", "Gradually phase out the lure and reward only from your pocket after the command."],
    tips: ["Keep the treat close to their nose - too high and they'll jump, too far back and they'll walk backwards.", "Timing is everything: reward within 1-2 seconds of the sit or the dog won't connect the action to the reward.", "Use a calm, clear voice. Shouting or repeating the command teaches the dog to ignore the first ask."],
    mistakes: ["Pushing the dog's bottom down - this causes resistance and doesn't teach the command.", "Rewarding when they're already getting back up - you'll accidentally reward standing.", "Repeating 'Sit, sit, sit' - say it once and wait."],
  },
  "Down": {
    steps: ["Ask your dog to sit first, then kneel or crouch in front of them.", "Hold a treat at their nose, then slowly draw it straight down to the floor between their front paws.", "As they follow the treat down, their elbows should touch the ground. The moment they're fully down, say 'Down' and reward.", "If they stand up to follow the treat, start again from sit - don't reward a half-down.", "Once reliable with a lure, introduce the verbal cue first, then produce the treat after they comply."],
    tips: ["Try luring into a 'down' under a slightly raised knee or low table - it blocks jumping up and encourages the dog to go low.", "Some dogs find 'down' harder than 'sit' - be extra patient and reward even partial efforts early on.", "Practise on a soft surface initially; hard floors can feel uncomfortable on elbows."],
    mistakes: ["Pulling the lead downward to force the position - this creates stress and damages trust.", "Moving the treat too fast - slow and steady keeps the dog's nose tracking the lure.", "Forgetting to build duration - once they down, ask them to hold it a moment before rewarding."],
  },
  "Stay": {
    steps: ["Ask your dog to sit or down. Hold your palm flat toward their face and say 'Stay' in a calm, firm voice.", "Take just one step back. Pause one second, then step back to the dog and reward - don't call them to you yet.", "Gradually increase: two steps, then three, then five. Add time before returning. Always return to the dog to reward.", "Once solid at distance, begin adding mild distractions - a noise, a movement - and reward for holding position.", "Introduce a release word like 'OK' or 'Free' so the dog knows exactly when the exercise is over."],
    tips: ["Build the three Ds separately: Distance, Duration, and Distraction - don't add all three at once.", "If the dog breaks, calmly reset them and make the next rep easier - shorter distance or shorter time.", "Always end a stay by returning to your dog. Calling them out of it teaches them to anticipate breaking."],
    mistakes: ["Increasing distance too quickly - small increments build a rock-solid stay.", "Repeating 'stay, stay, stay' - one cue only.", "Punishing a broken stay - the dog may have been pushed too far too fast. Adjust the difficulty instead."],
  },
  "Come / Recall": {
    steps: ["Start in a small, enclosed area with no distractions. Crouch down, open your arms, and call your dog's name followed by 'Come!' in a high, happy voice.", "When they reach you, make it a party - jackpot reward with multiple treats, praise, and a fuss. Make coming to you the best thing that ever happens.", "Gradually increase distance. Use a long line (5-10 metres) outdoors so the dog can't self-reward by running off.", "Practise surprise recalls during walks - call once, reward hugely, let them go again. The dog learns coming to you doesn't mean the fun stops.", "Proof the recall around distractions only after it's rock solid in calm environments."],
    tips: ["Never call your dog to you for something unpleasant - nail clipping, bath, ending play. Go and get them instead.", "If the dog doesn't come, never repeat the command - go to them, gently take the collar, and reward anyway.", "Use an emergency recall word trained with the highest-value rewards, saved only for genuine emergencies."],
    mistakes: ["Chasing the dog when they don't come - this turns it into a game and rewards ignoring you.", "Punishing a dog that eventually comes back - even if they took forever, always reward the return.", "Weak, flat tone of voice - recall needs enthusiasm. Sound like the best thing in the world."],
  },
  "Name Recognition": {
    steps: ["Hold a treat in your closed fist. Wait until the dog stops sniffing and looks at your face.", "The moment they make eye contact, say their name clearly - once - and immediately open your hand to give the treat.", "Repeat in different positions and rooms. Say the name, reward eye contact.", "Begin saying the name from slightly further away or when they're mildly distracted.", "Once they reliably snap their head toward you when their name is called, you have a solid foundation for all future training."],
    tips: ["Their name should always predict good things - never use it in a scolding tone.", "Keep it short and sharp - one syllable names or shortened nicknames often work best.", "Practise with every family member separately so the dog responds to everyone."],
    mistakes: ["Repeating the name over and over - say it once and wait.", "Using the name as a command - the name is just a way to get attention, not an instruction.", "Using the name when cross with the dog - it will start to predict bad things and the dog will avoid eye contact."],
  },
  "Leave It": {
    steps: ["Place a low-value treat in your closed fist. Offer it at the dog's nose level. Let them sniff, lick, and paw - keep your fist closed.", "The moment they pull back or pause, open your hand, say 'Yes!' and reward with a different, higher-value treat from your other hand.", "Once reliable, place the treat on the floor and cover with your foot. When they stop pawing, reward with a better treat.", "Progress to placing the treat on the floor uncovered, saying 'Leave it', and rewarding if they look up at you instead.", "Proof it with objects, food dropped on walks, and interesting smells."],
    tips: ["Always reward with something better than what they're leaving - they need a reason to choose you over the distraction.", "Build the skill on a lead first before expecting it off-lead.", "Stay calm and patient - no yanking or telling off if they go for it. Simply reset and make it easier."],
    mistakes: ["Rewarding with the item they were told to leave - this teaches them that leaving it eventually gets them the thing anyway.", "Expecting too much too soon - start easy (boring treat) and work up to high-value items over many sessions.", "Only practising at home - proof it in every environment."],
  },
  "Drop It": {
    steps: ["Let your dog pick up a toy they enjoy. Produce a high-value treat and hold it near their nose.", "As they open their mouth to take the treat, the toy will fall - the moment it hits the floor say 'Drop it' and give the treat.", "Repeat many times until the verbal cue alone causes them to release the toy.", "Once reliable, try with lower-value items, then eventually real-world objects.", "Always swap for something of equal or higher value - never just take without rewarding."],
    tips: ["Make it a game - drop it, pick up the toy, offer it back, then ask again. The dog learns that dropping doesn't mean losing it.", "Stay relaxed - tension in your body transfers to the dog and makes them grip tighter.", "Use 'drop it' consistently rather than 'give', 'leave', or 'out' to avoid confusion."],
    mistakes: ["Chasing or grabbing - this creates a keep-away game and teaches the dog that having something is valuable.", "Only practising with toys - the dog needs to drop real items too.", "Punishing the dog for picking things up - this discourages them from bringing items to you, which you want in an emergency."],
  },
  "Wait at Door": {
    steps: ["Ask your dog to sit beside the door. Place your hand on the door handle.", "If they move, remove your hand from the handle - the door only opens when they're still.", "Crack the door open an inch. If they lunge, close it immediately. Crack it again only when they're seated.", "Gradually open further, rewarding the dog for remaining seated. Once fully open, give a release word like 'OK' before letting them through.", "Practise at every door - front door, car door, garden gate - for consistency."],
    tips: ["The door itself becomes the training tool - it only opens for a calm, seated dog.", "Practise when there's no actual urgency so you can take your time.", "Ask for eye contact before releasing - a dog looking at you at an open door is a safe dog."],
    mistakes: ["Letting them through occasionally without the sit - inconsistency undoes the training.", "Rushing the steps - patience at the door is built in tiny increments.", "Only practising at home - proof at the car, the vet, parks, anywhere there's a threshold."],
  },
  "Heel on Lead": {
    steps: ["Hold the lead in your right hand, treats in your left. Dog should be on your left side with their shoulder level with your leg.", "Step off on your left foot and reward the dog immediately for being in the correct position beside you.", "Every few steps, mark and reward the dog for staying in position. Gradually increase the number of steps between rewards.", "Introduce turns - reward the dog as you turn into them (right turn) and call them around on left turns.", "Add stops - ask for a sit when you halt. Reward the sit in position."],
    tips: ["Keep rewards at your left hip - the dog should find it rewarding to be in that exact spot.", "Short, frequent reward bursts build the behaviour faster than long stretches without feedback.", "Make it dynamic - vary pace, add turns, weave around cones - keep the dog engaged."],
    mistakes: ["Letting the lead go tight - once it tightens, stop and wait for slack before moving again.", "Rewarding when the dog is slightly ahead or behind - precision matters.", "Too long between rewards early on - the dog drifts off because there's no reason to stay close."],
  },
  "Loose Lead Walking": {
    steps: ["Start in your garden or a quiet area. Hold the lead loosely - no tension.", "The moment the lead goes tight, stop completely. Don't walk forward again until the lead has slack.", "When the lead is slack, say 'Yes' and continue walking. Reward frequently for slack lead.", "If the dog constantly pulls, try changing direction - turn 180 degrees whenever tension appears. The dog learns that pulling = going nowhere.", "Build up gradually to busier environments as the skill becomes reliable."],
    tips: ["Be consistent - every single step on a tight lead must result in stopping. One free pull undoes many good reps.", "Reward position - treat the dog when they're walking nicely beside you, not just when they happen to slacken the lead.", "Front-clip harnesses can help manage pullers while you train, but they're a management tool, not a substitute for training."],
    mistakes: ["Continuing to walk while being pulled - this rewards the pulling with forward movement.", "Jerking the lead - creates anxiety and does not teach the dog what you want.", "Expecting too much too fast in exciting environments - build the skill in calm places first."],
  },
  "Sit-Stay with Distance": {
    steps: ["Ask for a sit-stay using your hand signal and verbal cue.", "Take one step backwards, pause, step back in, and reward without the dog moving.", "Build to five steps, then ten, then across the room, then out of sight - each stage over multiple sessions.", "Vary your departure - step sideways, turn your back, crouch down - so the dog doesn't just stay when you walk backwards.", "Proof with mild distractions at each distance before adding more."],
    tips: ["Return to the dog to reward - walking back to position reinforces the stay.", "If the dog breaks at any stage, reduce the distance or duration and rebuild.", "Use a long line outdoors for safety during distance work."],
    mistakes: ["Increasing distance before the stay is rock-solid up close.", "Only ever testing, never rewarding the stay - the dog needs to be paid for holding position.", "Staring intensely at the dog - direct eye contact creates pressure and triggers breaking."],
  },
  "Down-Stay Duration": {
    steps: ["Ask your dog into a down. Reward immediately for lying down.", "Ask them to stay. Count 5 seconds silently - if they hold, reward and release.", "Build the duration in small steps: 10s, 20s, 30s, 1 minute, 3 minutes, 5 minutes.", "Vary the duration - sometimes reward after 10 seconds, sometimes after 2 minutes, so the dog can't predict when the reward is coming.", "Gradually introduce low-level distractions while maintaining the stay."],
    tips: ["The down-stay is the most valuable real-life exercise - a dog who will hold a down-stay anywhere is a joy to live with.", "Practise in every room of the house, in the garden, at the pub, in the park.", "A calm, settled dog holds a better stay - don't ask for it when the dog is overexcited."],
    mistakes: ["Building duration too fast - one failed rep sets you back several good ones.", "Releasing with excitement - a calm, quiet reward and release keeps the dog calm during the stay.", "Forgetting to proof in real environments - kitchen table stays don't automatically transfer to the park."],
  },
  "Recall under Distraction": {
    steps: ["Start with very mild distractions - a boring toy on the ground, a person standing still nearby.", "Call your dog once in your best recall voice. If they come, huge reward.", "If they don't respond immediately, don't repeat - walk backwards away from them to create movement that encourages following.", "Gradually increase distraction level over many sessions: other dogs playing, food on the ground, exciting smells.", "Always make coming to you more rewarding than whatever they were doing."],
    tips: ["Never poison the recall by calling when you're sure they won't come - set them up to succeed.", "Use a long line so you can follow through without chasing.", "Practise the 'check in' - reward your dog whenever they choose to look at you or come back without being called."],
    mistakes: ["Calling in a flat or frustrated tone - enthusiasm is everything.", "Punishing a slow recall - even if it took 30 seconds, reward the return.", "Only recalling to end the walk - the dog learns that coming means fun stops."],
  },
  "Send to Bed / Place": {
    steps: ["Place a mat or bed on the floor. Lure your dog onto it with a treat - the moment all four paws are on it, mark and reward.", "Build duration on the mat - reward several times while they stay on it.", "Add the verbal cue 'Bed' or 'Place' just as they move toward it.", "Increase the distance you send them from - start one step away, build to across the room.", "Proof with distractions: doorbell sounds, visitors arriving, food being prepared."],
    tips: ["The mat becomes a safe, rewarding place - never send your dog to their bed as a punishment.", "This exercise is gold for real life: dog goes to bed when guests arrive, when you're eating, when the door knocks.", "Use a portable mat so the behaviour transfers to different locations."],
    mistakes: ["Rewarding before all four paws are on the mat.", "Moving to distance before duration is solid.", "Using the bed as a timeout - it will destroy the positive association."],
  },
  "Stand-Stay": {
    steps: ["With your dog in front of you, hold a treat at nose height and slowly move it horizontally away from them - they should stand up from a sit to follow it.", "The moment all four paws are on the floor in a standing position, say 'Stand' and reward.", "Build a short stay in the stand position - 3 seconds, then 5, then 10.", "Touch your dog's side and back gently while standing - preparing them for vet and grooming handling.", "Practise the full sequence: sit - stand on cue - stay for handling - reward."],
    tips: ["The stand-stay is essential for vet visits, grooming, and working dog sports.", "Pair touching with treats so the dog associates being handled while standing with good things.", "Keep the stay short initially - the stand is naturally less stable than sit or down."],
    mistakes: ["Moving the treat too high - dog will sit up rather than stand.", "Asking for too long a duration before the position is reliable.", "Not practising handling during the stand - the whole point is to have a calm, still dog during examination."],
  },
  "Socialisation Walk": {
    steps: ["Choose a quiet route first - a residential street, a park at a calm time - rather than jumping straight into busy areas.", "Walk at a pace that keeps your dog under threshold - if they're staring, stiffening, or barking, you're too close to the distraction.", "When you spot a distraction (dog, person, traffic), mark and reward your dog for noticing it calmly or looking away.", "Gradually work closer to distractions over many sessions as the dog remains relaxed.", "Keep sessions short - 15 minutes of focused socialisation is more effective than an hour of overwhelming exposure."],
    tips: ["Watch your dog's body language: loose body, sniffing, occasional glances = comfortable. Stiff, staring, high tail = too much.", "You control the distance - cross the road, create space, don't flood.", "Calm, controlled exposure builds confidence. Forced exposure creates fear."],
    mistakes: ["Letting the dog greet every dog and person - over-greeting creates reactivity.", "Waiting until the dog is already reactive to reward - mark the calm noticing, not the barking.", "Overwhelming the dog with too much too soon - slow and steady builds a socially confident dog."],
  },
  "Off-Lead Heel": {
    steps: ["Begin in a secure, enclosed area with no distractions.", "Remove the lead and immediately reward the dog for staying at your left side.", "Walk forward, rewarding every 2-3 steps for correct position - shoulder level with your left leg.", "Introduce left and right turns, halts, and pace changes - reward for maintaining position through each.", "Gradually increase the duration between rewards as the dog becomes fluent."],
    tips: ["Off-lead heel is built on perfect on-lead heel - don't drop the lead until the on-lead version is reliable.", "Keep your left hand at your hip - it's the dog's target position.", "Make it fun - vary your pace and direction to keep the dog engaged."],
    mistakes: ["Going off-lead in an unsecured area before the behaviour is solid.", "Drilling long repetitions - short, sharp, rewarding sets build faster.", "Forgetting to reward - off-lead doesn't mean no rewards."],
  },
  "Impulse Control — It's Yer Choice": {
    steps: ["Sit with your dog in front of you. Open your hand flat with a treat sitting on your palm.", "The moment your dog moves toward the treat, close your fist. Wait. The instant they pull back or look at you, open your hand and let them take it.", "Repeat until the dog sits and waits when your hand opens - they've learned that restraint gets the reward.", "Progress to placing the treat on the floor with your hand near it. Dog must wait until you give permission.", "Generalise: dog must wait at food bowl, before going through doors, before getting out of the car."],
    tips: ["This exercise rewires impulsive behaviour - patience becomes the strategy that works.", "Use high-value treats so the dog is genuinely tempted but choosing to wait.", "Keep your body language neutral - no commands, just open and close the hand based on the dog's choices."],
    mistakes: ["Giving verbal commands - let the dog work it out through their own choices.", "Rewarding when they've only partially backed off - wait for a clear choice to disengage.", "Expecting instant results - impulse control takes many sessions to become reliable."],
  },
  "Emergency Down": {
    steps: ["Start close to the dog. Say 'Down!' in a firm, urgent tone and lure or signal into position.", "Reward dramatically - this gets a jackpot reward every single time.", "Build distance: ask for the emergency down from 2 metres, then 5, then 10.", "Add movement - ask for it while the dog is walking, trotting, even running back toward you.", "Proof it in every environment and at every distance. This behaviour could save your dog's life."],
    tips: ["Keep a dedicated high-value reward for this exercise only - something the dog never gets otherwise.", "Practise it occasionally during normal walks so it stays sharp without being overused.", "Your tone of voice matters - it needs to be different and urgent enough to cut through excitement."],
    mistakes: ["Using the emergency down too casually - it should stay sharp and meaningful.", "Not proofing at a distance - a recall-only emergency down isn't truly an emergency behaviour.", "Skimping on the reward - every successful emergency down should feel like the best thing ever."],
  },
  "Distraction Proofing": {
    steps: ["Set up a controlled distraction - a treat on the floor, a toy, a person sitting nearby.", "Ask the dog to perform known commands (sit, down, stay, recall) near the distraction.", "Reward heavily for responding correctly despite the distraction being present.", "Gradually increase the intensity of the distraction over multiple sessions.", "Test in real-world environments: parks, car parks, pet shops, busy streets."],
    tips: ["Start with distractions the dog finds mildly interesting, not overwhelming.", "Use your highest-value rewards - you're competing with genuinely exciting things.", "If the dog fails, the distraction is too hard. Make it easier and rebuild."],
    mistakes: ["Jumping to high-level distractions before basics are solid.", "Punishing failures - the dog isn't being stubborn, they're simply being a dog. Adjust the difficulty.", "Only proofing at home - dogs don't generalise automatically, you must train in varied locations."],
  },
  "Long Line Recall": {
    steps: ["Attach a 20-30 metre long line to a harness (never a collar - neck injury risk).", "Let the dog range freely while holding the end of the line loosely.", "After a minute or two, call once in your best recall voice. If they come, jackpot reward.", "If they don't respond, gently pick up the line and create light pressure toward you while continuing to call happily.", "Reward every recall regardless of how long it took."],
    tips: ["The long line gives freedom while keeping safety - ideal for dogs building off-lead trust.", "Don't reel the dog in like a fish - gentle guidance plus happy voice.", "Alternate between recalls and releasing them back to free running - the dog learns coming to you isn't the end of fun."],
    mistakes: ["Jerking the line sharply - this creates negative associations with recall.", "Always calling to end the session - recall only when you can also release them again sometimes.", "Using a long line without a harness - line tension on a collar is dangerous."],
  },
  "Boundary Training": {
    steps: ["Choose a clear boundary - the edge of a rug, the garden gate, the doorstep.", "Walk the dog to the boundary on lead. The moment they reach it, mark and reward for stopping.", "Drop the lead and encourage them to stay at the boundary while you step across it.", "Gradually increase your distance on the other side while the dog holds the boundary.", "Add a release word so the dog knows when crossing is allowed."],
    tips: ["Visual markers help - place cones or tape along the boundary initially.", "Reward heavily for any choice to stay at the boundary rather than cross.", "This takes many sessions - don't rush the off-lead stage."],
    mistakes: ["Trying to train the boundary in a high-distraction area first.", "Inconsistency - if the dog is allowed to cross sometimes, the boundary means nothing.", "Going off-lead before the on-lead boundary is perfect."],
  },
  "Focus / Watch Me": {
    steps: ["Hold a treat between your eyes and say 'Watch me' or use a kissy noise.", "The instant the dog makes eye contact with your face (not the treat), mark and reward.", "Build duration - reward after 2 seconds of eye contact, then 5, then 10.", "Practise during walks: ask for focus as a distraction appears, reward for choosing to look at you instead.", "A dog that can focus on you in a busy environment is a dog that can be redirected from anything."],
    tips: ["Eye contact on cue is one of the most useful skills for managing reactive dogs.", "Make eye contact feel good - use a warm, happy tone when they look at you.", "Practise in every environment, not just at home."],
    mistakes: ["Holding the treat between your eyes then moving it to reward - the dog learns to stare at the treat, not your eyes.", "Using a stern voice - the dog should want to look at you, not feel pressured to.", "Only asking for focus at home - you need it most outdoors."],
  },
  "Tug Drive Building": {
    steps: ["Introduce a tug toy by wiggling it along the ground to trigger prey drive.", "When the dog grabs it, let them win occasionally to build confidence and enthusiasm.", "Build intensity over sessions - make the toy more exciting, play harder, let them shake it.", "Introduce 'out' from the very first session.", "Finish every tug session with the dog wanting more - stop while they're keen."],
    tips: ["Tug is not aggression - it's controlled prey drive and is one of the best reward tools for working dogs.", "The handler controls the game: it starts and ends on your terms.", "Keep the tug toy special - it should only appear during training, not left out for free play."],
    mistakes: ["Letting the dog initiate tug whenever they want - this teaches the dog they control the game.", "Pulling straight back - move the toy side to side and unpredictably.", "Letting sessions end with the dog running off with the toy - always finish with an out and calm."],
  },
  "Out / Release Command": {
    steps: ["While the dog is tugging, go still and neutral - stop the game.", "Produce a high-value treat at their nose. As they open their mouth to take it, the toy falls - immediately say 'Out' and give the treat.", "Repeat until 'Out' alone causes the dog to release without a treat being produced.", "Build speed - reward faster releases more generously.", "Proof it in high-drive states - the out must work when the dog is excited, not just calm."],
    tips: ["Out must be 100% reliable for safety - this is non-negotiable in protection work.", "Never physically pry the dog's mouth open - this creates conflict and resistance.", "Reward the out with reengagement with the toy - out becomes the start of another round, not the end."],
    mistakes: ["Punishing a slow out - frustration ruins the training. Be patient and reward speed.", "Only practising 'out' at the end of the session - proof it mid-game too.", "Using the same toy for out practice as everyday play - keep the training toy special."],
  },
  "Bark and Hold": {
    steps: ["This exercise requires a qualified decoy (training helper). The decoy acts agitated behind a barrier or on a sleeve.", "The dog is brought in on lead - they should bark at the decoy. Reward barking with access to the sleeve or tug toy.", "Gradually increase the duration of barking before access is given.", "The dog must bark and hold position - no biting until commanded.", "Introduce the 'out' cue after the bite to complete the sequence."],
    tips: ["Always work with a qualified protection trainer for this exercise.", "The dog must have a solid 'out' before bark and hold training begins.", "Safety equipment may be required at early stages."],
    mistakes: ["Attempting this without a qualified decoy.", "Skipping straight to bark and hold before foundation drive work is complete.", "Not rewarding the bark - the bark must be heavily reinforced or the dog will revert to biting without warning."],
  },
  "Sleeve Introduction": {
    steps: ["Have a qualified decoy present the sleeve low and stationary. Allow the dog to sniff and investigate.", "Encourage the dog to grab the sleeve by having the decoy wiggle it gently along the ground.", "The moment the dog grips, reward with tug play on the sleeve - let them win.", "Keep first bites very short - excitement and reward, not prolonged gripping.", "Build grip confidence over many sessions before adding any complexity."],
    tips: ["The first sleeve experiences must be overwhelmingly positive - this sets the foundation.", "Use a soft, puppy sleeve for first introductions if the dog is inexperienced.", "Always end on a confident, full-grip bite - stop before the dog fatigues."],
    mistakes: ["Introducing the sleeve too early before tug drive is well established.", "Allowing sloppy, side-of-the-mouth grips - encourage full, forward grips only.", "Training without a qualified decoy who can read the dog correctly."],
  },
  "Focused Heel to Decoy": {
    steps: ["With the decoy standing still and neutral, heel your dog past them at a distance.", "Reward heavily for maintaining heel position and not fixating on the decoy.", "Gradually decrease the distance you pass the decoy at while maintaining the heel.", "The dog must walk calmly past even when the decoy makes movement.", "This exercise proves the dog can be switched between civil and working states on command."],
    tips: ["Only attempt once heel and out are rock solid.", "Reward attention on the handler, not just absence of reaction to the decoy.", "Build slowly - weeks of work at greater distance before getting close."],
    mistakes: ["Getting too close to the decoy too soon.", "Punishing drive - the dog should want to engage but be choosing to heel instead.", "Rushing this exercise - it is the foundation of real-world protection control."],
  },
  "Guard and Alert": {
    steps: ["Have a stranger approach calmly. When the dog barks, mark and reward the bark.", "Build a 'speak' cue - ask for barking on command when the stranger appears.", "Then introduce 'quiet' - reward the dog for stopping barking on command.", "Build the sequence: stranger appears - dog barks on cue - dog stops on cue - dog watches stranger calmly.", "Proof with different people, different times of day, different entry points."],
    tips: ["The goal is a dog that alerts reliably and then can be called off - not one that barks uncontrollably.", "Always work under threshold - don't allow the dog to spiral into uncontrolled arousal.", "This should only be trained in parallel with solid obedience."],
    mistakes: ["Rewarding frenzied, continuous barking rather than measured alerting.", "Never practising 'quiet' - the on switch without an off switch is dangerous.", "Allowing the dog to rehearse uncontrolled barking at strangers in daily life."],
  },
  "Obedience Under Drive": {
    steps: ["Run a short, sharp protection exercise - tug, bark and hold, or sleeve bite.", "Immediately after the out, ask for a sit-stay or down-stay.", "Reward the obedience response generously, then re-engage with the protection work.", "Alternate between protection drive and obedience - the dog learns to switch states instantly.", "Build to running a full obedience routine directly after drive work."],
    tips: ["This is the most important exercise in protection training - a dog with drive but no off-switch is dangerous.", "Keep obedience rewards high during this exercise.", "The dog should look forward to both - not see obedience as punishment after drive work."],
    mistakes: ["Punishing the dog for slow compliance - they're in a high drive state, be patient.", "Only ever doing this in training sessions - proof it at competitions and in novel environments.", "Skipping this exercise - it's the cornerstone of a reliable protection dog."],
  },
  "Nose Games — Find the Treat": {
    steps: ["Start with a treat in one hand - present both fists to the dog. When they nose the correct hand, open it and reward.", "Progress to hiding treats under 3 upturned cups - shuffle them, let the dog find the right one.", "Hide treats in a room while the dog waits outside - then release them to search.", "Build to hiding treats in harder locations: behind furniture, under mats, high up on shelves.", "Use a consistent release cue like 'Find it!' to start every search."],
    tips: ["Nose games are mentally exhausting in the best way - 15 minutes of scent work tires a dog as much as an hour's walk.", "Let the dog work it out - resist the urge to point or help.", "Celebrate every find enthusiastically - the dog should love the game."],
    mistakes: ["Hiding treats somewhere the dog has no chance of finding them early on - make it easy to build confidence.", "Helping too much - let the dog use their nose, not follow your direction.", "Rushing to harder hides before the dog is searching confidently."],
  },
  "Target Odour Introduction": {
    steps: ["Place a tin with a small amount of target odour (anise/birch/clove) inside - covered with a mesh lid so the dog can smell but not access it.", "Present the tin. The moment the dog sniffs it, mark and reward with a treat from your hand (not from the tin).", "Repeat 10-15 times per session - build the odour = treat association.", "Begin presenting the tin among other odourless tins. Only reward interaction with the correct one.", "At this stage the dog doesn't need to alert - just investigate the correct odour."],
    tips: ["Keep the target odour separate from food rewards to avoid contamination of the scent.", "Short sessions - 5 minutes maximum. Nose work is intense.", "Handle the target odour tin with gloves to keep the scent pure."],
    mistakes: ["Rewarding sniffing of wrong tins - only the target odour earns a reward.", "Long sessions that fatigue the dog - quality over quantity.", "Using multiple odours before the first is fully established."],
  },
  "Paired Odour Search": {
    steps: ["Place the target odour tin with a treat inside (paired) among several plain containers.", "Release the dog to search - when they find and nose the correct container, the treat is already there as a reward.", "Over sessions, begin separating the treat from the odour - reward comes from your hand after the dog indicates.", "Build the association: target odour = good things happen right here.", "This stage is about making the dog odour-obsessed - it should be the most exciting smell in the world."],
    tips: ["Pairing food with the odour creates a strong association - the smell itself becomes exciting.", "Keep it fun and rewarding - this is the foundation everything else is built on.", "Always let the dog find the target, never point or guide."],
    mistakes: ["Removing the paired reward too early - the association needs to be deeply established first.", "Using the same container layout every time - vary placement to prevent pattern learning.", "Training with a tired or full dog - scent work requires energy and food motivation."],
  },
  "Alert Behaviour Shaping": {
    steps: ["Choose a specific alert: sit, down, or a paw tap - pick one and stick to it.", "Place the target odour. When the dog finds it, wait - don't reward until they offer the alert behaviour.", "Initially reward any approximation of the alert and shape toward the final behaviour.", "The chain becomes: find odour - perform alert - receive reward.", "Proof the alert behaviour at every container type and location."],
    tips: ["Consistency is critical - the alert must look the same every time for you to read it reliably.", "The alert is the dog communicating 'I found it' - reward it like it's the most important thing ever.", "Work with a scent work instructor to shape a clean, reliable alert."],
    mistakes: ["Accepting a sloppy alert - if the behaviour isn't clear, you'll miss finds in the field.", "Rewarding before the alert is performed - the dog must understand the sequence.", "Changing the alert behaviour partway through training - pick one and stick with it."],
  },
  "Container Search": {
    steps: ["Set out 8-10 identical boxes in a grid or row.", "Place the target odour in one box - let the dog search the entire row.", "When they alert on the correct box, reward immediately and enthusiastically.", "Vary which box is hot - never use the same position twice in a row.", "Introduce boxes of different sizes, types, and heights as the dog progresses."],
    tips: ["Work the dog on lead initially so you can observe their behaviour at each container.", "Watch for changes in body language - tail movement, slower sniffing, head dip - these are signs of odour before the alert.", "Reward correctly, never accidentally - if you reward at the wrong box you'll confuse the dog."],
    mistakes: ["Staring at the hot box - dogs read your body language and may alert where you look.", "Placing the hot box in the same position repeatedly - the dog learns pattern, not scent.", "Rushing through the search - let the dog work systematically."],
  },
  "Area Search": {
    steps: ["Define a search area clearly - rope off a section of a room or garden.", "Hide the target odour in the area before bringing the dog in.", "Release with 'Find it!' and let the dog systematically work the area.", "Don't direct the dog - observe their search pattern and only intervene to prevent them missing a section entirely.", "Build area size gradually over many sessions."],
    tips: ["Handler movement matters - try to work the perimeter and let the dog quarter through the middle.", "Note where the dog slows down or shows interest - even before an alert, these are valuable observations.", "Time your searches - build stamina for longer area searches gradually."],
    mistakes: ["Starting with too large an area - small and successful builds confidence.", "Helping the dog find the hide - let them figure it out.", "Not varying the hide location - every search should be a genuine puzzle."],
  },
  "Vehicle Search": {
    steps: ["Start with just one vehicle, parked and stationary.", "Teach the dog to work the perimeter first - nose running along the lower edges of the vehicle.", "Hide the target odour in different locations: wheel arch, undercarriage, front grille, boot seam.", "Release with 'Find it!' and let the dog work around the vehicle systematically.", "Build to multiple vehicles once single-vehicle searches are reliable."],
    tips: ["The undercarriage is the most challenging - practise getting the dog comfortable low-searching.", "Parked vehicles leak many competing smells - diesel, oil, rubber. The dog must learn to filter these.", "Always check under vehicles are clear of hazards before beginning."],
    mistakes: ["Placing hides in the same spot repeatedly - vary every session.", "Working on running engines - scent dispersal changes with heat, start with cold vehicles.", "Skipping to vehicles before container and area searches are solid."],
  },
  "Tracking Line": {
    steps: ["Lay a track on grass - scuff your feet along a straight 20-metre line, drop treats every metre, place a jackpot reward at the end.", "Wait 30 minutes for the track to age slightly, then bring the dog to the start.", "Harness the dog on a long tracking line. Present the start of the track - let them sniff and begin following.", "Follow the dog - maintain slight tension on the line so you can feel their tracking rhythm. Don't rush them.", "Once the dog reaches the article at the end, huge reward and celebration."],
    tips: ["Tracking is one of the most natural dog behaviours - let the nose lead and don't interfere.", "Short, successful tracks build confidence faster than long, difficult ones.", "Increase track age, length, and complexity very gradually over weeks."],
    mistakes: ["Rushing the dog along the track - tracking is a slow, deliberate activity.", "Starting with old or complex tracks - fresh, straight, treat-laden tracks first.", "Pulling the dog off the track when they lose it - give them time to work it out."],
  },
};

const EXERCISES = {
  basic_commands: [
    { name: "Sit", description: "Ask dog to sit using hand signal and verbal cue. Reward immediately on completion.", levels: ["untrained","beginner","intermediate","advanced"], duration_mins: 3, reps: "10-15 reps", reward_type: "treat", rest_after_mins: 1 },
    { name: "Down", description: "From sit position, lure nose to ground until dog lies flat. Mark and reward.", levels: ["untrained","beginner","intermediate","advanced"], duration_mins: 3, reps: "8-12 reps", reward_type: "treat", rest_after_mins: 1 },
    { name: "Stay", description: "Ask for sit or down, then take one step back. Return and reward. Build duration slowly.", levels: ["beginner","intermediate","advanced"], duration_mins: 4, reps: "5-8 reps", reward_type: "treat", rest_after_mins: 2 },
    { name: "Come / Recall", description: "Call dog's name then 'come'. Reward heavily every time. Never punish a dog that comes to you.", levels: ["untrained","beginner","intermediate","advanced"], duration_mins: 5, reps: "8-10 reps", reward_type: "treat", rest_after_mins: 2 },
    { name: "Name Recognition", description: "Say dog's name once. When they look at you, mark and reward. Foundation for all training.", levels: ["untrained","beginner"], duration_mins: 2, reps: "15-20 reps", reward_type: "treat", rest_after_mins: 1 },
    { name: "Leave It", description: "Place treat on floor, cover with hand. When dog stops trying, reward with different treat.", levels: ["beginner","intermediate","advanced"], duration_mins: 3, reps: "8-10 reps", reward_type: "treat", rest_after_mins: 1 },
    { name: "Drop It", description: "Offer toy, when dog takes it say 'drop', swap for treat. Never chase or snatch.", levels: ["beginner","intermediate","advanced"], duration_mins: 3, reps: "6-8 reps", reward_type: "treat", rest_after_mins: 1 },
    { name: "Wait at Door", description: "Ask dog to sit at door, open door slowly, reward for staying still before releasing.", levels: ["intermediate","advanced"], duration_mins: 4, reps: "5-8 reps", reward_type: "treat", rest_after_mins: 2 },
  ],
  obedience: [
    { name: "Heel on Lead", description: "Dog walks calmly beside left leg. Reward for attention and correct position.", levels: ["beginner","intermediate","advanced"], duration_mins: 5, reps: "3-5 lengths", reward_type: "treat", rest_after_mins: 2 },
    { name: "Loose Lead Walking", description: "No tension on lead. Stop when dog pulls, reward when lead goes slack.", levels: ["untrained","beginner","intermediate"], duration_mins: 5, reps: "3-5 minutes walking", reward_type: "treat", rest_after_mins: 2 },
    { name: "Sit-Stay with Distance", description: "Place dog in sit-stay, walk 10 metres away. Return and reward. Build to 30 metres.", levels: ["intermediate","advanced"], duration_mins: 5, reps: "5-8 reps", reward_type: "treat", rest_after_mins: 2 },
    { name: "Down-Stay Duration", description: "Dog holds down position for increasing durations: 30 sec, 1 min, 3 mins, 5 mins.", levels: ["intermediate","advanced"], duration_mins: 6, reps: "3-5 reps", reward_type: "treat", rest_after_mins: 2 },
    { name: "Recall under Distraction", description: "Practice recall with mild distractions nearby. Food, toys, other people.", levels: ["intermediate","advanced"], duration_mins: 5, reps: "6-8 reps", reward_type: "treat", rest_after_mins: 3 },
    { name: "Send to Bed / Place", description: "Send dog to a mat or bed on command. Build duration and distance.", levels: ["intermediate","advanced"], duration_mins: 4, reps: "5-8 reps", reward_type: "treat", rest_after_mins: 2 },
    { name: "Stand-Stay", description: "Ask dog to stand still on command. Useful for vet exams and grooming.", levels: ["intermediate","advanced"], duration_mins: 3, reps: "8-10 reps", reward_type: "treat", rest_after_mins: 1 },
    { name: "Socialisation Walk", description: "Controlled walk past distractions: other dogs, people, traffic. Reward calm behaviour.", levels: ["untrained","beginner","intermediate","advanced"], duration_mins: 10, reps: "1 walk", reward_type: "treat", rest_after_mins: 5 },
  ],
  control: [
    { name: "Off-Lead Heel", description: "Heel exercise without lead. Dog must maintain position through turns, stops, pace changes.", levels: ["intermediate","advanced"], duration_mins: 6, reps: "3-5 routines", reward_type: "toy", rest_after_mins: 3 },
    { name: "Impulse Control — It's Yer Choice", description: "Open hand with treats. Dog must wait and not grab. Reward for patience.", levels: ["beginner","intermediate","advanced"], duration_mins: 4, reps: "10-15 reps", reward_type: "treat", rest_after_mins: 1 },
    { name: "Emergency Down", description: "Dog drops immediately to down from any position or at a distance on single command.", levels: ["intermediate","advanced"], duration_mins: 5, reps: "8-10 reps", reward_type: "treat", rest_after_mins: 3 },
    { name: "Distraction Proofing", description: "Run all known commands near high-value distractions: food on floor, other dogs playing.", levels: ["intermediate","advanced"], duration_mins: 8, reps: "Full routine x3", reward_type: "toy", rest_after_mins: 4 },
    { name: "Long Line Recall", description: "20-30 metre long line. Dog allowed to range, then called back with high reward.", levels: ["intermediate","advanced"], duration_mins: 6, reps: "8-10 recalls", reward_type: "toy", rest_after_mins: 3 },
    { name: "Boundary Training", description: "Teach dog to stay within a defined area without physical barriers.", levels: ["advanced"], duration_mins: 8, reps: "5-8 reps", reward_type: "treat", rest_after_mins: 4 },
    { name: "Focus / Watch Me", description: "Dog maintains eye contact with handler for increasing duration under distraction.", levels: ["beginner","intermediate","advanced"], duration_mins: 3, reps: "10-15 reps", reward_type: "treat", rest_after_mins: 1 },
  ],
  protection: [
    { name: "Tug Drive Building", description: "Build prey drive with tug toy. Dog must grip firmly on command and out on command.", levels: ["beginner","intermediate","advanced"], duration_mins: 5, reps: "5-8 sessions", reward_type: "toy", rest_after_mins: 5 },
    { name: "Out / Release Command", description: "Dog releases bite or toy immediately on 'out' command. Critical safety foundation.", levels: ["beginner","intermediate","advanced"], duration_mins: 5, reps: "10-15 reps", reward_type: "treat", rest_after_mins: 3 },
    { name: "Bark and Hold", description: "Dog barks at decoy/sleeve and holds position without biting until commanded.", levels: ["intermediate","advanced"], duration_mins: 6, reps: "5-8 reps", reward_type: "toy", rest_after_mins: 5 },
    { name: "Sleeve Introduction", description: "First introduction to bite sleeve. Dog targets sleeve confidently on command.", levels: ["beginner","intermediate"], duration_mins: 5, reps: "3-5 bites", reward_type: "toy", rest_after_mins: 10 },
    { name: "Focused Heel to Decoy", description: "Dog heels calmly past decoy, no reaction unless commanded. Tests impulse control.", levels: ["intermediate","advanced"], duration_mins: 8, reps: "3-5 passes", reward_type: "toy", rest_after_mins: 5 },
    { name: "Guard and Alert", description: "Dog alerts to presence of stranger, barks on command, stops on command.", levels: ["intermediate","advanced"], duration_mins: 6, reps: "5-8 reps", reward_type: "toy", rest_after_mins: 5 },
    { name: "Obedience Under Drive", description: "Run full obedience routine immediately after protection exercise to test control.", levels: ["advanced"], duration_mins: 8, reps: "Full routine x2", reward_type: "toy", rest_after_mins: 5 },
  ],
  detection: [
    { name: "Nose Games — Find the Treat", description: "Hide treats in boxes or around room. Dog searches using nose only.", levels: ["untrained","beginner","intermediate","advanced"], duration_mins: 5, reps: "3-5 searches", reward_type: "treat", rest_after_mins: 3 },
    { name: "Target Odour Introduction", description: "Introduce target scent (anise/birch/clove) in a tin. Reward dog for sniffing it.", levels: ["beginner","intermediate"], duration_mins: 5, reps: "10-15 reps", reward_type: "treat", rest_after_mins: 3 },
    { name: "Paired Odour Search", description: "Target odour always paired with food reward in container. Dog learns odour = reward.", levels: ["beginner","intermediate"], duration_mins: 6, reps: "5-8 searches", reward_type: "treat", rest_after_mins: 4 },
    { name: "Alert Behaviour Shaping", description: "Shape a specific alert: sit, down, or paw tap when target odour found.", levels: ["intermediate","advanced"], duration_mins: 8, reps: "8-12 reps", reward_type: "treat", rest_after_mins: 4 },
    { name: "Container Search", description: "5-10 boxes in a row. One has target odour. Dog searches all, alerts on correct one.", levels: ["intermediate","advanced"], duration_mins: 8, reps: "3-5 searches", reward_type: "treat", rest_after_mins: 5 },
    { name: "Area Search", description: "Search a defined outdoor or indoor area for hidden target odour. Build search area gradually.", levels: ["advanced"], duration_mins: 10, reps: "2-3 searches", reward_type: "treat", rest_after_mins: 5 },
    { name: "Vehicle Search", description: "Search around and under vehicles for target odour. Advanced exterior search.", levels: ["advanced"], duration_mins: 10, reps: "2-3 vehicles", reward_type: "treat", rest_after_mins: 5 },
    { name: "Tracking Line", description: "Follow a scent track laid 30 minutes prior. Start with straight lines, add turns.", levels: ["intermediate","advanced"], duration_mins: 10, reps: "1 track", reward_type: "treat", rest_after_mins: 10 },
  ],
};

const WEEK_THEMES = [
  { week: 1, theme: "Foundation — build confidence and focus", intensity: 60 },
  { week: 2, theme: "Consistency — repeat and reinforce", intensity: 70 },
  { week: 3, theme: "Challenge — add difficulty and distraction", intensity: 85 },
  { week: 4, theme: "Consolidate — proof and reward", intensity: 65 },
];

function formatAge(months) {
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years} year${years > 1 ? "s" : ""} ${rem} month${rem > 1 ? "s" : ""}`;
}

function getMaxSession(ageMonths, energy) {
  if (ageMonths < 6) return Math.max(5, ageMonths * 5);
  if (ageMonths < 12) return 15;
  if (ageMonths < 18) return 20;
  if (ageMonths > 96) return 15;
  return { low: 10, medium: 20, high: 30, very_high: 40 }[energy] || 20;
}

function getSessionsPerWeek(ageMonths, level) {
  if (ageMonths < 6) return 3;
  if (ageMonths < 12) return 4;
  return { untrained: 3, beginner: 4, intermediate: 5, advanced: 6 }[level] || 4;
}

function getExercises(trainingType, level) {
  let pool = EXERCISES[trainingType] || [];
  if (!["basic_commands", "obedience"].includes(trainingType)) {
    pool = [...(EXERCISES.basic_commands || []).slice(0, 3), ...pool];
  }
  return pool.filter(e => e.levels.includes(level));
}

function buildSession(exercises, maxMins, weekNum, dogName) {
  const selected = [];
  let total = 0;
  for (const ex of exercises) {
    if (total + ex.duration_mins + ex.rest_after_mins <= maxMins) {
      selected.push(ex);
      total += ex.duration_mins + ex.rest_after_mins;
      if (selected.length >= 5) break;
    }
  }
  if (selected.length < 2 && exercises.length > 0) {
    selected.push(exercises[0]);
    total = Math.min(5, maxMins);
  }
  return { session_number: weekNum, session_name: `Week ${weekNum} Training Session`, total_mins: total, exercises: selected, notes: `Always end on a success. Keep ${dogName} wanting more!` };
}

function generateTips(profile, breedInfo) {
  const tips = [
    "Always end every session on a positive — finish with something the dog knows well.",
    "Short sessions more frequently beat long sessions. Quality over quantity.",
    "Never train a tired, hungry, or stressed dog. Timing matters.",
    "Reward within 1-2 seconds of the correct behaviour — timing is everything.",
  ];
  if (profile.age_months < 6) tips.push("Puppy under 6 months: max 5 minutes per session. Focus on positive associations only.");
  if (profile.age_months < 18) tips.push("Young dog: joint growth plates not closed. Avoid repetitive jumping or impact work.");
  if (profile.age_months > 96) tips.push("Senior dog: watch for stiffness. Warm up with a gentle walk before training.");
  if (breedInfo.energy === "very_high") tips.push("High-drive breed: burn off physical energy with exercise BEFORE a training session for better focus.");
  if (profile.training_type === "protection") tips.push("Protection training: always work with a qualified, accredited trainer. Never train aggression without professional guidance.");
  if (profile.training_type === "detection") tips.push("Detection work: keep target odour sessions separate from food rewards to avoid contamination.");
  return tips;
}

function generatePlan(profile) {
  const breedInfo = getBreedInfo(profile.breed);
  const maxMins = getMaxSession(profile.age_months, breedInfo.energy);
  const sessionsPw = getSessionsPerWeek(profile.age_months, profile.training_level);
  const exercises = getExercises(profile.training_type, profile.training_level);
  const warning = profile.training_type === "protection" && !breedInfo.protection
    ? `${profile.breed} is not typically suited for protection work. Consider obedience or detection instead.` : null;
  const weeks = WEEK_THEMES.map(({ week, theme, intensity }) => {
    const sessionMins = Math.max(5, Math.round(maxMins * intensity / 100));
    return { week_number: week, theme, intensity_pct: intensity, sessions_per_week: sessionsPw, daily_session: buildSession(exercises, sessionMins, week, profile.dog_name) };
  });
  return {
    dog: { name: profile.dog_name, breed: profile.breed, age_display: formatAge(profile.age_months), energy_level: breedInfo.energy.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()), max_session_mins: maxMins, breed_notes: breedInfo.notes },
    owner_name: profile.owner_name || "Owner",
    training_type: profile.training_type.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()),
    training_level: profile.training_level.replace(/\b\w/g, c => c.toUpperCase()),
    weeks, general_tips: generateTips(profile, breedInfo), warning,
  };
}

const TRAINING_TYPES = [
  { v: "obedience", l: "Obedience", desc: "General manners & behaviour" },
  { v: "basic_commands", l: "Basic Commands", desc: "Sit, stay, come, heel" },
  { v: "control", l: "Control", desc: "Advanced off-lead control" },
  { v: "protection", l: "Protection", desc: "Guard & protection work" },
  { v: "detection", l: "Detection", desc: "Scent & nose work" },
];

const LEVELS = [
  { v: "untrained", l: "Untrained", icon: "🌱" },
  { v: "beginner", l: "Beginner", icon: "🐾" },
  { v: "intermediate", l: "Intermediate", icon: "⭐" },
  { v: "advanced", l: "Advanced", icon: "🏆" },
];

const ENERGY_COLORS = {
  "Low": { bg: "rgba(59,130,246,0.15)", text: "#3b82f6", border: "rgba(59,130,246,0.3)" },
  "Medium": { bg: "rgba(34,197,94,0.15)", text: "#22c55e", border: "rgba(34,197,94,0.3)" },
  "High": { bg: "rgba(249,115,22,0.15)", text: "#f97316", border: "rgba(249,115,22,0.3)" },
  "Very High": { bg: "rgba(239,68,68,0.15)", text: "#ef4444", border: "rgba(239,68,68,0.3)" },
};

const WEEK_COLORS = ["#22c55e", "#16a34a", "#ef4444", "#84cc16"];
const REWARD_EMOJI = { treat: "🍖", toy: "🎾", praise: "👏" };

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg:#0a0f0d; --surface:#111a14; --surface2:#182118; --border:rgba(255,255,255,0.07); --accent:#4ade80; --text:#f0f4f0; --muted:rgba(240,244,240,0.5); --danger:#fb923c; }
  .light { --bg:#f0f4f0; --surface:#ffffff; --surface2:#e8f0e8; --border:rgba(0,0,0,0.08); --accent:#16a34a; --text:#0a1a0a; --muted:rgba(10,26,10,0.5); --danger:#ea580c; }
  body { background:var(--bg); color:var(--text); font-family:'DM Sans',sans-serif; }
  .root { min-height:100vh; background:var(--bg); color:var(--text); transition:background 0.3s,color 0.3s; }
  .header { background:linear-gradient(135deg,#052e16,#14532d,#166534); padding:16px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(74,222,128,0.2); position:sticky; top:0; z-index:100; }
  .header-brand { display:flex; align-items:center; gap:10px; }
  .header-logo { font-size:28px; }
  .header-title { font-family:'Bebas Neue',sans-serif; font-size:24px; letter-spacing:2px; color:#4ade80; line-height:1; }
  .header-sub { font-size:10px; color:rgba(74,222,128,0.6); letter-spacing:1px; text-transform:uppercase; }
  .theme-btn { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:50px; padding:6px 14px; color:white; cursor:pointer; font-size:13px; }
  .main { max-width:480px; margin:0 auto; padding:20px 16px 40px; }
  .card { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:20px; margin-bottom:16px; }
  .card-title { font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
  .hero { text-align:center; padding:32px 16px 16px; }
  .hero-icon { font-size:72px; display:block; margin-bottom:12px; animation:bounce 2s infinite; }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .hero-title { font-family:'Bebas Neue',sans-serif; font-size:42px; letter-spacing:3px; line-height:1; }
  .hero-sub { color:var(--muted); font-size:13px; margin-top:6px; }
  .inp { width:100%; border:1px solid var(--border); border-radius:12px; padding:12px 16px; background:var(--surface2); color:var(--text); font-size:14px; font-family:'DM Sans',sans-serif; outline:none; transition:all 0.2s; }
  .inp:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(74,222,128,0.15); }
  .lbl { font-size:11px; font-weight:600; color:var(--muted); display:block; margin-bottom:6px; }
  .g2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .g2x2 { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .lvl-btn { padding:12px 8px; border-radius:14px; border:1.5px solid var(--border); background:var(--surface2); color:var(--muted); cursor:pointer; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; transition:all 0.2s; text-align:center; }
  .lvl-btn.on { border-color:var(--accent); background:rgba(74,222,128,0.1); color:var(--accent); transform:scale(1.03); }
  .typ-btn { width:100%; display:flex; align-items:center; gap:12px; padding:14px 16px; border-radius:14px; border:1.5px solid var(--border); background:var(--surface2); color:var(--text); cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; text-align:left; margin-bottom:8px; }
  .typ-btn.on { border-color:var(--accent); background:rgba(74,222,128,0.08); }
  .typ-lbl { font-weight:700; font-size:14px; }
  .typ-desc { font-size:11px; color:var(--muted); margin-top:1px; }
  .num-inp { text-align:center; font-weight:700; font-size:18px; }
  .hint { font-size:11px; color:var(--muted); text-align:center; margin-top:4px; }
  .submit { width:100%; padding:18px; background:linear-gradient(135deg,#16a34a,#4ade80); color:#052e16; font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:2px; border:none; border-radius:16px; cursor:pointer; box-shadow:0 4px 24px rgba(74,222,128,0.3); margin-top:8px; transition:all 0.2s; }
  .submit:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(74,222,128,0.4); }
  .err { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:12px; padding:12px 16px; font-size:13px; color:#ef4444; display:flex; gap:8px; margin-bottom:12px; }
  .fld { margin-bottom:12px; }
  .plan-hdr { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
  .plan-title { font-family:'Bebas Neue',sans-serif; font-size:36px; letter-spacing:2px; line-height:1; }
  .plan-meta { font-size:11px; color:var(--muted); margin-top:4px; }
  .act-btn { padding:8px 14px; border-radius:10px; border:1px solid var(--border); background:var(--surface2); color:var(--muted); cursor:pointer; font-size:12px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
  .edit-btn { color:var(--accent); font-weight:700; border-color:transparent; background:transparent; cursor:pointer; font-size:12px; font-family:'DM Sans',sans-serif; }
  .warn-box { background:rgba(251,146,60,0.1); border:1px solid rgba(251,146,60,0.3); border-radius:16px; padding:16px; margin-bottom:16px; }
  .warn-title { font-size:12px; font-weight:700; color:var(--danger); margin-bottom:4px; }
  .warn-text { font-size:12px; color:rgba(251,146,60,0.8); }
  .dog-card { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:20px; margin-bottom:16px; position:relative; overflow:hidden; }
  .dog-card::before { content:'🐾'; position:absolute; right:-10px; top:-10px; font-size:80px; opacity:0.04; transform:rotate(15deg); }
  .dog-name { font-family:'Bebas Neue',sans-serif; font-size:32px; letter-spacing:2px; }
  .dog-breed { font-size:13px; color:var(--muted); }
  .stat-lbl { font-size:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--muted); }
  .stat-val { font-family:'Bebas Neue',sans-serif; font-size:28px; color:var(--accent); }
  .badge { display:inline-flex; padding:4px 10px; border-radius:50px; font-size:11px; font-weight:700; }
  .breed-note { margin-top:12px; background:var(--surface2); border-radius:12px; padding:10px 14px; font-size:12px; color:var(--muted); border-left:3px solid var(--accent); }
  .prog { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:20px; margin-bottom:16px; }
  .prog-bars { display:flex; align-items:flex-end; gap:12px; height:80px; }
  .prog-bw { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; }
  .prog-bar { width:100%; border-radius:6px 6px 0 0; }
  .prog-lbl { font-size:10px; color:var(--muted); }
  .prog-pct { font-size:11px; font-weight:700; }
  .wk-tabs { display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; margin-bottom:16px; scrollbar-width:none; }
  .wk-tabs::-webkit-scrollbar { display:none; }
  .wk-tab { flex-shrink:0; padding:8px 18px; border-radius:50px; border:1.5px solid var(--border); background:var(--surface2); color:var(--muted); cursor:pointer; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
  .wk-tab.on { background:var(--accent); color:#052e16; border-color:var(--accent); }
  .wk-banner { border-radius:16px; padding:18px 20px; margin-bottom:16px; background:linear-gradient(135deg,#052e16,#14532d); border:1px solid rgba(74,222,128,0.2); }
  .wk-label { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(74,222,128,0.6); }
  .wk-theme { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:1px; color:#4ade80; margin:4px 0; }
  .wk-meta { font-size:11px; color:rgba(74,222,128,0.7); }
  .int-bar { height:4px; background:rgba(74,222,128,0.2); border-radius:2px; margin-top:10px; }
  .int-fill { height:100%; background:#4ade80; border-radius:2px; transition:width 0.5s; }
  .sess-card { background:var(--surface); border:1px solid var(--border); border-radius:20px; overflow:hidden; margin-bottom:16px; }
  .sess-hdr { width:100%; display:flex; justify-content:space-between; align-items:center; padding:16px 20px; background:none; border:none; color:var(--text); cursor:pointer; font-family:'DM Sans',sans-serif; text-align:left; }
  .sess-title { font-weight:700; font-size:15px; }
  .sess-meta { font-size:11px; color:var(--accent); font-weight:600; margin-top:2px; }
  .chev { font-size:12px; color:var(--muted); transition:transform 0.2s; }
  .chev.open { transform:rotate(180deg); }
  .ex-list { border-top:1px solid var(--border); }
  .ex-item { padding:16px 20px; border-bottom:1px solid var(--border); }
  .ex-item:last-of-type { border-bottom:none; }
  .ex-row { display:flex; gap:12px; }
  .ex-num { width:28px; height:28px; border-radius:8px; background:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.2); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:var(--accent); flex-shrink:0; margin-top:2px; }
  .ex-body { flex:1; min-width:0; }
  .ex-top { display:flex; justify-content:space-between; align-items:flex-start; gap:8px; }
  .ex-name { font-weight:700; font-size:14px; }
  .ex-right { text-align:right; flex-shrink:0; }
  .ex-dur { font-family:'Bebas Neue',sans-serif; font-size:20px; color:var(--accent); }
  .ex-rwd { font-size:11px; color:var(--muted); }
  .ex-desc { font-size:12px; color:var(--muted); margin-top:4px; line-height:1.5; }
  .ex-reps { font-size:11px; font-weight:600; color:#60a5fa; margin-top:4px; }
  .ex-rest { font-size:11px; color:var(--muted); margin-top:2px; }
  .guide { margin-top:14px; padding-top:14px; border-top:1px dashed var(--border); }
  .g-sec { margin-bottom:12px; }
  .g-title { font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:6px; }
  .g-title.steps { color:var(--accent); }
  .g-title.tips { color:#facc15; }
  .g-title.mistakes { color:#f87171; }
  .g-row { display:flex; gap:8px; margin-bottom:5px; font-size:12px; color:var(--muted); line-height:1.5; }
  .g-num { font-weight:700; flex-shrink:0; min-width:16px; }
  .g-num.s { color:var(--accent); }
  .g-num.t { color:#facc15; }
  .g-num.m { color:#f87171; }
  .sess-foot { padding:12px 20px; background:rgba(74,222,128,0.05); border-top:1px solid rgba(74,222,128,0.1); font-size:12px; color:rgba(74,222,128,0.8); font-weight:500; }
  .tips-card { background:rgba(251,191,36,0.05); border:1px solid rgba(251,191,36,0.2); border-radius:20px; padding:20px; margin-bottom:16px; }
  .tips-title { font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:rgba(251,191,36,0.8); margin-bottom:12px; }
  .tip-row { display:flex; gap:8px; margin-bottom:8px; font-size:12px; color:rgba(251,191,36,0.7); line-height:1.5; }
  .dl-row { display:flex; gap:10px; padding-bottom:24px; }
  .dl-btn { flex:1; padding:14px; border-radius:14px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-weight:700; font-size:13px; transition:all 0.2s; }
  .dl-btn:hover { transform:translateY(-2px); }
  .dl-json { background:var(--surface2); color:var(--muted); border:1px solid var(--border); }
  .dl-txt { background:var(--accent); color:#052e16; }
  @media print { .header,.submit,.act-btn,.dl-row,.wk-tabs{display:none!important} }
`;

function Guide({ name }) {
  const g = EXERCISE_GUIDES[name];
  if (!g) return null;
  return (
    <div className="guide">
      <div className="g-sec">
        <div className="g-title steps">How To Do It</div>
        {g.steps.map((s, i) => <div key={i} className="g-row"><span className="g-num s">{i+1}.</span><span>{s}</span></div>)}
      </div>
      <div className="g-sec">
        <div className="g-title tips">Trainer Tips</div>
        {g.tips.map((t, i) => <div key={i} className="g-row"><span className="g-num t">→</span><span>{t}</span></div>)}
      </div>
      <div className="g-sec">
        <div className="g-title mistakes">Common Mistakes</div>
        {g.mistakes.map((m, i) => <div key={i} className="g-row"><span className="g-num m">✗</span><span>{m}</span></div>)}
      </div>
    </div>
  );
}

function DogCard({ dog }) {
  const ec = ENERGY_COLORS[dog.energy_level] || ENERGY_COLORS["Medium"];
  return (
    <div className="dog-card">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <p style={{fontSize:"11px",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase",color:"var(--muted)",marginBottom:"2px"}}>Dog Profile</p>
          <div className="dog-name">{dog.name}</div>
          <div className="dog-breed">{dog.breed} · {dog.age_display}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <span className="badge" style={{background:ec.bg,color:ec.text,border:`1px solid ${ec.border}`}}>{dog.energy_level} Energy</span>
          <div style={{marginTop:12}}>
            <div className="stat-lbl">Max Session</div>
            <div className="stat-val">{dog.max_session_mins}<span style={{fontSize:14}}>min</span></div>
          </div>
        </div>
      </div>
      {dog.breed_notes && <div className="breed-note">💡 {dog.breed_notes}</div>}
    </div>
  );
}

function ProgChart({ weeks }) {
  return (
    <div className="prog">
      <div className="card-title">4-Week Progression</div>
      <div className="prog-bars">
        {weeks.map((w, i) => (
          <div key={i} className="prog-bw">
            <span className="prog-pct" style={{color:WEEK_COLORS[i]}}>{w.intensity_pct}%</span>
            <div className="prog-bar" style={{height:`${(w.intensity_pct/100)*56}px`,background:WEEK_COLORS[i]}}/>
            <span className="prog-lbl">Wk{w.week_number}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessCard({ session }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="sess-card">
      <button className="sess-hdr" onClick={() => setOpen(!open)}>
        <div>
          <div className="sess-title">{session.session_name}</div>
          <div className="sess-meta">{session.total_mins} min · {session.exercises.length} exercises</div>
        </div>
        <span className={`chev ${open?"open":""}`}>▼</span>
      </button>
      {open && (
        <div className="ex-list">
          {session.exercises.map((ex, i) => (
            <div key={i} className="ex-item">
              <div className="ex-row">
                <div className="ex-num">{i+1}</div>
                <div className="ex-body">
                  <div className="ex-top">
                    <div className="ex-name">{ex.name}</div>
                    <div className="ex-right">
                      <div className="ex-dur">{ex.duration_mins}<span style={{fontSize:12}}>m</span></div>
                      <div className="ex-rwd">{REWARD_EMOJI[ex.reward_type]} {ex.reward_type}</div>
                    </div>
                  </div>
                  <div className="ex-desc">{ex.description}</div>
                  {ex.reps && <div className="ex-reps">Reps: {ex.reps}</div>}
                  <div className="ex-rest">Rest: {ex.rest_after_mins} min</div>
                </div>
              </div>
              <Guide name={ex.name} />
            </div>
          ))}
          <div className="sess-foot">✅ {session.notes}</div>
        </div>
      )}
    </div>
  );
}

function DownloadPlan({ plan }) {
  const dlTxt = () => {
    let t = `PawForge Pro - ${plan.dog.name}'s Training Plan\n${"=".repeat(40)}\n`;
    t += `Breed: ${plan.dog.breed} | Age: ${plan.dog.age_display}\nTraining: ${plan.training_type} | Level: ${plan.training_level}\n\n`;
    plan.weeks.forEach(wk => {
      t += `WEEK ${wk.week_number}: ${wk.theme}\nSessions: ${wk.sessions_per_week}/week | Duration: ${wk.daily_session.total_mins} mins\n`;
      wk.daily_session.exercises.forEach(e => {
        t += `  - ${e.name} (${e.duration_mins} min)\n    ${e.description}\n`;
        const g = EXERCISE_GUIDES[e.name];
        if (g) {
          t += `    HOW TO:\n`; g.steps.forEach((s,i) => { t += `      ${i+1}. ${s}\n`; });
          t += `    TIPS:\n`; g.tips.forEach(s => { t += `      -> ${s}\n`; });
          t += `    AVOID:\n`; g.mistakes.forEach(s => { t += `      x ${s}\n`; });
        }
        t += "\n";
      });
    });
    t += "TIPS:\n" + plan.general_tips.map(x => `- ${x}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([t], {type:"text/plain"}));
    a.download = `${plan.dog.name}-training-plan.txt`; a.click();
  };
  const dlJSON = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(plan,null,2)], {type:"application/json"}));
    a.download = `${plan.dog.name}-training-plan.json`; a.click();
  };
  return (
    <div className="dl-row">
      <button className="dl-btn dl-json" onClick={dlJSON}>↓ JSON</button>
      <button className="dl-btn dl-txt" onClick={dlTxt}>↓ Download Plan</button>
    </div>
  );
}

function Home({ setPlan }) {
  const [form, setForm] = useState({ owner_name:"", dog_name:"", breed:"", age_months:12, weight_kg:25, training_level:"beginner", training_type:"obedience" });
  const [error, setError] = useState(null);
  const submit = () => {
    if (!form.dog_name.trim()) { setError("Please enter your dog's name."); return; }
    if (!form.breed.trim()) { setError("Please enter your dog's breed."); return; }
    setError(null); setPlan(generatePlan(form));
  };
  return (
    <div>
      <div className="hero">
        <span className="hero-icon">🐕</span>
        <div className="hero-title">Build Your Dog's Plan</div>
        <div className="hero-sub">Personalised daily training for your dog</div>
      </div>
      <div className="card">
        <div className="card-title">Owner & Dog Details</div>
        <div className="fld"><label className="lbl">Your Name (optional)</label><input className="inp" type="text" placeholder="e.g. James" value={form.owner_name} onChange={e=>setForm({...form,owner_name:e.target.value})}/></div>
        <div className="fld"><label className="lbl">Dog's Name *</label><input className="inp" type="text" placeholder="e.g. Rex" value={form.dog_name} onChange={e=>setForm({...form,dog_name:e.target.value})}/></div>
        <div className="fld"><label className="lbl">Breed *</label><input className="inp" type="text" placeholder="e.g. German Shepherd" value={form.breed} onChange={e=>setForm({...form,breed:e.target.value})}/></div>
      </div>
      <div className="card">
        <div className="card-title">Dog Stats</div>
        <div className="g2">
          <div><label className="lbl">Age (months)</label><input className="inp num-inp" type="number" min={2} max={240} value={form.age_months} onChange={e=>setForm({...form,age_months:+e.target.value})}/><div className="hint">{formatAge(form.age_months)}</div></div>
          <div><label className="lbl">Weight (kg)</label><input className="inp num-inp" type="number" min={1} max={120} value={form.weight_kg} onChange={e=>setForm({...form,weight_kg:+e.target.value})}/><div className="hint">{form.weight_kg} kg</div></div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Training Level</div>
        <div className="g2x2">
          {LEVELS.map(({v,l,icon})=>(
            <button key={v} className={`lvl-btn ${form.training_level===v?"on":""}`} onClick={()=>setForm({...form,training_level:v})}>{icon} {l}</button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title">Training Type</div>
        {TRAINING_TYPES.map(({v,l,desc})=>(
          <button key={v} className={`typ-btn ${form.training_type===v?"on":""}`} onClick={()=>setForm({...form,training_type:v})}>
            <div><div className="typ-lbl">{l}</div><div className="typ-desc">{desc}</div></div>
            {form.training_type===v&&<span style={{marginLeft:"auto",color:"var(--accent)"}}>✓</span>}
          </button>
        ))}
      </div>
      {error&&<div className="err"><span>⚠️</span><span>{error}</span></div>}
      <button className="submit" onClick={submit}>Generate Training Plan →</button>
      <p style={{textAlign:"center",fontSize:"11px",color:"var(--muted)",marginTop:"16px"}}>Based on positive reinforcement training science</p>
    </div>
  );
}

function Dashboard({ plan, reset }) {
  const [activeWeek, setActiveWeek] = useState(0);
  const week = plan.weeks[activeWeek];
  return (
    <div>
      <div className="plan-hdr">
        <div>
          <div className="plan-title">{plan.dog.name}'s Plan</div>
          <div className="plan-meta">{plan.training_type} · {plan.training_level} · {plan.dog.breed}</div>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <button className="act-btn" onClick={()=>window.print()}>🖨️ Print</button>
          <button className="edit-btn" onClick={reset}>← Edit</button>
        </div>
      </div>
      {plan.warning&&<div className="warn-box"><div className="warn-title">⚠️ Important Note</div><div className="warn-text">{plan.warning}</div></div>}
      <DogCard dog={plan.dog}/>
      <ProgChart weeks={plan.weeks}/>
      <div className="wk-tabs">
        {plan.weeks.map((w,i)=>(
          <button key={i} className={`wk-tab ${activeWeek===i?"on":""}`} onClick={()=>setActiveWeek(i)}>Week {w.week_number}</button>
        ))}
      </div>
      <div className="wk-banner">
        <div className="wk-label">Week {week.week_number} Theme</div>
        <div className="wk-theme">{week.theme}</div>
        <div className="wk-meta">{week.sessions_per_week} sessions · {week.daily_session.total_mins} mins per session</div>
        <div className="int-bar"><div className="int-fill" style={{width:`${week.intensity_pct}%`}}/></div>
      </div>
      <SessCard session={week.daily_session}/>
      <div className="tips-card">
        <div className="tips-title">Trainer Tips</div>
        {plan.general_tips.map((t,i)=><div key={i} className="tip-row"><span>•</span><span>{t}</span></div>)}
      </div>
      <DownloadPlan plan={plan}/>
    </div>
  );
}

export default function App() {
  const [plan, setPlan] = useState(null);
  const [dark, setDark] = useState(true);
  return (
    <>
      <style>{css}</style>
      <div className={`root ${dark?"":"light"}`}>
        <header className="header">
          <div className="header-brand">
            <div className="header-logo">🐾</div>
            <div>
              <div className="header-title">PawForge Pro</div>
              <div className="header-sub">AI-powered dog training plans</div>
            </div>
          </div>
          <button className="theme-btn" onClick={()=>setDark(!dark)}>{dark?"☀️ Light":"🌙 Dark"}</button>
        </header>
        <main className="main">
          {!plan?<Home setPlan={setPlan}/>:<Dashboard plan={plan} reset={()=>setPlan(null)}/>}
        </main>
      </div>
    </>
  );
}