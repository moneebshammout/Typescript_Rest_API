import App from './app';

const { PORT } = process.env;

const app = new App(PORT);

app.listen();
