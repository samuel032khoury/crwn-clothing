# Full Stack Architecture

## Backend

- Functionality - authentication, data storage, request handling

```
├── server.js
├── config
│   └─ db.js
├── middleware
│   ├─ auth.middleware.js
│	├─ error.middleware.js 
│   └─ ...
├── features
│   ├─ feature1
│   │  ├─ feature1.model.js
│   │  ├─ feature1.dao.js
│   │  ├─ feature1.controller.js
│   │  └─ feature1.routes.js
│	├─ feature2
│   │  └─ ...
│   └─ ...
└──    
```

