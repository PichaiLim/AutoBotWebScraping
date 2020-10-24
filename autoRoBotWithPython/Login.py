import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.select import Select
from bs4 import BeautifulSoup as bs

driver = webdriver.Chrome(executable_path="plugin/chromedriver")
driver.get('URL ADDRESS')

print(driver.title)

username = driver.find_element_by_id('id-username')
username.send_keys('UserNAME')

password = driver.find_element_by_id('id-password')
password.send_keys('Password')

get_captcha = driver.find_element_by_class_name('input-group-addon').text
driver.find_element_by_id('CaptchaCode').send_keys(get_captcha)

driver.find_element_by_xpath("//button[@type='submit']").click()
time.sleep(1)

driver.get(driver.current_url)#('https://i99betag.234ag.net/security')
print('security %s' % driver.title)
driver.find_element_by_id('sccode').send_keys('recaptcha')
driver.find_element_by_xpath("//button[@type='submit']").click()
time.sleep(1)

while True:
    # TODO Winloss
    print('winloss\r\n')
    driver.find_element_by_xpath("//*[@id='buttonHead']/span[3]/a").click()
    time.sleep(5)
    # TODO Form wind/loss
    Select(driver.find_element_by_id("perpage")).select_by_visible_text("5000")
    # driver.find_element_by_xpath("(.//*[normalize-space(text()) and normalize-space(.)='Date :'])[1]/following::option[8]").click()
    driver.find_element_by_id("btn_search").click()
    print('Get show form wind / loss \r\n')
    # url = driver.current_url
    # print(url, '\r\n')

    time.sleep(2)

    # TODO Print Out Tag
    # print(driver.page_source, '\r\n')
    htmlText = driver.page_source

    soup = bs(htmlText, "html.parser")
    data = soup.find("table", {'id': 'tb_winLoseMember'})
    print(data, '\r\n')

    time.sleep(1)

# TODO Auto refresh page
# driver.refresh()
# time.sleep(2)
# driver.refresh()

# TODO Log out
# driver.get('https://i99betag.234ag.net/logout')
# print('logout')
time.sleep(5)

driver.close()
