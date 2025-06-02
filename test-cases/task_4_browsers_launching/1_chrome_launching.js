// REPO link": https://github.com/VladimirWinch/Selenium_course_SWT.git

// From test case: '2_log_admin_litecart_wo_checking'


const { Builder, Capabilities, Browser, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');


// Указываем явный путь к chromedriver из npm-пакета вручную (на всякий случай, если chromedriver не найден / его нет в PATH):
const chromeDriverPath = require('chromedriver').path;


async function chromeLaunchingTest() {

    // Настройка сервиса ChromeDriver
    console.log('Запуск ChromeDriver из пути:', chromeDriverPath);

    // Настройка ChromeOptions (опционально)
    let options = new chrome.Options();

    // Создаем сервис и драйвер
    let service = new chrome.ServiceBuilder(chromeDriverPath);      // Указываем путь
    let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeService(service)            // Подключаем сервис
        .setChromeOptions(options)
        .build();


    try {
        
        await driver.get('http://localhost/litecart/admin/');       // Открываем страницу
        let title = await driver.getTitle();                        // Проверяем заголовок
        console.log('My Store', title);
        // Автоматизация проверки:
        const expectedTitle = "My Store";
        if (title === expectedTitle) {
        console.log("Заголовок корректен!");
        } else {
        console.error(`Ошибка! Заголовок: "${title}", ожидалось: "${expectedTitle}"`);
        }

        // Поиск и заполнение поля 'Username':
        await driver.findElement(By.name('username')).click()
        await driver.findElement(By.name('username')).sendKeys('User Name')

        // Поиск и заполнение поля 'Password':
        await driver.findElement(By.name('password')).click()
        await driver.findElement(By.name('password')).sendKeys('Password')
      
        // Отметка чекбокса 'Remember Me':
        await driver.findElement(By.name('remember_me')).click()
      
        // Поиск и нажатие на кнопку 'Login'
        await driver.findElement(By.name('login')).click()


     } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        await driver.quit();        // Закрываем браузер
    }

}   // end of async


chromeLaunchingTest();                         // Запускаем тест


