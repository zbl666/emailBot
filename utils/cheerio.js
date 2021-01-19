const cheerio = require('cheerio');
const superagent = require('../config/superagent');
const ONE = 'https://v1.hitokoto.cn/?encode=JSON&c=d&c=h&c=j&c=i&c=k&c=l'; // 文艺句子
const tqHOST = 'https://tianqi.moji.com/weather/china/anhui/maanshan'; // 天气host
const config = require('../config/config')

async function getOne() {
    // 获取每日一句
    try {
        let res = await superagent.req(ONE, 'GET');
        const content = cheerio.load(res.text).text();
        const contentpro = JSON.parse(content);
        const text = contentpro.hitokoto;
        const from = contentpro.from;
        var from_who = contentpro.from_who;
        if(from_who==null){
            from_who=''
        }
        const oneDate={
            text,
            from,
            from_who
        }
        console.log(oneDate)
        return oneDate;
    } catch (err) {
        console.log('错误', err);
        return err;
    }
}

async function getTXweather() {
    // 获取天气
    try {
        let res = await superagent.req(tqHOST, 'GET'); 

        const $ = cheerio.load(res.text);
        //温度
        
        let  wendu = $(".days li").text().split("明天")[0];
        
        const icon = $('.wea_weather span img').attr('src');
        //天气
        const weather = $(".wea_weather b").text();
        //提示
        const tips = $(".wea_tips em").text();
        const mojiData = {
            icon,
            weather,
            wendu,
            tips
        }
        return mojiData
    } catch (err) {
        console.log('获取接口失败', err);
    }
}

module.exports = {
    getOne,
    getTXweather,
}