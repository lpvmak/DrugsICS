![Logo of the project](https://github.com/lpvmak/med_sched/blob/master/logo.png)

# MedShced

A service that allows you to create medication plans and add them to your calendar.

Сервис, позволяющий создавать планы приема лекарств и добавлять их в Ваш календарь.

## Для использования

Чтобы воспользоваться сервисом достаточно перейти на [наш сайт](http://index.html).
Убедитесь, что используемые Вами календарь поддерживает формат событий .ics

### Системные требования

Для использования нашего приложения необходим веб-обозреватель соответвующей версии:

<Тут будет таблца>

Расширение .ics – это универсальный формат календаря, который используется во многих приложениях, таких как: Microsoft Outlook, Apple iCal, Mozilla Sunbird, и Google Calendar.

## Функциональность

В ближайшее время наш сервис будет уметь:

* Устанавливать сроки приема препората
* Устанавливать частоту приема (каждые 2/4/6/8/12 часов)
* Создавать планы приема, состоящие из нескольких препаратов

## Для независимых разработчиков

Пожалуйста, ознакомтись с [CONTRIBUTING.md](https://github.com/lpvmak/med_sched/blob/master/CONTRIBUTING.md).


## Для команды разработки

### Среда разработки

Проект ведется в [Web Storm](https://www.jetbrains.com/webstorm/download/download-thanks.html). 
Можно воспользоваться получением студенческой подписки.

Используются дополнительные модули и библиотеки:

* [NodeJS](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [reactstrap](https://reactstrap.github.io/)
* [ics](https://www.npmjs.com/package/ics)

Стиль кодирования вынесен в [CONTRIBUTING.md](https://github.com/lpvmak/med_sched/blob/master/CONTRIBUTING.md).

### Правила оформления commit-ов

* Коммит должен содержать строку, отражающую тему
* Эта строка должна начинаться с заглавной буквы, использовать повелительное наклонение и не содержать точки в конце
* Тема коммита в _Past Simple_
* Если темы строки недостаточно, добавьте тело коммита, отделив его от темы пустой строкой
* Каждая новая строка тела должна начинаться с "-" и отражать _какие_ изменения были внесены в проект
* Коммит обязан содержать изменения, доведенные до логического конца

Пример правильно оформленного однострочнего коммита:

    git commit -m "Added CONTRIBUTING.md"
    
Пример правильно оформленного коммита с описанием:

    git commit
    *откроется окно с выбранным редактором*
    Updated README.md

    - Added link to CONTRIBUTING.md
    - Updated creating commit rules
    - Updated technology stack

### Модель рабочего процесса

Разработчик клонирует репозиторий и добавляет изменения при помощи _push_ прямо в ветки данного репозитория.

    git clone https://github.com/lpvmak/DrugsICS/   
    git push -u origin develop

Принята [модель Дриссона](https://habr.com/ru/post/106912/).

Используются две постоянных ветки:
  1) Главная ветка (master)
  2) Ветка разработки (develop)
  
И три вспомогательных (временных) ветки:

  3) Ветка функциональности (features)
  4) Ветка релизов (release)
  5) Ветка исправлений (hotfix)

## Команда разработчиков

Teamlead: [Лапотников Павел](https://github.com/lpvmak)

Techlead: [Козлов Дмитрий](https://github.com/KoDim97)

Куратор проекта: [Богдан Александра](https://github.com/AleksandraBogdan)

[Румянцева Евгения](https://github.com/unjamini)

[Пестряков Данил](https://github.com/DanilPestryakov)

[Татьяна Алпатова](https://github.com/atani20)

