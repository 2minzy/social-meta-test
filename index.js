const express = require('express');
const exphbs  = require('express-handlebars');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(cors());
app.use(express.static(__dirname + '/frontend/dist'));

const aws = {
  getImageUrl({id}) {
    console.log(id)
    if (id == 'logo') {
      return 'https://dfy-test.s3.ap-northeast-2.amazonaws.com/images/dev/works/2102a479-0f6b-4624-883a-bbaba1cce685/1627364848176.jpg'
    }
    if (id == 'slogan') {
      return 'https://d3pa3k2t5qmtom.cloudfront.net/images/dev/dfy-slogan-logo.png';
    }
  }
}

let OG_TITLE = 'SDC2021 TEST TITLE #sdc';
let OG_DESCRIPTION = 'SDC2021 TEST DESC';
let OG_TYPE = 'website';
let OG_URL = 'https://www.samsung.com/';

app.get('*', function (req, res) {
  const metaImage = aws.getImageUrl({id: req.query.id})

    res.render('home', {
      helpers: {
        OG_TITLE,
        OG_DESCRIPTION,
        OG_TYPE,
        OG_URL,
        metaImage,
        description(){
          return req.query.id || 0
        }
      }
    });
    
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on PORT ${PORT}`);
  }
});

module.exports = app