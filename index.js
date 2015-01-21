
module.exports = function hyperDecorate(req, res, next) {
  var url = req.base + (req.url === '/' ? '' : req.url);
  res.locals({
    url: url,
    root: req.get('x-root') || req.base
  });
  var _json = res.json;
  res.json = function(data) {
    var root = res.locals.root;
    data.root = {href: root};
    data.href = url;
    _json.call(res, data);
  };
  next();
}
