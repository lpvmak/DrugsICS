# Для команды разработки

## Среда разработки

Проект ведется в [Web Storm](https://www.jetbrains.com/webstorm/download/download-thanks.html). 
Можно воспользоваться получением студенческой подписки.

Используются дополнительные модули и библиотеки:

* [NodeJS](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [reactstrap](https://reactstrap.github.io/)
* [ics](https://www.npmjs.com/package/ics)
* [formik](https://jaredpalmer.com/formik/docs/overview)
* [FileSaver](https://www.npmjs.com/file-saver)
* [React Fit text](https://www.npmjs.com/package/react-fittext)

## Инструкция по установке

### Тестовый запуск

Для запуска сервиса локально можно воспользоваться `npm` (пакетный менеджер [NodeJS](https://nodejs.org/en/)).

0. Переходим в каталог /DrugsICS

0. `npm install` - Подгружаем необходимые пакеты 

0. `npm start` - Запускаем локальный сервер. Откроется окно браузера с запущенным сервисом

### Деплой

Используя `npm`

0. Переходим в каталог /DrugsICS

0. `npm run build` - выполняем сборку проекта

0. Содержимое каталога /DrugsICS/build загружаем на сервер. 

## Правила оформления commit-ов

* Коммит должен содержать строку, отражающую тему и номер соответствующего issues-a. 
* Эта строка должна начинаться с заглавной буквы, использовать повелительное наклонение и не содержать точки в конце
* Если темы строки недостаточно, добавьте тело коммита, отделив его от темы пустой строкой
* Каждая новая строка тела должна начинаться с "-" и отражать _какие_ изменения были внесены в проект
* Тема и содержание коммита в _Past Simple_
* Коммит обязан содержать изменения, доведенные до логического конца

Пример правильно оформленного однострочного коммита:

    git commit -m "Added CONTRIBUTING.md #0"
    
Пример правильно оформленного коммита с описанием:

    git commit
    *откроется окно с выбранным редактором*
    Updated README.md #0

    - Added link to CONTRIBUTING.md
    - Updated creating commit rules
    - Updated technology stack

## Модель рабочего процесса (Git workflow)

Разработчик клонирует репозиторий.

    git clone https://github.com/lpvmak/med_sched

В проекте существуют две постоянных ветки:
  1) Главная ветка (master) -- содержит готовую к выполнению промежуточную версию
  2) Ветка разработки (develop) -- интеграционная, в ней последние изменения
  
И одну вспомогательную (временную) ветку -- функциональности (features).

Разработчик, приступая к выполнению задачи, создает локально ветку с именем *features#0*, где #0 -- номер соответствующей задачи.

Ветка живет так долго, как продолжается разработка, а далее вливается в ветвь *develop* командой *git merge—no-ff* или удаляется в
случае неудачи. Флаг *git merge—no-ff*  группирует вместе все внесённые изменения, которые можно отменить все сразу, т.е., удалить
введенную функциональность полностью. Пример:

    git checkout -b features#0
    (do your work on "features#0")
    gir add .
    git commit -m  "Implemented ... #0"
    git checkout develop
    git merge --no-ff features#0
    git branch -d features#0
    git push -u origin develop

## Стиль кодирования

В разработке мы используем язык JavaScript + JSX (React) и придерживаемся [Google JavaScript Style](https://google.github.io/styleguide/jsguide.html).
