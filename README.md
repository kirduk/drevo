# Мировое Древо

Сайт фабрики «Мировое Древо». React + Vite, деплой в [Amvera](https://amvera.ru).

## Локальная разработка

```bash
npm install
npm run dev
```

Сайт откроется на http://localhost:5173

## Добавление фотографий

1. Положите изображения в `public/photos/`
2. Добавьте описание в `public/photos/gallery.json`
3. Закоммитьте и запушьте — сайт обновится автоматически

Подробнее: [public/photos/README.md](public/photos/README.md)

## Деплой в Amvera

Проект настроен через `amvera.yml` (окружение Node.js Browser).

1. Создайте приложение в панели Amvera
2. Подключите репозиторий `https://github.com/kirduk/drevo`
3. Amvera выполнит `npm install && npm run build` и развернёт содержимое `dist/`

## Структура

```
drevo/
├── amvera.yml          # конфигурация деплоя
├── public/
│   └── photos/         # фотографии для галереи
├── src/
│   ├── components/     # секции сайта
│   └── ...
└── package.json
```
