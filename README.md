# Azeliore-Bot
A discord bot to simulate the Genshin banner system backed with statistical models so users can pull for free and test their luck. The banners available to wish on are those on the second-phase of version 3.3 (Raiden and Ayato rerun banners).

# Motivation for Bot
When you explore the Genshin community, you're quick to see that, well, Genshin has an enormous fan-base! Some players play the game for the open-world exploration aspect, others for the story/lore, and some even just for the gacha system. I personally play the game because I love the graphics in the game along with the lore but when I asked one of my friends why they play it, I got the response, "I'm only here for the gacha". I too love the gacha system because it has a chance to give you a rare character/weapon with an amazing design, but... there is one down side to it. The gacha system can get real pricy... That is why, to motivate my friends and I in our own discord server, I have decide to create a free-to-use Genshin gacha simulator to fuel our addiction without spending actual money :DDD. Although it does not give us the actual character/weapons in game, this is a temporary coping mechanism for us :).

![glide](https://user-images.githubusercontent.com/97481912/222617464-c018cbf7-49cd-4c46-8c7f-74338369962b.gif)

# A Few Motivating Designs...

![ganyu](https://user-images.githubusercontent.com/97481912/222618276-372fd814-c481-4234-b264-b86696c8905a.jpg)
![kazuha](https://user-images.githubusercontent.com/97481912/222618278-a94b6c6b-a41e-41b5-b41c-eb684fb5c72c.jpg)
![weapons](https://user-images.githubusercontent.com/97481912/222618390-a9c9eebc-3c7b-40e3-8657-959342f7addd.png)

# Disclaimer
*Azeliore bot*, by no means, is an indicative measure of the actual probabilities used by **Genshin Impact** for its banner drop rates. *Azeliore-bot* only makes use of known probabilities based on the community's statistical results. The statistical model forums are obtained via https://bit.ly/3ivulJ2 and https://bit.ly/3X9326k and are used primarily in the pity system of this bot. Most of the research has been done by **Sengalev**, **G-Azure** and the Genshin community. For a more comprehensive dataset, please reach out to either **Sengalev** or **G-Azure** as they will be better able to provide statistical rates and sample size. Use this bot at your enjoyment and have fun wishing for your character/weapon of choice traveller! :)

# Getting Started
If you already have the bot on one of your servers and want to add it to another server, you can simply click the **Add to Server** button. Otherwise, you can add it to one of your servers using this link: https://bit.ly/3KMXFqe.

![addtoserver](https://user-images.githubusercontent.com/97481912/222246610-0b9138fc-d451-4a31-b8b6-06f8baab8512.png)

# Available Commands
To see a list of the available commands, you can either use the **!help** command either in DMs or in a server that the bot is in.

https://user-images.githubusercontent.com/97481912/222247139-599ee8f7-d47e-455c-a336-248c875f3c8f.mp4

# Setup Before Wishing
Now before you start wishing, you should also probably set which banner you want to wish on (there are 4 banners), along with which fate selection you're wishing towards (if you decide to wish on the weapon banner).

## Changing Your Current Banner Selection:

https://user-images.githubusercontent.com/97481912/222249931-c2219982-7be8-4c38-8953-084bdae190a9.mp4

## Changing Your Current Fate Selection:

https://user-images.githubusercontent.com/97481912/222250727-7f4d21c3-a619-4da6-b534-6f08f4f8f54f.mp4


# Wishing

Hooray! You have finished setting up everything. That's right, that's all there is to set up! Now you can start wishing towards your currently selected banner (of course, each will have different promotional weapons/characters). To begin a wish, use the **!wish 1** or **!wish 10** command.

https://user-images.githubusercontent.com/97481912/222251246-fa23087e-ea81-45d9-a9e0-afdf269ea79c.mp4

# Tech-Stack
This project is built using Node.js and made use of the discord.js module for configuring the bot and the fan-made genshin-js API for consuming the data 
(https://github.com/genshindev/api). A MongoDB cluster is also being utilized so users can have distinct pity across banners and secure personalized data between different accounts. This bot has been deployed via Railway (https://railway.app/) and has a maximal uptime so users can play around with the bot whenever they want. If there is anything you would like to see changed or added, feel free to let me know! More to come~ :)

# How the Rates are Calculated (Lengthy Post Disclaimer!)
If you are interested in how the pity system works in Genshin, feel free to read the passages below! Otherwise, thanks for checking this repo out and for playing with the bot! :)

## Definitions/Terminology (Will be used throughout explanations)

1. **Banner**: The event space where you can pull for a specific character or weapon (promotional or non-promotional).

2. **Pull/Wish/Roll/Summons**: A singular roll on a banner which yields a 3-star, 4-star or 5-star loot. Wishes can only be made in batches of 1 or 10 (i.e., 1-wish or 10-wish)

3. **Pity**: Usually referred by Genshiners as the amount of times they have pulled and have been unsuccessful in obtaining a 5-star ever since the last 5-star loot they have received (i.e. if it has been 45 pulls since I got my last 5 star, my pity would be 45). Note: can also be applied to the number of unsuccessful pulls for a 4-star but is most commonly used to refer to 5-stars pulls.

4. **Soft Pity**: After a certain amount of pulls without successfully acquiring a 4-star or 5-star character/item, there will be a greatly increased chance of obtaining a featured character/item in the next pull. This rate can vary across banners but soft pity usually appears around the 9th pull for 4-star items/characters and around 73 for 5-star characters (event & permanent banners) and 63 for 5* weapons (weapon banner).

5. **Hard Pity**: 4-star loot are guaranteed to drop on the 10 consecutive wishes/pulls if the user does not obtain a 4-star loot in the previous 9 pulls. Similarly, 5-star characters are guaranteed to drop on the 90th consecutive wish/pull if user does not obtain a 5-star loot in the previous 89 pulls. 5-star weapons, on the other hand, are guaranteed on the 80th pull (applies only for weapon banner). When players say "hard-pity" they are usually refering to reaching the maximum amount of pulls before securing a 5-star character/weapon.

6. **Guaranteed**: After a few unsuccessful 5-star pulls in a promotional banner, you are guaranteed to obtain the promotional character/weapon. For the promotional character banner, you are guaranteed to receive the promotional character on your next pull if you were unsuccessful in the previous 5-star summon. After receiving the promotional character, the guarantee system restarts (i.e. your next 5-star is not guaranteed anymore, but will be guaranteed again if you fail to achieve the promotional 5-star again, then your subsequent one will be the promotional character/weapon). This does not apply to the standard/permanent banners as there is no guarantee for which character/weapon you will get.

7. **Base Rate**: The chances of players obtaining a 5-star loot before the pity system kicks in. The base rate announced by Mihoyo is 0.6%, which is equivalent to a 1/167 chance of getting a 5-star loot.

8. **Consolidated Rate**: The chances of players obtaining a 5-star loot disregarding their current pity. In short, this is the probability of successfully pulling a 5-star randomly with any pull.

9. **Mihoyo/Hoyoverse/Cognosphere PTE. LTD.**: The leading producing video game company of Genshin Impact.

## Probability of Successful Pull in Promotional Character Banner

The promotional character/event banner features a special 5-star character that can only be obtained from this banner (i.e. not included in permanent and standard banners. There are special exceptions once in a while when a new character/weapon is being released and appended to the list of permanent character/weapons). Mihoyo guarantees that a 5-star will drop after 90 unsuccessful wishes. If the 5-star obtained is not the featured character, then the subsequent 5-star pull will be guaranteed to be the promotional character. That is to say, Mihoyo guarantees that the promotional character is obtained after 180 pulls. 

However, based on drop rates seen by the Genshin community when a 5-star character is dropped, it is speculated that there is a hidden "pity" system exists where the chances of obtaining a 5-star character is increased greatly after a certain amount of pulls. This is speculated to be around the 73th pull where chances are increased proportionally by each subsequent pull with the base rates provided by Mihoyo. Based on most summons noted by users in the game so far, most will obtain a 5-star before ever hitting the 90-th pull mark (i.e. often referred to Genshiners as "hard pity"). In fact, it is quite hard to really ever reach hard-pity as the success rate grows greatly the closer you get to hard-pity. That is to say, cumulative probability begins to take over at the soft pity mark with each pull increasing the probability by an amount proportional to the base rate. Everything before soft pity runs on an equally likely probability mass function (i.e. rates provided by the per-pull basis).

On the per-pull probability, it is seen that most singular pulls share the same base rate of rolling a 5-star. However, as depicted in the graph below, the per-pull rate appears to grow linearly as the pity rate grows (in proportion to the base rates provided by **Mihoyo**). The success rate appears to grow at a linear rate of 10\*base_rate for that banner for ever pull you are above the soft-pity rate. (i.e., *(current_pity-soft_pity) \* (10\*base_rate)*). This is the probability measure used in the bot and the probability measure that most closely resemble the gacha environment in **Genshin Impact**.

![image](https://user-images.githubusercontent.com/97481912/212567571-6e2fb94a-5de9-4c1c-9fc8-b354bd524e54.png)

## Probability of Successful Pull in Promotional Weapon Banner

The blue line in the graph represents the odds of getting a successful 5* item/character in the promotional weapon banner 
when being compared with the standard banner (i.e. Permanent and Character banners), which is represented by the blue line.

The pity system is more or less the same as the character banners, except that the soft-pity rate is reduced by around 10 pulls (i.e. 5-star becomes more frequent around the 63th pull).

![image](https://user-images.githubusercontent.com/97481912/212567638-b8c35a2d-f577-4696-9eaa-3817827a1f08.png)
As can be seen, the weapon event banner appears to have a lower "soft-pity" nearing around the 63-65 mark when compared with the standard 
and promotional character banners, which is around 73-75 wishes in.

One thing to note in the weapon banner though is that the pity is not shared across subsequent banners. In the promotional character and permanent banners, pity is shared between subsequent banners. That is, if you were unsuccessful in obtaining the 5-star promotional character in the promotional character banner, and the event banner ended, the next 5-star you pull on the subsequent event banner will be guaranteed to be the promotional character. This is not the case for the weapon banner (i.e. you will restart with a pity of 0 when a new weapon banner releases). 

If you were unsuccessful in obtaining the promotional 5-star weapon on the promotional weapon banner, the next weapon will not be guaranteed to be the promotional weapon. In fact, the pity system works differently as there are two featured weapons in the promotional weapon banner and the chances of obtaining a rate-up weapon is 75% compared with any non-uprated weapons which is 25%. Since there are two weapons, the probability of acquiring any of the two rate-up weapon is realistically 75%/2 = 37.5%.

There is, however, a 'fates system' where you can select which weapon you want. If you indicate in the 'fates path' a weapon of choice and you did not acquire that weapon upon pulling a 5-star, you will acquire one fate point. Upon having two points accumulated, your next 5-star pull will be guaranteed to be the weapon of your choice. That is, you would require 80x3=240 total pulls, in worst case, to pull your desired weapon. Also note that if you did not get any of the rate-up promotional weapons in your 5-star wish, then your next 5-star weapon is guaranteed to be one of the rate-up weapons (but it can be any of the two rate up weapons). 

## Simulating the Per-roll Success Rate
![image](https://user-images.githubusercontent.com/97481912/212567680-0c4ebd2d-34f8-4df7-ac39-cfa6e4c1e80b.png)

## TLDR
- Mihoyo guarantees that you will receive a 5-star pull within 90 pulls (for promotional character and permanent banner) but many players obtain a 5-star before ever reaching this number. 
- This number seems to appear after the 73 pull (for the character/permanent banner) and 63 (for the weapon banner) and grows proportionally based on the base-rate provided by Mihoyo for that banner (different banner have different base rates). This is referred to as soft-pity.
- Based on simulated and real data collected from a large sample size, the rate of success appears to be roughly modelled by the expression success_rate = base_rate + max(0, (current_pity-soft_pity) * 10 * base_rate). The max function (i.e. soft pity activates) only holds true when current_pity > soft_pity. That is, your current pity must be above the speculated soft pity rate for the banner.
- Note that in practice, an abundance of players receive a 5-star loot around the 75th pity for non-weapon banners and 65th pity for weapon banners.

## Thanks for taking the time to read this ;D
If you would like to add me on Genshin, my UID is 612964160!
