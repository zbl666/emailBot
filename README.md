# emailBot
基于node实现的每天定时发送邮件



1.npm install

2.打开配置文件config/config.js,修改相应的配置，将index.js中的小花修改成您女朋友的名字，
将utils中cheerio.js中的const tqHOST = 'https://tianqi.moji.com/weather/china/anhui/maanshan'; 改成对应的地理位置
        
3运行node ./index.js



*邮箱必须是网易邮箱



*config中的emailPass是网易邮箱开启SMPT返回的字符串
