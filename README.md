# Synopsis
hyResources is a restful resource manager. it helps you configure resources and store them in one module.

hyResources (HeiYuki Ressources) is very simple to use
# Get hyResources
We recommend downloading this package with bower beceause it has a dependency with angular-resource.
if you just download this package then you should also get angular-resource:
https://github.com/angular/bower-angular-resource

## Implementation
To get the module to work you of corse need to import it in your HTML file.
Since hyResources relies on ngResource you also need to import angular-resource.js with hyResources.js
```html
<script src="angular/angular.min.js"></script>
<script src="angular-resource/angular-resource.min.js"></script>
<script src="hyResources/hyResources.min.js"></script>
```
hyResources is an AngularJs module that you first need to inject:
```javascript
angular.module("app",['hyResources']);
```

## How to Use

hyResources Offers a service named : 'hyResources'. This service will handle all your restful resources by storing them inside the localStorage of the client's machine.

### Adding resources

To add a new resource to the storage simply:
```javascript
hyResources.addResource('posts','https://exemple.com/posts');
```
you can assign your resource a significant name for better visibility.

you can of corse add multiple resources at the same time.

```javascript
hyResources.addResource('posts','https://exemple.com/posts');
hyResources.addResource('albums','https://exemple.com/albums');
hyResources.addResource('comments','https://exemple.com/comments');
```

The best way to handle this is to run a function during the configuration phase that adds the resource that your module is requiring.
>Note: you only need to add a resource once!

### GET request

To perform a get request to a specific resource you use:
```javascript
hyResources.get(resourceName).then(function(data){
           //Callback Logic
        });
```
to perform a get request to a specific resource with a parameter you simply use:

```javascript
hyResources.get(resourceName,param).then(function(data){
           //Callback Logic
        });
```

### POST request

to perform a post request to a specific resource :

```javascript
hyResources.add(resourceName,data).then(function(data){
           //Callback Logic
        });
```
data is the body of the request
the callback function is not necessary. you can just call:
```javascript
hyResources.add(resourceName,data);
```

### PUT/DELETE request

to perform a put/delete request to a specific resource :

```javascript
//PUT Request
hyResources.update(resourceName,data).then(function(data){
           //Update Callback Logic
        });
		
//DELETE Request
hyResources.delete(resourceName,data).then(function(data){
           //Delete Callback Logic
        });
```
data is the body of the request
the callback function is not necessary. you can just call:
```javascript
//PUT Request
hyResources.update(resourceName,data);
//DELETE Request
hyResources.delete(resourceName,data);
```
#### Notes
Note: hyResources will send the request to the API's url + the data "id" field

```json
{
	"id":4
	//Other data fields
}

```
Then your request will be sent to : https://exemple.com/posts/4

if your data doesn't have an id field the request will be sent to : https://exemple.com/posts