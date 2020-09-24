## SC Test Project

For me this was the first time working with laravel and the first time working with php since 2018. It took some time getting used to it but I really enjoyed the vast documentation.

I took this project as an opportunity to figure out whether your tech stack is something would enjoy or not.

### Demo Video
There is a little demo video in the project root titled `test-project-demo.webm`


### How to run
 * the database migration is saved in `database/migrations` so a `php artisan migrate` should do the trick
 * alternatively create table below
 * use the database dump in project root `homestead_dump.sql`

 #### Reports create table
 ```
  CREATE TABLE `reports` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
```

 #### Postman
 In the project root there is a postman collection `Reports.postman_collection.json` to test the back end against

### Things that were not considered
 * Internet Explorer, no ancient browsers are supported due the usage of modern JS features like fetch etc.
 * Responsive design, as it was not part initial assignment
 * REST error handling in the front end
 * Pagination or support for many entries