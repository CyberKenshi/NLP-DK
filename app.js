const express = require('express');
const dotenv = require("dotenv").config();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { I18n } = require('i18n');
const connectDB = require("./config/db"); 

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const publicationRoutes = require("./routes/publicationRoutes");
const newsRoutes = require("./routes/newsRoutes");
const chatbotRoutes = require("./routes/chatbot");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Khởi tạo i18n instance
const i18n = new I18n({
    locales: ['en', 'vi'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'vi',
    cookie: 'lang',
    objectNotation: true,
    autoReload: true, // Tự động tải lại file JSON khi thay đổi
    updateFiles: false // Không tự động ghi file JSON
});

// Cấu hình Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 900000 }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware i18n
app.use(i18n.init);

// Cấu hình Swagger
const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "NLP-KD Lab",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./routes/*.js", "./utils/swaggerSchemas.js"],
  };
  
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware để debug và truyền locale vào EJS
app.use((req, res, next) => {
    console.log('Current locale:', req.getLocale());
    res.locals.locale = req.getLocale();
    next();
});

// Route để chuyển đổi ngôn ngữ
app.get('/set-lang/:lang', (req, res) => {
  const lang = req.params.lang;
  const referer = req.get('referer') || '/';

  if (['en', 'vi'].includes(lang)) {
      res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
      req.setLocale(lang);
      console.log('Setting language to:', lang);
  } else {
      console.log('Invalid language:', lang);
  }

  res.redirect(referer); 
});

// Route trang chủ
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/redirect-login', (req, res) => {
  res.render('redirect-login', {
    locale: req.getLocale(),
    __: res.__
  });
});

// Middleware xác thực
app.use("/api/v1/auth", authRoutes);

// Route 
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/publications', publicationRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/', chatbotRoutes);

app.get('/blog-single', (req, res) => {
    res.render('blog-single');
});

app.get('/news-form', (req, res) => {
    res.render('admin/newsForm');
});

app.get('/personnel-detail', (req, res) => {
    res.render('personnel-detail');
});

app.get('/portfolio-details', (req, res) => {
    res.render('portfolio-details');
});

// Custom 404 page
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// Custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
});

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate. `));