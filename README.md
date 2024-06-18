# Сайт для создания постов
Сайт представляет собой Fullstack-приложение для создания постов. Эти посты затем можно просматривать, редактировать, удалять и комментировать.

Для создания и комментирования постов, приложение требует от пользователя аутентификацию. Для изменения и удаления постов и комментариев, пользователь также должен быть создателем этих постов и комментариев.

![image](https://github.com/nikitin-rus/Posts_Website/assets/115501654/2384d648-b44a-4c07-9407-c79b736ce49d)

## Запуск приложения

Для старта приложения выполните команду: `docker-compose up --build`. Приложение станет доступно по адресу http://localhost:8080.

Для запуска приложения в среде для разработки выполните команду `docker-compose -f compose.dev.yaml up --build`. Приложение станет доступно по адресу http://localhost:5173.

- Затем используйте опцию `--build` только в тех случаях, когда необходимо заново собрать приложение. 