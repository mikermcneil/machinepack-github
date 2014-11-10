
#machinepack-github

###Basic usage

```js
var github = require('machinepack-github');
github.getRepo({
	repo: 'sails',
	user: 'balderdashy'
})
.exec({
  success: console.log,
  error: console.error
})
```
