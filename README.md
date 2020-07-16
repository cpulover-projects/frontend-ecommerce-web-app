## Front-end Development Process
1. Create new project by Angular CLI
2. Integrate Bootstrap
3. Update main app template 
[[app.component.html]()]
4. Test: run project by CLI
5. Generate new Component by CLI 
[[product-list]()]
6. Add new component selector to main template
7. Generate new Class by CLI 
[[common]()]
   - Declare attributes to match with JSON received from REST API 
8. Generate new Service by CLI 
[[services]()]
   - Inject HttpClient by constructor from ```@angular/common/http``` 
9. Import HttpClientModule from ```@angular/common/http``` and new Service (allow inject to other parts of the app) to main app module 
[[app.module.ts]()]
10. Update Component to subcribe data from the Service 
[[product-list.component.ts]()]
    - Inject the Service by constructor
11. Update Template to display data 
[[product-list.component.html]()]

#### ...
- Update Template for product list Component 
[[product-list-table.component.html]()]

## Notes
- @Injectable used for Service: allow the service to be injected into other classes/components.
- ```ngOnInit()``` of Class is similar to @PostConstruct
- ```src/assets``` used to store resources: images, JS, CSS, etc.







