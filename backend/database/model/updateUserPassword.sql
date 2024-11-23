UPDATE Users
SET
    password = $password
WHERE userID = $userID;