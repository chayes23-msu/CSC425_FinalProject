SELECT * 
FROM Users u
WHERE u.userName = $username AND u.password = $password;
