/* eslint-disable */
exports.onClientEntry = () => {
  const consoleArr = [
    ' ____                __ _       _       ____  _               _ ',
    '|  _ \\ ___ ______ _ / _| |_   _( )___  | __ )| | ___   __ _  | |',
    '| |_) / _ \\_  / _` | |_| | | | |// __| |  _ \\| |/ _ \\ / _` | | |',
    '|  __/ (_) / / (_| |  _| | |_| | \\__ \\ | |_) | | (_) | (_| | |_|',
    '|_|   \\___/___\\__,_|_| |_|\\__, | |___/ |____/|_|\\___/ \\__, | (_)',
    '                          |___/                       |___/     ',
  ];
  console.log(consoleArr.join('\n'));
  console.log(
    '%ccontact me: pozafly@gmail.com',
    'border: 1px solid #ccc; background: #191b1f; padding: 4px; font-weight: bold; font-size: 20px; color: #272a30; text-shadow: 1px 1px 0 #c9d1d9;',
  );
};
