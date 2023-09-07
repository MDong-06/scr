const router = require("express").Router();
const { readdirSync, readFileSync } = require('fs-extra');
const path = require('path');
try {
  var i, j;
  const srcPath = path.join(__dirname, "/public/");
  const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
  for (i of hosting) {
    const { index, name } = require(srcPath + i);
    router.get(name, index);
    //console.log(i);
  }
  // ------------------------------------------------------------------------//
  // ----------------------------/     Fodel    /----------------------------//
  // ------------------------------------------------------------------------//
  const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirs) {
    const fileName = readdirSync(path.join(__dirname, '/public/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/public/' + dir + '/') + j);
      router.get(name, index);
    }
  }

} catch (e) { console.log(e); }
// -------------------------->      END     <------------------------------//
module.exports = router;
