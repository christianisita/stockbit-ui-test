const { Given, When, Then, setDefaultTimeout, AfterAll } = require('@cucumber/cucumber')
const { Builder, By, Capabilities, Key } = require('selenium-webdriver')
const { expect } = require('chai')

require("chromedriver");

const capabilities = Capabilities.chrome()
capabilities.set('chromeOptions', { "w3c": false })
const driver = new Builder().withCapabilities(capabilities).build()
setDefaultTimeout(60000)

Given('I visit stockbit landing page', async () => {
    await driver.get('https://stockbit.com')
})

Then('I would see Playstore download button', async () => {
    const playstoreUrl = "https://play.google.com/store/apps/details?id=com.stockbit.android&hl=en"
    playstoreButton = await driver.findElement(By.xpath(`//a[contains(@href, '${playstoreUrl}')]`))
    expect(playstoreButton.length).to.not.eql(0)
})

When('I click the Playstore download button', async () => {
    const playstoreUrl = "https://play.google.com/store/apps/details?id=com.stockbit.android&hl=en"
    const playstoreButton = await driver.findElement(By.xpath(`//a[contains(@href, '${playstoreUrl}')]`))
    expect(playstoreButton.length).to.not.eql(0)
    await playstoreButton.click()
})

Then('A new tab would open with stockbit\'s url playstore on it', async () => {
    //let parent = driver.getWindowHandle()
    let windows = await driver.getAllWindowHandles() 
    await driver.switchTo().window(windows[1])
    const url = await driver.getCurrentUrl()
    driver.sleep(3000)
    driver.close();                                
    expect(url).to.eql("https://play.google.com/store/apps/details?id=com.stockbit.android&hl=en")    
})

AfterAll( async () => {
    await driver.quit()
})