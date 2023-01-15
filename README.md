# Azeliore-bot
A discord bot to simulate the Genshin banner system backed with statistical models so users can pull for free and test their luck. 
The statistical model forums are obtained via https://bit.ly/3ivulJ2 and https://bit.ly/3X9326k and are used primarily in the pity system of this bot.

# Tech-Stack
This project is built using Node.js and made use of the discord.js module for configuring the bot and the fan-made genshin-api to consuming the data 
(https://github.com/genshindev/api). A MongoDB cluster is also being implemented so users can have distinct pity across banners and secure personalized data between
different accounts. This bot will eventually be deployed to achieve maximal uptime so users can play around with the bot whenever they want. More to come~ :)

# Probability of Successful Pull in Promotional Character Banner
![image](https://user-images.githubusercontent.com/97481912/212567571-6e2fb94a-5de9-4c1c-9fc8-b354bd524e54.png)

# Probability of Successful Pull in Promotional Weapon Banner

The blue line in the graph represents the odds of getting a successful 5* item/character in the promotional weapon banner 
when being compared with the standard banner (i.e. Permanent and Character banners), which is represented by the blue line.

![image](https://user-images.githubusercontent.com/97481912/212567638-b8c35a2d-f577-4696-9eaa-3817827a1f08.png)
As can be seen, the weapon event banner appears to have a lower "soft-pity" nearing around the 63-65 mark when compared with the standard 
and promotional character banners, which is around 73-75 wishes in.

# Simulating the Per-roll Success Rate
![image](https://user-images.githubusercontent.com/97481912/212567680-0c4ebd2d-34f8-4df7-ac39-cfa6e4c1e80b.png)
