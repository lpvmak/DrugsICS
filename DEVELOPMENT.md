# Для команды разработки

## Среда разработки

Проект ведется в [Web Storm](https://www.jetbrains.com/webstorm/download/download-thanks.html). 
Можно воспользоваться получением студенческой подписки.

Используются дополнительные модули и библиотеки:

* [NodeJS](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [reactstrap](https://reactstrap.github.io/)
* [ics](https://www.npmjs.com/package/ics)

Стиль кодирования вынесен в [CONTRIBUTING.md](https://github.com/lpvmak/med_sched/blob/master/CONTRIBUTING.md).

## Правила оформления commit-ов

* Коммит должен содержать строку, отражающую тему и номер соответвующего issues-a. 
* Эта строка должна начинаться с заглавной буквы, использовать повелительное наклонение и не содержать точки в конце
* Если темы строки недостаточно, добавьте тело коммита, отделив его от темы пустой строкой
* Каждая новая строка тела должна начинаться с "-" и отражать _какие_ изменения были внесены в проект
* Тема и содержание коммита в _Past Simple_
* Коммит обязан содержать изменения, доведенные до логического конца

Пример правильно оформленного однострочнего коммита:

    git commit -m "Added CONTRIBUTING.md #0"
    
Пример правильно оформленного коммита с описанием:

    git commit
    *откроется окно с выбранным редактором*
    Updated README.md #0

    - Added link to CONTRIBUTING.md
    - Updated creating commit rules
    - Updated technology stack

## Модель рабочего процесса

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

## Стиль кодирования

В разработке мы используем язык JavaScript + JSX (React) и придерживаемся [Google JavaScript Style](https://google.github.io/styleguide/jsguide.html).