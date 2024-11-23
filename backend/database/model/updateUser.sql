UPDATE Users
SET username = $username,
    password = $password
WHERE userID = $userID;