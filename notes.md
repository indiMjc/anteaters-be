## Todo:

-  [ ] api docs
-  [ ] middleware that checks if admin
-  [ ] middleware that checks if superuser
-  [ ] middleware that checks if me
-  [ ] add uid to token payload
-  [ ] whitelist jwt algorithms, hardcode into `verify()`
-  [ ] update docs:
   -  remove lowercase names from projects
   -  remove lowercase names from users

## FE notes:

-  store token in memory and get new token if page is refreshed
-  persist on login: token, uid and isAdmin || superUser (uid and role in token)
-  decode jwt with `JSON.parse(atob(token.split('.')[1]))`
-  when registering and logging in, convert username to lowercase
-  when searching for project by name, convert to lowercase
-  ticket_devs references username in users instead of ID
-  project_devs references username in users instead of ID
-  submitted_by fields reference username in users instead of ID
-  persist user type in session storage for middleware functions

## BE notes:

-  `username` foreign keys on `ticket_replies` and `ticket` tables are nullable to preserve data if a user deletes their account. schema is set to `.onDelete('SET NULL')`

## Permissions:

-  hierarchy: me => superuser => admin => stakeholder => project_manager => developer => user
-  only I can create/remove superusers
-  superusers will have full app permissions. admins must be approved by superuser. only superusers can approve or revoke admins
-  admins will have full crud permissions and permissions to approve project managers or stakeholders
-  stakeholders and project managers will be able to comment on and submit tickets for the project(s) they are approved for
-  developers must be approved by admin, superuser or project manager/stakeholder for pertinent project
-  users can submit tickets to any project, edit the tickets they submit and reply to the tickets they submit, but cannot reply to tickets they did not submit

## Stretch goals:

-  BE: password recovery
-  BE: separate auth api with 'audience' key/value stored in token
-  BE: account deletion
-  BE: implement refresh tokens
-  BE: jwt whitelist table
