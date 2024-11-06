UPDATE Users
SET userName = $username,
    password = $password,
    isAdmin = $isAdmin
WHERE userID = $userID;