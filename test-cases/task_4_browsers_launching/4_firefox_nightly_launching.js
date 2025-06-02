// REPO link": https://github.com/VladimirWinch/Selenium_course_SWT.git

// From test case: '2_log_admin_litecart_wo_checking'


const { Builder, By } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
// const path = require('path');                                                // если с [PATH]

async function firefoxNightlyLaunchingTest() {

    // Настройка сервиса FirefoxDriver
    // console.log('Запуск FirefoxDriver из пути:', firefoxDriverPath);         // если с [PATH]

    // Настройка FirefoxOptions
    const options = new firefox.Options();

    // Указываем путь к Firefox (если нет в PATH)
    options.setBinary('C:/Program Files/Firefox Nightly/firefox.exe');                  // Windows
    // options.setBinary('/usr/bin/firefox-nightly');                                   // Linux
    // options.setBinary('/Applications/Firefox Nightly.app/Contents/MacOS/firefox');   // macOS

    // Аргументы (ОПЦИОННО)
    options.addArguments('--start-maximized');
    // options.addArguments('--user-data-dir=/path/to/profile');                // установка пользоват. профиля Firefox

    // Создаем драйвер
    // const service = new firefox.ServiceBuilder(firefoxDriverPath);           // если с [PATH] (указываем путь)
    const driver = await new Builder()
        .forBrowser('firefox')
        // .setFirefoxService(service)                                          // если с [PATH] (подключаем сервис)
        .setFirefoxOptions(options)
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

        console.log("Авторизация в FireFox ESR прошла успешно!");

        console.log("Авторизация в FireFox ESR прошла успешно!");           // Сообщение о результатах

    } 

        catch (error) {
        console.error('Ошибка:', error);
        } finally {
        // Закрываем браузер
        await driver.quit();
        }
        
}   // end of async

firefoxNightlyLaunchingTest();      // Запускаем тест

        
