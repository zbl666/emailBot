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
        <p style="font-size: 28px;color: #2a8bde;margin: 10px 0;">和陈安宁婧相恋的第<span style="color: #dabf5e;"> ${DateTime.getDay(config.MEMORIAL_DAY)} </span>天</p>
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
    <P style="color:#fff;font-weight:900;text-align:center;bottom:100px;width: 100%;font-size: 30px;text-shadow:3px 2px 2px rgba(1,138,110,.6);margin: 50px auto;">
    ${oneText}
    </P>
    </div>
</div>`
    Email.sendEmail(content)
}


Schedule.setSchedule("00 21 5 * * *", function () {
    run()
})
