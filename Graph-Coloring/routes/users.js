var express = require("express");
var { PythonShell } = require("python-shell");
var router = express.Router();

var jn = {};
var temp = [];
var val = {};
var data = {
  nodes: [],
  links: []
};

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.json(data);
});

router.post("/", async function(req, res) {
  val = req.body.val;
  flag = req.body.flag;
  data.links = val.links;
  var x = new Array(val.links.length);

  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(2);
  }

  for (var i = 0; i < x.length; i++) {
    x[i][0] = val.links[i].source;
    x[i][1] = val.links[i].target;
  }

  var options = {
    mode: "text",
    pythonPath: "/Library/Frameworks/Python.framework/Versions/3.6/bin/python3",
    pythonOptions: ["-u"],
    // make sure you use an absolute path for scriptPath
    scriptPath: "/Users/smitpatel/Desktop/LOI/routes",
    args: [val.nodes.length, val.links.length, x]
  };

  if (flag === 1) value = 1;
  if (flag === 2) value = 2;
  if (flag === 3) value = 3;
  PythonShell.run("p" + value + ".py", options, function(err, ret) {
    jn = JSON.parse(ret);
    //console.log("jn", jn);
    for (k in jn) {
      var element = {};
      //console.log(k);
      element.id = k;
      element.color = jn[k];
      //console.log(element);
      temp.push(element);
    }
    setTimeout(() => {
      //console.log(val.links);
      data.links = val.links;
      data.nodes = temp;
      console.log(data);
      res.json(data);
    }, 2000);
  });
  temp = [];
});

module.exports = router;
