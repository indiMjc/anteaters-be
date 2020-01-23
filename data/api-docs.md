<!-- prettier-ignore-start -->
# **Routes**
### _(_**all** _endpoints require authentication)_

-  ## Login and register
    - ### Endpoints
    | Method | URL _(base:_ `/auth`)    | Description                                                        |
    |:-------| :----------------------: | -----------------------------------------------------------------: |
    | POST   | **`/login`**             | User login (accepts username OR email), returns username and token |
    | POST   | **`/register`**          | User registration, returns new user's username and token           |

-  ## Tickets
    - ### Endpoints
    | Method | URL _(base:_ `/tickets`)      | Description                                                                                         |
    |:-------| :---------------------------: | --------------------------------------------------------------------------------------------------: |
    | GET    | **`/:id`**                    | Fetch ticket with specified `ticket_id`, gets associated replies and devs                           |
    | GET    | **`/by_project/:id`**         | Fetch all tickets associated with given project that has specified `project_id`                     |
    | GET    | **`/submitted_by/:username`** | Fetch all tickets posted by given user with specified `username`                                    |
    | PUT    | **`/:id`**                    | Edit and return ticket with given `ticket_id` **if user is a superuser, admin or author of ticket** |
    | POST   | **`/`**                       | Add new ticket, returns ticket added                                                                |
    | DELETE | **`/:id`**                    | Delete ticket with given ID, returns number of records deleted                                      |          
        
-  ## Projects
    - ### Endpoints
    | Method | URL _(base:_ `/projects`)     | Description                                                                                         |
    |:-------| :---------------------------: | --------------------------------------------------------------------------------------------------: |
    | GET    | **`/name_search/:name`**      | Fetch project with specified `name` with associated developers                                      |
    | GET    | **`/id_search/:name`**        | Fetch project with specified `id` with associated developers                                        |
    | POST   | **`/`**                       | Add and return new project                                                                          |
    | PUT    | **`/:id`**                    | Edit project **if user is a superuser, admin, project manager or stakeholder**                      |
    | DELETE | **`/:id`**                    | Delete project with given `id` **if user is a superuser, admin, project manager or stakeholder**    |

-  ## Ticket Replies
    - ### Endpoints
    | Method | URL _(base:_ `/replies`)      | Description                                                                                         |
    |:-------| :---------------------------: | --------------------------------------------------------------------------------------------------: |
    | GET    | **`/:id`**                    | Fetch all replies and associated devs with given ticket `id`                                        |
    | GET    | **`/my_replies/:username`**   | Fetch all ticket replies from user with given `username`                                            |
    | POST   | **`/`**                       | Add and return new reply to ticket                                                                  |
    | DELETE | **`/:id`**                    | Delete ticket with given `id` **if user is a superuser, admin, author of reply**                    |
    | PUT    | **`/:id`**                    | Edit and return reply with given `id` **if user is a superuser, admin, author of reply**            |

# **Schema**

### _( \* = field **required**)_

-  ## **`users`**

   <a href="https://github.com/indiMjc/anteaters-be/blob/master/data/migrations/20200114211142_users.js" target="_blank">Users migration file</a>

   | Field                 | Type | Default | Metadata                        |
   | :-------------------- | :--: | :-----: | ------------------------------: |
   | \* id                 | int  | auto    | Primary key                     |
   | \* email              | str  |         | User email                      |
   | \* username           | str  |         | Username                        |
   | \* password           | str  |         | User password                   |
   | \* role               | str  |         | User role                       |
   | \* superUser          | bool | false   | Super user permission           |
   | \* isAdmin            | bool | false   | Admin permission                |
   | \* isLocked           | bool | false   | Locked account                  |

-  ## **`projects`**

   <a href="https://github.com/indiMjc/anteaters-be/blob/master/data/migrations/20200114211150_projects.js" target="_blank">Projects migration file</a>

   | Field             | Type | Default | Metadata                            | Foreign key (references) |
   | :---------------- | :--: | :-----: | :---------------------------------: | -----------------------: |
   | \* id             | int  | auto    | Primary key                         |                          |
   | \* description    | str  |         | Project description                 |                          |
   | stakeholder       | str  |         | Project stakeholder/owner           | `username` in `users`    |
   | project_manager   | str  |         | Project manager/team lead           | `username` in `users`    |

-  ## **`project_devs`**

   <a href="https://github.com/indiMjc/anteaters-be/blob/master/data/migrations/20200114211202_project_devs.js" target="_blank">Project devs migration file</a>

   | Field           | Type | Default | Metadata                          | Foreign key (references) |
   | :-------------- | :--: | :-----: | :-------------------------------: | -----------------------: |
   | \* id           | int  | auto    | Primary key                       |                          |
   | \* dev_username | str  |         | Developer working on this project | `username` in `users`    |
   | \* project_id   | str  |         | Project ID                        | `id` in `projects`       |

-  ## **`ticket_devs`**

   <a href="https://github.com/indiMjc/anteaters-be/blob/master/data/migrations/20200114211213_ticket_devs.js" target="_blank">Ticket devs migration file</a>

   | Field           | Type | Default | Metadata                         | Foreign key (references) |
   | :-------------- | :--: | :-----: | :------------------------------: | -----------------------: |
   | \* id           | int  | auto    | Primary key                      |                          |
   | \* ticket_id    | int  |         | Ticket ID                        | `id` in `tickets`        |
   | \* dev_username | str  |         | Developer working on this ticket | `username` in `users`    |

-  ## **`tickets`**

   <a href="https://github.com/indiMjc/anteaters-be/blob/master/data/migrations/20200114211218_tickets.js" target="_blank">Tickets migration file</a>

   | Field          | Type      | Default         | Metadata                                | Foreign key (references) |
   | :------------- | :-------: | :-------------: | :-------------------------------------: | -----------------------: |
   | \* id          | int       | auto            | Primary key                             |                          |
   | \* title       | str       |                 | Ticket title                            |                          |
   | \* category    | str       |                 | Ticket category                         |                          |
   | \* description | str       |                 | Ticket description                      |                          |
   | \* urgency     | str       |                 | Ticket urgency                          |                          |
   | \* is_resolved | bool      | false           | Marks if ticket has been resolved       |                          |
   | \* in_progress | bool      | false           | Marks if a dev is working on the ticket |                          |
   | \* created_at  | timestamp | `knex.fn.now()` | Time and date the ticket was submitted  |                          |
   | submitted_by   | str       |                 | User who submitted ticket               | `username` in `users`    |
   | \* project_id  | int       |                 | Project ID                              | `id` in `projects`       |

-  ## **`ticket_replies`**

   <a href="https://github.com/indiMjc/anteaters-be/blob/master/data/migrations/20200114211228_ticket_replies.js" target="_blank">Ticket replies migration file</a>

   | Field         | Type      | Default         | Metadata                          | Foreign key (references) |
   | :------------ | :-------: | :-------------: | :-------------------------------: | -----------------------: |
   | \* id         | int       | auto            | Primary key                       |                          |
   | \* reply      | str       |                 | Ticket reply                      |                          |
   | \* created_at | timestamp | `knex.fn.now()` | Time and date reply was submitted |                          |
   | \* ticket_id  | int       |                 | Ticket ID                         | `id` in `tickets`        |
   | submitted_by  | str       |                 | User who submitted reply          | `username` in `users`    |

![View DB Schema Image](anteaters-schema.JPG)
<!-- prettier-ignore-end -->
