UPDATE Users
SET 
    password = COALESCE($password, password),
    username = $username,
    isAdmin = $isAdmin
WHERE userID = $userID;