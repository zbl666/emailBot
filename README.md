# emailBot
基于node实现的每天定时发送邮件

效果图展示
(http://119.29.24.92/public/img/email_d.jpg)[效果图]


1. - npm install

2.
 - 打开配置文件config/config.js,修改相应的配置，邮箱必须是网易邮箱，config中的emailPass是网易邮箱开启SMPT返回的字符串，如果修改为qq邮箱或其他邮箱需要在utils>email.js中修改SMTP 连接池连接池
 - 将index.js中的小花修改成您女朋友的名字
 - 将utils中cheerio.js中的const tqHOST = 'https://tianqi.moji.com/weather/china/anhui/maanshan'; 改成对应的地理位置
        
3.运行node ./index.js
# 
文字部分现为文艺句子，若修改为情话请将下列代码对utils>cheerio.js中对应部分进行替换
```js
const ONE = 'https://chp.shadiao.app/api.php'; // 彩虹屁
async function getOne() {
    // 获取每日一句
    try {
        let res = await superagent.req(ONE, 'GET');
        return cheerio.load(res.text).text();
    } catch (err) {
        console.log('错误', err);
        return err;
    }
}
```



