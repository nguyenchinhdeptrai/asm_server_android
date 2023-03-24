const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
const app = express()

//giới hạn chuyển trang
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));
app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'login',
  layoutsDir: "views/layouts/"
}));
//
app.set('view engine', '.hbs');
app.set('views', './views');
//list of array
const users = [];
let name , img , email123 = '';
app.get('/login', (req, res) => {
 
  res.render('emptyView', {
    layout: 'login',

  });
});
//regist
app.get('/dangky', (req, res) => {
  res.render('emptyView', {
    layout: 'regist',

  });
});

//show product
app.get('/showProduct', (req, res) => {
  res.render('emptyView', {
    layout: 'showProduct',
  })
})
//add product
app.get('/addProduct', (req, res) => {
  res.render('emptyView', {
    layout: 'addproduct',
  })
})
//acount
app.get('/acount', (req, res) => {
  res.render('emptyView', {
    layout: 'quanlytaikhoan',
  })
})
//hoa don
app.get('/hoadon', (req, res) => {
  res.render('emptyView', {
    layout: 'thanhtoanhoadon',
  })
})
//nhan vien
app.get('/addNhanvien', (req, res) => {
  res.render('emptyView', {
    layout: 'addNhanvien',
  })
})
//thong tin user
app.get('/getThongTin', (req, res) => {
  res.render('emptyView', {
    layout: 'thongTinUser',
    name:name,
    email123:email123,
    img:img,
  })
})
//get emptyView



//login
app.post('/login', (req, res) => {
  const email = req.body.email;
  const pass = req.body.pswd;
  console.log(email + " " + pass);
  let check;
  if (email.trim() === '' || pass.trim() === '') {
    console.log('test rỗng');
    check = 'Chưa đủ thông tin';
  }
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(user.name);
    console.log(user.email);
    if (email != user.email || pass != user.pass) {
      check = "Nhập Sai email hoặc password";
    } else {
      name = user.name;
      img = user.img;
      email123 = user.email;
      res.redirect('/home');
      return;
    }

  }
  res.render('emptyView', {
    layout: 'login',
    check: check,
  });

})
//resgite
//array
//home
app.get('/home', (req, res) => {
  console.log(name + "Tên của người dùng");
  res.render('emptyView', {
    layout: 'home',
    name:name,
    img:img,
    email123:email123,
  })
})

app.post('/dangky', (req, res) => {
  const email = req.body.email;
  const pass = req.body.pswd;
  const name = req.body.name;
  const img = req.body.imageUrl;
  let check;

  if (!email || !pass || !name) {
    // Nếu email hoặc pass rỗng thì thực hiện hành động này
    check = "Chưa đủ thông tin";
    res.render('emptyView', {
      layout: 'regist',
      check: check,
    });
  }
  //
  else {
    const newUser = {
      email,
      pass,
      name,
      img,
    };
    users.push(newUser);
    console.log(users);
    console.log(users.length);
    res.redirect('/login');
  }
});
const port = 8888

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})