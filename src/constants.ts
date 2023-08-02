const PORT = parseInt(process.env.PORT || '3000');
const MQQT_BROKER_URL = process.env.MQQT_BROKER_URL;
const DATABASE_URL = process.env.DATABASE_URL;

export { DATABASE_URL, MQQT_BROKER_URL, PORT };
