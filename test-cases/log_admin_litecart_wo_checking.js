// REPO link": https://github.com/VladimirWinch/Selenium_course_SWT.git


const { Builder, Capabilities, Browser, By, until, Key } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const path = require('path');


// Указываем явный путь к edgedriver из npm-пакета вручную (на всякий случай, если EdgeDriver не найден):
const edgeDriverPath = require('edgedriver').path;


async function edgeTest() {

    // Настройка сервиса EdgeDriver
    console.log('Запуск EdgeDriver из пути:', edgeDriverPath);

    // Настройка EdgeOptions (опционально)
    let options = new edge.Options();
//  options.setEdgeChromium(true);          // Используем Chromium-based Edge (с ним не запускалось - писал: "options is not a function")
    // options.addArguments('--headless=new'); // Режим без GUI

    // Создаем сервис и драйвер
    let service = new edge.ServiceBuilder(edgeDriverPath);      // Указываем путь
    let driver = await new Builder()
        .forBrowser(Browser.EDGE)
        .setEdgeService(service)            // Подключаем сервис
        .setEdgeOptions(options)
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


edgeTest();                         // Запускаем тест