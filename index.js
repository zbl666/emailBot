const Email = require('./utils/email')
const Schedule = require('./utils/schedule')
const DateTime = require('./utils/dateTime')
const Cheerio = require('./utils/cheerio')
const config = require('./config/config')

async function run() {
    let oneText = await Cheerio.getOne()
    let weather = await Cheerio.getTXweather()
    let today = DateTime.getToday()
    let content = `<div style="position:relative;background:-webkit-linear-gradient(-45deg,  #5edac1 0%,#327dda 100%,#1a7a93 100%);width:100%;padding-bottom: 30px;" >
    <div style="padding: 15px;color: #237ecc;">
        <p style="font-size: 18px;margin: 10px 0;">${today}</p>
        <p style="font-size: 28px;color: #2a8bde;margin: 10px 0;">和小花相恋的第<span style="color: #dabf5e;"> ${DateTime.getDay(config.MEMORIAL_DAY)} </span>天</p>
    </div>
    <div style="padding: 10px 25px;color: #fff;">
        <div>
            <span style="font-size: 48px;font-weight: 700;">${weather.wendu}</span>&nbsp;
            <img style="position: relative;top: 8px;height: 30px;" src="${weather.icon}" alt="">
            <span>${weather.weather}</span>&nbsp;&nbsp;
        </div>
        <p>
            ${weather.tips}
        </p>
    </div>
    <div style='    position: relative;
    color: white;
    z-index: 1;
    margin-top: 2vh;
    margin-bottom: 35vh;
    margin-left: auto;
    margin-right: auto;font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Arial, sans-serif;'>
          <div style='position: absolute;left: 0;top: 0;'>『</div>
          <div style='font-size: 2.3rem;text-align: center;line-height: 50px;word-break: normal;margin: 0;padding: 15px 50px;'>${oneText.text}</div>
          <div  style='position: absolute;right: 0;bottom: 0;'>』</div>
          <div  style='font-size: 20px;color: rgba(255, 255, 255, 0.8);float: right;margin-top: 40px;'>—— ${oneText.from_who}「${oneText.from}」</div>
        </div>
    </div>
</div>`
    Email.sendEmail(content)
}


Schedule.setSchedule("00 21 5 * * *", function () {
    run()
})