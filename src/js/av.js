var APP_ID = 'GX4UFHhK4T4npcUUc8Ry2kLS-gzGzoHsz'
var APP_KEY = '550YCYtvXQO5HktMya67uBqz'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})