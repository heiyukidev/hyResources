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

# Customize Resources

### Changing URL
You can Change the URL of a resource any time you want to by executing the folowing command


```javascript
hyResources.configResource(resourceName).changeUrl(NewUrl);
```
>Note: if you change the URL it will change for all futre requests

### Customize Headers
You can add diffrent headers to each of the methods pre-defined in hyResources.
You need to access the Method first via the method function then specifie the header you want to add.

```javascript
hyResources.configResource(ResourceName).method(MethodName).addHeader(Header,Value);
```
Method names are the names mentionned earlier in the Requests Section:
get, add, update, delete.

### isArray
isArray is a boolean that indicates if your restfull API returns an Array or an Object.
by default it's false except for the get method.
>Note: using the get Method with a parameter has it's isArray value to false and is not editable.

to change the value of is array, you have to access the function via the method function then set the new value to isArray

```javascript
hyResources.configResource(ResourceName).method(MethodName).isArray(Boolean);
```

# Advanced Config
you can set up the resource on your own by using the following structure:
```javascript
        {
            "GetParams": { //Parameters for the get function of the resource
                "headers": {
                    "Accept": "application/json,
                    "Authorization": "TOKEN"
                },
                "Method": "GET",
                "IsArray": true
            },
            "AddParams": { //Parameters for the add function of the resource
                "headers": {
                    "Content-Type": "application/json"
                },
                "Method": "POST",
                "IsArray": false
            },
            "UpdateParams": { //Parameters for the update function of the resource
                "headers": {
                    "Content-Type": "application/json"
                },
                "Method": "PUT",
                "IsArray": false
            },
            "DeleteParams": { //Parameters for the delete function of the resource
                "headers": {
                    "Content-Type": "application/json"
                },
                "Method": "DELETE",
                "IsArray": false
            }
        }
```
>Note: you can change the HTTP Methods to anything like PATCH, OPTION, or even have the get function send a PUT request. You can also have multiple headers like in the exemples

### Implementation
to Implement the configuration you structured you simply call
```javascript
hyResources.addResource(alias,url,config);
//config is the json objec former earlier
```
