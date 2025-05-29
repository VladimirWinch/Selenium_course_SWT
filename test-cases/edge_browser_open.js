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
        
        await driver.get('https://www.google.com');             // Открываем страницу
        let title = await driver.getTitle();                    // Проверяем заголовок
        console.log('Google', title);
        // Автоматизация проверки:
        const expectedTitle = "Google";
        if (title === expectedTitle) {
        console.log("Заголовок корректен!");
        } else {
        console.error(`Ошибка! Заголовок: "${title}", ожидалось: "${expectedTitle}"`);
        }


        // Ищем поле поиска и вводим текст
        let searchBox = await driver.findElement(By.name('q'));
//      location.reload();
        await searchBox.sendKeys('Selenium EdgeDriver', Key.RETURN);

        // Ждем результат
        await driver.wait(until.titleContains('Selenium EdgeDriver'), 5000);
        console.log('Поиск выполнен!');


    // Всплыл чекбокс - подтверждение, что "Я не робот"
      
    // Вар-1 (по ID)

        // Ищем чекбокс по ID:
        const checkboxId = "recaptcha-anchor";

        // Ожидаем появления чекбокса
        const checkbox = await driver.wait (
        until.elementLocated(By.id(checkboxId)), 
        5000
        );
        
        // Прокручиваем к элементу (если нужно)
        await driver.executeScript("arguments[0].scrollIntoView(true);", checkbox);

        // Проверяем текущее состояние
        const isChecked = await checkbox.isSelected();
        console.log(`Чекбокс с ID "${checkboxId}" изначально: ${isChecked ? 'отмечен' : 'не отмечен'}`);
        
        // Кликаем по чекбоксу
        await checkbox.click();
        console.log(`Чекбокс с ID "${checkboxId}" был кликнут`);
        
        // Проверяем новое состояние
        const newState = await checkbox.isSelected();
        console.log(`Теперь чекбокс с ID "${checkboxId}": ${newState ? 'отмечен' : 'не отмечен'}`);

        
/*
    // Вар-2 (по названию заголовка)--------------------------------------------------------
        const checkboxLabel = "Заголовок чекбокса";
        
        // Вариант 1: Если чекбокс связан с label через for/id
        
        // Ищем чекбокс по тексту метки (label)
        const checkbox = await driver.findElement(By.xpath(
        `//label[contains(text(), '${checkboxLabel}')]/input[@type='checkbox']`
        ));
        
        // Вариант 2: Если текст непосредственно в чекбоксе
        // const checkbox = await driver.findElement(By.xpath(
        //   `//input[@type='checkbox' and following-sibling::text()[contains(., '${checkboxLabel}')]]`
        // ));
        
        // Проверяем текущее состояние
        const isChecked = await checkbox.isSelected();
        console.log(`Чекбокс "${checkboxLabel}" изначально: ${isChecked ? 'отмечен' : 'не отмечен'}`);
        
        // Кликаем по чекбоксу
        await checkbox.click();
        console.log(`Чекбокс "${checkboxLabel}" был кликнут`);
        
        // Проверяем новое состояние
        const newState = await checkbox.isSelected();
        console.log(`Теперь чекбокс "${checkboxLabel}": ${newState ? 'отмечен' : 'не отмечен'}`);

    //-----------------------------------------------------------------------------------
*/


    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        await driver.quit();        // Закрываем браузер
    }

}   // end of async


edgeTest();                         // Запускаем тест