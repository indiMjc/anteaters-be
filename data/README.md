## **Routes**

-  ### Users

-  ### Tickets

-  ### Projects

## **Schema**

### _( \* = required)_

-  ### **users**

   <a href="http://example.com/" target="_blank">Users migration file</a>

   | Field                 | Type | Default | Metadata                        |
   | --------------------- | ---- | ------- | ------------------------------- |
   | \* id                 | int  | auto    | Primary key                     |
   | \* email              | str  |         | User email                      |
   | \* username           | str  |         | Username                        |
   | \* lowercase_username | str  |         | Lowercase username (for search) |
   | \* password           | str  |         | User password                   |
   | \* role               | str  |         | User role                       |
   | \* superUser          | bool | false   | Super user permission           |
   | \* isAdmin            | bool | false   | Admin permission                |
   | \* isLocked           | bool | false   | Locked account                  |

-  ### **projects**

   <a href="http://example.com/" target="_blank">Projects migration file</a>

   | Field             | Type | Default | Metadata                            | Foreign key (references) |
   | ----------------- | ---- | ------- | ----------------------------------- | ------------------------ |
   | \* id             | int  | auto    | Primary key                         |                          |
   | \* lowercase_name | str  |         | Lowercase project name (for search) |                          |
   | \* description    | str  |         | Project description                 |                          |
   | stakeholder       | str  |         | Project stakeholder/owner           | `username` in `users`    |
   | project_manager   | str  |         | Project manager/team lead           | `username` in `users`    |

-  ### project_devs

   <a href="http://example.com/" target="_blank">Project devs migration file</a>

   | Field           | Type | Default | Metadata                          | Foreign key (references) |
   | --------------- | ---- | ------- | --------------------------------- | ------------------------ |
   | \* id           | int  | auto    | Primary key                       |                          |
   | \* dev_username | str  |         | Developer working on this project | `username` in `users`    |
   | \* project_id   | str  |         | Project ID                        | `id` in `projects`       |

-  ### **ticket_devs**

   <a href="http://example.com/" target="_blank">Ticket devs migration file</a>

   | Field           | Type | Default | Metadata                         | Foreign key (references) |
   | --------------- | ---- | ------- | -------------------------------- | ------------------------ |
   | \* id           | int  | auto    | Primary key                      |                          |
   | \* ticket_id    | int  |         | Ticket ID                        | `id` in `tickets`        |
   | \* dev_username | str  |         | Developer working on this ticket | `username` in `users`    |

-  ### **tickets**

   <a href="http://example.com/" target="_blank">Tickets migration file</a>

   | Field          | Type      | Default         | Metadata                                | Foreign key (references) |
   | -------------- | --------- | --------------- | --------------------------------------- | ------------------------ |
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

-  ### **ticket_replies**

   <a href="http://example.com/" target="_blank">Ticket replies migration file</a>

   | Field         | Type      | Default         | Metadata                          | Foreign key (references) |
   | ------------- | --------- | --------------- | --------------------------------- | ------------------------ |
   | \* id         | int       | auto            | Primary key                       |                          |
   | \* reply      | str       |                 | Ticket reply                      |                          |
   | \* created_at | timestamp | `knex.fn.now()` | Time and date reply was submitted |                          |
   | \* ticket_id  | int       |                 | Ticket ID                         | `id` in `tickets`        |
   | submitted_by  | str       |                 | User who submitted reply          | `username` in `users`    |

![View DB Schema Image](anteaters-schema.JPG)
