# MVP:

#### BE:

    Endpoints:

            docs
    -  [x]   [x]       login
    -  [x]   [x]       register
    -  [x]    []       edit user (with permission)
    -  [x]    []       edit user permissions (with permission)

    -  [x]   [x]       get all tickets for project by project ID
    -   []    []       get all tickets by author UID in token
    -  [x]   [x]       get ticket by ticket ID
    -  [x]   [x]       add ticket
    -  [x]    []       join ticket
    -  [x]   [x]       edit ticket (with permission)
    -  [x]   [x]       delete ticket (with permission)

    -  [x]   [x]       get all replies by UID in token
    -   []    []       get all replies by ticket ID
    -  [x]   [x]       add reply to ticket
    -  [x]   [x]       edit reply (with permission)
    -  [x]   [x]       delete reply (with permission)

    -  [x]    []       get all projects
    -  [x]   [x]       get project by ID
    -  [x]   [x]       get project by project name
    -  [x]   [x]       add new project
    -  [x]    []       join project
    -  [x]   [x]       edit project (with permission)
    -  [x]   [x]       delete project (with permission)

    Misc:

    -  []              normalize data
    -  []              whitelist jwt algo(s), hardocde into `verify()`
    -  []              fix add project function, it doesn't return added project.  OR make sure new DB request happens on FE when project is added

#### FE:

    -  [] check for locked accounts in middleware
    -  [] assign dev to ticket
    -  [] assign project manager to ticket
    -  [] assign stakeholder to ticket
    -  [] mark ticket as resolved

## FE notes:

-  store token in memory and get new token if page is refreshed
-  persist on login: token, uid and isAdmin || superUser (uid and role in token)
-  decode jwt with `JSON.parse(atob(token.split('.')[1]))`
-  when registering and logging in, convert username to lowercase
-  when searching for project by name, convert to lowercase
-  ticket_devs references username in users instead of ID
-  project_devs references username in users instead of ID
-  submitted_by fields reference username in users instead of ID

## BE notes:

-  user role is stored in the decoded token and can be accessed via `req.locals`
-  `username` foreign keys on `ticket_replies` and `ticket` tables are nullable to preserve data if a user deletes their account.

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
-  BE: search for ticket by title
-  BE & FE: internal messaging system
-  BE & FE: watchlist
