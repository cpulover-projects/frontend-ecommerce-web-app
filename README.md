# 1.0 Release

### Setup Project
1. Create new project by Angular CLI
2. Integrate Bootstrap
3. Update 
[app.component.html]()
4. Test: run project by CLI

### Main Process
1. Generate new Class by CLI 
[[common/product]()]
   - Declare attributes to match with JSON received from REST API 
2. Generate new Component by CLI (normally is a set of class entities) 
[[components/product-list]()]
3. Add new component selector to main template
4. Generate new Service by CLI (provide functions calling API then map data to the Component)
[[services/product-service]()]
   - Inject HttpClient by constructor from ```@angular/common/http``` (supports HTTP methods)
5. Import HttpClientModule from ```@angular/common/http``` and new Service (allow inject to other parts of the app) into 
[app.module.ts]()
6. Update Component to subcribe data from the Service 
[[product-list.component.ts]()]
    - Inject the Service by constructor (to invoke methods of the Service)
7. Update Template to display data 
[[product-list-table.component.html]()]

# 2.0 Release
### Template Integration
1. Get sample templates including HTML and CSS files (work from front-end)
2. Install Bootstrap CSS style locally by CLI: ```npm install bootstrap```
3. Install Fontawesome (for icons): ```npm install @fortawesome/fontawesome-free``` 
4. Verify installed entries in ```node_modules``` directory or ```package.json```
5. Inject CSS style entries globally by configurating ```styles``` in 
[angular.json]() 
6. Add CSS styles globally in 
[src/style.css]()
7. Restart app (if running) to make change with new configuration.
8. Integrate sample templates to the app templates 
[[app.component.html]()] [[product-list-grid.component.html]()]

### Routing
1. Define routes in the app module 
[[app.module.ts]()]
   - Use ** to for generic matching
   - First match wins: start from most specific to generic
   - Configure Route based on the defined routes in ```imports```: ```RouteModule.forRoot(<routes_name>)```
2. Define Router Outlet (location of dynamic content) in 
[app.component.html]()
3. Setup Route Link in the Template (where links to different routes, e.g. menu) 
[[product-categor-menu.html]()] 
4. Enhance Components in the routes to read param path (if there is) 
[[product-list.component.ts]()]
   - Add param as new property of the class
   - Inject ```ActivatedRoute``` (which loaded the Component) by the constructor (for accessing route params)
   - Create/Update methods to handle the route with params, which will delergate to Service methods
5. Update Service methods to get the params and call the appropriate API based on the params
[[product.service.ts]()]

### Search Function
1. Create new component for search 
[[search]]
2. Add new route path for searching 
[[app.module.ts]()]
3. Update Search Component 
[[search.component.ts]()]
   - Inject the router (from ```@angular/router```)
   - Create a navigating method to navigate router to the search path
4. Update the Component and Service handling search method using API
[[list-product.component.ts]()] [[product.service.ts]()]
5. Update Search Template to call the navigating method of Search Component based on the events 
[[search.component.html]()]

### Master-Detail Product View
1. Generate new Component for product details 
[[product-detail]()]
2. Add new route for product details 
[[app.module.ts]()]
3. Add route link to the template (where the link can be accessed) 
[[product-list.grid.component.html]()]
4. Update the product detail Component 
[[product-detail.componenet.ts]()]
   - New attribute: product
   - Inject Active Route (to get the id in the route path and the Service (to get the product by id)
5. Create method in the Service to handle getting the product by id, using API 
[[product-service]()]
6. Update the Template to display product details 
[[product-detail.component.html]()]

### Pagination
1. Install ng-bootstrap by CLI
   - ```ng add @angular/localize```: dependency for Angular 9+
   - ```npm install @ng-bootstrap/ng-bootstrap```
2. Import NgbModule from ng-bootstrap in 
[app.module.ts]()
3. Update the Service to get metadata regarding pagination provided by Spring Data REST API 
[[product.service.ts]()]
4. Update the Component to handle pagination 
[[product-list.component.ts]()]
5. Update the Template to use ng-bootstrap pagination component 
[[product-list-grid.component.html]()] 
   - Page list ```<ngb-pagination>``` 
     - Event binding: ```(pageChange)```
     - Use ```[()]``` for 2-way binding: change in Component leads to change in Template and vice versa
     - Use ```[]``` for 1-way binding: change in Component leads to change in Template
     - ```[maxSize]```: shows a max number of page
     - Set ```[boundaryLinks]```: alow jumping to the beginning/end of page list
   - Dropdown list ```<select>```
     - Event binding: ```(change)```

### Cart Implementation
1. Generate new Component 
[[components/cart-status]]
2. Add new component selector to the parent container template 
[[app.component.html]()]
3. Update the Template 
[[cart-status.component.html]()]
4. Create model class 
[[common/cart-item]()]
5. Create new Service for manage the cart 
[[services/cart-service]()]
6. Add click handler for "Add to cart" 
[[product-list-grid.component.html]()] [[product-details.component.html]()]
   - Event-binding for ```<button>```: ```(click)```
7. Update the Component making use of the Cart Service 
[[product-list.component.ts]()] [[product-details.component.ts]()]
   - Inject the Service by the constructor
   - Call the method of the Service the handle the click handler in the Template
8. Update the Component related to the Service 
[[cart-status.component.ts]]
9. Update the Template 
[[cart-status.component.html]()]

### Cart Detail View
1. Generate new Component for cart details 
[[components/cart-details]()]
2. Add new route for cart details in  
[app.module.ts]()
3. Add route link to the template (where the link can be accessed) 
[[cart-status.component.html]()]
4. Update the cart details Component 
[[cart-details.componenet.ts]()]
   - New attributes (which needed to display on the template)
   - Inject cart Service (to get the cart)
6. Update the Template to display cart details 
[[cart-details.component.html]()]


# Notes
- @Injectable used for Service: allow the service to be injected into other classes/components.
- ```ngOnInit()``` of Class is similar to @PostConstruct.
- Use prefix ```+``` to convert string to number
- To view log, open Develop Tools/Inspect on the broswer (F12 for Chrome)
- Use Safe Navigator operator ```?``` to guard against null or undefined values in property paths
- ActivatedRoute provides access to the url, params, data, queryParams, and fragment observables of the route associated with a component loaded in an outlet
- Race condition: the Template attemps to access undefined property. Solution:
  - Initialize fields when declaring 
  [[product-detail.component.ts]()]
  - Use Safe Navigator operator in the Template 
  [[product-detail.component.html]()]
  - Use ```ngIf``` in the Template to check if the property is assigned yet
- Use ```Subject.next()``` to send events to the subscribers 
[[cart-service.service.ts]()]
- Use ```Array.find()/findIndex()``` to return the first element/id of element passing a given test, otherwise return undefined
[[cart-service.service.ts]()]
- [TypeScript] Use ```===``` for equality test






