# MVP:

#### BE:

    -  [x] login
    -  [x] register

    -  [x] add ticket
    -  [x] edit ticket (only if me, superUser, admin or ticket author)
    -  [x] delete ticket (only if me, superUser, admin or ticket author)
    -  [x] get ticket by ticket ID (with replies and assigned devs)
    -  [x] get all tickets for project by project ID
    -  [x] get all tickets by author username

    -  [x] get all ticket replies by username

    -  [] reply to ticket
    -  [] edit reply (only if me, superUser, admin or reply author)
    -  [] delete reply (only if me, superUser, admin or reply author)
    -  [] get all replies by username

    -  [x] add new project
    -  [] edit project (only if me, superUser, admin, project manager or stakeholder)
    -  [] delete project (only if me, superUser, admin, project manager or stakeholder)
    -  [x] get project by ID (with assigned devs)
    -  [x] search for project by project name
    -  []
    -  []

#### FE:

    -  [] assign dev to ticket
    -  [] assign project manager to ticket
    -  [] assign stakeholder to ticket
    -  [] mark ticket as resolved
    -  []
    -  []
    -  []
    -  []
    -  []
    -  []
    -  []

## Todo:

-  [] api docs
-  [] middleware that checks if admin
-  [] middleware that checks if superuser
-  [] middleware that checks if me
-  [] whitelist jwt algorithms, hardcode into `verify()`

## FE notes:

-  **EVERY REQUEST NEEDS A UID HEADER THAT HAS THE USER'S ID TO GET PAST AUTHENTICATION MIDDLEWARE**
-  store token in memory and get new token if page is refreshed
-  persist on login: token, uid and isAdmin || superUser (uid and role in token)
-  decode jwt with `JSON.parse(atob(token.split('.')[1]))`
-  when registering and logging in, convert username to lowercase
-  when searching for project by name, convert to lowercase
-  ticket_devs references username in users instead of ID
-  project_devs references username in users instead of ID
-  submitted_by fields reference username in users instead of ID

## BE notes:

-  user role is stored in the decoded token and can be accessed via `req.token.role`
-  `username` foreign keys on `ticket_replies` and `ticket` tables are nullable to preserve data if a user deletes their account. schema is set to `.onDelete('SET NULL')`

## Permissions:

-  hierarchy: me => superuser => admin => stakeholder => project_manager => developer => user
-  only I can create/remove superusers
-  superusers will have full app permissions. admins must be approved by superuser. only superusers can approve or revoke admins
-  admins will have full crud permissions and permissions to approve project managers or stakeholders
-  stakeholders and project managers will be able to comment on and submit tickets for the project(s) they are approved for
-  developers must be approved by admin, superuser or project manager/stakeholder for pertinent project
-  users can submit tickets to any project, edit the tickets they submit and reply to the tickets they submit, but cannot reply to tickets they did not submit

# Stretch goals:

-  BE: add an account for myself that cannot be deleted or edited even by superUsers
-  BE: password recovery
-  BE: separate auth api with 'audience' key/value stored in token
-  BE: account deletion
-  BE: implement refresh tokens
-  BE: jwt whitelist table
-  BE & FE: internal messaging system
-  BE & FE: watchlist
