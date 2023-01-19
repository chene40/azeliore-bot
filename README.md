# Azeliore-bot
A discord bot to simulate the Genshin banner system backed with statistical models so users can pull for free and test their luck. 

# Disclaimer!!!
The statistical model forums are obtained via https://bit.ly/3ivulJ2 and https://bit.ly/3X9326k and are used primarily in the pity system of this bot. Most of the research has been done by Sengalev, G-Azure and the Genshin community. For a more comprehensive dataset, please reach out to either Sengalev or G-Azure as they will be better able to provide statistical rates and sample size. Azeliore-bot only makes use of known statistics either by the author himself or by any community support.

# Tech-Stack
This project is built using Node.js and made use of the discord.js module for configuring the bot and the fan-made genshin-api to consuming the data 
(https://github.com/genshindev/api). A MongoDB cluster is also being implemented so users can have distinct pity across banners and secure personalized data between
different accounts. This bot will eventually be deployed to achieve maximal uptime so users can play around with the bot whenever they want. More to come~ :)

# Definitions/Terminology! (Will be used throughout explanations)

1. **Banner**: The event space where you can pull for a specific character or weapon (promotional or non-promotional).

2. **Pull/Wish/Roll/Summons**: A singular roll on a banner which yields a 3-star, 4-star or 5-star loot. These can also be made in 10x increments (i.e. 10-roll).

3. **Pity**: Usually referred by Genshiners as the amount of times they have pulled and have been unsuccessful in obtaining a 5-star ever since the last 5-star loot they have received (i.e. if it has been 45 pulls since I got my last 5 star, my pity would be 45). Note: can also be applied to the number of unsuccessful pulls for a 4-star but is most commonly used to refer to 5-stars pulls.

4. **Soft Pity**: After a certain amount of pulls without successfully acquiring a 4-star or 5-star character/item, there will be a greatly increased chance of obtaining a featured character/item in the next pull. This rate can vary across banners but soft pity usually appears around the 9th pull for 4-star items/characters and around 73 for 5-star characters (event & permanent banners) and 63 for 5* weapons (weapon banner).

5. **Hard Pity**: 4-star loot are guaranteed to drop on the 10 consecutive wishes/pulls if the user does not obtain a 4-star loot in the previous 9 pulls. Similarly, 5-star characters are guaranteed to drop on the 90th consecutive wish/pull if user does not obtain a 5-star loot in the previous 89 pulls. 5-star weapons, on the other hand, are guaranteed on the 80th pull (applies only for weapon banner). When players say "hard-pity" they are usually refering to reaching the maximum amount of pulls before securing a 5-star character/weapon.

6. **Guaranteed**: After a few unsuccessful 5-star pulls in a promotional banner, you are guaranteed to obtain the promotional character/weapon. For the promotional character banner, you are guaranteed to receive the promotional character on your next pull if you were unsuccessful in the previous 5-star summon. After receiving the promotional character, the guarantee system restarts (i.e. your next 5-star is not guaranteed anymore, but will be guaranteed again if you fail to achieve the promotional 5-star again, then your subsequent one will be the promotional character).

7. **Base Rate**: The chances of players obtaining a 5-star loot before the pity system kicks in. The base rate announced by Mihoyo is 0.6%, which is equivalent to a 1/167 chance of getting a 5-star loot.

8. **Consolidated Rate**: The chances of players obtaining a 5-star loot disregarding their current pity. In short, this is the probability of successfully pulling a 5-star randomly with any pull.

# Probability of Successful Pull in Promotional Character Banner

The promotional character/event banner features a special 5-star character that can only be obtained from this banner (i.e. not included in permanent and standard banners). Mihoyo guarantees that a 5-star will drop after 90 unsuccessful wishes. If the 5-star obtained is not the featured character, then the subsequent 5-star pull will be guaranteed to be the promotional character. That is to say, Mihoyo guarantees that the promotional character is guaranteed after 180 pulls. 

However, based on drop rates seen by the Genshin community when a 5-star character is dropped, it is speculated that there is a hidden "pity" system exists where the chances of obtaining a 5-star character is increased greatly after a certain amount of pulls. This is speculated to be around the 73th pull where chances are increased proportionally by each subsequent pull with the base rates provided by Mihoyo. Based on most summons noted by users in the game so far, most will obtain a 5-star before ever hitting the 90-th pull mark (i.e. often referred to Genshiners as "hard pity").

The cumulative probability shows that as players wish more, their chances of obtaining a 5-star character grows. This growth is most noticeable within the 70-80 range where there is a large jump in the probability of successfully pulling a 5-star. Near the 80th pull mark, the chances of obtaining a 5-star are practically guaranteed.

On the per-pull probability, it is seen that most singular pulls share the same base rate of rolling a 5-star. However, as depicted in the graph below, the per-pull rate appears to grow linearly as the pity rate grows (in proportion to the consolidated rates provided by Mihoyo). 

![image](https://user-images.githubusercontent.com/97481912/212567571-6e2fb94a-5de9-4c1c-9fc8-b354bd524e54.png)

# Probability of Successful Pull in Promotional Weapon Banner

The blue line in the graph represents the odds of getting a successful 5* item/character in the promotional weapon banner 
when being compared with the standard banner (i.e. Permanent and Character banners), which is represented by the blue line.

The pity system is more or less the same as the character banners, except that the soft-pity rate is reduced by around 10 pulls (i.e. 5-star becomes more frequent around the 63th pull).

![image](https://user-images.githubusercontent.com/97481912/212567638-b8c35a2d-f577-4696-9eaa-3817827a1f08.png)
As can be seen, the weapon event banner appears to have a lower "soft-pity" nearing around the 63-65 mark when compared with the standard 
and promotional character banners, which is around 73-75 wishes in.

# Simulating the Per-roll Success Rate
![image](https://user-images.githubusercontent.com/97481912/212567680-0c4ebd2d-34f8-4df7-ac39-cfa6e4c1e80b.png)
